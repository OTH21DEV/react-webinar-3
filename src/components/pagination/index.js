import React, { useState } from "react";
import List from "../list";
import "./style.css";

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
  const pages = [];
  for (let i = 1; i <= Math.ceil(list.length / itemsPerPage); i++) {
    pages.push(i);
  }

  //items in a single page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = list.slice(indexOfFirstItem, indexOfLastItem);

  const createPages = () => {
    const arrayOfPages = [];
    if (pages.length <= 3) {
      for (let i = 0; i < pages.length; i++) {
        arrayOfPages.push(i);
      }
    } else {
      if (currentPage <= 2) {
        arrayOfPages.push(1, 2, 3, "...", pages.length);
      } else if (currentPage === 3) {
        arrayOfPages.push(1, 2, 3, 4, "...", pages.length);
      } else if (currentPage >= pages.length - 1) {
        arrayOfPages.push(1, "...", pages.length - 2, pages.length - 1, pages.length);
      } else if (currentPage === pages.length - 2) {
        arrayOfPages.push(1, "...", pages.length - 3, pages.length - 2, pages.length - 1, pages.length);
      } else {
        arrayOfPages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", pages.length);
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

export default React.memo(Pagination);
