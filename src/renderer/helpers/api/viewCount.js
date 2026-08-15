//! Multilingual view count text detection and parsing
// Supports all 59 YouTube languages
// Only used when the experimentalMultilingualText setting is enabled

import localeData from './viewCountLocales.json'

// ─── Pre-computed lookup structures ────────────────────────────────────────

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/** All "views" text keywords across all locales, sorted longest-first */
const ALL_VIEWS_TEXTS = (() => {
  const texts = new Set()
  for (const locale of Object.values(localeData)) {
    for (const v of locale.viewsTexts) {
      texts.add(v)
    }
  }
  // Add English "view" (singular) — not in YouTube data but needed for detection/parsing
  texts.add('view')
  return [...texts].sort((a, b) => b.length - a.length)
})()

/** All "no views" text keywords across all locales, lowercased */
const ALL_NO_VIEWS_TEXTS = (() => {
  const texts = new Set()
  for (const locale of Object.values(localeData)) {
    for (const n of locale.noViewsTexts) {
      texts.add(n.toLowerCase())
    }
  }
  return texts
})()

/** Map from viewsText keyword → array of locale codes that use it */
const VIEWS_TEXT_TO_LOCALES = (() => {
  const map = new Map()
  for (const [code, locale] of Object.entries(localeData)) {
    for (const v of locale.viewsTexts) {
      if (!map.has(v)) map.set(v, [])
      map.get(v).push(code)
    }
  }
  // Add "view" (singular) mapping to same locales as "views"
  if (map.has('views')) {
    map.set('view', map.get('views'))
  }
  return map
})()

/** All "times" symbols that should NOT be treated as multipliers */
const ALL_TIMES_SYMBOLS = (() => {
  const symbols = new Set()
  for (const locale of Object.values(localeData)) {
    if (locale.timesSymbols) {
      for (const t of locale.timesSymbols) {
        symbols.add(t)
      }
    }
  }
  return [...symbols]
})()

/** Locales that use "." as thousands separator (no multiplier abbreviation) */
const DOT_THOUSANDS_LOCALES = new Set(
  Object.entries(localeData)
    .filter(([, locale]) => locale.thousandsSeparator === '.')
    .map(([code]) => code),
)

/** Locales that use space as thousands separator */
const SPACE_THOUSANDS_LOCALES = new Set(
  Object.entries(localeData)
    .filter(([, locale]) => locale.thousandsSeparator === ' ')
    .map(([code]) => code),
)

// ─── Pre-compiled regex patterns ───────────────────────────────────────────

/**
 * Regex that matches if a text string contains a "views" keyword
 * in any supported language (including English "view" singular).
 */
const VIEWS_TEXT_REGEX = new RegExp(ALL_VIEWS_TEXTS.map(escapeRegex).join('|'), 'i')

/**
 * Regex for "times" symbols that are NOT multipliers.
 */
const TIMES_REGEX = new RegExp(ALL_TIMES_SYMBOLS.map(escapeRegex).join('|'), 'g')

// ─── Locale detection ─────────────────────────────────────────────────────

/**
 * Detect which locale(s) the text likely belongs to based on views text keywords.
 * Returns an array of locale codes, ordered by keyword match specificity
 * (longest keyword match first).
 *
 * @param {string} text
 * @returns {string[]}
 */
function detectLocales(text) {
  const localeScores = new Map()

  for (const [viewsText, codes] of VIEWS_TEXT_TO_LOCALES) {
    if (text.includes(viewsText)) {
      for (const code of codes) {
        localeScores.set(code, (localeScores.get(code) || 0) + viewsText.length)
      }
    }
  }

  // Sort by score descending (longer keyword match = more specific)
  return [...localeScores.entries()].sort((a, b) => b[1] - a[1]).map(([code]) => code)
}

// ─── Locale-aware parsing ──────────────────────────────────────────────────

