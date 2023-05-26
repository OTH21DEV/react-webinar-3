import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { numberFormat, plural } from "../../utils";
import "./style.css";

/**
 * Display basket information
 * @param {Number} sum total price of items
 * @param {Number} amount price of items
 * @param {onOpen} func func to open the basket
 * @returns {HTMLElement}
 */
function BasketTool({ sum, amount, onOpen }) {
  const cn = bem("BasketTool");
  return (
    <div className={cn()}>
      <span className={cn("label")}>В корзине:</span>
      <span className={cn("total")}>{amount ? `${amount} ${plural(amount, { one: "товар", few: "товара", many: "товаров" })} / ${numberFormat(sum)} ₽` : `пусто`}</span>
      <button onClick={onOpen}>Перейти</button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0,
};

export default memo(BasketTool);
