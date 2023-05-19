import React from "react";
import Head from "../head";
import List from "../list";
import { calculateTotal } from "../../utils";
import { numberWithSpace } from "../../utils";
import "./style.css";
import PropTypes from "prop-types";

/**
 * Display modal
 * @param {String} props.title title
 * @param {Array} props.list array of items in shopping list
 * @param {String} props.btnName btn name
 * @param {Function} props.onDeleteItem callback func
 * @param {Function} props.onSelectItem callback func
 * @param {Boolean} props.modalShow state of modal
 * @param {Function} props.setModalShow set modal state
 * @returns {HTMLElement}
 */
function Modal({ title, list, btnName, onDeleteItem, onSelectItem, modalShow, setModalShow }) {
  const total = calculateTotal(list);

  return (
    <div className="Modal-overlay">
      <div className="Modal">
        <Head title={title} modalShow={modalShow} setModalShow={setModalShow}></Head>
        <List list={list} btnName={btnName} onDeleteItem={onDeleteItem} onSelectItem={onSelectItem} modalShow={modalShow} setModalShow={setModalShow} />
        <div className="Modal-total">
          <p>Итого</p>
          <p>
            {numberWithSpace(total.totalPrice)} <span>&#8381;</span>
          </p>
        </div>
      </div>
    </div>
  );
}
Modal.propTypes = {
  title: PropTypes.string.isRequired,
  list: PropTypes.array.isRequired,
  btnName: PropTypes.string.isRequired,
  onDeleteItem: PropTypes.func.isRequired,
  onSelectItem: PropTypes.func.isRequired,
  modalShow: PropTypes.bool.isRequired,
  setModalShow: PropTypes.func.isRequired,
};
export default React.memo(Modal);
