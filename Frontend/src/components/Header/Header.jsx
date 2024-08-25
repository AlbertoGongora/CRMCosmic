import { ProfileNav } from '../ProfileNav/ProfileNav.jsx';
import './Header.css';

export const Header = ({ title }) => {
  return (
    <header className="header-container">
      <h1 className="header-title-pages">{title}</h1>
      <div className="header-icons">

      </div>
        <ProfileNav />
    </header>
  );
};
