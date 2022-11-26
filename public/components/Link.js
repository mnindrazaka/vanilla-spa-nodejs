import { send } from "../state.js";

function Link(props) {
  const a = document.createElement("a");
  a.href = props.href;
  a.textContent = props.label;
  a.onclick = function (event) {
    event.preventDefault();
    const url = new URL(event.target.href);
    send({ type: "NAVIGATE_PAGE", payload: { path: url.pathname } });
  };
  return a;
}

export default Link;
