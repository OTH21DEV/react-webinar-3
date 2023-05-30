import { memo} from "react";
import propTypes from "prop-types";
import { numberFormat } from "../../utils";
import { cn as bem } from "@bem-react/classname";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./style.css";

/**
 * Display item in the basket
 * @param {Object} props contains item in the basket and function onRemove
 * @param {Object} props.item contains all items details
 * @param {String} props.item._id contains item id
 * @param {String} props.item.title contains item title
 * @param {Number} props.item.price contains item price
 * @param {Number} props.item.amount contains item amount
 * @returns {HTMLElement}
 */
function ItemBasket(props) {
  const cn = bem("ItemBasket");

  const callbacks = {
    onRemove: (e) => props.onRemove(props.item._id),
    closeModal: () => props.onClose(),
    openItem: () => props.openItem(props.item._id),
  };

  function handleClick() {
    callbacks.closeModal();
    callbacks.openItem();
  }

  return (
    <div className={cn()}>
      <Link className={cn("title")} to={props.to} onClick={handleClick}>
        {props.item.title}
      </Link>
      <div className={cn("right")}>
        <div className={cn("cell")}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn("cell")}>{numberFormat(props.item.amount || 0)} шт</div>
        <div className={cn("cell")}>
          <button onClick={callbacks.onRemove}>Удалить</button>
        </div>
      </div>
    </div>
  );
}

ItemBasket.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
    amount: PropTypes.number,
  }).isRequired,
  onRemove: propTypes.func,
};

ItemBasket.defaultProps = {
  onRemove: () => {},
};

export default memo(ItemBasket);
