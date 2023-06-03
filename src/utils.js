/**
 * Плюрализация
 * Возвращает вариант с учётом правил множественного числа под указанную локаль
 * @param value {Number} Число, под которое выбирается вариант формы.
 * @param variants {Object<String>} Варианты форм множественного числа.
 * @example plural(5, {one: 'товар', few: 'товара', many: 'товаров'})
 * @param [locale] {String} Локаль (код языка)
 * @returns {String}
 */
export function plural(value, variants = {}, locale = 'ru-RU') {
  // Получаем фурму кодовой строкой: 'zero', 'one', 'two', 'few', 'many', 'other'
  // В русском языке 3 формы: 'one', 'few', 'many', и 'other' для дробных
  // В английском 2 формы: 'one', 'other'
  const key = new Intl.PluralRules(locale).select(value);
  // Возвращаем вариант по ключу, если он есть
  return variants[key] || '';
}

/**
 * Генератор чисел с шагом 1
 * @returns {Function}
 */
export function codeGenerator(start = 0) {
  return () => ++start;
}

/**
 * Форматирование разрядов числа
 * @param value {Number}
 * @param options {Object}
 * @returns {String}
 */
export function numberFormat(value, locale = 'ru-RU', options = {}) {
  return new Intl.NumberFormat(locale, options).format(value);
}

/**
 * Display list array as a tree
 * @param {Array} list of item's objects
 * @returns {Array} roots array of nodes 
 */
export function listToTree(list) {
  // map will be used to store each object in the "list" array
  const map = {};

  //"roots" will store all the root nodes of the tree.
  const roots = [];

  /*
The first loop iterates over each object in the "list" array and adds an empty array 
called "children" to each object. It also updates "map" 
with the current object where the key is the "_id" property of the object and the 
value is the object itself.
  */
  for (let i = 0; i < list.length; i++) {
    const node = list[i];
    node.children = [];
    map[node._id] = node;
  }

  /*
  The second loop iterates over each object in the "list" array again. 
  If an object has a "parent" property (which means it's not a root node), 
  it pushes the current object ("node") to its parent's "children" array, 
  which it retrieves from "map". If the object does not have a "parent" property, 
  it pushes it to the "roots" array.
  
  */
  for (let i = 0; i < list.length; i++) {
    const node = list[i];
    if (node.parent) {
      map[node.parent._id].children.push(node);
    } else {
      roots.push(node);
    }
  }
  /*
returns the "roots" array, which now 
contains all the top-level nodes of the tree structure.
*/
  return roots;
}
// console.log(listToTree(select.categories));

/**
 * Create a prefix 
 * @param {Array} object roots array containing the nodes
 * @param {String} prefix 
 * @returns {Array} array of filtered categories
 */
export function setPrefix(object, prefix = "") {
  let result = [];

  /*
   For each element, it creates a new string called newTitle 
  by concatenating the prefix string with
    the title property of the current object. Then it pushes this 
    new string onto the result array.
  
  */
  for (let i of object) {
    const newTitle = prefix + i.title;
    // result.push(newTitle);
    result.push({value:i._id, title:newTitle});
    /*
* If the current object has a children property , the function makes 
a recursive call to itself, passing in the children array and a 
modified prefix string that includes a hyphen (-) character concatenated at the end. 
The resulting array of strings and objects returned from this recursive call 
is spread into the result array
*/
    if (i.children !== undefined) {
      result.push(...setPrefix(i.children, `${prefix}-`));
    } else {
      /*
    
    If the current object does not have a children property, 
    it creates a new object with properties value set to the _id property 
    of the current object and title set to newTitle.
     This object is then pushed onto the result array.
    */
      result.push({ value: i._id, title: newTitle });
    }
  }

  return result;
}

