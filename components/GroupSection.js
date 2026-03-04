// /components/ElementCard.js
import Component from "../lib/Component.js";

export default function ElementCard(element) {
  return Component("div", {
    ui: ["rounded-xl", "shadow-md", "p-4", "text-center", "cursor-pointer", "transition hover:scale-105"],
    style: {
      backgroundColor: element.color
    },
    children: [
      Component("h3", {
        ui: ["text-xl", "font-bold"],
        children: element.symbol
      }),
      Component("p", {
        ui: ["text-md", "font-light"],
        children: element.name
      }),
      Component("p", {
        ui: ["text-sm", "font-light"],
        children: `P:${element.protons} N:${element.neutrons} E:${element.electrons}`
      })
    ],
    events: {
      click() {
        alert(`${element.name} (${element.symbol})`)
      }
    }
  });
}