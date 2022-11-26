import { send, render } from "./state.js";

render();
send({ type: "FETCH" });
