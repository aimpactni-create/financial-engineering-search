import { CATEGORIES, type Category } from '../types';

interface CategoryNavProps {
  active: Category | 'All';
  onSelect: (cat: Category | 'All') => void;
  counts: Record<string, number>;
}

export function CategoryNav({ active, onSelect, counts }: CategoryNavProps) {
  const items: Array<Category | 'All'> = ['All', ...CATEGORIES];

  return (
    <div className="category-nav" role="tablist" aria-label="Categories">
      {items.map((cat) => {
        const selected = active === cat;
        const count = cat === 'All' ? counts.All : counts[cat] ?? 0;
        return (
          <button
            key={cat}
            type="button"
            role="tab"
            aria-selected={selected}
            className={`category-chip ${selected ? 'is-active' : ''}`}
            onClick={() => onSelect(cat)}
          >
            {cat}
            <span className="category-count">{count}</span>
          </button>
        );
      })}
    </div>
  );
}
