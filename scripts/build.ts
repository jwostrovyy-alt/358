import fs from 'node:fs';
import path from 'node:path';
import { SITE_CONFIG, NAV_ITEMS, TEAM_PROFILES } from '../src/data/site.ts';
import { PRICING_PACKAGES, UNIT_PRICE_ITEMS, PRICE_CATEGORIES } from '../src/data/pricing.ts';
import { PORTFOLIO_ITEMS, BLOG_ITEMS } from '../src/data/content-items.ts';
import { buildLocalBusinessSchema, buildServiceSchema, buildVideoSchema } from '../src/utils/seo.ts';

const SHARED_CSS = `
  *, *::before, *::after { box-sizing: border-box; }
  :root {
    --step-display: 46px;
    --step-h2: 30px;
    --step-h3: 20px;
    --step-body: 16px;
    --step-small: 14px;
    --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
    --ease-expo: cubic-bezier(0.16, 1, 0.3, 1);
    --ease-in-out: cubic-bezier(0.76, 0, 0.24, 1);
    --ease-soft: cubic-bezier(0.33, 1, 0.68, 1);
    --t-press: 140ms;
    --t-hover: 180ms;
    --t-reveal: 800ms;
  }
  @media (max-width: 960px) {
    :root {
      --step-display: 36px;
      --step-h2: 28px;
      --step-h3: 20px;
      --step-body: 16px;
      --step-small: 14px;
    }
  }
  @media (max-width: 600px) {
    :root {
      --step-display: 26.5px;
      --step-h2: 24px;
      --step-h3: 20px;
      --step-body: 16px;
      --step-small: 14px;
    }
  }
  html { font-size: 16px; scroll-behavior: smooth; }
  body {
    margin: 0;
    padding: 0;
    background: #ffffff;
    color: #1c1917;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Inter, Roboto, sans-serif;
    font-size: var(--step-body);
    -webkit-font-smoothing: antialiased;
    overflow-x: clip;
    line-height: 1.6;
  }
  ::selection { background: #1c1917; color: #ffffff; }
  :focus-visible { outline: 2px solid #1c1917; outline-offset: 3px; }

  h1 { font-size: var(--step-display) !important; line-height: 1.12; letter-spacing: -0.028em; font-weight: 700; color: #1c1917; }
  h2 { font-size: var(--step-h2) !important; line-height: 1.18; letter-spacing: -0.02em; font-weight: 700; color: #1c1917; }
  h3 { font-size: var(--step-h3) !important; line-height: 1.25; font-weight: 700; color: #1c1917; }
  p, li, td { font-size: var(--step-body) !important; line-height: 1.6; }
  .text-small, th { font-size: var(--step-small) !important; }

  @keyframes floatSpiralFullScreen {
    0% { transform: translate3d(-30px, -20px, 0) rotate(0deg) scale(1); }
    25% { transform: translate3d(240px, -70px, 0) rotate(7deg) scale(1.08); }
    50% { transform: translate3d(520px, 50px, 0) rotate(16deg) scale(1.14); }
    75% { transform: translate3d(260px, 140px, 0) rotate(6deg) scale(0.98); }
    90% { transform: translate3d(-80px, 60px, 0) rotate(-6deg) scale(1.04); }
    100% { transform: translate3d(-30px, -20px, 0) rotate(0deg) scale(1); }
  }
  @keyframes floatSpiralMobile {
    0% { transform: translate3d(-18px, -8px, 0) rotate(0deg) scale(0.96); }
    25% { transform: translate3d(20px, -14px, 0) rotate(6deg) scale(1.02); }
    50% { transform: translate3d(30px, 14px, 0) rotate(11deg) scale(1.05); }
    75% { transform: translate3d(-12px, 20px, 0) rotate(4deg) scale(0.98); }
    100% { transform: translate3d(-18px, -8px, 0) rotate(0deg) scale(0.96); }
  }
  @keyframes slowCrossfade1 {
    0%, 28% { opacity: 1; transform: scale(1); }
    38%, 90% { opacity: 0; transform: scale(1.04); }
    100% { opacity: 1; transform: scale(1); }
  }
  @keyframes slowCrossfade2 {
    0%, 28% { opacity: 0; transform: scale(1.04); }
    38%, 62% { opacity: 1; transform: scale(1); }
    72%, 100% { opacity: 0; transform: scale(1.04); }
  }
  @keyframes slowCrossfade3 {
    0%, 62% { opacity: 0; transform: scale(1.04); }
    72%, 92% { opacity: 1; transform: scale(1); }
    100% { opacity: 0; transform: scale(1.04); }
  }
  @keyframes tasteLoadRise {
    from { opacity: 0.01; transform: translate3d(0, 16px, 0); }
    to { opacity: 1; transform: translate3d(0, 0, 0); }
  }
  .hero-crossfade {
    position: relative;
    height: 360px;
    width: 100%;
    overflow: clip;
    background: #1c1917;
  }
  .hero-crossfade img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    will-change: transform, opacity;
  }
  @media (prefers-reduced-motion: no-preference) {
    .hero-crossfade img.cf-1 { animation: slowCrossfade1 16s var(--ease-soft) infinite; }
    .hero-crossfade img.cf-2 { animation: slowCrossfade2 16s var(--ease-soft) infinite; }
    .hero-crossfade img.cf-3 { animation: slowCrossfade3 16s var(--ease-soft) infinite; }
    .js [data-load] {
      animation: tasteLoadRise 680ms var(--ease-expo) both;
      animation-delay: var(--d, 60ms);
    }
    .js [data-reveal] {
      opacity: 0.01;
      transform: translate3d(0, 22px, 0);
      transition: opacity 720ms var(--ease-out), transform 860ms var(--ease-expo);
      transition-delay: var(--delay, 0ms);
    }
    .js [data-reveal].is-in {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .golden-spiral-floating { animation: none !important; }
    .hero-crossfade img.cf-2,
    .hero-crossfade img.cf-3 { display: none; }
  }
  .golden-spiral-wrapper {
    position: absolute;
    left: -60px;
    top: -60px;
    width: 1040px;
    height: 100%;
    max-height: 540px;
    pointer-events: none;
    z-index: 1;
    opacity: 0.22;
  }
  .golden-spiral-floating {
    animation: floatSpiralFullScreen 22s ease-in-out infinite;
    transform-origin: 320px 300px;
    will-change: transform;
  }

  .container-358 {
    max-width: 1600px;
    margin: 0 auto;
    padding-left: clamp(1.15rem, 4vw, 3rem);
    padding-right: clamp(1.15rem, 4vw, 3rem);
  }

  /* Header */
  .site-header {
    position: relative;
    z-index: 50;
    background: #ffffff;
    padding: 1.05rem 0;
  }
  .site-header__inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
  }
  .logo-link {
    display: inline-flex;
    align-items: baseline;
    gap: 0.65rem;
    text-decoration: none;
    color: #1c1917;
  }
  .logo-mark {
    font-size: var(--step-h2) !important;
    font-weight: 800;
    letter-spacing: -0.04em;
    color: #1c1917;
    line-height: 1;
  }
  .logo-sub {
    font-size: var(--step-small) !important;
    color: #78716c;
    font-weight: 500;
  }
  .site-nav {
    display: flex;
    gap: 1.05rem;
    flex-wrap: wrap;
    align-items: center;
  }
  .site-nav a {
    color: #57534e;
    text-decoration: underline;
    text-decoration-color: transparent;
    text-underline-offset: 0.3em;
    text-decoration-thickness: 2px;
    font-size: var(--step-body) !important;
    font-weight: 500;
    padding: 0.25rem 0;
    transition: color var(--t-hover) ease, text-decoration-color var(--t-hover) ease;
    white-space: nowrap;
  }
  @media (hover: hover) and (pointer: fine) {
    .site-nav a:hover {
      color: #1c1917;
      text-decoration-color: currentColor;
    }
  }
  .site-nav a.active {
    color: #1c1917;
    font-weight: 700;
    text-decoration-color: #1c1917;
  }
  .header-contacts {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .chip-link {
    background: #1c1917;
    color: #ffffff;
    text-decoration: none;
    font-size: var(--step-small) !important;
    font-weight: 600;
    padding: 0.5rem 0.95rem;
    border-radius: 6px;
    transition: transform var(--t-press) var(--ease-out), background var(--t-hover) ease;
    white-space: nowrap;
  }
  .chip-link:active { transform: scale(0.97); }
  @media (hover: hover) and (pointer: fine) {
    .chip-link:hover { background: #292524; }
  }

  /* Buttons */
  .btn-arch-action {
    display: inline-flex;
    align-items: center;
    gap: 0.55rem;
    background: #1c1917;
    color: #ffffff;
    text-decoration: none;
    font-size: var(--step-body) !important;
    font-weight: 600;
    padding: 0.85rem 1.5rem;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    transition: transform var(--t-press) var(--ease-out), background var(--t-hover) ease;
  }
  .btn-arch-action:active { transform: scale(0.97); }
  @media (hover: hover) and (pointer: fine) {
    .btn-arch-action:hover {
      background: #292524;
      transform: translateY(-1px);
    }
  }
  .btn-arch-secondary {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: #f5f5f4;
    color: #1c1917;
    text-decoration: none;
    font-size: var(--step-body) !important;
    font-weight: 600;
    padding: 0.85rem 1.35rem;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    transition: transform var(--t-press) var(--ease-out), background var(--t-hover) ease;
  }
  .btn-arch-secondary:active { transform: scale(0.97); }
  @media (hover: hover) and (pointer: fine) {
    .btn-arch-secondary:hover { background: #e7e5e4; }
  }

  /* Grids & Sections */
  .section-white {
    background: #ffffff;
    padding: clamp(3rem, 6vw, 5.25rem) 0;
    position: relative;
    z-index: 10;
  }
  .section-limestone {
    background: #fafaf9;
    padding: clamp(3rem, 6vw, 5.25rem) 0;
    position: relative;
    z-index: 10;
  }
  .hero-responsive-grid {
    display: grid;
    grid-template-columns: 1.12fr 1fr;
    gap: 3rem;
    align-items: center;
    position: relative;
    min-height: 420px;
  }
  .services-clean-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.75rem;
  }
  .team-clean-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
  .cards-2col-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }
  .surface-card {
    background: #ffffff;
    border-radius: 12px;
    padding: clamp(1.5rem, 3vw, 2.35rem);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .surface-card--limestone {
    background: #fafaf9;
    border-radius: 12px;
    padding: clamp(1.5rem, 3vw, 2.35rem);
  }

  /* Tables & Filters */
  .filter-bar {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    margin-bottom: 1.75rem;
    align-items: center;
  }
  .filter-btn {
    padding: 0.55rem 1.05rem;
    border-radius: 6px;
    border: none;
    background: #f5f5f4;
    color: #1c1917;
    font-size: var(--step-small) !important;
    font-weight: 600;
    cursor: pointer;
    transition: background var(--t-hover) ease, color var(--t-hover) ease;
  }
  .filter-btn:hover { background: #e7e5e4; }
  .filter-btn.active { background: #1c1917; color: #ffffff; }
  .search-input {
    padding: 0.65rem 1rem;
    border-radius: 6px;
    border: none;
    font-size: var(--step-body) !important;
    color: #1c1917;
    background: #f5f5f4;
    min-width: 240px;
    flex: 1;
    max-width: 380px;
  }
  .price-table-wrap {
    overflow-x: auto;
    background: #ffffff;
    border-radius: 12px;
    padding: 1rem;
  }
  table.arch-table {
    width: 100%;
    border-collapse: collapse;
    text-align: left;
    font-variant-numeric: tabular-nums;
  }
  table.arch-table th {
    padding: 0.9rem 1rem;
    font-size: var(--step-small) !important;
    color: #57534e;
    background: #fafaf9;
    font-weight: 600;
  }
  table.arch-table td {
    padding: 0.95rem 1rem;
    font-size: var(--step-body) !important;
    color: #1c1917;
    vertical-align: top;
  }
  table.arch-table tr:nth-child(even) td {
    background: #fafaf9;
  }

  /* Lite YouTube */
  .lite-yt-card {
    background: #1c1917;
    color: #ffffff;
    border-radius: 12px;
    overflow: hidden;
    position: relative;
  }
  .lite-yt-poster {
    width: 100%;
    height: 320px;
    object-fit: cover;
    display: block;
    opacity: 0.82;
  }
  .lite-yt-overlay {
    padding: 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
    background: #1c1917;
  }

  /* Mobile menu toggle & bottom bar */
  .mobile-menu-toggle {
    display: none;
  }
  .mobile-contact-bar {
    display: none;
  }

  @media (max-width: 960px) {
    .hero-responsive-grid,
    .services-clean-grid,
    .team-clean-grid,
    .cards-2col-grid {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
    .site-header {
      padding: 0.75rem 0;
    }
    .site-header__inner {
      gap: 0.5rem;
    }
    .mobile-menu-toggle {
      display: inline-flex;
      align-items: center;
      gap: 0.45rem;
      background: #f5f5f4;
      color: #1c1917;
      border: none;
      border-radius: 6px;
      padding: 0.5rem 0.95rem;
      font-size: var(--step-small) !important;
      font-weight: 600;
      font-family: inherit;
      cursor: pointer;
      transition: transform var(--t-press) var(--ease-out), background var(--t-hover) ease, color var(--t-hover) ease;
    }
    .mobile-menu-toggle:active { transform: scale(0.97); }
    .mobile-menu-toggle[aria-expanded="true"] {
      background: #1c1917;
      color: #ffffff;
    }
    .site-nav {
      display: none;
      width: 100%;
    }
    .site-nav.open {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 0.45rem;
      width: 100%;
      margin-top: 0.65rem;
      padding: 0.75rem;
      background: #fafaf9;
      border-radius: 8px;
    }
    .site-nav a {
      font-size: var(--step-small) !important;
      padding: 0.6rem 0.75rem;
      background: #ffffff;
      color: #1c1917;
      text-align: center;
      border-radius: 6px;
      text-decoration: none;
    }
    .site-nav a:last-child {
      grid-column: span 2;
    }
    .site-nav a.active {
      background: #1c1917;
      color: #ffffff;
    }
    .golden-spiral-wrapper {
      left: calc(50% - 155px);
      top: 10px;
      width: 310px;
      height: 255px;
      max-height: 255px;
      opacity: 0.20;
    }
    .golden-spiral-floating {
      animation: floatSpiralMobile 18s ease-in-out infinite;
      transform-origin: 50% 54%;
    }
    .header-contacts {
      display: none;
    }
    .mobile-contact-bar {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 0.45rem;
      background: #fafaf9;
      padding: 0.85rem clamp(1.15rem, 4vw, 3rem);
    }
    .mobile-contact-bar a {
      text-align: center;
      text-decoration: none;
      font-size: var(--step-small) !important;
      font-weight: 600;
      padding: 0.6rem 0.25rem;
      border-radius: 6px;
      background: #ffffff;
      color: #1c1917;
    }
    .mobile-contact-bar a.primary {
      background: #1c1917;
      color: #ffffff;
    }
  }
`;

