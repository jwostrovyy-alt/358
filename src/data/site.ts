export interface NavItem {
  label: string;
  href: string;
}

export interface SiteConfig {
  brandName: string;
  tagline: string;
  city: string;
  country: string;
  siteUrl: string;
  basePath: string;
  phoneDisplay: string;
  phoneHref: string;
  telegramUrl: string;
  viberUrl: string;
  youtubeChannelName: string;
  youtubeUrl: string;
  renovationGeography: string;
  designGeography: string;
}

export const SITE_CONFIG: SiteConfig = {
  brandName: '358',
  tagline: 'дизайн та ремонт • Львів',
  city: 'Львів',
  country: 'Україна',
  siteUrl: 'https://jwostrovyy-alt.github.io/358',
  basePath: '/358',
  phoneDisplay: '+38 (097) 358-00-00',
  phoneHref: 'tel:+380973580000',
  telegramUrl: 'https://t.me/studio358_lviv',
  viberUrl: 'viber://chat?number=%2B380973580000',
  youtubeChannelName: 'Розумний ремонт',
  youtubeUrl: 'https://www.youtube.com/@rozumnyy-remont',
  renovationGeography: 'м. Львів та прилеглі населені пункти',
  designGeography: 'м. Львів та дистанційно по всій Україні',
};

export const NAV_ITEMS: NavItem[] = [
  { label: 'Головна', href: '/' },
  { label: 'Комплекс', href: '/turnkey' },
  { label: 'Дизайн', href: '/design' },
  { label: 'Ремонт', href: '/renovation' },
  { label: 'Портфоліо', href: '/portfolio' },
  { label: 'Ціни', href: '/pricing' },
  { label: 'Про нас', href: '/about' },
  { label: 'Блог / Відео', href: '/blog' },
  { label: 'Контакти', href: '/contacts' },
];

export const TEAM_PROFILES = {
  natalia: {
    name: 'Наталя',
    age: 46,
    role: 'Архітектура та дизайн інтер\'єру',
    experienceYears: 20,
    degree: 'магістр архітектури (диплом магістра архітектури)',
    summary:
      'Диплом магістра архітектури, понад 20 років практичного стажу в дизайні інтер\'єрів. Розробляє ергономічні планування, реалістичні 3D-візуалізації та точні робочі креслення з урахуванням чинних будівельних норм (ДБН) та інженерії.',
    highlights: ['20+ років стажу', 'Магістр архітектури', 'Креслення за ДБН', '3D-візуалізації та ергономіка'],
  },
  vitaliy: {
    name: 'Віталій',
    age: 46,
    role: 'Керівництво об\'єктом та чистове оздоблення',
    experienceYears: 10,
    personalTrades: ['шпаклювальні роботи', 'малярні роботи', 'плиточні роботи'],
    summary:
      'Понад 10 років практичного досвіду в ремонтах. Особисто веде об\'єкт від першого дня до здачі ключів, власноруч виконує чистові шпаклювальні, малярні та плиточні роботи. Електрику, сантехніку, машинну стяжку, гіпсокартон і корпусні меблі виконують перевірені майстри під його щоденним наглядом.',
    highlights: ['10+ років досвіду', 'Щоденний нагляд', 'Власноручне чистове оздоблення', 'Координація майстрів'],
  },
  partners: [
    {
      trade: 'Електромонтажні роботи',
      description: 'Збірка щитів, трасування кабелів за навантаженнями, автоматика безпеки.',
    },
    {
      trade: 'Сантехніка та опалення',
      description: 'Водяна тепла підлога з зональним Wi-Fi керуванням, колекторні вузли, редуктори тиску, антипотоп.',
    },
    {
      trade: 'Машинна стяжка та штукатурка',
      description: 'Вирівнювання площин за лазерними нівелірами перед чистовим етапом.',
    },
    {
      trade: 'Гіпсокартонні конструкції',
      description: 'Монтаж перегородок, прихованих ніш та коробів інженерних комунікацій.',
    },
    {
      trade: 'Корпусні меблі на замовлення',
      description: 'Виготовлення та монтаж кухонь до стелі, вбудованих шаф і систем зберігання за кресленнями Наталі.',
    },
  ],
};
