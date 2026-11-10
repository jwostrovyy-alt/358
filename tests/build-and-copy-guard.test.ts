import { describe, it, expect, beforeAll } from 'vitest';
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import * as cheerio from 'cheerio';

describe('Full Astro build, 9 routes, SEO metadata, and anti-cliche guard', () => {
  beforeAll(() => {
    execSync('npm run build', { stdio: 'pipe' });
  }, 60000);

  const expectedFiles = [
    'dist/index.html',
    'dist/turnkey/index.html',
    'dist/design/index.html',
    'dist/renovation/index.html',
    'dist/portfolio/index.html',
    'dist/pricing/index.html',
    'dist/about/index.html',
    'dist/blog/index.html',
    'dist/contacts/index.html',
    'dist/sitemap-index.xml',
  ];

  it('builds all 9 core pages and sitemap', () => {
    for (const file of expectedFiles) {
      expect(fs.existsSync(path.resolve(file)), `Missing ${file}`).toBe(true);
    }
  });

  it('contains zero forbidden marketing cliches or measurement-call buttons across all built pages', () => {
    const forbiddenPatterns = [
      /ідеальн/i,
      /найкращ/i,
      /ексклюзивн/i,
      /ремонт вашої мрії/i,
      /викликати замірника/i,
      /запросити на замір/i,
      /замовити замір/i,
    ];

    for (const file of expectedFiles.filter((f) => f.endsWith('.html'))) {
      const html = fs.readFileSync(path.resolve(file), 'utf-8');
      const $ = cheerio.load(html);
      const bodyText = $('body').text();
      for (const pattern of forbiddenPatterns) {
        expect(bodyText, `Forbidden phrase ${pattern} found in ${file}`).not.toMatch(pattern);
      }
      // Verify valid JSON-LD scripts
      $('script[type="application/ld+json"]').each((_, el) => {
        expect(() => JSON.parse($(el).html() || '')).not.toThrow();
      });
    }
  });

  it('adapts mobile header with single-row Menu toggle button, 1-column smooth overlay menu, and desktop contact chips', () => {
    const indexHtml = fs.readFileSync(path.resolve('dist/index.html'), 'utf-8');
    expect(indexHtml).toContain('mobile-menu-toggle');
    expect(indexHtml).toContain('toggleMobileNav');
    expect(indexHtml).toContain('flex-direction: column');
    expect(indexHtml).toContain('width: max-content');
    expect(indexHtml).toContain('max-height: 320px');
    expect(indexHtml).toContain('class="header-contacts"');
    expect(indexHtml).toContain('class="chip-link chip-link--outline">Telegram</a>');
    expect(indexHtml).toContain('class="chip-link chip-link--outline">Viber</a>');
    expect(indexHtml).toContain('class="chip-link chip-link--yt">YouTube</a>');
  });
});