function renderSpiralSvg(): string {
  return `
  <div id="spiralWrapper4" class="golden-spiral-wrapper">
    <div id="spiralFloatingEl" class="golden-spiral-floating" style="width: 100%; height: 100%;">
      <svg viewBox="0 0 700 550" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg" style="overflow: visible;">
        <defs>
          <linearGradient id="spiralDarkGrad4" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#0c0a09" stop-opacity="1" />
            <stop offset="50%" stop-color="#1c1917" stop-opacity="0.9" />
            <stop offset="85%" stop-color="#292524" stop-opacity="0.75" />
            <stop offset="100%" stop-color="#57534e" stop-opacity="0.4" />
          </linearGradient>
        </defs>
        <g stroke="#1c1917" stroke-width="1" stroke-dasharray="4 4" opacity="0.25">
          <circle cx="320" cy="300" r="144" />
          <circle cx="320" cy="300" r="233" />
        </g>
        <path d="M 322.5 300.0 L 322.6 300.4 L 322.6 300.9 L 322.6 301.3 L 322.4 301.9 L 322.2 302.4 L 321.9 302.7 L 321.6 303.1 L 321.2 303.5 L 320.7 303.8 L 320.2 304.0 L 319.7 304.1 L 319.2 304.2 L 318.6 304.2 L 318.1 304.2 L 317.5 304.1 L 316.9 303.9 L 316.3 303.6 L 315.8 303.3 L 315.2 302.9 L 314.8 302.4 L 314.3 301.8 L 313.9 301.1 L 313.6 300.4 L 313.3 299.6 L 313.2 298.8 L 313.1 297.9 L 313.2 297.0 L 313.4 296.0 L 313.7 295.1 L 314.1 294.2 L 314.6 293.3 L 315.1 292.7 L 315.8 291.8 L 316.4 291.3 L 317.4 290.6 L 318.5 290.0 L 319.7 289.5 L 321.0 289.2 L 322.3 289.0 L 323.8 288.9 L 325.3 289.1 L 326.8 289.4 L 328.3 289.9 L 329.8 290.6 L 331.3 291.6 L 332.6 292.7 L 333.9 294.1 L 335.1 295.6 L 336.1 297.4 L 336.9 299.3 L 337.5 301.3 L 337.8 303.6 L 337.9 305.9 L 337.7 308.3 L 337.3 310.7 L 336.4 313.2 L 335.3 315.6 L 333.8 318.0 L 332.0 320.3 L 329.8 322.4 L 327.3 324.3 L 324.6 325.9 L 321.5 327.2 L 318.1 328.2 L 314.6 328.8 L 310.8 329.0 L 306.9 328.8 L 303.0 328.0 L 299.0 326.7 L 295.0 324.9 L 291.2 322.6 L 287.5 319.7 L 284.1 316.2 L 281.0 312.3 L 278.3 307.8 L 276.1 302.8 L 274.4 297.5 L 273.4 291.7 L 273.1 285.7 L 273.4 279.4 L 274.5 273.0 L 276.5 266.6 L 279.4 260.2 L 283.1 253.9 L 287.7 248.0 L 293.2 242.4 L 299.5 237.4 L 306.7 232.9 L 314.6 229.3 L 323.3 226.5 L 332.5 224.7 L 342.2 224.0 L 352.3 224.5 L 362.7 226.2 L 373.1 229.3 L 383.5 233.8 L 393.6 239.7 L 403.3 247.0 L 412.4 255.8 L 420.7 265.9 L 427.9 277.4 L 434.0 290.1 L 438.6 304.0 L 441.7 318.8 L 443.0 334.5 L 442.4 350.8 L 439.7 367.5 L 434.9 384.4 L 427.9 401.2 L 418.5 417.7 L 406.9 433.4 L 392.9 448.2 L 376.7 461.7 L 358.3 473.6 L 337.9 483.6 L 315.6 491.3 L 291.7 496.5 L 266.5 498.9 L 240.2 498.2 L 213.2 494.2 L 185.8 486.8 L 158.6 475.7 L 132.0 461.0 L 106.3 442.4 L 82.2 420.2 L 60.2 394.2 L 40.7 364.8 L 24.3 332.1 L 11.4 296.3 L 2.6 257.8 L -1.7 217.2 L -1.0 174.7 L 4.9 131.1 L 16.4 86.9 L 33.8 42.8 L 57.2 -0.4 L 86.6 -42.1 L 122.1 -81.3 L 163.5 -117.4 L 210.6 -149.3 L 263.2 -176.4 L 300.9 -191.3"
          stroke="url(#spiralDarkGrad4)" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </div>
  </div>`;
}

