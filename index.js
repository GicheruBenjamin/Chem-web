import Component from "./lib/Component.js";

// Sample Card Component
function Card({ title, text }) {
  return Component("div", {
    // Custom CSS + Tailwind merged
    className: "card",               // your CSS
    ui: ["shadow-lg", "hover:shadow-xl", "transition", "duration-300"], // Tailwind
    children: [
      Component("h2", {
        className: "card-title",
        children: title
      }),
      Component("p", {
        className: "card-text",
        children: text
      }),
      Component("button", {
        className: "px-3 py-1 rounded",      // custom CSS or leave blank
        ui: ["bg-blue-500", "text-white", "hover:bg-blue-600"],
        children: "Click Me",
        events: {
          click: () => alert(`You clicked ${title}`)
        }
      })
    ]
  });
}

// Mounting it
const app = document.getElementById("app");
app.appendChild(
  Card({ title: "Vanilla JS Card", text: "This card uses custom CSS + Tailwind classes!" })
);