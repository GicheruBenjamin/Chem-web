import { Component } from "./src/Component.js";

const counter = new Component({
  tag: "div",
  props: {
    className: "counter",
    initState: { count: 0 },
    onMount: (el, state) => console.log("Mounted:", state),
    onUpdate: (el, prev, next) => console.log("Updated:", prev, "→", next),
    onUnmount: () => console.log("Unmounted"),
  },
  children: [
    { tag: "span", props: { textContent: "Count: 0" } },
    {
      tag: "button",
      props: {
        textContent: "Click Me",
        events: {
          click: () => {
            counter.setState((prev) => ({ count: prev.count + 1 }));
            // update child manually for demo
            counter._root.querySelector("span").textContent = `Count: ${counter.state.count}`;
          },
        },
      },
    },
  ],
});

document.addEventListener("DOMContentLoaded", () => {
  counter.mount(document.body);
});
