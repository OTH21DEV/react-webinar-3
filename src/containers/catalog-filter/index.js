import { memo, useCallback, useMemo } from "react";
import useTranslate from "../../hooks/use-translate";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import Select from "../../components/select";
import Input from "../../components/input";
import SideLayout from "../../components/side-layout";

function CatalogFilter() {
  const store = useStore();

  const select = useSelector((state) => ({
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
    categories: state.categories.list,
  }));

  console.log(select.categories);

//   function listToTree(list) {
//     // map will be used to store each object in the "list" array
//     const map = {};

//     //"roots" will store all the root nodes of the tree.
//     const roots = [];

//     /*
// The first loop iterates over each object in the "list" array and adds an empty array 
// called "children" to each object. It also updates "map" 
// with the current object where the key is the "_id" property of the object and the 
// value is the object itself.
//     */
//     for (let i = 0; i < list.length; i++) {
//       const node = list[i];
//       node.children = [];
//       map[node._id] = node;
//     }

//     /*
//     The second loop iterates over each object in the "list" array again. 
//     If an object has a "parent" property (which means it's not a root node), 
//     it pushes the current object ("node") to its parent's "children" array, 
//     which it retrieves from "map". If the object does not have a "parent" property, 
//     it pushes it to the "roots" array.
    
//     */
//     for (let i = 0; i < list.length; i++) {
//       const node = list[i];
//       if (node.parent) {
//         map[node.parent._id].children.push(node);
//       } else {
//         roots.push(node);
//       }
//     }
//     /*
// returns the "roots" array, which now 
// contains all the top-level nodes of the tree structure.
// */
//     return roots;
//   }
//   console.log(listToTree(select.categories));

//   function setPrefix(object, prefix = "") {
//     let result = [];

//     /*
//      For each element, it creates a new string called newTitle 
//     by concatenating the prefix string with
//       the title property of the current object. Then it pushes this 
//       new string onto the result array.
    
//     */
//     for (let i of object) {
//       const newTitle = prefix + i.title;
//       result.push(newTitle);
//       /*
//  * If the current object has a children property , the function makes 
// a recursive call to itself, passing in the children array and a 
// modified prefix string that includes a hyphen (-) character concatenated at the end. 
// The resulting array of strings and objects returned from this recursive call 
// is spread into the result array
//  */
//       if (i.children !== undefined) {
//         result.push(...setPrefix(i.children, `${prefix}-`));
//       } else {
//         /*
      
//       If the current object does not have a children property, 
//       it creates a new object with properties value set to the _id property 
//       of the current object and title set to newTitle.
//        This object is then pushed onto the result array.
//       */
//         result.push({ value: i._id, title: newTitle });
//       }
//     }

//     return result;
//   }

//   let defaultCategory = ["Все"];
//   let filteredCategories = setPrefix(listToTree(select.categories));
//   let answer = defaultCategory.concat(filteredCategories);
//   console.log(answer);





  const callbacks = {
    // Сортировка
    onSort: useCallback((sort) => store.actions.catalog.setParams({ sort }), [store]),
    // Поиск
    onSearch: useCallback((query) => store.actions.catalog.setParams({ query, page: 1 }), [store]),
    // Сброс
    onReset: useCallback(() => store.actions.catalog.resetParams(), [store]),
  };

  const options = {
    sort: useMemo(
      () => [
        { value: "order", title: "По порядку" },
        { value: "title.ru", title: "По именованию" },
        { value: "-price", title: "Сначала дорогие" },
        { value: "edition", title: "Древние" },
      ],
      []
    ),
    category:useMemo(()=> select.categories,[select.categories])
  };

  const { t } = useTranslate();

  return (
    <SideLayout padding="medium">
       <Select options={options.category} value={select.sort} onChange={callbacks.onSort} />
      <Select options={options.sort} value={select.sort} onChange={callbacks.onSort} />
      <Input value={select.query} onChange={callbacks.onSearch} placeholder={"Поиск"} delay={1000} />
      <button onClick={callbacks.onReset}>{t("filter.reset")}</button>
    </SideLayout>
  );
}

export default memo(CatalogFilter);
