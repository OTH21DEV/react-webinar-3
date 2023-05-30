import React, { useState } from "react";
import List from "../list";
import propTypes from "prop-types";
import "./style.css";

/**
 * Display pagination
 * @param {Array} list array of all items
 * @param {Function}  renderItem function to render the items
 * @param {Number}  count number of total pages (542)
 * @param {Number}  itemsPerPage number of items per page (10)
 * @param {Function}  setPage function to set the number of current page
 * @param {Function}  setItems function to display the items on current page (from API)
 * @param {Number}  currentPage number of current page (default 1)
 * @returns {HTMLElement}
 *
 */
function Pagination({ list, renderItem, count, itemsPerPage, setPage, setItems, currentPage }) {
  const [click, setClick] = useState(true);

  const callbacks = {
    setCurrentPage: (page) => setPage(page),
    setItems: (limit, skip) => setItems(limit, skip),
  };

  //function for click the numbers
  const handleclick = (e) => {
    if (e.target.id !== "...") {
      callbacks.setCurrentPage(+e.target.id);
      let skip = itemsPerPage * (+e.target.id - 1);
      callbacks.setItems(itemsPerPage, skip);
    }
  };

  const disaibleEllipsis = (e) => {
    setClick(false);
    e.preventDefault();
    e.stopPropagation();
  };

  //set the number of pages regarding list length

  const numberOfPages = Math.ceil(count / itemsPerPage);

  //Create the array of pages
  const createPages = (currentPage) => {
    const arrayOfPages = [];
    if (numberOfPages <= 3) {
      for (let i = 0; i < numberOfPages; i++) {
        arrayOfPages.push(i);
      }
    } else {
      if (currentPage <= 2) {
        arrayOfPages.push(1, 2, 3, "...", numberOfPages);
      } else if (currentPage === 3) {
        arrayOfPages.push(1, 2, 3, 4, "...", numberOfPages);
      } else if (currentPage >= numberOfPages - 1) {
        arrayOfPages.push(1, "...", numberOfPages - 2, numberOfPages - 1, numberOfPages);
      } else if (currentPage === numberOfPages - 2) {
        arrayOfPages.push(1, "...", numberOfPages - 3, numberOfPages - 2, numberOfPages - 1, numberOfPages);
      } else {
        arrayOfPages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", numberOfPages);
      }
    }
    return arrayOfPages;
  };

  return (
    <>
      <List list={list} renderItem={renderItem} />
      <ul className="pageNumbers">
        {createPages(currentPage).map((number, index) => {
          return (
            <li key={index} id={number} onClick={click ? (e) => handleclick(e) : disaibleEllipsis(e)} className={currentPage == number ? "active" : null}>
              {number}
            </li>
          );
        })}
      </ul>
    </>
  );
}

Pagination.prototype = {
  list: propTypes.array.isRequired,
  renderItem: propTypes.func.isRequired,
  count: propTypes.number.isRequired,
  itemsPerPage: propTypes.number.isRequired,
  setPage: propTypes.func.isRequired,
  setItems: propTypes.func.isRequired,
  currentPage: propTypes.number.isRequired,
};
export default React.memo(Pagination);
