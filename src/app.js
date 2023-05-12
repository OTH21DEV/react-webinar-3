import React from "react";
import "./styles.css";
import Store from "./store.js";
import { changeName } from "./utils.js";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */

function App({ store }) {
  const list = store.getState().list;

  return (
    <div className="App">
      <div className="App-head">
        <h1>Приложение на чистом JS</h1>
      </div>
      <div className="App-controls">
        <button onClick={() => store.addItem()}>Добавить</button>
      </div>
      <div className="App-center">
        <div className="List">
          {list.map((item, index) => (
            <div key={item.id} className="List-item">
              <div
                className={"Item" + (item.selected ? " Item_selected" : "")}
                onClick={() => {
                  {
                    store.selectItem(item.code);
                  }
                }}
              >
                <div className="Item-code">{index + 1}</div>
                <div className="Item-title">{item.counter == 0 ? item.title : `${item.title}${"\u00A0"} | ${"\u00A0"}Выделяли ${item.counter} ${changeName(item.counter)}`}</div>
                <div className="Item-actions">
                  <button onClick={() => store.deleteItem(item.code)}>Удалить</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