function renderLayout(opts: {
  title: string;
  description: string;
  canonicalPath: string;
  activeNav: string;
  basePrefix: string;
  extraSchemas?: object[];
  bodyHtml: string;
}): string {
  const { title, description, canonicalPath, activeNav, basePrefix, extraSchemas = [], bodyHtml } = opts;
  const schemas = [buildLocalBusinessSchema(), ...extraSchemas];
  const canonicalUrl = `${SITE_CONFIG.siteUrl}${canonicalPath === '/' ? '/' : canonicalPath}`;

  const navLinks = NAV_ITEMS.map((item) => {
    const href = item.href === '/' ? `${basePrefix}/` : `${basePrefix}${item.href}/`;
    const cls = item.href === activeNav ? 'active' : '';
    return `<a href="${href}" class="${cls}">${item.label}</a>`;
  }).join('\n          ');

  const schemaTags = schemas
    .map((s) => `<script type="application/ld+json">${JSON.stringify(s)}</script>`)
    .join('\n  ');

  return `<!DOCTYPE html>
<html lang="uk">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <link rel="canonical" href="${canonicalUrl}">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="uk_UA">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:url" content="${canonicalUrl}">
  ${schemaTags}
  <style>${SHARED_CSS}</style>
</head>
<body>
  <script>document.documentElement.classList.add('js');</script>
  <header class="site-header">
    <div class="container-358 site-header__inner">
      <a href="${basePrefix}/" class="logo-link" aria-label="358: На головну сторінку">
        <span class="logo-mark">${SITE_CONFIG.brandName}</span>
        <span class="logo-sub">${SITE_CONFIG.tagline}</span>
      </a>
      <button type="button" class="mobile-menu-toggle" aria-expanded="false" aria-label="Відкрити меню навігації" onclick="toggleMobileNav(this)">
        <span class="mobile-menu-label">Меню</span>
      </button>
      <nav class="site-nav" id="siteNav" aria-label="Основна навігація">
        ${navLinks}
      </nav>
      <div class="header-contacts">
        <a href="${SITE_CONFIG.phoneHref}" class="chip-link">${SITE_CONFIG.phoneDisplay}</a>
      </div>
    </div>
  </header>

  <main>
    ${bodyHtml}
  </main>

  <footer class="section-white" style="padding: 3.25rem 0;">
    <div class="container-358" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1.5rem; color: #78716c;">
      <div>
        <div style="font-weight: 800; color: #1c1917; letter-spacing: -0.02em;">358 • дизайн та ремонт у Львові</div>
        <div class="text-small" style="margin-top: 0.35rem;">© 2026 Студія дизайну та ремонту «358» • Львів, Україна</div>
      </div>
      <div class="text-small" style="display: flex; gap: 1.25rem; flex-wrap: wrap; align-items: center;">
        <a href="${SITE_CONFIG.phoneHref}" class="text-small" style="font-weight: 600; color: #1c1917; text-decoration: none;">${SITE_CONFIG.phoneDisplay}</a>
        <a href="${SITE_CONFIG.telegramUrl}" target="_blank" rel="noopener noreferrer" class="text-small" style="color: #57534e; text-decoration: none;">Telegram</a>
        <a href="${SITE_CONFIG.viberUrl}" class="text-small" style="color: #57534e; text-decoration: none;">Viber</a>
        <a href="${SITE_CONFIG.youtubeUrl}" target="_blank" rel="noopener noreferrer" class="text-small" style="color: #57534e; text-decoration: none;">YouTube «${SITE_CONFIG.youtubeChannelName}»</a>
        <a href="${basePrefix}/shooting-companion.html" class="text-small" style="color: #78716c; text-decoration: none;">Знімальна шпаргалка 27 м²</a>
      </div>
    </div>
  </footer>

  <div class="mobile-contact-bar" aria-label="Швидкий зв'язок зі смартфона">
    <a href="${SITE_CONFIG.phoneHref}" class="primary">Дзвінок</a>
    <a href="${SITE_CONFIG.telegramUrl}" target="_blank" rel="noopener noreferrer">Telegram</a>
    <a href="${SITE_CONFIG.viberUrl}">Viber</a>
    <a href="${SITE_CONFIG.youtubeUrl}" target="_blank" rel="noopener noreferrer">YouTube</a>
  </div>

  <script>
    function toggleMobileNav(btn) {
      var nav = document.getElementById('siteNav');
      if (!nav) return;
      var isOpen = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      var label = btn.querySelector('.mobile-menu-label');
      if (label) label.textContent = isOpen ? 'Закрити' : 'Меню';
    }
    (function() {
      var items = document.querySelectorAll('[data-reveal]');
      if (!items.length) return;
      if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        items.forEach(function(el) { el.classList.add('is-in'); });
        return;
      }
      if ('IntersectionObserver' in window) {
        var io = new IntersectionObserver(function(entries) {
          entries.forEach(function(entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-in');
              entry.target.style.transform = 'translate3d(0, 0, 0)';
              entry.target.style.opacity = '1';
              io.unobserve(entry.target);
            }
          });
        }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
        items.forEach(function(el) { io.observe(el); });
      } else {
        items.forEach(function(el) { el.classList.add('is-in'); });
      }
    })();
  </script>
</body>
</html>`;
}

