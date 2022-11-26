import ProductItem from "./ProductItem.js";
import { state } from "../state.js";

function ProductList() {
  const items = state.products.map((product) =>
    ProductItem({ title: product.title })
  );

  const loadingText = document.createElement("p");
  loadingText.textContent = "Loading Products...";

  const emptyText = document.createElement("p");
  emptyText.textContent = "Product Empty";

  const errorText = document.createElement("p");
  errorText.textContent = state.errorMessage;

  const div = document.createElement("div");

  switch (state.tag) {
    case "idle": {
      div.append(loadingText);
      break;
    }
    case "loading": {
      div.append(loadingText);
      break;
    }
    case "loaded": {
      div.append(...items);
      break;
    }
    case "empty": {
      div.append(emptyText);
      break;
    }
    case "error": {
      div.append(errorText);
      break;
    }
  }

  return div;
}

export default ProductList;
