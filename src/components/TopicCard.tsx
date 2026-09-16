import { Link } from 'react-router-dom';
import type { Topic } from '../types';

interface TopicCardProps {
  topic: Topic;
}

export function TopicCard({ topic }: TopicCardProps) {
  return (
    <Link to={`/topic/${topic.slug}`} className="topic-card">
      <div className="topic-card-top">
        <span className="topic-card-icon" aria-hidden="true">
          {topic.icon}
        </span>
        <span className="topic-card-num">#{topic.number}</span>
      </div>
      <h3 className="topic-card-title">{topic.title}</h3>
      <p className="topic-card-blurb">{topic.shortBlurb}</p>
      <span className="topic-card-cat">{topic.category}</span>
    </Link>
  );
}
