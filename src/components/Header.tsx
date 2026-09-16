import { Link, NavLink } from 'react-router-dom';

export function Header() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link to="/" className="logo" aria-label="FinEngine home">
          <span className="logo-mark" aria-hidden="true">
            ₹
          </span>
          <span className="logo-text">
            <span className="logo-name">FinEngine</span>
            <span className="logo-tag">Learn money, calmly</span>
          </span>
        </Link>
        <nav className="header-nav" aria-label="Primary">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/topics">All topics</NavLink>
        </nav>
      </div>
    </header>
  );
}
