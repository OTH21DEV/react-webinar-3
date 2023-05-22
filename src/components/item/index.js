import React from "react";
import { numberWithSpace } from "../../utils";
import "./style.css";
import PropTypes from "prop-types";

/**
 * Display item
 * @param {Object} props item information
 * @param {Boolean} props.item.selected show if selected
 * @param {Number} props.item.code item code
 * @param {String} props.item.title item title
 * @param {Number} props.item.price item price
 * @param {Boolean} props.modalShow modal state
 * @param {Number} props.item.count item quantity in shopping list
 * @param {Function} props.onDeleteItem callback func
 * @returns {HTMLElement}
 */
function Item(props) {

  const callbacks = {
    onClick: () => {
      props.onSelect(props.item.code);
    },
    onDelete: (e) => {
      e.stopPropagation();
      props.onDelete(props.item.code);
    },
  };

  return (
    <div className={"Item" + (props.item.selected ? " Item_selected" : "")} onClick={callbacks.onClick}>
      <div className="Item-code">{props.item.code}</div>
      <div className="Item-title">{props.item.title}</div>
      <div className="Item-price">
        {numberWithSpace(props.item.price)}
        <span>&#8381;</span>
      </div>
      {props.modalShow ? <div className="Item-quantity">{props.item.count}шт</div> : null}
      <div className="Item-actions">
        <button onClick={callbacks.onDelete}>{props.btnName}</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    selected: PropTypes.bool,
    count: PropTypes.number,
  }),
  onDelete: PropTypes.func,
  onSelect: PropTypes.func,
};

Item.defaultProps = {
  onDelete: () => {},
  onSelect: () => {},
};

export default React.memo(Item);
