let state = {
  hash: window.location.hash,
  inputValue: localStorage.getItem("inputValue") ?? "",
  products: [],
  tag: "idle",
  errorMessage: "",
};

function setState(newState) {
  const prevState = { ...state };
  const nextState = { ...state, ...newState };
  state = nextState;
  render();
  onStateChange(prevState, nextState);
}

function reducer(prevState, action) {
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
            hash: action.payload.hash,
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
            hash: action.payload.hash,
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
            hash: action.payload.hash,
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
            hash: action.payload.hash,
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

function send(action) {
  const newState = reducer(state, action);
  setState(newState);
}

function onStateChange(prevState, nextState) {
  if (prevState.hash !== nextState.hash) {
    history.pushState(null, "", nextState.hash);
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

function Link(props) {
  const a = document.createElement("a");
  a.href = props.href;
  a.textContent = props.label;
  a.onclick = function (event) {
    event.preventDefault();
    const url = new URL(event.target.href);
    send({ type: "NAVIGATE_PAGE", payload: { hash: url.hash } });
  };
  return a;
}

function Navbar() {
  const linkHome = Link({ href: "#home", label: "Home" });
  const linkAbout = Link({ href: "#about", label: "About" });

  const div = document.createElement("div");
  div.append(linkHome);
  div.append(linkAbout);

  return div;
}

function ProductItem(props) {
  const titleText = document.createElement("p");
  titleText.textContent = props.title;
  return titleText;
}

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

function HomePage() {
  const navbar = Navbar();

  const p = document.createElement("p");
  p.textContent = "Welcome to Home Page";

  const textPreview = document.createElement("p");
  textPreview.textContent = state.inputValue;

  const div = document.createElement("div");
  div.append(navbar);
  div.append(p);
  div.append(ProductSearchInput());
  div.append(textPreview);
  div.append(ProductList());

  return div;
}

function AboutPage() {
  const linkHome = Link({ href: "#home", label: "Back to Home" });

  const p = document.createElement("p");
  p.textContent = "Welcome to About Page";

  const div = document.createElement("div");
  div.appendChild(linkHome);
  div.appendChild(p);
  return div;
}

function App() {
  const homePage = HomePage();
  const aboutPage = AboutPage();

  if (state.hash == "#home") {
    return homePage;
  } else if (state.hash == "#about") {
    return aboutPage;
  } else {
    return homePage;
  }
}

function render() {
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

render();
send({ type: "FETCH" });
