import React from "react";
import "./style.css";
import PropTypes from "prop-types";


/**
 * Dispaly Modal
 * @param {*} children HTML elements
 * @returns {HTMLElement}
 */
function Modal({ children }) {
 
  return (
    <div className="Modal-overlay">
      <div className="Modal">{children}</div>
    </div>
  );
}

Modal.propTypes = {
  children: PropTypes.node,
};
export default React.memo(Modal);
