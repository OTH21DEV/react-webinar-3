import React from "react";
import List from "../list";
import { numberWithSpace } from "../../utils";
import "./style.css";
import PropTypes from "prop-types";

/**
 * Display total sum in shopping list
 * @param {Array} list array of items in shopping list
 * @param {Number} total price of all items in shopping list
 * @param {String} btnName btn name
 * @param {Function} onDeleteItem callback func
 * @param {Boolean} modalShow state of modal
 * @param {Function} setModalShow set modal state
 * @returns {HTMLElement}
 */
function TotalSum({ list, total, btnName, onDeleteItem, modalShow, setModalShow }) {
  return (
    <>
      {list.length ? (
        <div className="Total-sum-container">
          <List list={list} btnName={btnName} onDeleteItem={onDeleteItem} modalShow={modalShow} setModalShow={setModalShow} />
          <div className="Total-sum">
            <p>Итого</p>
            <p>
              {numberWithSpace(total)} <span>&#8381;</span>
            </p>
          </div>
        </div>
      ) : (
        <p className="Total-sum__empty">Корзина пуста</p>
      )}
    </>
  );
}

TotalSum.propTypes = {
  list: PropTypes.array.isRequired,
  total: PropTypes.number.isRequired,
  btnName: PropTypes.string.isRequired,
  onDeleteItem: PropTypes.func.isRequired,
  modalShow: PropTypes.bool.isRequired,
  setModalShow: PropTypes.func.isRequired,
};
export default React.memo(TotalSum);
