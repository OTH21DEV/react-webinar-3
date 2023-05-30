import React, { useEffect, useCallback, useContext } from "react";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import PageLayout from "../../components/page-layout";
import LinkBasketWrapper from "../../components/link-basket-wrapper";
import ItemContent from "../../components/item-content";
import Navbar from "../../components/navbar";
import { LanguageContext } from "../../containers/Language";

/**
 *Display item description
 * @returns {HTMLElement}
 */
const ItemDetails = () => {
  //get the id params
  let pathArray = window.location.pathname.split("/");
  console.log(pathArray);
  let pathid = pathArray[2];

  const store = useStore();

  useEffect(() => {
    store.actions.ItemDetails.load(pathid);
  }, [store]);

  //access to state of items details and basket
  const select = useSelector((state) => ({
    details: state.ItemDetails.details,
    basket: state.basket,
    
    itemsPerPage: state.catalog.itemsPerPage,
    currentPage: state.catalog.currentPage,
  }));

  //get the actions from the store to add items in the basket and open modal
  const callbacks = {
    addToBasket: useCallback((pathid) => store.actions.basket.addToBasket(pathid), [store]),
    openModalBasket: useCallback(() => store.actions.modals.open("basket"), [store]),
    //Текущая страница
    setCurrentPage: useCallback((page) => store.actions.catalog.setCurrentPage(page), [store]),
    //Загрузка товаров текущей страницы
    setItems: useCallback((limit, skip) => store.actions.catalog.setItemsInCurrentPage(limit, skip), [store]),
  };
  const { dictionary } = useContext(LanguageContext);

  return (
    <>
      <PageLayout productTitle={select.details.title}>
        <Head title={select.details.title} />

        <LinkBasketWrapper>
          <Navbar links={[{ to: "/", content: "Главная" }]} setItems={callbacks.setItems} currentPage={select.currentPage} setPage={callbacks.setCurrentPage} itemsPerPage={select.itemsPerPage} />
          <BasketTool onOpen={callbacks.openModalBasket} amount={select.basket.amount} sum={select.basket.sum} dictionary={dictionary} />
        </LinkBasketWrapper>

        <ItemContent details={select.details} onAdd={callbacks.addToBasket} />
      </PageLayout>
    </>
  );
};

export default React.memo(ItemDetails);
