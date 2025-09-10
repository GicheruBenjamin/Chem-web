# Periodic Table Viewer (Vanilla JS)

This project is a **mini component system in vanilla JavaScript** that renders a searchable, dynamic **periodic table UI** — no frameworks required 🚀  

---

## ✨ Features
- Components described as **plain JavaScript objects** with:
  - `tag` → HTML tag name  
  - `props` → className, attributes, textContent, events  
  - `children` → nested components/elements  
- **Reusable components**: `tableCard`, `groupCard`, `searchBar`  
- **Dynamic rendering**: build real DOM elements from JSON-like descriptions  
- **Search functionality**: filter elements by name or symbol in real-time  
- **Data-driven UI**: all UI is generated from `data/data.js`  

---

## 📂 Project Structure
project/
│── index.html # Entry HTML
│── index.js # App entry point
│── lib/
│ └── createElement.js # Core function to build DOM from descriptions
│── components/
│ ├── tableCard.js # Element card UI
│ ├── groupCard.js # Group card UI
│ └── searchBar.js # Search bar UI
│── data/
└── data.js # Dataset of element groups


---

## 🛠️ How it Works
1. **Describe components** as plain objects (`tag`, `props`, `children`).  
2. **`createElement()`** converts those descriptions into real DOM nodes.  
3. **Components (`tableCard`, `groupCard`, etc.)** return description objects filled with dynamic data.  
4. **`index.js`** wires everything: renders a search bar + all group cards.  

---

## 🚀 Run It
1. Clone/download project.  
2. Open `index.html` in your browser.  
3. Use the search bar to filter elements instantly.  

---

## 🔮 Example Component Description
```js
const tableCard = element => ({
  tag: "div",
  props: { className: "card", style: `background:${element.color};` },
  children: [
    { tag: "h3", props: { textContent: element.name } },
    { tag: "h1", props: { textContent: element.symbol } }
  ]
});