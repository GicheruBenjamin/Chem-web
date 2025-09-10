console.log("✅ index.js loaded");


import { elementsgroups } from "./data/data.js";
import { createElement } from "./lib/createElement.js";
import { groupCard } from "./components/groupCard.js";
import { searchBar } from "./components/searchBar.js";

// Root container
const root = document.getElementById("app");

// Render search bar
const input = createElement(
  searchBar(e => renderGroups(e.target.value))
);
root.appendChild(input);

// Container for groups
const groupsContainer = document.createElement("div");
root.appendChild(groupsContainer);

// Render function
function renderGroups(query = "") {
  groupsContainer.innerHTML = ""; // clear
  elementsgroups.forEach(group => {
    // filter elements by query
    const filtered = group.elements.filter(el =>
      el.name.toLowerCase().includes(query.toLowerCase()) ||
      el.symbol.toLowerCase().includes(query.toLowerCase())
    );
    if (filtered.length > 0) {
      const card = groupCard({ ...group, elements: filtered });
      groupsContainer.appendChild(createElement(card));
    }
  });
}

// Initial render
renderGroups();
