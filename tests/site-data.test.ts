import { describe, it, expect } from 'vitest';
import { SITE_CONFIG, NAV_ITEMS, TEAM_PROFILES } from '../src/data/site.ts';

describe('SITE_CONFIG and core team data', () => {
  it('defines all 9 mandatory navigation routes in exact order', () => {
    expect(NAV_ITEMS.map((item) => item.href)).toEqual([
      '/',
      '/turnkey',
      '/design',
      '/renovation',
      '/portfolio',
      '/pricing',
      '/about',
      '/blog',
      '/contacts',
    ]);
  });

  it('includes direct contacts (phone, Telegram, Viber, YouTube Розумний ремонт)', () => {
    expect(SITE_CONFIG.phoneHref).toMatch(/^tel:\+380/);
    expect(SITE_CONFIG.telegramUrl).toContain('t.me/');
    expect(SITE_CONFIG.viberUrl).toContain('viber://');
    expect(SITE_CONFIG.youtubeChannelName).toBe('Розумний ремонт');
  });

  it('captures accurate factual profiles for Natalia and Vitaliy', () => {
    expect(TEAM_PROFILES.natalia.name).toBe('Наталя');
    expect(TEAM_PROFILES.natalia.age).toBe(46);
    expect(TEAM_PROFILES.natalia.experienceYears).toBe(20);
    expect(TEAM_PROFILES.natalia.degree).toContain('магістр архітектури');

    expect(TEAM_PROFILES.vitaliy.name).toBe('Віталій');
    expect(TEAM_PROFILES.vitaliy.age).toBe(46);
    expect(TEAM_PROFILES.vitaliy.experienceYears).toBe(10);
    expect(TEAM_PROFILES.vitaliy.personalTrades).toEqual(
      expect.arrayContaining(['шпаклювальні роботи', 'малярні роботи', 'плиточні роботи'])
    );
  });
});

