// src/Component.js

/**
 * Renders a component object into a real DOM element.
 * Component shape: { tag: "div", props: {...}, children: [...] }
 */
function renderComponent(c = {}) {
    // 1. Validate tag
    if (typeof c.tag !== "string") {
        console.error("Component tag must be a string");
        return document.createTextNode(""); // fallback
    }

    // 2. Create the element
    const element = document.createElement(c.tag);

    // 3. Apply props
    if (c.props) {
        // textContent
        if (c.props.textContent) {
            element.textContent = c.props.textContent;
        }
        // className
        if (c.props.className) {
            element.className = c.props.className;
        }
        // inline styles (style: {color: "red"})
        if (c.props.style) {
            for (const key in c.props.style) {
                element.style[key] = c.props.style[key]; // ✅ fixed here
            }
        }
        // attributes (attributes: {id: "main", src: "img.png"})
        if (c.props.attributes) {
            for (const key in c.props.attributes) {
                element.setAttribute(key, c.props.attributes[key]);
            }
        }
        // events (events: {click: fn, input: fn})
        if (c.props.events) {
            for (const key in c.props.events) {
                element.addEventListener(key, c.props.events[key]);
            }
        }
    }

    // 4. Render children recursively
    if (Array.isArray(c.children)) {
        for (const child of c.children) {
            element.appendChild(renderComponent(child));
        }
    }

    // 5. Return finished DOM node
    return element;
}
