import { describe, it, expect } from 'vitest';
import { PRICING_PACKAGES, UNIT_PRICE_ITEMS, filterPriceItems } from '../src/data/pricing.ts';

describe('Pricing packages and unit price filtering', () => {
  it('defines per-m2 packages for turnkey, design, and renovation without full estimate tables', () => {
    expect(PRICING_PACKAGES.map((p) => p.id)).toEqual(['turnkey', 'design', 'renovation']);
    for (const pkg of PRICING_PACKAGES) {
      expect(pkg.unit).toBe('м²');
    }
  });

  it('filters unit work items by category and search query including empty-result handling', () => {
    const tiling = filterPriceItems(UNIT_PRICE_ITEMS, 'tiling', '');
    expect(tiling.length).toBeGreaterThan(0);

    const searchMatch = filterPriceItems(UNIT_PRICE_ITEMS, 'all', 'керамограніт');
    expect(searchMatch.length).toBeGreaterThan(0);

    const emptyMatch = filterPriceItems(UNIT_PRICE_ITEMS, 'all', 'неіснуюча-робота-999');
    expect(emptyMatch).toEqual([]);
  });
});

