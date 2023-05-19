import React from "react";
import PropTypes from "prop-types";
import "./style.css";
import { numberWithSpace } from "../../utils";
import { plural } from "../../utils";
import { calculateTotal } from "../../utils";

function Controls({ shoppingList,setModalShow }) {
  let total = calculateTotal(shoppingList);
  let locale;
  let variants;


  function tst(){
    // document.querySelector('.Modal-overlay').classList.add('hide')
    // document.querySelector('.Modal-overlay').style.display='flex'
  }
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
        <button onClick={() => {setModalShow(true),tst()}}>Перейти</button>
      </div>
    </div>
  );
}
Controls.propTypes = {
  onAdd: PropTypes.func,
};

Controls.defaultProps = {
  onAdd: () => {},
};

export default React.memo(Controls);
// export default Controls;
