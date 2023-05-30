import { codeGenerator } from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
  }

  initState() {
    return {
      list: [],
      currentPage: 1,
      itemsPerPage: 10,
      totalPages: null,
    };
  }

  // async load() {
  //   // const response = await fetch("/api/v1/articles?limit=1000");
  //   const response = await fetch("/api/v1/articles?limit=10&skip=10&fields=items(_id, title, price),count");
  //   const json = await response.json();
  //   // console.log(json.result.count)
  //   this.setState(
  //     {
  //       ...this.getState(),
  //       list: json.result.items,
  //       // count:json.result.count
  //     },
  //     "Загружены товары из АПИ"
  //   );
  // }

  async getTotalPages() {
    const response = await fetch("/api/v1/articles?limit=10&skip=10&fields=items(_id, title, price),count");
    const json = await response.json();

    this.setState(
      {
        ...this.getState(),

        totalPages: json.result.count,
      },
      "Всего страниц"
    );
  }

  setCurrentPage(page) {
    this.setState(
      {
        ...this.getState(),

        currentPage: page,
      },
      "Текущая страница"
    );
  }

  async setItemsInCurrentPage(limit, skip) {
    const response = await fetch(`/api/v1/articles?limit=${limit}&skip=${skip}`);
    const json = await response.json();

    this.setState(
      {
        ...this.getState(),

        list: json.result.items,
      },
      "Всего страниц"
    );
  }
}

export default Catalog;
