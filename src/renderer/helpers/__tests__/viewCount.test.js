import { isLocalizedViewCountText, parseLocalizedViewCount } from '../api/viewCount'

// ─── isLocalizedViewCountText ─────────────────────────────────────────────

describe('isLocalizedViewCountText', () => {
  describe('English', () => {
    test('detects "59K views"', () => {
      expect(isLocalizedViewCountText('59K views')).toBe(true)
    })

    test('detects "1,234,567 views"', () => {
      expect(isLocalizedViewCountText('1,234,567 views')).toBe(true)
    })

    test('detects "5 watching"', () => {
      expect(isLocalizedViewCountText('5 watching')).toBe(true)
    })

    test('detects "10 waiting"', () => {
      expect(isLocalizedViewCountText('10 waiting')).toBe(true)
    })

    test('detects "no views"', () => {
      expect(isLocalizedViewCountText('no views')).toBe(true)
    })

    test('detects "1 view"', () => {
      expect(isLocalizedViewCountText('1 view')).toBe(true)
    })
  })

  describe('European K/k multiplier languages', () => {
    test('detects French "59 k vues"', () => {
      expect(isLocalizedViewCountText('59 k vues')).toBe(true)
    })

    test('detects Spanish "59 K visualizaciones"', () => {
      expect(isLocalizedViewCountText('59 K visualizaciones')).toBe(true)
    })

    test('detects Italian "59K visualizzazioni"', () => {
      expect(isLocalizedViewCountText('59K visualizzazioni')).toBe(true)
    })

    test('detects Dutch "59K weergaven"', () => {
      expect(isLocalizedViewCountText('59K weergaven')).toBe(true)
    })

    test('detects Malay "59K tontonan"', () => {
      expect(isLocalizedViewCountText('59K tontonan')).toBe(true)
    })

    test('detects Norwegian "59k avspillinger"', () => {
      expect(isLocalizedViewCountText('59k avspillinger')).toBe(true)
    })

    test('detects Afrikaans "59 k kyke"', () => {
      expect(isLocalizedViewCountText('59 k kyke')).toBe(true)
    })

    test('detects Tagalog "59K panonood"', () => {
      expect(isLocalizedViewCountText('59K panonood')).toBe(true)
    })

    test('detects Azerbaijani "59K baxış"', () => {
      expect(isLocalizedViewCountText('59K baxış')).toBe(true)
    })

    test('detects Hebrew "59K צפיות"', () => {
      expect(isLocalizedViewCountText('59K צפיות')).toBe(true)
    })

    test('detects Catalan "59 k visualitzacions"', () => {
      expect(isLocalizedViewCountText('59 k visualitzacions')).toBe(true)
    })

    test('detects Romanian "59 K de vizionări"', () => {
      expect(isLocalizedViewCountText('59 K de vizionări')).toBe(true)
    })
  })

  describe('Native abbreviation multiplier languages', () => {
    test('detects Russian "59 тыс. просмотров"', () => {
      expect(isLocalizedViewCountText('59 тыс. просмотров')).toBe(true)
    })

    test('detects Polish "59 tys. wyświetleń"', () => {
      expect(isLocalizedViewCountText('59 tys. wyświetleń')).toBe(true)
    })

    test('detects Ukrainian "59 тис. переглядів"', () => {
      expect(isLocalizedViewCountText('59 тис. переглядів')).toBe(true)
    })

    test('detects Czech "59 tis. zhlédnutí"', () => {
      expect(isLocalizedViewCountText('59 tis. zhlédnutí')).toBe(true)
    })

    test('detects Croatian "59 tis. pregleda"', () => {
      expect(isLocalizedViewCountText('59 tis. pregleda')).toBe(true)
    })

    test('detects Slovak "59 tis. zhliadnutí"', () => {
      expect(isLocalizedViewCountText('59 tis. zhliadnutí')).toBe(true)
    })

    test('detects Slovene "59 tis. ogledov"', () => {
      expect(isLocalizedViewCountText('59 tis. ogledov')).toBe(true)
    })

    test('detects Greek "59 χιλ. προβολές"', () => {
      expect(isLocalizedViewCountText('59 χιλ. προβολές')).toBe(true)
    })

    test('detects Finnish "59 t. katselukertaa"', () => {
      expect(isLocalizedViewCountText('59 t. katselukertaa')).toBe(true)
    })

    test('detects Icelandic "59 þ. áhorf"', () => {
      expect(isLocalizedViewCountText('59 þ. áhorf')).toBe(true)
    })

    test('detects Armenian "59 հզր դիտում"', () => {
      expect(isLocalizedViewCountText('59 հզր դիտում')).toBe(true)
    })

    test('detects Estonian "59 tuh vaatamist"', () => {
      expect(isLocalizedViewCountText('59 tuh vaatamist')).toBe(true)
    })

    test('detects Latvian "59 tūkst. skatījumu"', () => {
      expect(isLocalizedViewCountText('59 tūkst. skatījumu')).toBe(true)
    })

    test('detects Lithuanian "59 tūkst. peržiūrų"', () => {
      expect(isLocalizedViewCountText('59 tūkst. peržiūrų')).toBe(true)
    })

    test('detects Bulgarian "59 хил. показвания"', () => {
      expect(isLocalizedViewCountText('59 хил. показвания')).toBe(true)
    })

    test('detects Serbian "59 хиљ. прегледа"', () => {
      expect(isLocalizedViewCountText('59 хиљ. прегледа')).toBe(true)
    })

    test('detects Bosnian "59 hilj. pregleda"', () => {
      expect(isLocalizedViewCountText('59 hilj. pregleda')).toBe(true)
    })

    test('detects Macedonian "59 илј. прегледи"', () => {
      expect(isLocalizedViewCountText('59 илј. прегледи')).toBe(true)
    })

    test('detects Belarusian "59 тыс. праглядаў"', () => {
      expect(isLocalizedViewCountText('59 тыс. праглядаў')).toBe(true)
    })

    test('detects Georgian "59 ათ. ნახვა"', () => {
      expect(isLocalizedViewCountText('59 ათ. ნახვა')).toBe(true)
    })

    test('detects Mongolian "59 мян үзэлт"', () => {
      expect(isLocalizedViewCountText('59 мян үзэлт')).toBe(true)
    })

    test('detects Portuguese "59 mil visualizações"', () => {
      expect(isLocalizedViewCountText('59 mil visualizações')).toBe(true)
    })

    test('detects Turkish "59 B görüntüleme"', () => {
      expect(isLocalizedViewCountText('59 B görüntüleme')).toBe(true)
    })

    test('detects Hungarian "59 E megtekintés"', () => {
      expect(isLocalizedViewCountText('59 E megtekintés')).toBe(true)
    })

    test('detects Vietnamese "59 N lượt xem"', () => {
      expect(isLocalizedViewCountText('59 N lượt xem')).toBe(true)
    })

    test('detects Indonesian "59 rb x ditonton"', () => {
      expect(isLocalizedViewCountText('59 rb x ditonton')).toBe(true)
    })

    test('detects Swahili "Kutazamwa:\nelfu 59"', () => {
      expect(isLocalizedViewCountText('Kutazamwa:\nelfu 59')).toBe(true)
    })
  })

  describe('CJK languages', () => {
    test('detects Japanese "5.9万回視聴"', () => {
      expect(isLocalizedViewCountText('5.9万回視聴')).toBe(true)
    })

    test('detects Korean "조회수 5.9만회"', () => {
      expect(isLocalizedViewCountText('조회수 5.9만회')).toBe(true)
    })

    test('detects Chinese Simplified "5.9万次观看"', () => {
      expect(isLocalizedViewCountText('5.9万次观看')).toBe(true)
    })

    test('detects Chinese Traditional "觀看次數：5.9萬次"', () => {
      expect(isLocalizedViewCountText('觀看次數：5.9萬次')).toBe(true)
    })
  })

  describe('Indian numbering system languages', () => {
    test('detects Hindi "59 हज़ार व्यू"', () => {
      expect(isLocalizedViewCountText('59 हज़ार व्यू')).toBe(true)
    })

    test('detects Hindi "1 लाख व्यू"', () => {
      expect(isLocalizedViewCountText('1 लाख व्यू')).toBe(true)
    })

    test('detects Bengali "59 হাটি ভিউ"', () => {
      expect(isLocalizedViewCountText('59 হাটি ভিউ')).toBe(true)
    })

    test('detects Bengali "1 লাটি ভিউ"', () => {
      expect(isLocalizedViewCountText('1 লাটি ভিউ')).toBe(true)
    })

    test('detects Tamil "1 லட்சம் பார்வைகள்"', () => {
      expect(isLocalizedViewCountText('1 லட்சம் பார்வைகள்')).toBe(true)
    })

    test('detects Telugu "1 లక్ష వీక్షణలు"', () => {
      expect(isLocalizedViewCountText('1 లక్ష వీక్షణలు')).toBe(true)
    })

    test('detects Gujarati "59 હજાર જોવાયાની સંખ્યા"', () => {
      expect(isLocalizedViewCountText('59 હજાર જોવાયાની સંખ્યા')).toBe(true)
    })

    test('detects Marathi "59 ह व्ह्यू"', () => {
      expect(isLocalizedViewCountText('59 ह व्ह्यू')).toBe(true)
    })

    test('detects Punjabi "59 ਹਜ਼ਾਰ ਵਾਰ ਦੇਖਿਆ"', () => {
      expect(isLocalizedViewCountText('59 ਹਜ਼ਾਰ ਵਾਰ ਦੇਖਿਆ')).toBe(true)
    })

    test('detects Urdu "59 ہزار ملاحظات"', () => {
      expect(isLocalizedViewCountText('59 ہزار ملاحظات')).toBe(true)
    })
  })

  describe('Arabic', () => {
    test('detects "59 ألف مشاهدة"', () => {
      expect(isLocalizedViewCountText('59 ألف مشاهدة')).toBe(true)
    })
  })

  describe('Thai', () => {
    test('detects "การดู 5.9 หมื่น ครั้ง"', () => {
      expect(isLocalizedViewCountText('การดู 5.9 หมื่น ครั้ง')).toBe(true)
    })
  })

  describe('Full-number languages (no abbreviation)', () => {
    test('detects German "59.809 Aufrufe"', () => {
      expect(isLocalizedViewCountText('59.809 Aufrufe')).toBe(true)
    })

    test('detects Swedish "59 809 visningar"', () => {
      expect(isLocalizedViewCountText('59 809 visningar')).toBe(true)
    })

    test('detects Danish "59.809 visninger"', () => {
      expect(isLocalizedViewCountText('59.809 visninger')).toBe(true)
    })

    test('detects Basque "59.855 ikustaldi"', () => {
      expect(isLocalizedViewCountText('59.855 ikustaldi')).toBe(true)
    })
  })

  describe('number-only formats', () => {
    test('detects "59K"', () => {
      expect(isLocalizedViewCountText('59K')).toBe(true)
    })

    test('detects "1.2M"', () => {
      expect(isLocalizedViewCountText('1.2M')).toBe(true)
    })

    test('detects "3B"', () => {
      expect(isLocalizedViewCountText('3B')).toBe(true)
    })
  })

  describe('non-view-count strings', () => {
    test('returns false for null', () => {
      expect(isLocalizedViewCountText(null)).toBe(false)
    })

    test('returns false for undefined', () => {
      expect(isLocalizedViewCountText(undefined)).toBe(false)
    })

    test('returns false for empty string', () => {
      expect(isLocalizedViewCountText('')).toBe(false)
    })

    test('returns false for plain text', () => {
      expect(isLocalizedViewCountText('hello world')).toBe(false)
    })

    test('returns false for video title', () => {
      expect(isLocalizedViewCountText('Amazing Video Title')).toBe(false)
    })

    test('returns false for channel name', () => {
      expect(isLocalizedViewCountText('MrBeast')).toBe(false)
    })

    test('returns false for relative time text', () => {
      expect(isLocalizedViewCountText('2 days ago')).toBe(false)
    })

    test('returns false for relative time in German', () => {
      expect(isLocalizedViewCountText('vor 2 Tagen')).toBe(false)
    })
  })
})