// 1. HOME PAGE (/)
function buildHomePage(): string {
  const bodyHtml = `
  <section style="position: relative; overflow: clip; padding: clamp(2.5rem, 5vw, 4.5rem) 0; background: #ffffff;">
    ${renderSpiralSvg()}
    <div class="container-358 hero-responsive-grid">
      <div style="position: relative; z-index: 2;">
        <h1 data-load style="--d: 40ms; margin: 0 0 1.25rem 0;">
          Дизайн інтер'єру та ремонт квартир у Львові
        </h1>
        <p data-load style="--d: 120ms; color: #292524; margin: 0 0 2rem 0; max-width: 560px;">
          Розробляємо архітектурні дизайн-проєкти та виконуємо комплексний ремонт під ключ. Робочі креслення за чинними будівельними нормами, продумана інженерія, чистове оздоблення та єдина відповідальність за кінцевий результат.
        </p>
        <div data-load style="--d: 200ms; display: flex; gap: 0.85rem; flex-wrap: wrap;">
          <a href="./portfolio/" class="btn-arch-action">
            <span>Переглянути реалізовані проєкти</span>
            <span>→</span>
          </a>
          <a href="./pricing/" class="btn-arch-secondary">
            <span>Відкритий прайс-лист</span>
          </a>
        </div>
      </div>

      <div data-load style="--d: 160ms; position: relative; z-index: 2; border-radius: 12px; overflow: hidden; background: #f5f5f4;">
        <div class="hero-crossfade">
          <img
            class="cf-1"
            src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=80"
            alt="Реалізований об'єкт студії 358 у Львові: смарт-квартира 27 м²"
          />
          <img
            class="cf-2"
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80"
            alt="Реалізований об'єкт студії 358 у Львові: ЖК Велика Британія"
          />
          <img
            class="cf-3"
            src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80"
            alt="Чистове оздоблення та інженерні вузли студії 358"
          />
        </div>
        <div style="background: #1c1917; color: #ffffff; padding: 1.15rem 1.5rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.75rem;">
          <div>
            <div style="font-weight: 600;">Смарт-квартира 27 м² та ЖК Велика Британія • 76 м²</div>
            <div class="text-small" style="color: #d6d3d1; margin-top: 0.15rem;">Флагманські кейси 358 • Львів</div>
          </div>
          <a href="./portfolio/smart-27m2-lviv/" class="text-small" style="color: #ffffff; font-weight: 600; text-decoration: underline;">Огляд та кошторис →</a>
        </div>
      </div>
    </div>
  </section>

  <section class="section-limestone">
    <div class="container-358">
      <div style="margin-bottom: 2.5rem;">
        <h2 data-reveal style="margin: 0 0 0.45rem 0;">Формати співпраці</h2>
        <p data-reveal style="--delay: 70ms; color: #57534e; margin: 0;">Можна замовити весь комплекс під ключ у Львові або залучити нас на окремий етап.</p>
      </div>
      <div class="services-clean-grid">
        ${PRICING_PACKAGES.map(
          (pkg, idx) => `
        <article class="surface-card" data-reveal style="--delay: ${idx * 80}ms;">
          <div>
            <h3 style="margin: 0 0 0.4rem 0;">${pkg.title}</h3>
            <div class="text-small" style="font-weight: 600; color: #78716c; margin-bottom: 0.85rem;">${pkg.subtitle}</div>
            <div style="height: 180px; border-radius: 8px; overflow: hidden; margin-bottom: 1.15rem;">
              <img src="${PORTFOLIO_ITEMS[idx]?.heroImage || PORTFOLIO_ITEMS[0].heroImage}" alt="${pkg.title}" style="width: 100%; height: 100%; object-fit: cover; display: block;" loading="lazy" />
            </div>
            <p style="color: #44403c; margin: 0;">${pkg.description}</p>
          </div>
          <div style="margin-top: 1.75rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
            <span style="font-weight: 700; color: #1c1917;">${pkg.priceFrom} / ${pkg.unit}</span>
            <a href=".${pkg.href}/" class="text-small" style="color: #1c1917; font-weight: 600; text-decoration: none;">Детальніше →</a>
          </div>
        </article>`
        ).join('')}
      </div>
    </div>
  </section>

  <section class="section-white">
    <div class="container-358">
      <div style="margin-bottom: 2.5rem;">
        <h2 data-reveal style="margin: 0 0 0.45rem 0;">Хто відповідає за об'єкт</h2>
        <p data-reveal style="--delay: 70ms; color: #57534e; margin: 0;">Двоє досвідчених практиків із прямим контролем якості кожного процесу.</p>
      </div>
      <div class="team-clean-grid">
        <article class="surface-card--limestone" data-reveal>
          <h3 style="margin: 0 0 0.35rem 0;">${TEAM_PROFILES.natalia.name} (${TEAM_PROFILES.natalia.age} років)</h3>
          <div class="text-small" style="font-weight: 600; color: #78716c; margin-bottom: 1rem;">${TEAM_PROFILES.natalia.role}</div>
          <p style="color: #292524; margin: 0 0 1.35rem 0;">${TEAM_PROFILES.natalia.summary}</p>
          <div class="text-small" style="display: flex; gap: 0.5rem; flex-wrap: wrap; color: #57534e;">
            ${TEAM_PROFILES.natalia.highlights.map((h) => `<span class="text-small" style="background: #ffffff; padding: 5px 12px; border-radius: 4px; font-weight: 500;">${h}</span>`).join('')}
          </div>
        </article>
        <article class="surface-card--limestone" data-reveal style="--delay: 80ms;">
          <h3 style="margin: 0 0 0.35rem 0;">${TEAM_PROFILES.vitaliy.name} (${TEAM_PROFILES.vitaliy.age} років)</h3>
          <div class="text-small" style="font-weight: 600; color: #78716c; margin-bottom: 1rem;">${TEAM_PROFILES.vitaliy.role}</div>
          <p style="color: #292524; margin: 0 0 1.35rem 0;">${TEAM_PROFILES.vitaliy.summary}</p>
          <div class="text-small" style="display: flex; gap: 0.5rem; flex-wrap: wrap; color: #57534e;">
            ${TEAM_PROFILES.vitaliy.highlights.map((h) => `<span class="text-small" style="background: #ffffff; padding: 5px 12px; border-radius: 4px; font-weight: 500;">${h}</span>`).join('')}
          </div>
        </article>
      </div>
    </div>
  </section>

  <section class="section-limestone">
    <div class="container-358">
      <div style="margin-bottom: 2.25rem; display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 1rem;">
        <div>
          <h2 data-reveal style="margin: 0 0 0.45rem 0;">Реалізовані об'єкти та проєкти</h2>
          <p data-reveal style="--delay: 70ms; color: #57534e; margin: 0;">Порівняння інженерних задумів, креслень та реального виконання на квартирах у Львові.</p>
        </div>
        <a href="./portfolio/" class="btn-arch-secondary" data-reveal>Усі об'єкти портфоліо →</a>
      </div>
      <div class="cards-2col-grid">
        ${PORTFOLIO_ITEMS.slice(0, 2)
          .map(
            (item, idx) => `
        <article class="surface-card" data-reveal style="--delay: ${idx * 80}ms;">
          <div>
            <div style="height: 240px; border-radius: 8px; overflow: hidden; margin-bottom: 1.25rem;">
              <img src="${item.heroImage}" alt="${item.title}" style="width: 100%; height: 100%; object-fit: cover; display: block;" loading="lazy" />
            </div>
            <h3 style="margin: 0 0 0.4rem 0;">${item.title}</h3>
            <div class="text-small" style="font-weight: 600; color: #78716c; margin-bottom: 0.75rem;">${item.categoryLabel} • ${item.location} • ${item.areaM2} м²</div>
            <p style="color: #44403c; margin: 0;">${item.summary}</p>
          </div>
          <div style="margin-top: 1.5rem;">
            <a href="./portfolio/${item.slug}/" class="btn-arch-action">Детальний розбір кейсу →</a>
          </div>
        </article>`
          )
          .join('')}
      </div>
    </div>
  </section>

  <section class="section-white">
    <div class="container-358">
      <div class="cards-2col-grid" style="background: #fafaf9; border-radius: 16px; padding: clamp(1.75rem, 4vw, 3rem); align-items: center;">
        <div data-reveal>
          <h2 style="margin: 0 0 0.45rem 0;">Реальний процес ремонту на об'єктах</h2>
          <div class="text-small" style="font-weight: 600; color: #dc2626; margin-bottom: 0.85rem;">YouTube-канал та блог «Розумний ремонт»</div>
          <p style="color: #44403c; margin: 0 0 1.5rem 0;">
            Корисні відеоогляди з наших об'єктів у Львові, розбір монолітних стель, 3-контурної теплої підлоги з Wi-Fi, сантехнічних вузлів та реального рукописного кошторису на 27 м².
          </p>
          <a href="./blog/" class="btn-arch-action">
            <span>Перейти до статей та відео</span>
            <span>→</span>
          </a>
        </div>
        <div data-reveal style="--delay: 90ms; border-radius: 12px; overflow: hidden; background: #1c1917;">
          <video
            autoplay
            muted
            loop
            playsinline
            poster="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=80"
            style="width: 100%; height: 260px; object-fit: cover; display: block;"
            aria-label="Відеоогляд реалізованої смарт-квартири 27 м² на каналі Розумний ремонт"
          ></video>
        </div>
      </div>
    </div>
  </section>`;

  return renderLayout({
    title: '358 — Студія дизайну інтер\'єру та ремонту квартир у Львові',
    description:
      'Розробляємо архітектурні дизайн-проєкти за ДБН та виконуємо комплексний ремонт квартир під ключ у Львові. Сімейний тандем архітектора Наталі та керівника робіт Віталія.',
    canonicalPath: '/',
    activeNav: '/',
    basePrefix: '.',
    bodyHtml,
  });
}

