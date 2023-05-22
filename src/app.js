import React, { useCallback, useState } from "react";
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from "./components/modal";
import ShoppingList from "./components/shopping-list";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;
  const shoppingList = store.getState().shoppingList;
  const total = store.getState().total;
  console.log(shoppingList);
  console.log(total);

  const [modalShow, setModalShow] = useState(false);
  const btnName = ["Добавить", "Удалить"];

  const callbacks = {
    onAddItem: useCallback(
      (code) => {
        store.displayTotalShoppingList(code);
      },
      [store]
    ),
    onSelectItem: useCallback(
      (code) => {
        store.selectItem(code);
      },
      [store]
    ),
    onDeleteItem: useCallback(
      (code) => {
        store.deleteFromShoppingList(code);
      },
      [store]
    ),
  };

  return (
    <>
      <PageLayout>
        <Head title="Mагазин" />
        <Controls shoppingList={shoppingList} onAdd={callbacks.onAddItem} setModalShow={setModalShow} total={total} />
        <List list={list} btnName={btnName[0]} onDeleteItem={callbacks.onAddItem} onSelectItem={callbacks.onSelectItem} setModalShow={setModalShow} />
      </PageLayout>
      {modalShow && shoppingList ? (
        <Modal>
          <ShoppingList
            title={"Корзина"}
            list={shoppingList}
            total={total}
            btnName={btnName[1]}
            onDeleteItem={callbacks.onDeleteItem}
            onSelectItem={callbacks.onSelectItem}
            modalShow={modalShow}
            setModalShow={setModalShow}
          ></ShoppingList>
        </Modal>
      ) : null}
    </>
  );
}

export default App;
