import { memo, useCallback, useEffect,useContext } from "react";
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from "../../components/pagination";
import LinkBasketWrapper from "../../components/link-basket-wrapper";
import LanguageSelector from "../../components/language-selector";
import Navbar from "../../components/navbar";
import { LanguageContext } from "../../containers/Language";
/**
 * Display main page
 * @returns {HTMLElement}
 */
function Main() {
  const store = useStore();
  console.log(store);
  useEffect(() => {
    store.actions.catalog.load();
  }, []);

  const select = useSelector((state) => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const { dictionary } = useContext(LanguageContext);
  console.log(dictionary)


  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback((_id) => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open("basket"), [store]),
    
  };

  const renders = {
    item: useCallback(
      (item) => {
        return <Item item={item} onAdd={callbacks.addToBasket} to={`articles/${item._id}`}/>;
      },
      [callbacks.addToBasket]
    ),
  };

  ///test


  return (
    <PageLayout>
 
      <LanguageSelector></LanguageSelector>
      
      <Head title={dictionary.head}/>



      <LinkBasketWrapper>
          <Navbar links={[{to:'/',content: 'Главная'}]}/>
          {/* <BasketTool onOpen={callbacks.openModalBasket} amount={select.basket.amount} sum={select.basket.sum} dictionary={dictionary} /> */}
          <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} dictionary={dictionary}/>
        </LinkBasketWrapper>


   
      <Pagination list={select.list} renderItem={renders.item}></Pagination>
    </PageLayout>
  );
}

export default memo(Main);
