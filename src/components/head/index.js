import React from "react";
import PropTypes from "prop-types";
import "./style.css";

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
  title: PropTypes.node,
};

export default React.memo(Head);
