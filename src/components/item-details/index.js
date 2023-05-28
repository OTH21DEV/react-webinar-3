import React, { useEffect, useCallback } from "react";
import Head from "../../components/head";
import BasketTool from "../basket-tool";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import PageLayout from "../page-layout";
import { Link } from "react-router-dom";
import "./style.css";

/**
 *Display item description
 * @returns {HTMLElement}
 */
const ItemDetails = () => {
  //get the id params
  let pathArray = window.location.pathname.split("/");
  let pathid = pathArray[1];

  const store = useStore();

  useEffect(() => {
    store.actions.ItemDetails.load(pathid);
  }, [store]);

  //access to state of items details and basket
  const select = useSelector((state) => ({
    details: state.ItemDetails.details,
    basket: state.basket,
  }));

  //get the actions from the store to add items in the basket and open modal
  const callbacks = {
    addToBasket: useCallback((pathid) => store.actions.basket.addToBasket(pathid), [store]),
    openModalBasket: useCallback(() => store.actions.modals.open("basket"), [store]),
  };

  return (
    <>
      <PageLayout productTitle={select.details.title}>
        <Head title={select.details.title} />
        <div className="item-details-main">
          <Link to={"/"}>Главная</Link>
          <BasketTool onOpen={callbacks.openModalBasket} amount={select.basket.amount} sum={select.basket.sum} />
        </div>
        <div className="item-details-container">
          <div className="item-details-description">{select.details.description}</div>

          {select.details.madeIn ? (
            <div className="item-details-country">
              <p>Страна производитель:</p>
              <span>{select.details.madeIn.title}</span>
            </div>
          ) : null}

          {select.details.category ? (
            <div className="item-details-category">
              <p>Категория:</p>
              <span>{select.details.category.title}</span>
            </div>
          ) : null}

          <div className="item-details-edition">
            <p>Год выпуска:</p>
            <span>{select.details.edition}</span>
          </div>

          <div className="item-details-price">
            <p>Цена:</p>
            <span>{select.details.price}</span>
            <span>&#8381;</span>
          </div>
        </div>
        <button className="item-details-btn" onClick={callbacks.addToBasket}>
          Добавить
        </button>
      </PageLayout>
    </>
  );
};

export default React.memo(ItemDetails);
