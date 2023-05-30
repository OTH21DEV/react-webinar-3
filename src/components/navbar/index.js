import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./style.css";

/**
 * Display navbar
 * @param {Array} links array of links
 * @returns
 */
function Navbar({ links }) {
  return (
    <nav style={{ display: "flex" }}>
      <ul className="navbar-list">
        {links.map((link, index) => {
          return (
            <li key={index}>
              <Link to={link.to} className="navbar-link">
                {link.content}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

Navbar.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.oneOfType([PropTypes.string]),
      content: PropTypes.oneOfType([PropTypes.string]),
    })
  ).isRequired,
};

export default React.memo(Navbar);
