import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NotFound.css';

const NotFound: React.FC = () => {
  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <h1 className="not-found-title">404</h1>
        <h2 className="not-found-subtitle">Page Not Found</h2>
        <p className="not-found-message">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <div className="not-found-actions">
          <Link to="/" className="btn btn-primary">Go to Homepage</Link>
          <Link to="/support" className="btn btn-secondary">Contact Support</Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound; 