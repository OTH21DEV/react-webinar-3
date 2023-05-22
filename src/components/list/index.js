import React from "react";
import Item from "../item";
import { generateCode } from "../../utils";
import "./style.css";
import PropTypes from "prop-types";

/**
 * Display list
 * @param {Array} props.list array of items
 * @param {String} props.btnName btn name
 * @param {Function} props.onDeleteItem callback func
 * @param {Function} props.onSelectItem callback func
 * @param {Boolean} props.modalShow state of modal
 * @param {Function} props.setModalShow set modal state
 * @returns {HTMLElement}
 */
function List({ list, onDeleteItem, onSelectItem, btnName, modalShow, setModalShow }) {
  return (
    <div className="List">
      {list.map((item) => (
        <div key={generateCode()} className="List-item">
          <Item list={list} item={item} onDelete={onDeleteItem} onSelect={onSelectItem} btnName={btnName} modalShow={modalShow} setModalShow={setModalShow} />
        </div>
      ))}
    </div>
  );
}

List.propTypes = {
  list: PropTypes.array.isRequired,
  btnName: PropTypes.string.isRequired,
  onDeleteItem: PropTypes.func.isRequired,
  onSelectItem: PropTypes.func,
  modalShow: PropTypes.bool,
  setModalShow: PropTypes.func.isRequired,
};

export default React.memo(List);
