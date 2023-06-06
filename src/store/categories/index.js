import StoreModule from "../module";
import { listToTree,setPrefix } from "../../utils";

class Categories extends StoreModule {
  initState() {
    return {
      list: [],
    };
  }

  getCategoriesFromApi() {
    fetch("api/v1/categories?fields=_id,title,parent(_id)&limit=*", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(response);
        if (!response.ok) {
     
        }
        return response.json();
      })

      .then((data) => {
        console.log(data.result.items);

        let tree = listToTree(data.result.items)
        let filteredList = setPrefix(tree)
        filteredList.unshift({value:'',title:'Все'})
        this.setState({
          ...this.getState(),
          // list: data.result.items,
          list: filteredList,
        });
      })

      .catch((err) => {
        console.log(err);
      });
  }
}
export default Categories
