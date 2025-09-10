import { tableCard } from "./tableCard.js";

export const groupCard = group => ({
  tag: "div",
  props: { className: "group-card" },
  children: [
    { tag: "h2", props: { className: "group-title", textContent: `${group.icon} ${group.groupname}` } },
    {
      tag: "div",
      props: { className: "group-elements" },
      children: group.elements.map(el => tableCard(el))
    }
  ]
});
