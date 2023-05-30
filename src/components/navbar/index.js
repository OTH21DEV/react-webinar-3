import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./style.css";

/**
 * Display navbar
 * @param {Array} links array of links
 * @returns
 */
function Navbar({ links, setItems, currentPage, setPage, itemsPerPage }) {
  console.log(currentPage);
  //test

  const callbacks = {
    setCurrentPage: (page) => setPage(page),
    setItems: (limit, skip) => setItems(limit, skip),
  };

  //return on the first page when we click to page number > 1
  const handleclick = () => {
    if (currentPage > 1) {
      callbacks.setCurrentPage(1);
      // let skip = itemsPerPage * (+e.target.id - 1);
      // callbacks.setItems(itemsPerPage, skip);
      callbacks.setItems(itemsPerPage, 0);
    }
  };

  return (
    <nav style={{ display: "flex" }}>
      <ul className="navbar-list">
        {links.map((link, index) => {
          return (
            <li key={index}>
              <Link to={link.to} className="navbar-link" onClick={() => (currentPage ? handleclick() : null)}>
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
