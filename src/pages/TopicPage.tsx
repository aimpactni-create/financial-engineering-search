import { Link, useParams } from 'react-router-dom';
import { topicsBySlug, getRelatedTopics } from '../data/topics';
import { ContentSection } from '../components/ContentSection';
import { TopicCard } from '../components/TopicCard';

export function TopicPage() {
  const { slug } = useParams<{ slug: string }>();
  const topic = slug ? topicsBySlug[slug] : undefined;

  if (!topic) {
    return (
      <div className="empty-state page-narrow">
        <p className="empty-title">Topic not found</p>
        <p className="empty-body">That link may be mistyped. Browse the full library instead.</p>
        <Link to="/topics" className="btn-primary">
          All topics
        </Link>
      </div>
    );
  }

  const related = getRelatedTopics(topic);

  return (
    <article className="topic-detail">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <span aria-hidden="true">/</span>
        <Link to="/topics">Topics</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{topic.title}</span>
      </nav>

      <header className="topic-hero">
        <div className="topic-hero-meta">
          <span className="topic-card-icon" aria-hidden="true">
            {topic.icon}
          </span>
          <span className="pill">#{topic.number}</span>
          <span className="pill pill--soft">{topic.category}</span>
        </div>
        <h1>{topic.title}</h1>
        <p className="topic-lead">{topic.shortBlurb}</p>
        <ul className="keyword-list" aria-label="Keywords">
          {topic.keywords.map((k) => (
            <li key={k}>{k}</li>
          ))}
        </ul>
      </header>

      <div className="topic-body">
        <ContentSection title="What it is">{topic.whatItIs}</ContentSection>
        <ContentSection title="Why it matters">{topic.whyItMatters}</ContentSection>
        <ContentSection title="Day-to-day life">{topic.dayToDay}</ContentSection>
        <ContentSection title="In business & side hustles">{topic.inBusiness}</ContentSection>
        <ContentSection title="Entrepreneur tip" accent>
          {topic.entrepreneurTip}
        </ContentSection>
        <ContentSection title="For entrepreneurs">{topic.forEntrepreneurs}</ContentSection>
        <ContentSection title="Stock market angle">{topic.stockMarketAngle}</ContentSection>
      </div>

      {related.length > 0 ? (
        <section className="related-block" aria-labelledby="related-heading">
          <h2 id="related-heading">Related topics</h2>
          <div className="topic-grid topic-grid--compact">
            {related.map((t) => (
              <TopicCard key={t.id} topic={t} />
            ))}
          </div>
        </section>
      ) : null}

      <div className="topic-nav-links">
        <Link to="/topics">← All topics</Link>
        <Link to="/">Search again</Link>
      </div>
    </article>
  );
}
