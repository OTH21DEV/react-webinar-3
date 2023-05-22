import React from "react";
import { numberWithSpace } from "../../utils";
import { plural } from "../../utils";
import "./style.css";
import PropTypes from "prop-types";

/**
 * Display Controls
 * @param {Array} shoppingList array of items in shopping list
 * @param {Function} setModalShow set modal state
 * @param {Number} total total item's price in shopping list
 * @returns {HTMLElement}
 */
function Controls({ shoppingList, setModalShow ,total}) {
  let locale;
  let variants;

  return (
    <div className="Controls">
      <div>
        {!shoppingList.length ? (
          <p>
            {`В корзине:`} <span>{`пусто`}</span>{" "}
          </p>
        ) : (
          <p>
            {`В корзине:`}{" "}
            <span>
              {`${shoppingList.length} ${plural(shoppingList.length, (variants = { one: "товар", few: "товара", many: "товаров" }), (locale = "ru-RU"))} / ${numberWithSpace(total)}`}{" "}
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
  total: PropTypes.number
};
export default React.memo(Controls);
