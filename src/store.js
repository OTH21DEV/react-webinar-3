import { generateCode } from "./utils";

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.shoppingList = [];
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter((item) => item !== listener);
    };
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление новой записи
   */
  addItem() {
    this.setState({
      ...this.state,
      list: [...this.state.list, { code: generateCode(), title: "Новая запись" }],
    });
  }

  /**
   * Добавление новой записи в корзину
   * @param code
   */
  displayTotalShoppingList(code) {
    const shoppingList = [...this.state.shoppingList];
    const currentItem = shoppingList.find((unit) => unit.code === code);
    if (currentItem) {
      ++currentItem.count;
    } else {
      const itemToAdd = this.state.list.find((unit) => unit.code === code);
      shoppingList.push({ ...itemToAdd, count: 1 });
    }

    this.setState({
      ...this.state,
      shoppingList,
    });
  }

  /**
   * Удаление записи из корзину
   * @param code
   */
  deleteFromShoppingList(code) {
    this.setState({
      ...this.state,
      shoppingList: this.state.shoppingList.filter((item) => item.code !== code),
    });
  }

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map((item) => {
        if (item.code === code) {
          // Смена выделения и подсчёт
          return {
            ...item,
            selected: !item.selected,
            count: item.selected ? item.count : item.count + 1 || 1,
          };
        }
        // Сброс выделения если выделена
        return item.selected ? { ...item, selected: false } : item;
      }),
    });
  }
}

export default Store;
