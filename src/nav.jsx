import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css'; // Import your custom CSS file for styling

export default function Nav() {
  return (
    <div className="navbar">
      <ul className="nav-links">
        <li>
          <Link to="/" className="nav-link">
            IMAGE
          </Link>
        </li>
        <li>
          <Link to="/form" className="nav-link">
            FORM
          </Link>
        </li>
        <li>
          <Link to="/json" className="nav-link">
            JSON
          </Link>
        </li>
      </ul>
    </div>
  );
}