// ─── parseLocalizedViewCount ──────────────────────────────────────────────

describe('parseLocalizedViewCount', () => {
  describe('English', () => {
    test('parses "59K views"', () => {
      expect(parseLocalizedViewCount('59K views')).toBe(59000)
    })

    test('parses "106K views"', () => {
      expect(parseLocalizedViewCount('106K views')).toBe(106000)
    })

    test('parses "1.5M views"', () => {
      expect(parseLocalizedViewCount('1.5M views')).toBe(1500000)
    })

    test('parses "2B views"', () => {
      expect(parseLocalizedViewCount('2B views')).toBe(2000000000)
    })

    test('parses "1,234,567 views"', () => {
      expect(parseLocalizedViewCount('1,234,567 views')).toBe(1234567)
    })

    test('parses "no views" as 0', () => {
      expect(parseLocalizedViewCount('no views')).toBe(0)
    })

    test('parses "No Views" case-insensitively as 0', () => {
      expect(parseLocalizedViewCount('No Views')).toBe(0)
    })

    test('parses "5 watching"', () => {
      expect(parseLocalizedViewCount('5 watching')).toBe(5)
    })

    test('parses "10 waiting"', () => {
      expect(parseLocalizedViewCount('10 waiting')).toBe(10)
    })
  })

  describe('French', () => {
    test('parses "59 k vues"', () => {
      expect(parseLocalizedViewCount('59 k vues')).toBe(59000)
    })

    test('parses "106 k vues"', () => {
      expect(parseLocalizedViewCount('106 k vues')).toBe(106000)
    })
  })

  describe('Spanish', () => {
    test('parses "59 K visualizaciones"', () => {
      expect(parseLocalizedViewCount('59 K visualizaciones')).toBe(59000)
    })
  })

  describe('Portuguese', () => {
    test('parses "59 mil visualizações"', () => {
      expect(parseLocalizedViewCount('59 mil visualizações')).toBe(59000)
    })
  })

  describe('Russian', () => {
    test('parses "59 тыс. просмотров"', () => {
      expect(parseLocalizedViewCount('59 тыс. просмотров')).toBe(59000)
    })

    test('parses "106 тыс. просмотров"', () => {
      expect(parseLocalizedViewCount('106 тыс. просмотров')).toBe(106000)
    })
  })

  describe('Italian', () => {
    test('parses "59K visualizzazioni"', () => {
      expect(parseLocalizedViewCount('59K visualizzazioni')).toBe(59000)
    })
  })

  describe('Dutch', () => {
    test('parses "59K weergaven"', () => {
      expect(parseLocalizedViewCount('59K weergaven')).toBe(59000)
    })
  })

  describe('Polish', () => {
    test('parses "59 tys. wyświetleń"', () => {
      expect(parseLocalizedViewCount('59 tys. wyświetleń')).toBe(59000)
    })
  })

  describe('Turkish', () => {
    test('parses "59 B görüntüleme" — B = bin (thousand)', () => {
      expect(parseLocalizedViewCount('59 B görüntüleme')).toBe(59000)
    })

    test('parses "106 B görüntüleme"', () => {
      expect(parseLocalizedViewCount('106 B görüntüleme')).toBe(106000)
    })
  })

  describe('Hungarian', () => {
    test('parses "59 E megtekintés" — E = ezer (thousand)', () => {
      expect(parseLocalizedViewCount('59 E megtekintés')).toBe(59000)
    })
  })

  describe('Vietnamese', () => {
    test('parses "59 N lượt xem" — N = nghìn (thousand)', () => {
      expect(parseLocalizedViewCount('59 N lượt xem')).toBe(59000)
    })
  })

  describe('German — dot as thousands separator', () => {
    test('parses "59.809 Aufrufe"', () => {
      expect(parseLocalizedViewCount('59.809 Aufrufe')).toBe(59809)
    })

    test('parses "106.722 Aufrufe"', () => {
      expect(parseLocalizedViewCount('106.722 Aufrufe')).toBe(106722)
    })

    test('parses "466.487 Aufrufe"', () => {
      expect(parseLocalizedViewCount('466.487 Aufrufe')).toBe(466487)
    })
  })

  describe('Danish — dot as thousands separator', () => {
    test('parses "59.809 visninger"', () => {
      expect(parseLocalizedViewCount('59.809 visninger')).toBe(59809)
    })
  })

  describe('Basque — dot as thousands separator', () => {
    test('parses "59.855 ikustaldi"', () => {
      expect(parseLocalizedViewCount('59.855 ikustaldi')).toBe(59855)
    })
  })

  describe('Swedish — space as thousands separator', () => {
    test('parses "59 809 visningar"', () => {
      expect(parseLocalizedViewCount('59 809 visningar')).toBe(59809)
    })
  })

  describe('Norwegian', () => {
    test('parses "59k avspillinger"', () => {
      expect(parseLocalizedViewCount('59k avspillinger')).toBe(59000)
    })
  })

  describe('Finnish', () => {
    test('parses "59 t. katselukertaa"', () => {
      expect(parseLocalizedViewCount('59 t. katselukertaa')).toBe(59000)
    })
  })

  describe('Greek', () => {
    test('parses "59 χιλ. προβολές"', () => {
      expect(parseLocalizedViewCount('59 χιλ. προβολές')).toBe(59000)
    })
  })

  describe('Czech', () => {
    test('parses "59 tis. zhlédnutí"', () => {
      expect(parseLocalizedViewCount('59 tis. zhlédnutí')).toBe(59000)
    })
  })

  describe('Romanian', () => {
    test('parses "59 K de vizionări"', () => {
      expect(parseLocalizedViewCount('59 K de vizionări')).toBe(59000)
    })
  })

  describe('Ukrainian', () => {
    test('parses "59 тис. переглядів"', () => {
      expect(parseLocalizedViewCount('59 тис. переглядів')).toBe(59000)
    })
  })

  describe('Indonesian — rb = ribu, x = times', () => {
    test('parses "59 rb x ditonton"', () => {
      expect(parseLocalizedViewCount('59 rb x ditonton')).toBe(59000)
    })

    test('parses "106 rb x ditonton"', () => {
      expect(parseLocalizedViewCount('106 rb x ditonton')).toBe(106000)
    })
  })

  describe('Thai — หมื่น = 10,000, แสน = 100,000, ครั้ง = times', () => {
    test('parses "การดู 5.9 หมื่น ครั้ง"', () => {
      expect(parseLocalizedViewCount('การดู 5.9 หมื่น ครั้ง')).toBe(59000)
    })

    test('parses "การดู 1 แสน ครั้ง"', () => {
      expect(parseLocalizedViewCount('การดู 1 แสน ครั้ง')).toBe(100000)
    })

    test('parses "การดู 1.7 แสน ครั้ง"', () => {
      expect(parseLocalizedViewCount('การดู 1.7 แสน ครั้ง')).toBe(170000)
    })

    test('parses "การดู 4.6 แสน ครั้ง"', () => {
      expect(parseLocalizedViewCount('การดู 4.6 แสน ครั้ง')).toBe(460000)
    })

    test('parses "การดู 4 หมื่น ครั้ง"', () => {
      expect(parseLocalizedViewCount('การดู 4 หมื่น ครั้ง')).toBe(40000)
    })
  })

  describe('Japanese — 万 = 10,000, 回 = times', () => {
    test('parses "5.9万回視聴"', () => {
      expect(parseLocalizedViewCount('5.9万回視聴')).toBe(59000)
    })

    test('parses "10万回視聴"', () => {
      expect(parseLocalizedViewCount('10万回視聴')).toBe(100000)
    })

    test('parses "1.5万回視聴"', () => {
      expect(parseLocalizedViewCount('1.5万回視聴')).toBe(15000)
    })

    test('parses "17万回視聴"', () => {
      expect(parseLocalizedViewCount('17万回視聴')).toBe(170000)
    })

    test('parses "46万回視聴"', () => {
      expect(parseLocalizedViewCount('46万回視聴')).toBe(460000)
    })

    test('parses "4万回視聴"', () => {
      expect(parseLocalizedViewCount('4万回視聴')).toBe(40000)
    })
  })

  describe('Korean — 만 = 10,000, 회 = times', () => {
    test('parses "조회수 5.9만회"', () => {
      expect(parseLocalizedViewCount('조회수 5.9만회')).toBe(59000)
    })

    test('parses "조회수 10만회"', () => {
      expect(parseLocalizedViewCount('조회수 10만회')).toBe(100000)
    })

    test('parses "조회수 1.5만회"', () => {
      expect(parseLocalizedViewCount('조회수 1.5만회')).toBe(15000)
    })

    test('parses "조회수 46만회"', () => {
      expect(parseLocalizedViewCount('조회수 46만회')).toBe(460000)
    })
  })

  describe('Chinese Simplified — 万 = 10,000, 次 = times', () => {
    test('parses "5.9万次观看"', () => {
      expect(parseLocalizedViewCount('5.9万次观看')).toBe(59000)
    })

    test('parses "10万次观看"', () => {
      expect(parseLocalizedViewCount('10万次观看')).toBe(100000)
    })

    test('parses "1.5万次观看"', () => {
      expect(parseLocalizedViewCount('1.5万次观看')).toBe(15000)
    })

    test('parses "46万次观看"', () => {
      expect(parseLocalizedViewCount('46万次观看')).toBe(460000)
    })
  })

  describe('Chinese Traditional — 萬 = 10,000, 次 = times', () => {
    test('parses "觀看次數：5.9萬次"', () => {
      expect(parseLocalizedViewCount('觀看次數：5.9萬次')).toBe(59000)
    })

    test('parses "觀看次數：10萬次"', () => {
      expect(parseLocalizedViewCount('觀看次數：10萬次')).toBe(100000)
    })

    test('parses "觀看次數：46萬次"', () => {
      expect(parseLocalizedViewCount('觀看次數：46萬次')).toBe(460000)
    })
  })

  describe('Hindi — हज़ार = 1,000, लाख = 100,000', () => {
    test('parses "59 हज़ार व्यू"', () => {
      expect(parseLocalizedViewCount('59 हज़ार व्यू')).toBe(59000)
    })

    test('parses "1 लाख व्यू"', () => {
      expect(parseLocalizedViewCount('1 लाख व्यू')).toBe(100000)
    })

    test('parses "1.7 लाख व्यू"', () => {
      expect(parseLocalizedViewCount('1.7 लाख व्यू')).toBe(170000)
    })

    test('parses "1.4 लाख व्यू"', () => {
      expect(parseLocalizedViewCount('1.4 लाख व्यू')).toBe(140000)
    })

    test('parses "4.6 लाख व्यू"', () => {
      expect(parseLocalizedViewCount('4.6 लाख व्यू')).toBe(460000)
    })
  })

  describe('Bengali — হাটি = 1,000 (হাজার), লাটি = 100,000 (লাখ)', () => {
    test('parses "59 হাটি ভিউ"', () => {
      expect(parseLocalizedViewCount('59 হাটি ভিউ')).toBe(59000)
    })

    test('parses "1 লাটি ভিউ"', () => {
      expect(parseLocalizedViewCount('1 লাটি ভিউ')).toBe(100000)
    })

    test('parses "1.7 লাটি ভিউ"', () => {
      expect(parseLocalizedViewCount('1.7 লাটি ভিউ')).toBe(170000)
    })
  })

  describe('Tamil — லட்சம் = 100,000 (lakh)', () => {
    test('parses "1 லட்சம் பார்வைகள்"', () => {
      expect(parseLocalizedViewCount('1 லட்சம் பார்வைகள்')).toBe(100000)
    })

    test('parses "1.7 லட்சம் பார்வைகள்"', () => {
      expect(parseLocalizedViewCount('1.7 லட்சம் பார்வைகள்')).toBe(170000)
    })

    test('parses "4.6 லட்சம் பார்வைகள்"', () => {
      expect(parseLocalizedViewCount('4.6 லட்சம் பார்வைகள்')).toBe(460000)
    })

    test('parses full number "59,855 பார்வைகள்"', () => {
      expect(parseLocalizedViewCount('59,855 பார்வைகள்')).toBe(59855)
    })
  })

  describe('Telugu — లక్ష/లక్షలు = 100,000 (lakh)', () => {
    test('parses "1 లక్ష వీక్షణలు"', () => {
      expect(parseLocalizedViewCount('1 లక్ష వీక్షణలు')).toBe(100000)
    })

    test('parses "1.7 లక్షలు వీక్షణలు"', () => {
      expect(parseLocalizedViewCount('1.7 లక్షలు వీక్షణలు')).toBe(170000)
    })
  })

  describe('Gujarati — હજાર = 1,000, લાખ = 100,000', () => {
    test('parses "59 હજાર જોવાયાની સંખ્યા"', () => {
      expect(parseLocalizedViewCount('59 હજાર જોવાયાની સંખ્યા')).toBe(59000)
    })

    test('parses "1 લાખ જોવાયાની સંખ્યા"', () => {
      expect(parseLocalizedViewCount('1 લાખ જોવાયાની સંખ્યા')).toBe(100000)
    })

    test('parses "1.7 લાખ જોવાયાની સંખ્યા"', () => {
      expect(parseLocalizedViewCount('1.7 લાખ જોવાયાની સંખ્યા')).toBe(170000)
    })
  })

  describe('Marathi — ह = 1,000 (abbreviated हजार), लाख = 100,000', () => {
    test('parses "59 ह व्ह्यू"', () => {
      expect(parseLocalizedViewCount('59 ह व्ह्यू')).toBe(59000)
    })

    test('parses "1 लाख व्ह्यू"', () => {
      expect(parseLocalizedViewCount('1 लाख व्ह्यू')).toBe(100000)
    })

    test('parses "1.7 लाख व्ह्यू"', () => {
      expect(parseLocalizedViewCount('1.7 लाख व्ह्यू')).toBe(170000)
    })
  })

  describe('Punjabi — ਹਜ਼ਾਰ = 1,000, ਲੱਖ = 100,000, ਵਾਰ = times', () => {
    test('parses "59 ਹਜ਼ਾਰ ਵਾਰ ਦੇਖਿਆ"', () => {
      expect(parseLocalizedViewCount('59 ਹਜ਼ਾਰ ਵਾਰ ਦੇਖਿਆ')).toBe(59000)
    })

    test('parses "1 ਲੱਖ ਵਾਰ ਦੇਖਿਆ"', () => {
      expect(parseLocalizedViewCount('1 ਲੱਖ ਵਾਰ ਦੇਖਿਆ')).toBe(100000)
    })

    test('parses "1.7 ਲੱਖ ਵਾਰ ਦੇਖਿਆ"', () => {
      expect(parseLocalizedViewCount('1.7 ਲੱਖ ਵਾਰ ਦੇਖਿਆ')).toBe(170000)
    })
  })

  describe('Urdu — ہزار = 1,000, لاکھ = 100,000', () => {
    test('parses "59 ہزار ملاحظات"', () => {
      expect(parseLocalizedViewCount('59 ہزار ملاحظات')).toBe(59000)
    })

    test('parses "1 لاکھ ملاحظات"', () => {
      expect(parseLocalizedViewCount('1 لاکھ ملاحظات')).toBe(100000)
    })

    test('parses "1.7 لاکھ ملاحظات"', () => {
      expect(parseLocalizedViewCount('1.7 لاکھ ملاحظات')).toBe(170000)
    })
  })

  describe('Arabic — ألف = 1,000', () => {
    test('parses "59 ألف مشاهدة"', () => {
      expect(parseLocalizedViewCount('59 ألف مشاهدة')).toBe(59000)
    })
  })

  describe('Kazakh — мың/м. = 1,000, рет = times', () => {
    test('parses "59 мың рет көрілді"', () => {
      expect(parseLocalizedViewCount('59 мың рет көрілді')).toBe(59000)
    })

    test('parses "106 м. рет көрілді"', () => {
      expect(parseLocalizedViewCount('106 м. рет көрілді')).toBe(106000)
    })

    test('parses "466 м. рет көрілді"', () => {
      expect(parseLocalizedViewCount('466 м. рет көрілді')).toBe(466000)
    })
  })

  describe('Swahili — elfu = 1,000, reversed order', () => {
    test('parses "Kutazamwa:\nelfu 59"', () => {
      expect(parseLocalizedViewCount('Kutazamwa:\nelfu 59')).toBe(59000)
    })

    test('parses "Kutazamwa:\nelfu 106"', () => {
      expect(parseLocalizedViewCount('Kutazamwa:\nelfu 106')).toBe(106000)
    })
  })

  describe('remaining locale spot-checks', () => {
    test('parses Afrikaans "59 k kyke"', () => {
      expect(parseLocalizedViewCount('59 k kyke')).toBe(59000)
    })

    test('parses Armenian "59 հզր դիտում"', () => {
      expect(parseLocalizedViewCount('59 հզր դիտում')).toBe(59000)
    })

    test('parses Belarusian "59 тыс. праглядаў"', () => {
      expect(parseLocalizedViewCount('59 тыс. праглядаў')).toBe(59000)
    })

    test('parses Bosnian "59 hilj. pregleda"', () => {
      expect(parseLocalizedViewCount('59 hilj. pregleda')).toBe(59000)
    })

    test('parses Bulgarian "59 хил. показвания"', () => {
      expect(parseLocalizedViewCount('59 хил. показвания')).toBe(59000)
    })

    test('parses Catalan "59 k visualitzacions"', () => {
      expect(parseLocalizedViewCount('59 k visualitzacions')).toBe(59000)
    })

    test('parses Croatian "59 tis. pregleda"', () => {
      expect(parseLocalizedViewCount('59 tis. pregleda')).toBe(59000)
    })

    test('parses Estonian "59 tuh vaatamist"', () => {
      expect(parseLocalizedViewCount('59 tuh vaatamist')).toBe(59000)
    })

    test('parses Georgian "59 ათ. ნახვა"', () => {
      expect(parseLocalizedViewCount('59 ათ. ნახვა')).toBe(59000)
    })

    test('parses Icelandic "59 þ. áhorf"', () => {
      expect(parseLocalizedViewCount('59 þ. áhorf')).toBe(59000)
    })

    test('parses Latvian "59 tūkst. skatījumu"', () => {
      expect(parseLocalizedViewCount('59 tūkst. skatījumu')).toBe(59000)
    })

    test('parses Lithuanian "59 tūkst. peržiūrų"', () => {
      expect(parseLocalizedViewCount('59 tūkst. peržiūrų')).toBe(59000)
    })

    test('parses Macedonian "59 илј. прегледи"', () => {
      expect(parseLocalizedViewCount('59 илј. прегледи')).toBe(59000)
    })

    test('parses Mongolian "59 мян үзэлт"', () => {
      expect(parseLocalizedViewCount('59 мян үзэлт')).toBe(59000)
    })

    test('parses Serbian "59 хиљ. прегледа"', () => {
      expect(parseLocalizedViewCount('59 хиљ. прегледа')).toBe(59000)
    })

    test('parses Slovak "59 tis. zhliadnutí"', () => {
      expect(parseLocalizedViewCount('59 tis. zhliadnutí')).toBe(59000)
    })

    test('parses Slovene "59 tis. ogledov"', () => {
      expect(parseLocalizedViewCount('59 tis. ogledov')).toBe(59000)
    })

    test('parses Malay "59K tontonan"', () => {
      expect(parseLocalizedViewCount('59K tontonan')).toBe(59000)
    })

    test('parses Azerbaijani "59K baxış"', () => {
      expect(parseLocalizedViewCount('59K baxış')).toBe(59000)
    })

    test('parses Tagalog "59K panonood"', () => {
      expect(parseLocalizedViewCount('59K panonood')).toBe(59000)
    })
  })

  describe('"no views" in various languages', () => {
    test('parses "no views" (English) as 0', () => {
      expect(parseLocalizedViewCount('no views')).toBe(0)
    })

    test('parses "No Views" (English, capitalized) as 0', () => {
      expect(parseLocalizedViewCount('No Views')).toBe(0)
    })

    test('parses "keine Aufrufe" (German) as 0', () => {
      expect(parseLocalizedViewCount('keine Aufrufe')).toBe(0)
    })

    test('parses "aucune vue" (French) as 0', () => {
      expect(parseLocalizedViewCount('aucune vue')).toBe(0)
    })

    test('parses "sin visualizaciones" (Spanish) as 0', () => {
      expect(parseLocalizedViewCount('sin visualizaciones')).toBe(0)
    })

    test('parses "нет просмотров" (Russian) as 0', () => {
      expect(parseLocalizedViewCount('нет просмотров')).toBe(0)
    })

    test('parses "geen weergaven" (Dutch) as 0', () => {
      expect(parseLocalizedViewCount('geen weergaven')).toBe(0)
    })
  })

  describe('edge cases', () => {
    test('returns NaN for null', () => {
      expect(parseLocalizedViewCount(null)).toBeNaN()
    })

    test('returns NaN for undefined', () => {
      expect(parseLocalizedViewCount(undefined)).toBeNaN()
    })

    test('returns NaN for empty string', () => {
      expect(parseLocalizedViewCount('')).toBeNaN()
    })

    test('returns NaN for plain text without numbers', () => {
      expect(parseLocalizedViewCount('hello world')).toBeNaN()
    })

    test('parses a plain number string', () => {
      expect(parseLocalizedViewCount('42')).toBe(42)
    })

    test('parses a large plain number string', () => {
      expect(parseLocalizedViewCount('1234567')).toBe(1234567)
    })
  })

  describe('decimal with multiplier', () => {
    test('parses "1.5K views" as 1500', () => {
      expect(parseLocalizedViewCount('1.5K views')).toBe(1500)
    })

    test('parses "2.3M views" as 2300000', () => {
      expect(parseLocalizedViewCount('2.3M views')).toBe(2300000)
    })

    test('parses "1.1K views" as 1100', () => {
      expect(parseLocalizedViewCount('1.1K views')).toBe(1100)
    })
  })

  describe('original sample data validation', () => {
    // These test the actual YouTube sample strings from viewCountLocales.json
    // to ensure end-to-end correctness

    test('en: "466K views" → 466000', () => {
      expect(parseLocalizedViewCount('466K views')).toBe(466000)
    })

    test('de: "172.899 Aufrufe" → 172899', () => {
      expect(parseLocalizedViewCount('172.899 Aufrufe')).toBe(172899)
    })

    test('fr: "172 k vues" → 172000', () => {
      expect(parseLocalizedViewCount('172 k vues')).toBe(172000)
    })

    test('pt: "466 mil visualizações" → 466000', () => {
      expect(parseLocalizedViewCount('466 mil visualizações')).toBe(466000)
    })

    test('ru: "466 тыс. просмотров" → 466000', () => {
      expect(parseLocalizedViewCount('466 тыс. просмотров')).toBe(466000)
    })

    test('ja: "17万回視聴" → 170000', () => {
      expect(parseLocalizedViewCount('17万回視聴')).toBe(170000)
    })

    test('ko: "조회수 17만회" → 170000', () => {
      expect(parseLocalizedViewCount('조회수 17만회')).toBe(170000)
    })

    test('zh-CN: "17万次观看" → 170000', () => {
      expect(parseLocalizedViewCount('17万次观看')).toBe(170000)
    })

    test('zh-TW: "觀看次數：17萬次" → 170000', () => {
      expect(parseLocalizedViewCount('觀看次數：17萬次')).toBe(170000)
    })

    test('hi: "1.7 लाख व्यू" → 170000', () => {
      expect(parseLocalizedViewCount('1.7 लाख व्यू')).toBe(170000)
    })

    test('hi: "4.6 लाख व्यू" → 460000', () => {
      expect(parseLocalizedViewCount('4.6 लाख व्यू')).toBe(460000)
    })

    test('th: "การดู 1.7 แสน ครั้ง" → 170000', () => {
      expect(parseLocalizedViewCount('การดู 1.7 แสน ครั้ง')).toBe(170000)
    })

    test('th: "การดู 4.6 แสน ครั้ง" → 460000', () => {
      expect(parseLocalizedViewCount('การดู 4.6 แสน ครั้ง')).toBe(460000)
    })

    test('id: "466 rb x ditonton" → 466000', () => {
      expect(parseLocalizedViewCount('466 rb x ditonton')).toBe(466000)
    })

    test('tr: "466 B görüntüleme" → 466000', () => {
      expect(parseLocalizedViewCount('466 B görüntüleme')).toBe(466000)
    })

    test('vi: "466 N lượt xem" → 466000', () => {
      expect(parseLocalizedViewCount('466 N lượt xem')).toBe(466000)
    })

    test('sv: "466 487 visningar" → 466487', () => {
      expect(parseLocalizedViewCount('466 487 visningar')).toBe(466487)
    })

    test('da: "466.487 visninger" → 466487', () => {
      expect(parseLocalizedViewCount('466.487 visninger')).toBe(466487)
    })

    test('ta: "4.6 லட்சம் பார்வைகள்" → 460000', () => {
      expect(parseLocalizedViewCount('4.6 லட்சம் பார்வைகள்')).toBe(460000)
    })

    test('te: "4.6 లక్షలు వీక్షణలు" → 460000', () => {
      expect(parseLocalizedViewCount('4.6 లక్షలు వీక్షణలు')).toBe(460000)
    })

    test('gu: "4.6 લાખ જોવાયાની સંખ્યા" → 460000', () => {
      expect(parseLocalizedViewCount('4.6 લાખ જોવાયાની સંખ્યા')).toBe(460000)
    })

    test('bn: "4.6 লাটি ভিউ" → 460000', () => {
      expect(parseLocalizedViewCount('4.6 লাটি ভিউ')).toBe(460000)
    })

    test('pa: "4.6 ਲੱਖ ਵਾਰ ਦੇਖਿਆ" → 460000', () => {
      expect(parseLocalizedViewCount('4.6 ਲੱਖ ਵਾਰ ਦੇਖਿਆ')).toBe(460000)
    })

    test('ur: "4.6 لاکھ ملاحظات" → 460000', () => {
      expect(parseLocalizedViewCount('4.6 لاکھ ملاحظات')).toBe(460000)
    })

    test('mr: "4.6 लाख व्ह्यू" → 460000', () => {
      expect(parseLocalizedViewCount('4.6 लाख व्ह्यू')).toBe(460000)
    })

    test('kk: "466 м. рет көрілді" → 466000', () => {
      expect(parseLocalizedViewCount('466 м. рет көрілді')).toBe(466000)
    })

    test('sw: "Kutazamwa:\nelfu 466" → 466000', () => {
      expect(parseLocalizedViewCount('Kutazamwa:\nelfu 466')).toBe(466000)
    })

    test('eu: "466.487 ikustaldi" → 466487', () => {
      expect(parseLocalizedViewCount('466.487 ikustaldi')).toBe(466487)
    })
  })
})
