import Link from "./Link.js";

function Navbar() {
  const linkHome = Link({ href: "/home", label: "Home" });
  const linkAbout = Link({ href: "/about", label: "About" });

  const div = document.createElement("div");
  div.append(linkHome);
  div.append(linkAbout);

  return div;
}

export default Navbar;
