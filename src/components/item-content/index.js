import React from "react";
import PropTypes from "prop-types";
import "./style.css";

/**
 *Display items content
 * @param {Object} props conatins item details
 * @returns {HTMLElement}
 */
function ItemContent(props) {
  console.log(props);
  const callbacks = {
    addToBasket: () => props.onAdd(),
  };

  return (
    <>
      <div className="item-details-container">
        <div className="item-details-description">{props.details.description}</div>

        {props.details.length !== 0 ? (
          <div className="item-details-country">
            <p>Страна производитель:</p>
            <span>{props.details.madeIn.title}</span>
          </div>
        ) : null}

        {props.details.length !== 0 ? (
          <div className="item-details-category">
            <p>Категория:</p>
            <span>{props.details.category.title}</span>
          </div>
        ) : null}

        <div className="item-details-edition">
          <p>Год выпуска:</p>
          <span>{props.details.edition}</span>
        </div>

        <div className="item-details-price">
          <p>Цена:</p>
          <span>{props.details.price}</span>
          <span>&#8381;</span>
        </div>
      </div>

      <button className="item-details-btn" onClick={callbacks.addToBasket}>
        Добавить
      </button>
    </>
  );
}

ItemContent.propTypes = {
  props: PropTypes.shape({}),
};

export default React.memo(ItemContent);
