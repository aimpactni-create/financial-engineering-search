interface ContentSectionProps {
  title: string;
  children: string;
  accent?: boolean;
}

/** Renders topic body text; supports paragraphs separated by blank lines and bullet lines starting with • */
export function ContentSection({ title, children, accent = false }: ContentSectionProps) {
  const blocks = children
    .split(/\n\n+/)
    .map((b) => b.trim())
    .filter(Boolean);

  return (
    <section className={`content-section ${accent ? 'content-section--accent' : ''}`}>
      <h2>{title}</h2>
      {blocks.map((block, i) => {
        const lines = block.split('\n').map((l) => l.trim()).filter(Boolean);
        const isList = lines.every((l) => l.startsWith('•') || l.startsWith('-') || l.startsWith('*'));
        if (isList) {
          return (
            <ul key={i}>
              {lines.map((l, j) => (
                <li key={j}>{l.replace(/^[•\-*]\s*/, '')}</li>
              ))}
            </ul>
          );
        }
        return <p key={i}>{block.replace(/\n/g, ' ')}</p>;
      })}
    </section>
  );
}
