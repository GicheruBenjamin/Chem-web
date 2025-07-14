

// Select elements
const body = document.body;

// Function to create a components
function Component(el, props = {}) {
    if (typeof el !== "string") {
        throw new Error("Component: 'el' must be a string representing an HTML tag name.");
    }

    const element = document.createElement(el);

    // Apply basic props
    if (props.className) element.className = props.className;
    if (props.id) element.id = props.id;
    if (props.title) element.title = props.title;

    // Apply inline styles
    if (props.style && typeof props.style === "object") {
        Object.assign(element.style, props.style);
    }

    // Apply data-* attributes
    if (props.dataset && typeof props.dataset === "object") {
        for (const [key, value] of Object.entries(props.dataset)) {
            element.dataset[key] = value;
        }
    }

    // Apply custom attributes
    if (props.attributes && typeof props.attributes === "object") {
        for (const [key, value] of Object.entries(props.attributes)) {
            element.setAttribute(key, value);
        }
    }

    // Add event listeners
    if (props.events && typeof props.events === "object") {
        for (const [event, handler] of Object.entries(props.events)) {
            if (typeof handler === "function") {
                element.addEventListener(event, handler);
            } else {
                throw new Error(`Component: Event handler for '${event}' must be a function.`);
            }
        }
    }

    // Handle children: string, number, DOM node, or array (including nested)
    if (props.children !== undefined) {
        const appendChild = (child) => {
            if (typeof child === "string" || typeof child === "number") {
                element.appendChild(document.createTextNode(child));
            } else if (child instanceof HTMLElement) {
                element.appendChild(child);
            } else {
                throw new Error("Component: children must be string, number, DOM node, or array of these.");
            }
        };

        if (Array.isArray(props.children)) {
            props.children.flat(Infinity).forEach(appendChild);
        } else {
            appendChild(props.children);
        }
    }

    return element;
}



const Header = Component("header", {
    className: "header",
    children: "Periodic Table"
});



//  A variable that holds the data for all the elements
// Allows mapping around the data
const periodicTableElements = [

    // Category one - Alkali Metal
        {
          name: "Lithium",
          symbol: "Li",
          electrons: 3,
          protons: 3,
          neutrons: 4,
          group: 1,
          category: "alkali metal",
          color: "#FF6666"
        },
        {
          name: "Sodium",
          symbol: "Na",
          electrons: 11,
          protons: 11,
          neutrons: 12,
          group: 1,
          category: "alkali metal",
          color: "#FF6666"
        },
        {
          name: "Potassium",
          symbol: "K",
          electrons: 19,
          protons: 19,
          neutrons: 20,
          group: 1,
          category: "alkali metal",
          color: "#FF6666"
        },
        {
          name: "Rubidium",
          symbol: "Rb",
          electrons: 37,
          protons: 37,
          neutrons: 48,
          group: 1,
          category: "alkali metal",
          color: "#FF6666"
        },
        {
          name: "Cesium",
          symbol: "Cs",
          electrons: 55,
          protons: 55,
          neutrons: 78,
          group: 1,
          category: "alkali metal",
          color: "#FF6666"
        },
        {
          name: "Francium",
          symbol: "Fr",
          electrons: 87,
          protons: 87,
          neutrons: 136,
          group: 1,
          category: "alkali metal",
          color: "#FF6666"
        },
        {
          name: "Beryllium",
          symbol: "Be",
          electrons: 4,
          protons: 4,
          neutrons: 5,
          group: 2,
          category: "alkaline earth metal",
          color: "#66CCFF"
        },
        {
          name: "Magnesium",
          symbol: "Mg",
          electrons: 12,
          protons: 12,
          neutrons: 12,
          group: 2,
          category: "alkaline earth metal",
          color: "#66CCFF"
        },
        {
          name: "Calcium",
          symbol: "Ca",
          electrons: 20,
          protons: 20,
          neutrons: 20,
          group: 2,
          category: "alkaline earth metal",
          color: "#66CCFF"
        },
        {
          name: "Strontium",
          symbol: "Sr",
          electrons: 38,
          protons: 38,
          neutrons: 50,
          group: 2,
          category: "alkaline earth metal",
          color: "#66CCFF"
        },
        {
          name: "Barium",
          symbol: "Ba",
          electrons: 56,
          protons: 56,
          neutrons: 81,
          group: 2,
          category: "alkaline earth metal",
          color: "#66CCFF"
        },
        {
          name: "Radium",
          symbol: "Ra",
          electrons: 88,
          protons: 88,
          neutrons: 138,
          group: 2,
          category: "alkaline earth metal",
          color: "#66CCFF"
        }
];
  

// Adding elements to the DOM
body.appendChild(Header);
document.addEventListener("DOMContentLoaded", () => {});