# FinEngine

**Financial engineering concepts made simple for everyday life and business.**

A single-file financial education search engine: **50** topics in simple English for young people, homemakers, salary earners, and first-time entrepreneurs (India-friendly examples where natural: SIP, FD, ₹, CIBIL).

Built by **PNCDNC AI Team**.

> Educational content only — not personalized financial advice.

## Run (no build step)

Open the file in a browser:

```bash
open index.html          # macOS
xdg-open index.html      # Linux
start index.html         # Windows
```

Or serve the folder statically:

```bash
python3 -m http.server 8080
# then visit http://localhost:8080
```

That’s it. Everything—HTML, CSS, JavaScript, and all topic data—lives in **`index.html`**.

## Features

- Instant client-side search (title, keywords, blurb, full body)
- Category browse and topic cards
- Hash-based detail views (`#/`, `#/topics`, `#/topic/<slug>`)
- Seven sections per topic: What it is · Why it matters · Day-to-day · In business · Entrepreneur tip · For entrepreneurs · Stock market angle
- Footer on every view: **PNCDNC AI Team** + educational disclaimer
- Calm UI: blues, white, soft yellow accents
- **Golden ratio (φ ≈ 1.618) layout** for spacing, type scale, search width, card gaps, and content/sidebar split

## Repo layout

```
index.html   # the entire app
README.md
.gitignore
```

## Disclaimer

FinEngine is for **education**. It does not provide personalized financial, tax, or investment advice. Verify with official sources or a registered advisor before acting.

---

**PNCDNC AI Team**
