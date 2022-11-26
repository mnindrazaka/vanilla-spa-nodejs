import App from "./App.js";

export let state = {
  path: window.location.pathname,
  inputValue: localStorage.getItem("inputValue") ?? "",
  products: [],
  tag: "idle",
  errorMessage: "",
};

export function setState(newState) {
  const prevState = { ...state };
  const nextState = { ...state, ...newState };
  state = nextState;
  render();
  onStateChange(prevState, nextState);
}

export function reducer(prevState, action) {
  switch (prevState.tag) {
    case "idle": {
      switch (action.type) {
        case "FETCH": {
          return { ...prevState, tag: "loading" };
        }
        default: {
          return prevState;
        }
      }
    }
    case "loading": {
      switch (action.type) {
        case "FETCH_SUCCESS": {
          return {
            ...prevState,
            tag: "loaded",
            errorMessage: "",
            products: action.payload.products,
          };
        }
        case "FETCH_EMPTY": {
          return {
            ...prevState,
            tag: "empty",
            errorMessage: "",
            products: [],
          };
        }
        case "FETCH_ERROR": {
          return {
            ...prevState,
            tag: "error",
            errorMessage: action.payload.errorMessage,
            products: [],
          };
        }
        case "NAVIGATE_PAGE": {
          return {
            ...prevState,
            path: action.payload.path,
          };
        }
        default: {
          return prevState;
        }
      }
    }
    case "loaded": {
      switch (action.type) {
        case "CHANGE_INPUT": {
          return {
            ...prevState,
            inputValue: action.payload.inputValue,
          };
        }
        case "CLEAR_INPUT": {
          return {
            ...prevState,
            inputValue: "",
          };
        }
        case "FETCH": {
          return { ...prevState, tag: "loading" };
        }
        case "NAVIGATE_PAGE": {
          return {
            ...prevState,
            path: action.payload.path,
          };
        }
        default: {
          return prevState;
        }
      }
    }
    case "empty": {
      switch (action.type) {
        case "CHANGE_INPUT": {
          return {
            ...prevState,
            inputValue: action.payload.inputValue,
          };
        }
        case "CLEAR_INPUT": {
          return {
            ...prevState,
            inputValue: "",
          };
        }
        case "FETCH": {
          return { ...prevState, tag: "loading" };
        }
        case "NAVIGATE_PAGE": {
          return {
            ...prevState,
            path: action.payload.path,
          };
        }
        default: {
          return prevState;
        }
      }
    }
    case "error": {
      switch (action.type) {
        case "CHANGE_INPUT": {
          return {
            ...prevState,
            inputValue: action.payload.inputValue,
          };
        }
        case "CLEAR_INPUT": {
          return {
            ...prevState,
            inputValue: "",
          };
        }
        case "FETCH": {
          return { ...prevState, tag: "loading" };
        }
        case "NAVIGATE_PAGE": {
          return {
            ...prevState,
            path: action.payload.path,
          };
        }
        default: {
          return prevState;
        }
      }
    }
    default: {
      return prevState;
    }
  }
}

export function send(action) {
  const newState = reducer(state, action);
  setState(newState);
}

export function onStateChange(prevState, nextState) {
  if (prevState.path !== nextState.path) {
    history.pushState(null, "", nextState.path);
  }

  if (prevState.inputValue !== nextState.inputValue) {
    localStorage.setItem("inputValue", nextState.inputValue);
  }

  if (nextState.tag === "loading") {
    fetch("https://dummyjson.com/products/search?q=" + state.inputValue)
      .then((res) => res.json())
      .then((data) => {
        if (data.products.length === 0) {
          send({ type: "FETCH_EMPTY" });
        } else {
          send({ type: "FETCH_SUCCESS", payload: { products: data.products } });
        }
      })
      .catch((err) =>
        send({ type: "FETCH_ERROR", payload: { errorMessage: err.message } })
      );
  }
}

export function render() {
  const focusedElementId = document.activeElement.id;
  const focusedElementSelectionStart = document.activeElement.selectionStart;
  const focusedElementSelectionEnd = document.activeElement.selectionEnd;

  const root = document.getElementById("root");
  const app = App();
  root.innerHTML = "";
  root.appendChild(app);

  if (focusedElementId) {
    const focusedElement = document.getElementById(focusedElementId);
    focusedElement.focus();
    focusedElement.selectionStart = focusedElementSelectionStart;
    focusedElement.selectionEnd = focusedElementSelectionEnd;
  }
}
