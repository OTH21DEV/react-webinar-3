import { generateCode } from "./utils";

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    
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
      currentItem.count = currentItem.count + 1;
    } else {
      const itemToAdd = this.state.list.find((unit) => unit.code === code);
      shoppingList.push({ ...itemToAdd, count: 1, selectedItem: 1 });
    }

    /**
     * Установка состояния корзины 
     */
    this.setState({
      ...this.state,
      shoppingList,
    });

    /**
     * Установка суммы корзины при добавлении товара
     */
    // this.setState({
    //   ...this.state,
    //   total: { sum: this.calculateTotalPrice(), selectedItems: shoppingList.length },
    // });
    this.updateTotalPrice()
  }

  /**
   *Расчет итоговой суммы корзины
   * @returns {Number} sum сумма корзины
   */
  calculateTotalPrice() {
    let sum = 0;
    this.state.shoppingList.forEach((item) => {
      sum = sum + item.price * item.count;
    });
    return sum;
  }

  /**
   * Удаление записи из корзины
   * @param code
   */
  deleteFromShoppingList(code) {
    this.setState({
      ...this.state,
      shoppingList: this.state.shoppingList.filter((item) => item.code !== code),
    });
    
    /**
     * Установка суммы корзины при удалении товара
     */
    // this.setState({
    //   ...this.state,
    //   totalPrice: { sum: this.calculateTotalPrice(), selectedItems: this.state.shoppingList.length },
    //   totalPrice:  this.calculateTotalPrice()
    // });
    // console.log(this.state.shoppingList.length)
    this.updateTotalPrice()
  }

  updateTotalPrice(){

    this.setState({
      ...this.state,
     total: this.calculateTotalPrice()
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
