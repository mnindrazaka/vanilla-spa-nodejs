import Link from "../components/Link.js";

function AboutPage() {
  const linkHome = Link({ href: "/home", label: "Back to Home" });

  const p = document.createElement("p");
  p.textContent = "Welcome to About Page";

  const div = document.createElement("div");
  div.appendChild(linkHome);
  div.appendChild(p);
  return div;
}

export default AboutPage;
