import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <div className="empty-state page-narrow">
      <p className="empty-title">Page not found</p>
      <p className="empty-body">The page you asked for does not exist in FinEngine.</p>
      <Link to="/" className="btn-primary">
        Go home
      </Link>
    </div>
  );
}
