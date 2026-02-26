// ~/index.js

import Component from "./lib/Component.js";

// App
const app = document.getElementById("app");

// Test component
const test = Component("div", {
  className: "bg-blue-500 text-white p-4 m-4",
  children: "Hello, world!"
});

app.appendChild(test);