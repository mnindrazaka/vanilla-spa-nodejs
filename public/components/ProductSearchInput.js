import { state, send } from "../state.js";

function ProductSearchInput() {
  const input = document.createElement("input");
  input.id = "input";
  input.value = state.inputValue;
  input.placeholder = "enter your name";
  input.disabled = state.tag === "loading";
  input.oninput = function (event) {
    send({ type: "CHANGE_INPUT", payload: { inputValue: event.target.value } });
  };

  const buttonClear = document.createElement("button");
  buttonClear.textContent = "Clear";
  buttonClear.disabled = state.tag === "loading";
  buttonClear.onclick = function () {
    send({ type: "CLEAR_INPUT" });
  };

  const buttonSubmit = document.createElement("button");
  buttonSubmit.textContent = "Submit";
  buttonSubmit.disabled = state.tag === "loading";
  buttonSubmit.onclick = function () {
    send({ type: "FETCH" });
  };

  const div = document.createElement("div");
  div.append(input);
  div.append(buttonClear);
  div.append(buttonSubmit);

  return div;
}

export default ProductSearchInput;
