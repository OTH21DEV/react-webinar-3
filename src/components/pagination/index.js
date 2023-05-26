import React, { useState } from "react";
import List from "../list";
import propTypes from "prop-types";
import "./style.css";

/**
 * Display pagination
 * @param {Array} list array of all items
 * @param {Function} renderItem function to render the items
 * @returns {HTMLElement}
 */
function Pagination({ list, renderItem }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, settemsPerPage] = useState(10);
  const [click, setClick] = useState(true);

  //function for click the numbers
  const handleclick = (e) => {
    if (e.target.id !== "...") {
      setCurrentPage(+e.target.id);
    }
  };

  const disaibleEllipsis = (e) => {
    setClick(false);
    e.preventDefault();
    e.stopPropagation();
  };

  //set the number of pages regarding list length
  const numberOfPages = Math.ceil(list.length / itemsPerPage);

  //items in a single page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = list.slice(indexOfFirstItem, indexOfLastItem);

  //Create the array of pages
  const createPages = () => {
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
      <List list={currentItems} renderItem={renderItem} />
      <ul className="pageNumbers">
        {createPages().map((number, index) => {
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
};
export default React.memo(Pagination);
