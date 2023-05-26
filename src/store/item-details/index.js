import { codeGenerator } from "../../utils";
import StoreModule from "../module";

class ItemDetails extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
  }

  initState() {
    return {
      details: [],
    };
  }

  async load(id) {
    const response = await fetch(`/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`);
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        details: json.result,
      },
      "Загружен товар из АПИ"
    );
    return json;
  }
}

export default ItemDetails;