/**
 * Parse a view count text using a specific locale's rules.
 *
 * Processing order matters:
 * 1. Strip "times" symbols (回, 회, 次, x, etc.) — not multipliers
 * 2. Strip "views" text keywords — prevents false multiplier matches
 *    (e.g., "ह" inside "व्ह्यू" in Marathi)
 * 3. Find multiplier symbol in the cleaned text
 * 4. Strip multiplier symbol
 * 5. Extract number with locale-aware separator handling
 * 6. Apply multiplier
 *
 * @param {string} text - The original view count text
 * @param {string} localeCode - The locale code to use for parsing rules
 * @returns {number} Parsed view count, or NaN if parsing fails
 */
function parseWithLocale(text, localeCode) {
  const locale = localeData[localeCode]
  if (!locale) return NaN

  let cleaned = text

  // 1. Strip "times" symbols that are NOT multipliers
  if (locale.timesSymbols) {
    for (const t of locale.timesSymbols) {
      cleaned = cleaned.replaceAll(new RegExp(escapeRegex(t), 'g'), ' ')
    }
  }

  // 2. Strip "views" text keywords (longest first to avoid partial matches)
  // This must happen BEFORE multiplier detection to prevent false matches
  // inside views keywords (e.g., "ह" inside "व्ह्यू" in Marathi)
  for (const v of ALL_VIEWS_TEXTS) {
    cleaned = cleaned.replaceAll(new RegExp(escapeRegex(v), 'gi'), ' ')
  }

  // 3. Strip structural text (colons, newlines)
  cleaned = cleaned.replaceAll(/[:：\n]/g, ' ').trim()

  // 4. Find multiplier symbol for this locale (longest match first)
  let multiplier = null
  const sortedMultipliers = [...locale.multipliers].sort((a, b) => b.symbol.length - a.symbol.length)
  for (const m of sortedMultipliers) {
    if (new RegExp(escapeRegex(m.symbol)).test(cleaned)) {
      multiplier = m
      break
    }
  }

  // 5. Strip multiplier symbol from cleaned text
  if (multiplier) {
    cleaned = cleaned.replaceAll(new RegExp(escapeRegex(multiplier.symbol), 'gi'), ' ').trim()
  }

  // 6. Extract number with locale-aware separator handling
  let num

  if (multiplier) {
    // When a multiplier is present, dot/comma next to the number is a decimal point
    // e.g., "5.9" in "5.9万", "1.7" in "1.7 लाख", "5.9" in "5.9만"
    const match = cleaned.match(/(\d+(?:[.,]\d+)?)/)
    if (!match) return NaN
    num = parseFloat(match[1].replace(',', '.'))
  } else if (DOT_THOUSANDS_LOCALES.has(localeCode)) {
    // Dot is thousands separator: "59.809" → 59809, "1.234.567" → 1234567
    // Must match full dotted number to avoid treating "5.9" as "5" + ".9"
    const match = cleaned.match(/(\d+(?:\.\d{3})+)/)
    if (match) {
      num = parseInt(match[1].replaceAll('.', ''), 10)
    }
  } else if (SPACE_THOUSANDS_LOCALES.has(localeCode)) {
    // Space is thousands separator: "466 487" → 466487
    const match = cleaned.match(/(\d+(?:\s\d{3})+)/)
    if (match) {
      num = parseInt(match[1].replaceAll(/\s/g, ''), 10)
    }
  }

  // Fallback: comma as thousands separator (English, Tamil, etc.)
  // "1,234,567" → 1234567
  if (num === undefined) {
    const commaMatch = cleaned.match(/(\d+(?:,\d{3})+)/)
    if (commaMatch) {
      num = parseInt(commaMatch[1].replaceAll(',', ''), 10)
    }
  }

  // Fallback: plain number (no thousands separator patterns)
  if (num === undefined) {
    const match = cleaned.match(/(\d+)/)
    if (match) {
      num = parseInt(match[1], 10)
    }
  }

  if (num === undefined || isNaN(num)) return NaN

  // If this locale defines multipliers but none were found in the text,
  // this is likely the wrong locale — return NaN so the next candidate is tried.
  // This handles ambiguity like Croatian "tis." vs Bosnian "hilj." (both use "pregleda")
  // However, if the text contains thousands separators (e.g., "1,234,567 views",
  // "59,855 பார்வைகள்"), it's a full number — not abbreviated — so don't return NaN.
  if (!multiplier && locale.multipliers.length > 0) {
    const hasThousandsSeparators = /\d{1,3}(?:[.,\s]\d{3})+/.test(cleaned)
    if (!hasThousandsSeparators) return NaN
  }

  // 7. Apply multiplier
  if (multiplier) {
    return Math.round(num * multiplier.value)
  }
  return num
}

