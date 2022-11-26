function ProductItem(props) {
  const titleText = document.createElement("p");
  titleText.textContent = props.title;
  return titleText;
}

export default ProductItem;
