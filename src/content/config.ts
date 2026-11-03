export interface PortfolioEntry {
  slug: string;
  title: string;
  location: string;
  areaM2: number;
  category: 'turnkey' | 'design' | 'renovation';
  categoryLabel: string;
  year: string;
  heroImage: string;
  summary: string;
  youtubeId?: string;
  highlights: string[];
  budgetSummary?: {
    totalUah: string;
    totalUsd: string;
    laborUsd: string;
    purchase2020Usd: string;
    rawMarket2026Usd: string;
    renovatedMarket2026Usd: string;
    monthlyRentUsd: string;
    rows: Array<{ category: string; items: string; amount: string }>;
  };
  sections: Array<{ heading: string; body: string }>;
}

export interface BlogEntry {
  slug: string;
  title: string;
  publishedAt: string;
  readingTime: string;
  category: string;
  youtubeId: string;
  heroImage: string;
  excerpt: string;
  summaryPoints: string[];
  sections: Array<{ heading: string; body: string }>;
}