// 2. TURNKEY PAGE (/turnkey)
function buildTurnkeyPage(): string {
  const pkg = PRICING_PACKAGES[0];
  const bodyHtml = `
  <section class="section-white">
    <div class="container-358">
      <h1 style="font-size: clamp(1.85rem, 3.4vw, 2.65rem); font-weight: 700; color: #1c1917; margin: 0 0 1rem 0;">Комплекс «Дизайн + Ремонт під ключ» у Львові</h1>
      <p style="font-size: 1.1rem; color: #292524; max-width: 780px; margin: 0 0 2rem 0;">
        Флагманська послуга студії «358»: проєктування та повна інженерно-будівельна реалізація квартири в одній родині. Архітектор Наталя створює робочі креслення за нормами ДБН, а керівник робіт Віталій щодня веде об'єкт до фінальної здачі ключів.
      </p>
      <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
        <span style="background: #1c1917; color: #ffffff; padding: 0.75rem 1.35rem; border-radius: 6px; font-weight: 700;">Орієнтир вартості робіт: ${pkg.priceFrom} / ${pkg.unit}</span>
        <span style="background: #f5f5f4; color: #44403c; padding: 0.75rem 1.25rem; border-radius: 6px; font-weight: 600;">Локація: ${pkg.geography}</span>
      </div>
    </div>
  </section>

  <section class="section-limestone">
    <div class="container-358">
      <h2 style="font-size: 1.65rem; font-weight: 700; margin: 0 0 1.75rem 0;">Що входить у комплексний формат</h2>
      <div class="cards-2col-grid">
        <div class="surface-card">
          <h3 style="margin-top: 0;">Архітектурний дизайн-проєкт (Наталя)</h3>
          <ul style="padding-left: 1.2rem; color: #292524; margin: 0;">
            ${pkg.includes.map((inc) => `<li style="margin-bottom: 0.55rem;">${inc}</li>`).join('')}
          </ul>
        </div>
        <div class="surface-card">
          <h3 style="margin-top: 0;">Організація та контроль робіт (Віталій + майстри)</h3>
          <p style="color: #292524; margin-top: 0;">
            Віталій особисто виконує відповідальні чистові процеси (шпаклювання монолітних стель та стін, малярні та плиточні роботи) і координує перевірених вузьких майстрів на електрику, сантехніку, машинну стяжку, гіпсокартон і виготовлення корпусних меблів.
          </p>
          <a href="../portfolio/smart-27m2-lviv/" class="btn-arch-action">Подивитися приклад реалізації 27 м² →</a>
        </div>
      </div>
    </div>
  </section>`;

  return renderLayout({
    title: 'Комплекс «Дизайн + Ремонт під ключ» у Львові — Студія 358',
    description: pkg.description,
    canonicalPath: '/turnkey',
    activeNav: '/turnkey',
    basePrefix: '..',
    extraSchemas: [
      buildServiceSchema({
        name: pkg.title,
        description: pkg.description,
        areaServed: ['Львів'],
        urlPath: '/turnkey',
      }),
    ],
    bodyHtml,
  });
}

// 3. DESIGN PAGE (/design)
function buildDesignPage(): string {
  const pkg = PRICING_PACKAGES[1];
  const bodyHtml = `
  <section class="section-white">
    <div class="container-358">
      <h1 style="font-size: clamp(1.85rem, 3.4vw, 2.65rem); font-weight: 700; color: #1c1917; margin: 0 0 1rem 0;">Архітектурний дизайн інтер'єру у Львові та дистанційно по Україні</h1>
      <p style="font-size: 1.1rem; color: #292524; max-width: 780px; margin: 0 0 2rem 0;">
        Проєктування виконує Наталя (46 років, диплом магістра архітектури, понад 20 років практичного стажу). Кожне планувальне рішення та візуалізація спираються на будівельні норми (ДБН), реальні габарити інженерних вузлів та ергономіку щоденного життя.
      </p>
      <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
        <span style="background: #1c1917; color: #ffffff; padding: 0.75rem 1.35rem; border-radius: 6px; font-weight: 700;">Вартість проєкту: ${pkg.priceFrom} / ${pkg.unit}</span>
        <span style="background: #f5f5f4; color: #44403c; padding: 0.75rem 1.25rem; border-radius: 6px; font-weight: 600;">Географія: ${pkg.geography}</span>
      </div>
    </div>
  </section>

  <section class="section-limestone">
    <div class="container-358">
      <h2 style="font-size: 1.65rem; font-weight: 700; margin: 0 0 1.75rem 0;">Склад альбому робочих креслень</h2>
      <div class="cards-2col-grid">
        <div class="surface-card">
          <h3 style="margin-top: 0;">Повний пакет документації для будівельників</h3>
          <ul style="padding-left: 1.2rem; color: #292524; margin: 0;">
            ${pkg.includes.map((inc) => `<li style="margin-bottom: 0.55rem;">${inc}</li>`).join('')}
          </ul>
        </div>
        <div class="surface-card">
          <h3 style="margin-top: 0;">Дистанційна розробка проєкту по всій Україні</h3>
          <p style="color: #292524; margin-top: 0;">
            Для замовників з інших міст України працюємо за точними обмірними даними. Усі етапи — від узгодження планування та 3D-візуалізацій до видачі креслень електрики, сантехніки й меблів — проходять через структуровані відеозустрічі у зручний час.
          </p>
          <a href="../contacts/" class="btn-arch-action">Зв'язатися з архітектором →</a>
        </div>
      </div>
    </div>
  </section>`;

  return renderLayout({
    title: 'Дизайн інтер\'єру у Львові та по Україні — Архітектор Наталя • 358',
    description: pkg.description,
    canonicalPath: '/design',
    activeNav: '/design',
    basePrefix: '..',
    extraSchemas: [
      buildServiceSchema({
        name: pkg.title,
        description: pkg.description,
        areaServed: ['Львів', 'Україна'],
        urlPath: '/design',
      }),
    ],
    bodyHtml,
  });
}

// 4. RENOVATION PAGE (/renovation)
function buildRenovationPage(): string {
  const pkg = PRICING_PACKAGES[2];
  const bodyHtml = `
  <section class="section-white">
    <div class="container-358">
      <h1 style="font-size: clamp(1.85rem, 3.4vw, 2.65rem); font-weight: 700; color: #1c1917; margin: 0 0 1rem 0;">Ремонтні та оздоблювальні роботи у Львові</h1>
      <p style="font-size: 1.1rem; color: #292524; max-width: 780px; margin: 0 0 2rem 0;">
        Виконання ремонтів квартир у Львові під особистим керівництвом Віталія (46 років, понад 10 років практичного досвіду). Беремо в роботу як об'єкти за власними проєктами «358», так і якісні сторонні дизайн-проєкти.
      </p>
      <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
        <span style="background: #1c1917; color: #ffffff; padding: 0.75rem 1.35rem; border-radius: 6px; font-weight: 700;">Вартість робіт: ${pkg.priceFrom} / ${pkg.unit}</span>
        <a href="../pricing/" class="btn-arch-secondary">Переглянути пороздільний прайс за одиницю →</a>
      </div>
    </div>
  </section>

  <section class="section-limestone">
    <div class="container-358">
      <h2 style="font-size: 1.65rem; font-weight: 700; margin: 0 0 1.75rem 0;">Розподіл робіт та спеціалізація майстрів</h2>
      <div class="cards-2col-grid">
        <div class="surface-card">
          <h3 style="margin-top: 0;">Особисте виконання чистового оздоблення (Віталій)</h3>
          <p style="color: #292524;">
            Найбільш видимі фінішні процеси Віталій виконує власноруч: підготовка та шпаклювання бетонних монолітних стель (зі збереженням висоти приміщення без гіпсокартону і натяжної плівки), фінішне шпаклювання стін зі склохолстом, фарбування та плиточні роботи.
          </p>
        </div>
        <div class="surface-card">
          <h3 style="margin-top: 0;">Профільні майстри під щоденним наглядом</h3>
          <ul style="padding-left: 1.2rem; color: #292524; margin: 0;">
            ${TEAM_PROFILES.partners.map((p) => `<li style="margin-bottom: 0.5rem;"><strong>${p.trade}:</strong> ${p.description}</li>`).join('')}
          </ul>
        </div>
      </div>
    </div>
  </section>`;

  return renderLayout({
    title: 'Ремонтні роботи у Львові за готовим проєктом — Керівник Віталій • 358',
    description: pkg.description,
    canonicalPath: '/renovation',
    activeNav: '/renovation',
    basePrefix: '..',
    extraSchemas: [
      buildServiceSchema({
        name: pkg.title,
        description: pkg.description,
        areaServed: ['Львів'],
        urlPath: '/renovation',
      }),
    ],
    bodyHtml,
  });
}

