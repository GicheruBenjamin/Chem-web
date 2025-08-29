// index.js
import Header from "./components/Header.js";
import Card from "./components/Card.js";
import Footer from "./components/Footer.js";

// assume renderComponent from your src/Component.js is available globally
// or imported if modular
import { renderComponent } from "./src/Component.js";

document.addEventListener("DOMContentLoaded", () => {
    const app = document.getElementById("app");

    app.appendChild(renderComponent(Header));
    app.appendChild(renderComponent(Card));
    app.appendChild(renderComponent(Footer));
});
