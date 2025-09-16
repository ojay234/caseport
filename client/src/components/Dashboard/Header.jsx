import React from 'react';
import './Header.css';

const Header = ({ onStartNewFiling }) => {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="welcome-title">Welcome User </h1>
        <div className="header-actions">
          <button className="btn-secondary">View Drafts</button>
          <button className="btn-primary" onClick={onStartNewFiling}>Start New Filing</button>
        </div>
      </div>
    </header>
  );
};

export default Header;