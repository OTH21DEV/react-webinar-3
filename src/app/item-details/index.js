import React, { useEffect, useCallback } from "react";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import PageLayout from "../../components/page-layout";
import LinkBasketWrapper from "../../components/link-basket-wrapper";
import LinkMainPage from "../../components/link-mainpage";
import ItemContent from "../../components/item-content";

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

        <LinkBasketWrapper>
          <LinkMainPage />

          <BasketTool onOpen={callbacks.openModalBasket} amount={select.basket.amount} sum={select.basket.sum} />
        </LinkBasketWrapper>

        <ItemContent details={select.details} onAdd={callbacks.addToBasket} />
      </PageLayout>
    </>
  );
};

export default React.memo(ItemDetails);
