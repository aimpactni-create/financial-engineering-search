import { useMemo, useState } from 'react';
import { SearchBar } from '../components/SearchBar';
import { TopicCard } from '../components/TopicCard';
import { CategoryNav } from '../components/CategoryNav';
import { topics } from '../data/topics';
import { searchTopics, SEARCH_SUGGESTIONS } from '../utils/search';
import type { Category } from '../types';

export function TopicsPage() {
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

  return (
    <div className="topics-page">
      <header className="page-header">
        <h1>All 50 topics</h1>
        <p>Complete FinEngine library—search or filter by category.</p>
        <SearchBar value={query} onChange={setQuery} />
      </header>

      <CategoryNav active={category} onSelect={setCategory} counts={counts} />

      {filtered.length === 0 ? (
        <div className="empty-state" role="status">
          <p className="empty-title">No matches</p>
          <p className="empty-body">Try another keyword, or clear filters.</p>
          <div className="suggestion-row">
            {SEARCH_SUGGESTIONS.map((s) => (
              <button
                key={s}
                type="button"
                className="suggestion-chip"
                onClick={() => {
                  setQuery(s);
                  setCategory('All');
                }}
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
    </div>
  );
}
