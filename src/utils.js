const propNames = new Set(["id", "className", "textContent", "onclick"]);

/**
 * Создание элемента со свойствами и вложенными элементами
 * @param name {String} Название HTML тега
 * @param props {Object} Свойства и атрибуты элемента
 * @param children {...Node} Вложенные элементы
 * @returns {HTMLElement}
 */
export function createElement(name, props = {}, ...children) {
  const element = document.createElement(name);

  // Назначение свойств и атрибутов
  for (const name of Object.keys(props)) {
    if (propNames.has(name)) {
      element[name] = props[name];
    } else {
      element.setAttribute(name, props[name]);
    }
  }

  // Вставка вложенных элементов
  for (const child of children) {
    element.append(child);
  }

  return element;
}
/**
 * Create word to display with counter amount 
 * @param {*} number {Number} counter amount
 * @returns {String} word "раз" or "разa" 
 */
export function changeName(number) {
  const text = ["раз", "раза"];
  const n = number % 10;
  if (n === 1 || n === 0) {
    return text[0];
  }
  if (number === 1 || n >= 5) {
    return text[0];
  }
  if (number === 12 || number === 13 || number == 14) {
    return text[0];
  }
  if (n >= 2 && n <= 4) {
    return text[1];
  }
}

/**
 * Create unique element's Id
 * @returns {String} id of each element
 */
export function generateId() {
  return Math.random().toString(36).substring(2) + new Date().getTime().toString(36);
}
