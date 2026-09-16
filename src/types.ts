export type Category =
  | 'Basics & Money'
  | 'Banking & Credit'
  | 'Personal Finance'
  | 'Investing Basics'
  | 'Markets & Analysis'
  | 'Assets & Alternatives'
  | 'Strategy & Mindset';

export interface Topic {
  id: string;
  number: number;
  title: string;
  slug: string;
  category: Category;
  keywords: string[];
  shortBlurb: string;
  icon: string;
  whatItIs: string;
  whyItMatters: string;
  dayToDay: string;
  inBusiness: string;
  entrepreneurTip: string;
  forEntrepreneurs: string;
  stockMarketAngle: string;
  relatedSlugs: string[];
}

export const CATEGORIES: Category[] = [
  'Basics & Money',
  'Banking & Credit',
  'Personal Finance',
  'Investing Basics',
  'Markets & Analysis',
  'Assets & Alternatives',
  'Strategy & Mindset',
];
