import { describe, it, expect } from 'vitest';
import { buildLocalBusinessSchema, buildServiceSchema, buildVideoSchema } from '../src/utils/seo.ts';

describe('SEO JSON-LD schema builders', () => {
  it('generates valid HomeAndConstructionBusiness JSON-LD for Lviv', () => {
    const schema = buildLocalBusinessSchema();
    const parsed = JSON.parse(JSON.stringify(schema));
    expect(parsed['@type']).toBe('HomeAndConstructionBusiness');
    expect(parsed.address.addressLocality).toBe('Львів');
    expect(parsed.areaServed).toEqual(expect.arrayContaining(['Львів', 'Україна']));
  });

  it('generates valid VideoObject JSON-LD for YouTube embeds', () => {
    const videoSchema = buildVideoSchema({
      videoId: 'dQw4w9WgXcQ',
      title: 'Підготовка стін під фарбування у новобудові Львова',
      description: 'Огляд етапів шпаклювання та контролю геометрії.',
      uploadDate: '2026-10-15',
    });
    expect(videoSchema['@type']).toBe('VideoObject');
    expect(videoSchema.embedUrl).toBe('https://www.youtube.com/embed/dQw4w9WgXcQ');
  });
});

