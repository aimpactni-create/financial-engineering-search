import { useId } from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
  large?: boolean;
  autoFocus?: boolean;
  placeholder?: string;
}

export function SearchBar({
  value,
  onChange,
  onSubmit,
  large = false,
  autoFocus = false,
  placeholder = 'Search financial concepts… e.g. SIP, inflation, credit score',
}: SearchBarProps) {
  const id = useId();

  return (
    <form
      className={`search-bar ${large ? 'search-bar--large' : ''}`}
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.();
      }}
    >
      <label htmlFor={id} className="sr-only">
        Search topics
      </label>
      <span className="search-icon" aria-hidden="true">
        ⌕
      </span>
      <input
        id={id}
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        autoComplete="off"
        spellCheck={false}
        enterKeyHint="search"
      />
      {value ? (
        <button
          type="button"
          className="search-clear"
          onClick={() => onChange('')}
          aria-label="Clear search"
        >
          ×
        </button>
      ) : null}
    </form>
  );
}
