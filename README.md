# FinEngine

**Financial engineering concepts made simple for everyday life and business.**

A polished Vite + React + TypeScript single-page app: a calm, Google-like search engine for **50** financial education topics. Written in simple English for young people, laypersons, homemakers, salary earners, and first-time entrepreneurs—with India-relevant examples (SIP, FD, ₹, CIBIL) where natural.

Built by **PNCDNC AI Team**.

> Educational content only — not personalized financial advice.

## Features

- Instant client-side search (title, keywords, blurb, full body) with light fuzzy matching
- Category browse: Basics & Money, Banking & Credit, Personal Finance, Investing Basics, Markets & Analysis, Assets & Alternatives, Strategy & Mindset
- Topic detail pages with seven labeled sections each:
  - What it is · Why it matters · Day-to-day · In business · Entrepreneur tip · For entrepreneurs · Stock market angle
- Related topics, empty-state suggestions, mobile-first accessible UI
- Calm palette: blues, white, soft yellow accents

## Quick start

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

## Production build

```bash
npm install
npm run build
npm run preview
```

Static output lands in `dist/` — deploy that folder to any static host (Netlify, Vercel, GitHub Pages, Hostinger, S3, etc.).

## Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Local development server |
| `npm run build`   | Typecheck + production build |
| `npm run preview` | Preview the production build |
| `npm run lint`    | Run oxlint               |

## Project layout

```
src/
  data/topics.ts      # All 50 topics (full content)
  pages/              # Home, Topics list, Topic detail, 404
  components/         # Layout, Header, Footer, Search, Cards…
  utils/search.ts     # Client-side search
  types.ts
```

## Disclaimer

FinEngine is for **education**. It does not provide personalized financial, tax, or investment advice. Laws, tax rules, and products change—verify with official sources or a registered advisor before acting.

---

**PNCDNC AI Team**
