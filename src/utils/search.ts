import type { Topic } from '../types';

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9₹\s]/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function tokenize(query: string): string[] {
  return normalize(query)
    .split(' ')
    .filter((t) => t.length > 0);
}

/** Simple fuzzy: token matches if included, or levenshtein-ish prefix / 1-char slip for longer tokens */
function tokenMatches(haystack: string, token: string): boolean {
  if (!token) return true;
  if (haystack.includes(token)) return true;
  if (token.length >= 4) {
    const words = haystack.split(' ');
    for (const w of words) {
      if (w.startsWith(token) || token.startsWith(w)) return true;
      if (w.length >= 4 && editDistance(w.slice(0, token.length + 1), token) <= 1) return true;
    }
  }
  return false;
}

function editDistance(a: string, b: string): number {
  if (Math.abs(a.length - b.length) > 1) return 99;
  const m = a.length;
  const n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
    }
  }
  return dp[m][n];
}

function topicBlob(topic: Topic): string {
  return normalize(
    [
      topic.title,
      topic.shortBlurb,
      topic.category,
      ...topic.keywords,
      topic.whatItIs,
      topic.whyItMatters,
      topic.dayToDay,
      topic.inBusiness,
      topic.entrepreneurTip,
      topic.forEntrepreneurs,
      topic.stockMarketAngle,
    ].join(' '),
  );
}

function scoreTopic(topic: Topic, tokens: string[]): number {
  if (tokens.length === 0) return 0;
  const title = normalize(topic.title);
  const keywords = normalize(topic.keywords.join(' '));
  const blurb = normalize(topic.shortBlurb);
  const body = topicBlob(topic);

  let score = 0;
  for (const token of tokens) {
    let matched = false;
    if (title.includes(token)) {
      score += 50;
      matched = true;
    } else if (tokenMatches(title, token)) {
      score += 35;
      matched = true;
    }
    if (keywords.includes(token) || tokenMatches(keywords, token)) {
      score += 25;
      matched = true;
    }
    if (blurb.includes(token) || tokenMatches(blurb, token)) {
      score += 15;
      matched = true;
    }
    if (body.includes(token) || tokenMatches(body, token)) {
      score += 5;
      matched = true;
    }
    if (!matched) return -1;
  }
  // slight boost for earlier topics matching phrase order in title
  if (tokens.every((t) => title.includes(t))) score += 20;
  return score;
}

export function searchTopics(topics: Topic[], query: string): Topic[] {
  const tokens = tokenize(query);
  if (tokens.length === 0) return [];

  return topics
    .map((topic) => ({ topic, score: scoreTopic(topic, tokens) }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || a.topic.number - b.topic.number)
    .map((x) => x.topic);
}

export const SEARCH_SUGGESTIONS = [
  'SIP',
  'inflation',
  'credit score',
  'mutual funds',
  'emergency fund',
  'compounding',
  'budgeting',
  'P/E ratio',
  'good debt',
  'index funds',
];
