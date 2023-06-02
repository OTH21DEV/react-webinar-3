import StoreModule from "../module";

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

        this.setState({
          ...this.getState(),
          list: data.result.items,
        });
      })

      .catch((err) => {
        console.log(err.message);
      });
  }
}
export default Categories