// 5. PORTFOLIO INDEX (/portfolio)
function buildPortfolioIndexPage(): string {
  const cardsHtml = PORTFOLIO_ITEMS.map(
    (item) => `
      <article class="surface-card portfolio-card" data-category="${item.category}">
        <div>
          <div style="height: 250px; border-radius: 8px; overflow: hidden; margin-bottom: 1.25rem;">
            <img src="${item.heroImage}" alt="${item.title}" style="width: 100%; height: 100%; object-fit: cover; display: block;" />
          </div>
          <h2 style="font-size: 1.3rem; font-weight: 700; color: #1c1917; margin: 0 0 0.35rem 0;">${item.title}</h2>
          <div style="font-size: 0.88rem; font-weight: 600; color: #78716c; margin-bottom: 0.55rem;">${item.categoryLabel} • ${item.location} • ${item.areaM2} м²</div>
          <p style="font-size: 0.96rem; color: #44403c; margin: 0 0 1rem 0;">${item.summary}</p>
        </div>
        <div>
          <a href="./${item.slug}/" class="btn-arch-action">Відкрити огляд та деталі →</a>
        </div>
      </article>`
  ).join('');

  const bodyHtml = `
  <section class="section-white">
    <div class="container-358">
      <h1 style="font-size: clamp(1.85rem, 3.4vw, 2.65rem); font-weight: 700; color: #1c1917; margin: 0 0 0.85rem 0;">Портфоліо об'єктів та проєктів</h1>
      <p style="font-size: 1.08rem; color: #292524; max-width: 760px; margin: 0 0 2rem 0;">
        Реалізовані квартири під ключ у Львові, об'єкти на етапі чистового оздоблення та розроблені дизайн-проєкти з робочими кресленнями за ДБН.
      </p>

      <div class="filter-bar" role="region" aria-label="Фільтр портфоліо">
        <button type="button" class="filter-btn active" onclick="filterPortfolio('all', this)">Усі об'єкти</button>
        <button type="button" class="filter-btn" onclick="filterPortfolio('turnkey', this)">Комплекс під ключ</button>
        <button type="button" class="filter-btn" onclick="filterPortfolio('design', this)">Дизайн-проєкти</button>
        <button type="button" class="filter-btn" onclick="filterPortfolio('renovation', this)">Ремонтні роботи</button>
      </div>

      <div id="portfolioGrid" class="cards-2col-grid">
        ${cardsHtml}
      </div>

      <div id="portfolioEmpty" style="display: none; background: #fafaf9; padding: 2.5rem; border-radius: 12px; text-align: center;">
        <p style="font-size: 1.05rem; color: #44403c; margin: 0 0 1rem 0;">За цим запитом позицій не знайдено.</p>
        <button type="button" class="btn-arch-secondary" onclick="filterPortfolio('all', document.querySelector('.filter-btn'))">Скинути фільтр</button>
      </div>
    </div>
  </section>
  <script>
    function filterPortfolio(cat, btn) {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      if (btn) btn.classList.add('active');
      let visible = 0;
      document.querySelectorAll('.portfolio-card').forEach(card => {
        const match = cat === 'all' || card.getAttribute('data-category') === cat;
        card.style.display = match ? 'flex' : 'none';
        if (match) visible++;
      });
      document.getElementById('portfolioEmpty').style.display = visible === 0 ? 'block' : 'none';
    }
  </script>`;

  return renderLayout({
    title: 'Портфоліо реалізованих об\'єктів та дизайн-проєктів — Студія 358 • Львів',
    description:
      'Реалізовані ремонти квартир під ключ у Львові та архітектурні дизайн-проєкти від студії 358. Кейс власної смарт-квартири 27 м², ЖК Велика Британія, ЖК Avalon.',
    canonicalPath: '/portfolio',
    activeNav: '/portfolio',
    basePrefix: '..',
    bodyHtml,
  });
}

// 5b. PORTFOLIO DETAIL (/portfolio/[slug])
function buildPortfolioDetailPage(item: (typeof PORTFOLIO_ITEMS)[number]): string {
  const budgetHtml = item.budgetSummary
    ? `
  <section class="section-limestone">
    <div class="container-358">
      <h2 style="font-size: 1.65rem; font-weight: 700; margin: 0 0 0.75rem 0;">Зведена таблиця витрат із рукописного блокнота (27 м²)</h2>
      <p style="color: #44403c; margin: 0 0 1.5rem 0;">
        Купівля на стадії котловану: <strong>${item.budgetSummary.purchase2020Usd}</strong> • Ринкова ціна без ремонту: <strong>${item.budgetSummary.rawMarket2026Usd}</strong> • Оцінка з цим ремонтом: <strong>${item.budgetSummary.renovatedMarket2026Usd}</strong> • Оренда в будинку: <strong>${item.budgetSummary.monthlyRentUsd}</strong>.
      </p>
      <div class="price-table-wrap">
        <table class="arch-table">
          <thead>
            <tr>
              <th>Категорія витрат</th>
              <th>Позиції з блокнота (грн)</th>
              <th>Сума</th>
            </tr>
          </thead>
          <tbody>
            ${item.budgetSummary.rows
              .map(
                (r) => `
            <tr>
              <td><strong>${r.category}</strong></td>
              <td>${r.items}</td>
              <td><strong>${r.amount}</strong></td>
            </tr>`
              )
              .join('')}
            <tr>
              <td><strong>РАЗОМ витрачено грошима («з кишені»)</strong></td>
              <td>Усі матеріали, меблі, техніка + робота зі стяжки, меблів та плитки</td>
              <td><strong>${item.budgetSummary.totalUah} (${item.budgetSummary.totalUsd})</strong></td>
            </tr>
            <tr>
              <td><strong>Власна праця тандему «358»</strong></td>
              <td>Сантехніка, тепла підлога у 3 контури, електрика, шпаклівка та фарбування монолітної стелі й стін, монтаж</td>
              <td><strong>еквівалент ${item.budgetSummary.laborUsd}</strong></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>`
    : '';

  const bodyHtml = `
  <section class="section-white">
    <div class="container-358">
      <div style="margin-bottom: 1.25rem;">
        <a href="../" style="color: #57534e; text-decoration: none; font-weight: 600; font-size: 0.9rem;">← Назад до всіх об'єктів портфоліо</a>
      </div>
      <h1 style="font-size: clamp(1.75rem, 3.2vw, 2.5rem); font-weight: 700; color: #1c1917; margin: 0 0 0.5rem 0;">${item.title}</h1>
      <div style="font-size: 0.88rem; font-weight: 600; color: #78716c; margin-bottom: 1rem;">${item.categoryLabel} • ${item.location} • ${item.areaM2} м² • ${item.year}</div>
      <p style="font-size: 1.08rem; color: #292524; max-width: 820px; margin: 0 0 2rem 0;">${item.summary}</p>

      <div style="border-radius: 12px; overflow: hidden; max-height: 460px; margin-bottom: 2.25rem;">
        <img src="${item.heroImage}" alt="${item.title}" style="width: 100%; height: 100%; object-fit: cover; display: block;" />
      </div>

      <h2 style="font-size: 1.45rem; font-weight: 700; margin: 0 0 1rem 0;">Ключові інженерні та архітектурні рішення</h2>
      <ul style="padding-left: 1.25rem; color: #292524; margin: 0 0 2.5rem 0;">
        ${item.highlights.map((h) => `<li style="margin-bottom: 0.55rem; font-size: 1.02rem;">${h}</li>`).join('')}
      </ul>

      <div class="cards-2col-grid">
        ${item.sections
          .map(
            (s) => `
        <div class="surface-card--limestone">
          <h3 style="margin-top: 0; font-size: 1.22rem;">${s.heading}</h3>
          <p style="margin-bottom: 0; color: #292524;">${s.body}</p>
        </div>`
          )
          .join('')}
      </div>
    </div>
  </section>
  ${budgetHtml}`;

  return renderLayout({
    title: `${item.title} — Портфоліо 358`,
    description: item.summary,
    canonicalPath: `/portfolio/${item.slug}`,
    activeNav: '/portfolio',
    basePrefix: '../..',
    bodyHtml,
  });
}

