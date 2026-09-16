import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { SearchBar } from '../components/SearchBar';
import { TopicCard } from '../components/TopicCard';
import { CategoryNav } from '../components/CategoryNav';
import { topics } from '../data/topics';
import { searchTopics, SEARCH_SUGGESTIONS } from '../utils/search';
import type { Category } from '../types';

export function Home() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<Category | 'All'>('All');

  const counts = useMemo(() => {
    const c: Record<string, number> = { All: topics.length };
    for (const t of topics) {
      c[t.category] = (c[t.category] ?? 0) + 1;
    }
    return c;
  }, []);

  const filtered = useMemo(() => {
    const base = query.trim() ? searchTopics(topics, query) : topics;
    if (category === 'All') return base;
    return base.filter((t) => t.category === category);
  }, [query, category]);

  const showEmpty = query.trim().length > 0 && filtered.length === 0;

  return (
    <div className="home">
      <section className="hero">
        <p className="hero-kicker">50 essential topics · Simple English · India-friendly</p>
        <h1>
          Financial engineering concepts
          <span className="hero-highlight"> made simple</span>
        </h1>
        <p className="hero-sub">
          For young people, homemakers, salary earners, and first-time entrepreneurs.
          Search like Google—learn without jargon.
        </p>
        <SearchBar value={query} onChange={setQuery} large autoFocus />
        <div className="suggestion-row" aria-label="Suggested searches">
          {SEARCH_SUGGESTIONS.map((s) => (
            <button
              key={s}
              type="button"
              className="suggestion-chip"
              onClick={() => setQuery(s)}
            >
              {s}
            </button>
          ))}
        </div>
      </section>

      <section className="home-browse" aria-labelledby="browse-heading">
        <div className="section-head">
          <h2 id="browse-heading">
            {query.trim()
              ? `${filtered.length} result${filtered.length === 1 ? '' : 's'}`
              : 'Browse by category'}
          </h2>
          <Link to="/topics" className="text-link">
            View all 50 →
          </Link>
        </div>

        <CategoryNav active={category} onSelect={setCategory} counts={counts} />

        {showEmpty ? (
          <div className="empty-state" role="status">
            <p className="empty-title">No topics matched “{query.trim()}”</p>
            <p className="empty-body">
              Try a simpler word, or pick a suggestion below. Every topic uses everyday
              language—SIP, inflation, budgeting, credit score, and more.
            </p>
            <div className="suggestion-row">
              {SEARCH_SUGGESTIONS.slice(0, 6).map((s) => (
                <button
                  key={s}
                  type="button"
                  className="suggestion-chip"
                  onClick={() => setQuery(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="topic-grid">
            {filtered.map((topic) => (
              <TopicCard key={topic.id} topic={topic} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
