// /components/App.js
import Component from "../lib/Component.js";
import { elementsgroups } from "../data/data.js";
import GroupSection from "./GroupSection.js";

export default function App() {
  return Component("div", {
    className: "max-w-7xl mx-auto p-6",
    children: [
      Component("h1", {
        className: "text-4xl font-bold text-center mb-10",
        children: "🧬 Periodic Table Viewer"
      }),
      ...elementsgroups.map(GroupSection)
    ]
  });
}