// ─── Public API ────────────────────────────────────────────────────────────

/**
 * Check if a text string looks like a view count in any supported language.
 * Replaces the English-only VIEWS_OR_WATCHING_REGEX check.
 *
 * @param {string|undefined} text
 * @returns {boolean}
 */
export function isLocalizedViewCountText(text) {
  if (typeof text !== 'string') return false

  // Check for "views" keyword in any language (including English "view" singular)
  if (VIEWS_TEXT_REGEX.test(text)) return true

  // Check for number-only format like "1.2M" or "59K"
  // (some locales may not include the word "views" in short form)
  if (/^\d+(?:[.,]\d+)?\s*[KkMmBb]$/i.test(text)) return true

  return false
}

/**
 * Parse a localized view count string into a numeric value.
 *
 * Strategy:
 * 1. Handle "no views" texts in any language → return 0
 * 2. Detect locale from views text keywords → resolves multiplier ambiguity
 *    (e.g., "B" = thousand in Turkish but billion in English)
 * 3. Parse using locale-specific rules for number separators and multipliers
 * 4. Fall back to generic English-based parsing if no locale detected
 *
 * Returns NaN if the text cannot be parsed.
 *
 * @param {string|undefined} text
 * @returns {number}
 */
export function parseLocalizedViewCount(text) {
  if (typeof text !== 'string') return NaN

  // Handle "no views" in any language
  const trimmed = text.toLowerCase().trim()
  if (ALL_NO_VIEWS_TEXTS.has(trimmed)) return 0
  if (trimmed === 'no views') return 0

  // Detect locale(s) from views text keywords
  const locales = detectLocales(text)

  // Try each detected locale (ordered by specificity)
  for (const localeCode of locales) {
    const result = parseWithLocale(text, localeCode)
    if (!isNaN(result)) return result
  }

  // Fallback: no locale detected, try generic parsing
  // This handles edge cases like "59K" without a views keyword
  return parseGenericViewCount(text)
}

/**
 * Generic fallback parser for view count text without a recognized locale.
 * Uses English multiplier values as a last resort.
 *
 * @param {string} text
 * @returns {number}
 */
function parseGenericViewCount(text) {
  // Strip times symbols
  const cleaned = text.replaceAll(TIMES_REGEX, ' ')

  // Try to match number + English-style multiplier (K/M/B)
  const match = cleaned.match(/(\d+(?:[.,]\d+)?)\s*([KkMmBb])\b/)
  if (match) {
    const num = parseFloat(match[1].replace(',', '.'))
    const sym = match[2].toUpperCase()
    switch (sym) {
      case 'K':
        return Math.round(num * 1000)
      case 'M':
        return Math.round(num * 1000000)
      case 'B':
        return Math.round(num * 1000000000)
    }
  }

  // Try to match a plain number
  const plainMatch = cleaned.match(/(\d+(?:[.,]\d+)?)/)
  if (plainMatch) {
    return parseFloat(plainMatch[1].replace(',', '.'))
  }

  return NaN
}