// 6. PRICING PAGE (/pricing)
function buildPricingPage(): string {
  const bodyHtml = `
  <section class="section-white">
    <div class="container-358">
      <h1 style="font-size: clamp(1.85rem, 3.4vw, 2.65rem); font-weight: 700; color: #1c1917; margin: 0 0 0.85rem 0;">Ціни та відкритий прайс-лист робіт</h1>
      <p style="font-size: 1.08rem; color: #292524; max-width: 780px; margin: 0 0 2.25rem 0;">
        Прозорі базові тарифи за квадратний метр та структурований прайс за одиницю робіт у Львові. Жодних прихованих платежів — розрахунок ведеться за фактично виконаними етапами.
      </p>

      <div class="services-clean-grid" style="margin-bottom: 3rem;">
        ${PRICING_PACKAGES.map(
          (pkg) => `
        <article class="surface-card--limestone">
          <div>
            <h2 style="font-size: 1.35rem; font-weight: 700; margin: 0 0 0.35rem 0;">${pkg.title}</h2>
            <div style="font-size: 0.88rem; font-weight: 600; color: #78716c; margin-bottom: 0.5rem;">${pkg.subtitle}</div>
            <div style="font-size: 1.45rem; font-weight: 800; color: #1c1917; margin-bottom: 1rem;">${pkg.priceFrom} / ${pkg.unit}</div>
            <p style="font-size: 0.95rem; color: #44403c; margin: 0 0 1.25rem 0;">${pkg.description}</p>
          </div>
          <a href="..${pkg.href}/" class="btn-arch-secondary">Детальніше про пакет →</a>
        </article>`
        ).join('')}
      </div>
    </div>
  </section>

  <section class="section-limestone">
    <div class="container-358">
      <h2 style="font-size: 1.65rem; font-weight: 700; margin: 0 0 0.65rem 0;">Прайс-лист за одиницю робіт у Львові</h2>
      <p style="color: #57534e; margin: 0 0 1.5rem 0;">Оберіть категорію або введіть назву роботи (наприклад: монолітна стеля, керамограніт, тепла підлога, бойлер).</p>

      <div class="filter-bar">
        ${PRICE_CATEGORIES.map(
          (cat, i) =>
            `<button type="button" class="filter-btn ${i === 0 ? 'active' : ''}" data-cat="${cat.id}" onclick="setPriceCategory('${cat.id}', this)">${cat.label}</button>`
        ).join('')}
        <input
          type="search"
          id="priceSearchInput"
          class="search-input"
          placeholder="Пошук по роботах (напр. керамограніт)..."
          aria-label="Пошук роботи у прайс-листі"
          oninput="applyPriceFilter()"
        />
      </div>

      <div class="price-table-wrap" id="priceTableContainer">
        <table class="arch-table">
          <thead>
            <tr>
              <th>Вид робіт</th>
              <th>Категорія</th>
              <th>Од. вим.</th>
              <th>Вартість</th>
            </tr>
          </thead>
          <tbody id="priceTableBody">
            ${UNIT_PRICE_ITEMS.map(
              (item) => `
            <tr class="price-row" data-category="${item.category}" data-search="${(item.name + ' ' + item.categoryLabel + ' ' + (item.note || '')).toLowerCase()}">
              <td>
                <strong>${item.name}</strong>
                ${item.note ? `<div style="font-size: 0.82rem; color: #78716c; margin-top: 0.2rem;">${item.note}</div>` : ''}
              </td>
              <td>${item.categoryLabel}</td>
              <td>${item.unit}</td>
              <td><strong>${item.price}</strong></td>
            </tr>`
            ).join('')}
          </tbody>
        </table>
      </div>

      <div id="priceEmptyState" style="display: none; background: #ffffff; padding: 2.5rem; border-radius: 12px; text-align: center; margin-top: 1rem;">
        <p style="font-size: 1.05rem; color: #44403c; margin: 0 0 1rem 0;">За цим запитом позицій не знайдено.</p>
        <button type="button" class="btn-arch-secondary" onclick="resetPriceFilter()">Скинути фільтр</button>
      </div>
    </div>
  </section>

  <script>
    let currentPriceCat = 'all';
    function setPriceCategory(cat, btn) {
      currentPriceCat = cat;
      document.querySelectorAll('[data-cat]').forEach(b => b.classList.remove('active'));
      if (btn) btn.classList.add('active');
      applyPriceFilter();
    }
    function applyPriceFilter() {
      const q = (document.getElementById('priceSearchInput').value || '').trim().toLowerCase();
      let visible = 0;
      document.querySelectorAll('.price-row').forEach(row => {
        const catMatch = currentPriceCat === 'all' || row.getAttribute('data-category') === currentPriceCat;
        const searchMatch = !q || (row.getAttribute('data-search') || '').includes(q);
        const show = catMatch && searchMatch;
        row.style.display = show ? '' : 'none';
        if (show) visible++;
      });
      document.getElementById('priceTableContainer').style.display = visible === 0 ? 'none' : 'block';
      document.getElementById('priceEmptyState').style.display = visible === 0 ? 'block' : 'none';
    }
    function resetPriceFilter() {
      document.getElementById('priceSearchInput').value = '';
      setPriceCategory('all', document.querySelector('[data-cat="all"]'));
    }
  </script>`;

  return renderLayout({
    title: 'Ціни на дизайн інтер\'єру та ремонт квартир у Львові — Прайс-лист 358',
    description:
      'Відкритий прайс-лист студії 358 у Львові: базові пакети за м² (Комплекс під ключ, Дизайн-проєкт, Ремонтні роботи) та розцінки за одиницю робіт із пошуком і фільтрацією.',
    canonicalPath: '/pricing',
    activeNav: '/pricing',
    basePrefix: '..',
    bodyHtml,
  });
}

// 7. ABOUT PAGE (/about)
function buildAboutPage(): string {
  const bodyHtml = `
  <section class="section-white">
    <div class="container-358">
      <h1 style="font-size: clamp(1.85rem, 3.4vw, 2.65rem); font-weight: 700; color: #1c1917; margin: 0 0 1rem 0;">Про сімейний тандем «358» та пропорції золотого перерізу</h1>
      <p style="font-size: 1.08rem; color: #292524; max-width: 820px; margin: 0 0 2.5rem 0;">
        Назва компанії «358» походить із послідовності чисел Фібоначчі та пропорцій золотого перерізу (3 : 5 : 8). Для нас це символ математичної точності в архітектурних кресленнях та гармонії в інженерно-будівельній реалізації.
      </p>

      <div class="team-clean-grid">
        <article class="surface-card--limestone">
          <h2 style="font-size: 1.45rem; font-weight: 700; margin: 0 0 0.35rem 0;">${TEAM_PROFILES.natalia.name} (${TEAM_PROFILES.natalia.age} років)</h2>
          <div style="font-size: 0.92rem; font-weight: 600; color: #78716c; margin-bottom: 1rem;">${TEAM_PROFILES.natalia.role} • ${TEAM_PROFILES.natalia.degree}</div>
          <p style="color: #292524; margin: 0 0 1.25rem 0;">${TEAM_PROFILES.natalia.summary}</p>
          <p style="color: #44403c; margin: 0; font-size: 0.95rem;">
            Понад 20 років практичного стажу в проєктуванні житлових інтер'єрів дозволяють уникати рішень, які гарно виглядають на картинці, але незручні в житті або неможливі в монтажі.
          </p>
        </article>

        <article class="surface-card--limestone">
          <h2 style="font-size: 1.45rem; font-weight: 700; margin: 0 0 0.35rem 0;">${TEAM_PROFILES.vitaliy.name} (${TEAM_PROFILES.vitaliy.age} років)</h2>
          <div style="font-size: 0.92rem; font-weight: 600; color: #78716c; margin-bottom: 1rem;">${TEAM_PROFILES.vitaliy.role} • понад ${TEAM_PROFILES.vitaliy.experienceYears} років досвіду</div>
          <p style="color: #292524; margin: 0 0 1.25rem 0;">${TEAM_PROFILES.vitaliy.summary}</p>
          <p style="color: #44403c; margin: 0; font-size: 0.95rem;">
            Спеціалізація Віталія — особисте ведення об'єкта у Львові та власноручне виконання чистових етапів: підготовка й шпаклювання монолітних стель і стін, малярні та плиточні роботи.
          </p>
        </article>
      </div>
    </div>
  </section>

  <section class="section-limestone">
    <div class="container-358">
      <h2 style="font-size: 1.65rem; font-weight: 700; margin: 0 0 1.5rem 0;">Команда перевірених майстрів на суміжні інженерні процеси</h2>
      <div class="services-clean-grid">
        ${TEAM_PROFILES.partners
          .map(
            (p) => `
        <div class="surface-card">
          <h3 style="margin: 0 0 0.5rem 0; font-size: 1.15rem;">${p.trade}</h3>
          <p style="margin: 0; color: #44403c; font-size: 0.95rem;">${p.description}</p>
        </div>`
          )
          .join('')}
      </div>
    </div>
  </section>`;

  return renderLayout({
    title: 'Про нас — Сімейний тандем архітектора Наталі та будівельника Віталія • 358',
    description:
      'Історія та принципи студії 358 у Львові: Наталя (46 років, магістр архітектури, 20+ років стажу) та Віталій (46 років, 10+ років практичного досвіду у ремонтах). Пропорції золотого перерізу 3:5:8.',
    canonicalPath: '/about',
    activeNav: '/about',
    basePrefix: '..',
    bodyHtml,
  });
}

// 8. BLOG INDEX (/blog)
function buildBlogIndexPage(): string {
  const postsHtml = BLOG_ITEMS.map(
    (post) => `
      <article class="surface-card">
        <div>
          <div style="height: 230px; border-radius: 8px; overflow: hidden; margin-bottom: 1.15rem;">
            <img src="${post.heroImage}" alt="${post.title}" style="width: 100%; height: 100%; object-fit: cover; display: block;" />
          </div>
          <h2 style="font-size: 1.28rem; font-weight: 700; color: #1c1917; margin: 0 0 0.35rem 0;">${post.title}</h2>
          <div style="font-size: 0.88rem; font-weight: 600; color: #dc2626; margin-bottom: 0.55rem;">${post.category} • ${post.readingTime}</div>
          <p style="font-size: 0.96rem; color: #44403c; margin: 0 0 1.25rem 0;">${post.excerpt}</p>
        </div>
        <div>
          <a href="./${post.slug}/" class="btn-arch-action">Читати статтю та дивитися розбір →</a>
        </div>
      </article>`
  ).join('');

  const bodyHtml = `
  <section class="section-white">
    <div class="container-358">
      <h1 style="font-size: clamp(1.85rem, 3.4vw, 2.65rem); font-weight: 700; color: #1c1917; margin: 0 0 0.45rem 0;">Блог та відеоогляди реальних об'єктів</h1>
      <div style="font-size: 0.9rem; font-weight: 700; color: #dc2626; margin-bottom: 0.85rem;">YouTube-рубрика «${SITE_CONFIG.youtubeChannelName}»</div>
      <p style="font-size: 1.08rem; color: #292524; max-width: 780px; margin: 0 0 2.25rem 0;">
        Ділимося практичним досвідом із будівельних майданчиків у Львові: інженерні вузли, підготовка монолітних стель без втрати висоти, планування смарт-квартир та розбір реальних витрат за блокнотом.
      </p>

      <div class="cards-2col-grid">
        ${postsHtml}
      </div>
    </div>
  </section>`;

  return renderLayout({
    title: 'Блог та відео «Розумний ремонт» — Практичні огляди об\'єктів • 358',
    description:
      'Статті та відеоогляди YouTube-каналу «Розумний ремонт» від Віталія та Наталі: розбір смарт-квартири 27 м², приймання новобудов у Львові, підготовка монолітних стель і стін.',
    canonicalPath: '/blog',
    activeNav: '/blog',
    basePrefix: '..',
    bodyHtml,
  });
}

