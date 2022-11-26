import HomePage from "./screens/HomePage.js";
import AboutPage from "./screens/AboutPage.js";
import { state } from "./state.js";

function App() {
  const homePage = HomePage();
  const aboutPage = AboutPage();

  if (state.path == "/home") {
    return homePage;
  } else if (state.path == "/about") {
    return aboutPage;
  } else {
    return homePage;
  }
}

export default App;
