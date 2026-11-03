import { SITE_CONFIG } from '../data/site.ts';

export function buildLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    name: `Студія дизайну та ремонту «${SITE_CONFIG.brandName}»`,
    description:
      'Архітектурний дизайн інтер\'єру та комплексний ремонт квартир під ключ у Львові. Розробка робочих креслень за ДБН, інженерія та чистове оздоблення.',
    url: SITE_CONFIG.siteUrl,
    telephone: SITE_CONFIG.phoneHref.replace('tel:', ''),
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Львів',
      addressRegion: 'Львівська область',
      addressCountry: 'UA',
    },
    areaServed: ['Львів', 'Україна'],
    sameAs: [SITE_CONFIG.telegramUrl, SITE_CONFIG.youtubeUrl],
  };
}

export function buildServiceSchema(service: {
  name: string;
  description: string;
  areaServed: string[];
  urlPath: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    provider: {
      '@type': 'HomeAndConstructionBusiness',
      name: `Студія дизайну та ремонту «${SITE_CONFIG.brandName}»`,
      telephone: SITE_CONFIG.phoneHref.replace('tel:', ''),
    },
    areaServed: service.areaServed,
    url: `${SITE_CONFIG.siteUrl}${service.urlPath}`,
  };
}

export function buildVideoSchema(video: {
  videoId: string;
  title: string;
  description: string;
  uploadDate: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: video.title,
    description: video.description,
    thumbnailUrl: [`https://i.ytimg.com/vi/${video.videoId}/maxresdefault.jpg`],
    uploadDate: video.uploadDate,
    embedUrl: `https://www.youtube.com/embed/${video.videoId}`,
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.youtubeChannelName,
    },
  };
}

