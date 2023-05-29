import { memo } from "react";
import { cn as bem } from "@bem-react/classname";
import { numberFormat } from "../../utils";
import { Link } from "react-router-dom";
import "./style.css";
import PropTypes from "prop-types";

/**
 *Display Item
 * @param {Object} props items
 * @param {String} props.item._id items id
 * @param {String} props.item.title items title
 * @param {String} props.item.price items price
 * @returns {HTMLElement}
 */
function Item(props) {
  const cn = bem("Item");

  const callbacks = {
    onAdd: (e) => props.onAdd(props.item._id),
  };

  return (
    <div className={cn()}>
      <Link className={cn("title")} to={`articles/${props.item._id}`}>
        <div>{props.item.title}</div>
      </Link>
      <div className={cn("actions")}>
        <div className={cn("price")}>{numberFormat(props.item.price)} ₽</div>
        <button onClick={callbacks.onAdd}>{props.dictionary}</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  onAdd: PropTypes.func,
};

Item.defaultProps = {
  onAdd: () => {},
};

export default memo(Item);
