/**
 * Преобразование списка в иерархию.
 * @param tree {Array} Иерархия - список узлов со свойством children.
 * @param [callback] {Function} Для пользовательского преобразования элемента.
 * @param [level] {Number} Начальный уровень вложенности.
 * @param [result] {Array} Результат функции (используется рекурсией).
 * @returns {Array} Корневые узлы
 */
// This function takes in a tree structure, a callback function (optional), and two internal parameters for the current depth and an array to hold the flattened result. It returns a flattened version of the input tree as an array.

export default function treeToList(tree, callback, level = 0, result = []) {
  
  // Iterate over each item in the input tree.
  for (const item of tree) {

    // If a callback is provided, call the callback with the current item and level, and push the result to the output array. Otherwise, push the current item directly to the output array.
    result.push(callback ? callback(item, level) : item);

    // If the current item has children, recursively call the function with the children as the new input tree, an updated level, and the same output array being built up by the parent call.
    if (item.children?.length) treeToList(item.children, callback, level + 1, result);
  }

  // Return the final output array.
  return result;
}
