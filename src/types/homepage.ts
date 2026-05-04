/** Typed interfaces for src/data/homepage.json sections */

export interface S1Section {
  id: 'S1';
  name: string;
  eyebrow: string;
  headline: string;
  subheadline: string;
  cta_primary: string;
  cta_secondary: string;
}

export interface S2Section {
  id: 'S2';
  name: string;
  eyebrow: string;
  statement: string;
}

export interface SolutionItem {
  title: string;
  description: string;
  tags: string[];
  cta: string;
  href: string;
}

export interface S3Section {
  id: 'S3';
  name: string;
  eyebrow: string;
  headline: string;
  subheadline: string;
  coming_soon_label: string;
  solutions: SolutionItem[];
}

export interface S4Section {
  id: 'S4';
  name: string;
  eyebrow: string;
  headline: string;
  body: string;
  chain_label: string;
  crystal_badge: string;
  chain_note: string;
  chain: string[];
}

export interface S5Section {
  id: 'S5';
  name: string;
  eyebrow: string;
  headline: string;
  subheadline: string;
  body: string;
  cta: string;
  clients: string[];
}

export interface S6Section {
  id: 'S6';
  name: string;
  eyebrow: string;
  headline: string;
  industries: string[];
}

export interface CaseStudy {
  category: string;
  industry: string;
  title: string;
  details: string[];
  link?: string;
}

export interface S7Section {
  id: 'S7';
  name: string;
  eyebrow: string;
  headline: string;
  view_label: string;
  cases: CaseStudy[];
  cta: string;
}

export interface WhyPoint {
  stat: string;
  title: string;
  description: string;
}

export interface S8Section {
  id: 'S8';
  name: string;
  eyebrow: string;
  headline: string;
  body: string;
  est_label: string;
  points: WhyPoint[];
  quote: { text: string; attribution: string };
}

export interface S9Section {
  id: 'S9';
  name: string;
  label: string;
  certifications: string[];
}

export interface S10Section {
  id: 'S10';
  name: string;
  eyebrow: string;
  headline: string;
  body: string;
  cta_primary: string;
  cta_secondary: string;
}

export interface S11Section {
  id: 'S11';
  name: string;
  eyebrow: string;
  headline: string;
  body: string;
  cta: string;
}
