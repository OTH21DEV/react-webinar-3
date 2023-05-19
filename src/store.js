import item from "./components/item";
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

  getShoppingList() {
    // return array.push(this.state.list.find((item) => item.code == code))
    return this.shoppingList;
  }

  setShoppingList(newState) {
    this.shoppingList = newState;
    // for (const listener of this.listeners) listener();
  }

  //   addInShoppingList(code){

  // // const shoppingList = [...this.state.list]

  // // const addedItem = shoppingList.filter((item) => item.code == code)
  // // console.log(addedItem)
  // // // if(addedItem){
  // // //   ++addedItem.count
  // // // }else{
  // // //   const item = this.state.list.filter((item) => item.code == code)

  // // //   shoppingList.push({...item,count:1})
  // // // }
  // // shoppingList.push({...addedItem})

  //  this.setShoppingList(
  //   // ...this.shoppingList,
  //   // list:[ ...this.shoppingList,{...this.state.list.filter((item) => item.code == code)}]

  //         // ...this.state,
  //         // list: [...this.state.list, { code: generateCode(), title: "Новая запись" }],
  //   //  this.test(code)

  //     this.test(code)
  //        // ...this.state,
  //         // list: [...this.state.list, { code: generateCode(), title: "Новая запись" }],

  //  )
  // }

  // test(code){

  //   const list = []
  // // const list = [...this.state.shoppingList]
  // const addedItem = this.state.list.find((item) => item.code == code)
  // list.push({...addedItem})
  // return list
  // }

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
   * Удаление записи по коду
   * @param code
   */
  // deleteItem(code) {
  //   // this.setState({
  //   //   ...this.state,
  //   //   // Новый список, в котором не будет удаляемой записи
  //   //   list: this.state.list.filter(item => item.code !== code)
  //   // })
  //   console.log(this.state.list.find((item) => item.code == code));
  // }

  /**
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

  deleteFromShoppingList(code){
    this.setState({
      ...this.state,
      shoppingList: this.state.shoppingList.filter(item=>item.code!==code)
    })

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
