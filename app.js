

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



  

// Adding elements to the DOM
document.addEventListener("DOMContentLoaded", () => {});