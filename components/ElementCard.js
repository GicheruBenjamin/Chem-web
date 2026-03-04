// /components/ElementCard.js
import Component from "../lib/Component.js";

export default function ElementCard(element) {
  return Component("div", {
    className: "rounded-xl shadow-md p-4 text-center cursor-pointer transition hover:scale-105",
    style: {
      backgroundColor: element.color
    },
    children: [
      Component("h3", {
        className: "text-xl font-bold",
        children: element.symbol
      }),
      Component("p", {
        className: "text-sm mt-1",
        children: element.name
      }),
      Component("p", {
        className: "text-xs mt-2 opacity-80",
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