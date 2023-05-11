import React from "react";
import { createRoot } from "react-dom/client";
import App from "./app.js";
import Store from "./store.js";
import { generateId } from "./utils.js";


const store = new Store({
  list: [
    { id: generateId(), code: 1, title: "Название элемента", counter: 0, selected: false },
    { id: generateId(), code: 2, title: "Некий объект", counter: 0, selected: false },
    { id: generateId(), code: 3, title: "Заголовок", counter: 0, selected: false },
    { id: generateId(), code: 4, title: "Очень длинное название элемента из семи слов", counter: 0, selected: false },
    { id: generateId(), code: 5, title: "Запись", counter: 0, selected: false },
    { id: generateId(), code: 6, title: "Шестая запись", counter: 0, selected: false },
    { id: generateId(), code: 7, title: "Седьмая запись", counter: 0, selected: false },
  ],
});

const root = createRoot(document.getElementById("root"));

store.subscribe(() => {
  root.render(<App store={store} />);
});

// Первый рендер приложения
root.render(<App store={store} />);
