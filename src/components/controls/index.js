import React from "react";
import { numberWithSpace } from "../../utils";
import { plural } from "../../utils";
import { calculateTotal } from "../../utils";
import "./style.css";
import PropTypes from "prop-types";

/**
 * Display Controls
 * @param {Array} shoppingList array of items in shopping list
 * @param {Function} setModalShow set modal state
 * @returns {HTMLElement}
 */
function Controls({ shoppingList, setModalShow }) {
  let total = calculateTotal(shoppingList);
  let locale;
  let variants;

  return (
    <div className="Controls">
      <div>
        {!total.totalQuantity ? (
          <p>
            {`В корзине:`} <span>{`пусто`}</span>{" "}
          </p>
        ) : (
          <p>
            {`В корзине:`}{" "}
            <span>
              {`${total.totalQuantity} ${plural(total.totalQuantity, (variants = { one: "товар", few: "товара", many: "товаров" }), (locale = "ru-RU"))} / ${numberWithSpace(total.totalPrice)}`}{" "}
            </span>
            <span>&#8381;</span>
          </p>
        )}{" "}
      </div>
      <div className="Controls-btn">
        <button
          onClick={() => {
            setModalShow(true);
          }}
        >
          Перейти
        </button>
      </div>
    </div>
  );
}

Controls.propTypes = {
  shoppingList: PropTypes.array.isRequired,
  setModalShow: PropTypes.func.isRequired,
};
export default React.memo(Controls);
