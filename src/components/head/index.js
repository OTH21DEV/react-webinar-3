import React from "react";
import PropTypes from "prop-types";
import "./style.css";

/**
 * Display Head
 * @param {String} props.title head title
 * @param {Boolean} props.modalShow modal state
 * @param {Function} props.setModalShow set modal state
 * @returns {HTMLElement}
 */
function Head({ title, modalShow, setModalShow }) {
  return (
    <div className="Head">
      <h1>{title}</h1>
      {modalShow ? (
        <div>
          <button
            onClick={() => {
              setModalShow(false);
            }}
          >
            Закрыть
          </button>
        </div>
      ) : null}
    </div>
  );
}

Head.propTypes = { 
  title: PropTypes.string.isRequired,
  modalShow: PropTypes.bool,
  setModalShow: PropTypes.func,
};

export default React.memo(Head);
