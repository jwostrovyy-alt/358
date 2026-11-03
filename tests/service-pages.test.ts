import { describe, it, expect } from 'vitest';
import fs from 'node:fs';

describe('Home and Service pages source verification', () => {
  it('creates index, turnkey, design, and renovation Astro pages', () => {
    expect(fs.existsSync('src/pages/index.astro')).toBe(true);
    expect(fs.existsSync('src/pages/turnkey.astro')).toBe(true);
    expect(fs.existsSync('src/pages/design.astro')).toBe(true);
    expect(fs.existsSync('src/pages/renovation.astro')).toBe(true);
  });
});