// 8b. BLOG DETAIL (/blog/[slug])
function buildBlogDetailPage(post: (typeof BLOG_ITEMS)[number]): string {
  const videoSchema = buildVideoSchema({
    videoId: post.youtubeId,
    title: post.title,
    description: post.excerpt,
    uploadDate: post.publishedAt,
  });

  const bodyHtml = `
  <section class="section-white">
    <div class="container-358" style="max-width: 1040px;">
      <div style="margin-bottom: 1.25rem;">
        <a href="../" style="color: #57534e; text-decoration: none; font-weight: 600; font-size: 0.9rem;">← Усі статті та випуски «Розумний ремонт»</a>
      </div>
      <h1 style="font-size: clamp(1.7rem, 3.2vw, 2.4rem); font-weight: 700; color: #1c1917; margin: 0 0 0.5rem 0;">${post.title}</h1>
      <div style="font-size: 0.88rem; font-weight: 600; color: #dc2626; margin-bottom: 1rem;">${post.category} • ${post.publishedAt} • ${post.readingTime}</div>
      <p style="font-size: 1.08rem; color: #292524; margin: 0 0 2rem 0;">${post.excerpt}</p>

      <div class="lite-yt-card" style="margin-bottom: 2.25rem;">
        <img src="${post.heroImage}" alt="${post.title}" class="lite-yt-poster" />
        <div class="lite-yt-overlay">
          <div>
            <div style="font-size: 0.82rem; color: #a8a29e;">Відеовипуск на YouTube-каналі «${SITE_CONFIG.youtubeChannelName}»</div>
            <div style="font-size: 1.05rem; font-weight: 600;">${post.title}</div>
          </div>
          <a href="${SITE_CONFIG.youtubeUrl}" target="_blank" rel="noopener noreferrer" class="btn-arch-secondary">Дивитися на YouTube →</a>
        </div>
      </div>

      <div class="surface-card--limestone" style="margin-bottom: 2.25rem;">
        <h2 style="font-size: 1.3rem; margin: 0 0 0.85rem 0;">Головні тези випуску</h2>
        <ul style="padding-left: 1.25rem; margin: 0; color: #292524;">
          ${post.summaryPoints.map((pt) => `<li style="margin-bottom: 0.5rem;">${pt}</li>`).join('')}
        </ul>
      </div>

      ${post.sections
        .map(
          (s) => `
      <div style="margin-bottom: 2rem;">
        <h2 style="font-size: 1.4rem; font-weight: 700; color: #1c1917; margin: 0 0 0.65rem 0;">${s.heading}</h2>
        <p style="font-size: 1.02rem; color: #292524; margin: 0;">${s.body}</p>
      </div>`
        )
        .join('')}
    </div>
  </section>`;

  return renderLayout({
    title: `${post.title} — Розумний ремонт • 358`,
    description: post.excerpt,
    canonicalPath: `/blog/${post.slug}`,
    activeNav: '/blog',
    basePrefix: '../..',
    extraSchemas: [videoSchema],
    bodyHtml,
  });
}

// 9. CONTACTS PAGE (/contacts)
function buildContactsPage(): string {
  const bodyHtml = `
  <section class="section-white">
    <div class="container-358">
      <h1 style="font-size: clamp(1.85rem, 3.4vw, 2.65rem); font-weight: 700; color: #1c1917; margin: 0 0 1rem 0;">Контакти та прямий зв'язок</h1>
      <p style="font-size: 1.08rem; color: #292524; max-width: 760px; margin: 0 0 2.5rem 0;">
        Працюємо без кол-центрів та нав'язливих форм: зателефонуйте або напишіть нам у зручний месенджер, щоб обговорити вашу квартиру у Львові чи дистанційний дизайн-проєкт.
      </p>

      <div class="cards-2col-grid">
        <div class="surface-card--limestone">
          <h2 style="margin-top: 0; font-size: 1.35rem;">Прямі канали зв'язку з Наталею та Віталієм</h2>
          <p style="font-size: 1.35rem; font-weight: 800; margin: 0.5rem 0 1.25rem 0;">
            <a href="${SITE_CONFIG.phoneHref}" style="color: #1c1917; text-decoration: none;">${SITE_CONFIG.phoneDisplay}</a>
          </p>
          <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
            <a href="${SITE_CONFIG.phoneHref}" class="btn-arch-action">Зателефонувати напряму</a>
            <a href="${SITE_CONFIG.telegramUrl}" target="_blank" rel="noopener noreferrer" class="btn-arch-secondary">Написати в Telegram</a>
            <a href="${SITE_CONFIG.viberUrl}" class="btn-arch-secondary">Написати у Viber</a>
            <a href="${SITE_CONFIG.youtubeUrl}" target="_blank" rel="noopener noreferrer" class="btn-arch-secondary">YouTube «${SITE_CONFIG.youtubeChannelName}»</a>
          </div>
        </div>

        <div class="surface-card--limestone">
          <h2 style="margin-top: 0; font-size: 1.35rem;">Географія виконання робіт</h2>
          <p style="color: #292524; margin: 0 0 0.85rem 0;">
            <strong>Комплексний ремонт під ключ та оздоблювальні роботи:</strong> ${SITE_CONFIG.renovationGeography}.
          </p>
          <p style="color: #292524; margin: 0;">
            <strong>Розробка архітектурних дизайн-проєктів (креслення за ДБН + 3D):</strong> ${SITE_CONFIG.designGeography}.
          </p>
        </div>
      </div>
    </div>
  </section>`;

  return renderLayout({
    title: 'Контакти студії «358» у Львові — Телефон, Telegram, Viber, YouTube',
    description:
      'Прямий зв\'язок із Наталею та Віталієм (студія дизайну та ремонту 358, м. Львів). Телефон, Telegram, Viber та YouTube-канал «Розумний ремонт».',
    canonicalPath: '/contacts',
    activeNav: '/contacts',
    basePrefix: '..',
    bodyHtml,
  });
}

function buildSitemapXml(): string {
  const routes = [
    '/',
    '/turnkey/',
    '/design/',
    '/renovation/',
    '/portfolio/',
    ...PORTFOLIO_ITEMS.map((i) => `/portfolio/${i.slug}/`),
    '/pricing/',
    '/about/',
    '/blog/',
    ...BLOG_ITEMS.map((b) => `/blog/${b.slug}/`),
    '/contacts/',
  ];
  const urls = routes
    .map(
      (r) => `  <url>
    <loc>${SITE_CONFIG.siteUrl}${r}</loc>
    <lastmod>2026-11-03</lastmod>
  </url>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

function writeOutputFile(relPath: string, content: string) {
  // Write to dist/ (for automated build verification tests)
  const distFile = path.resolve('dist', relPath);
  fs.mkdirSync(path.dirname(distFile), { recursive: true });
  fs.writeFileSync(distFile, content, 'utf-8');

  // Also write directly to repository root so GitHub Pages serves it out-of-the-box from main branch!
  const rootFile = path.resolve(relPath);
  fs.mkdirSync(path.dirname(rootFile), { recursive: true });
  fs.writeFileSync(rootFile, content, 'utf-8');
}

function runBuild() {
  writeOutputFile('index.html', buildHomePage());
  writeOutputFile('turnkey/index.html', buildTurnkeyPage());
  writeOutputFile('design/index.html', buildDesignPage());
  writeOutputFile('renovation/index.html', buildRenovationPage());
  writeOutputFile('portfolio/index.html', buildPortfolioIndexPage());
  for (const item of PORTFOLIO_ITEMS) {
    writeOutputFile(`portfolio/${item.slug}/index.html`, buildPortfolioDetailPage(item));
  }
  writeOutputFile('pricing/index.html', buildPricingPage());
  writeOutputFile('about/index.html', buildAboutPage());
  writeOutputFile('blog/index.html', buildBlogIndexPage());
  for (const post of BLOG_ITEMS) {
    writeOutputFile(`blog/${post.slug}/index.html`, buildBlogDetailPage(post));
  }
  writeOutputFile('contacts/index.html', buildContactsPage());
  writeOutputFile('sitemap-index.xml', buildSitemapXml());
  writeOutputFile('robots.txt', fs.readFileSync(path.resolve('public/robots.txt'), 'utf-8'));
  writeOutputFile('.nojekyll', '');

  // Copy shooting companion to root and dist so it is also easily accessible on phone
  const companionSrc = path.resolve('docs/youtube-scripts/smart-27m2-shooting-companion.html');
  if (fs.existsSync(companionSrc)) {
    writeOutputFile('shooting-companion.html', fs.readFileSync(companionSrc, 'utf-8'));
  }

  console.log('Built all 9 core routes, portfolio cases, blog articles, and sitemap-index.xml');
}

runBuild();

