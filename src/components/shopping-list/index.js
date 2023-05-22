import React from "react";
import Head from "../head";
import TotalSum from "../total-sum";
import PropTypes from "prop-types";

/**
 * Display shopping list
 * @param {String} title title
 * @param {Array} list array of items in shopping list
 * @param {Number} total price of all items in shopping list
 * @param {String} btnName btn name
 * @param {Function} onDeleteItem callback func
 * @param {Boolean} modalShow state of modal
 * @param {Function} setModalShow set modal state
 * @returns {HTMLElement}
 */
function ShoppingList({ title, list, total, btnName, onDeleteItem, modalShow, setModalShow }) {
  return (
    <>
      <Head title={title} modalShow={modalShow} setModalShow={setModalShow}></Head>
      <TotalSum list={list} total={total} btnName={btnName} onDeleteItem={onDeleteItem} modalShow={modalShow} setModalShow={setModalShow}></TotalSum>
    </>
  );
}

ShoppingList.propTypes = {
  title: PropTypes.string.isRequired,
  list: PropTypes.array.isRequired,
  total: PropTypes.number.isRequired,
  btnName: PropTypes.string.isRequired,
  onDeleteItem: PropTypes.func.isRequired,
  modalShow: PropTypes.bool.isRequired,
  setModalShow: PropTypes.func.isRequired,
};

export default React.memo(ShoppingList);
