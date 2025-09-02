<<<<<<< HEAD
//  src/Component.js

export default function renderComponent(c={}){
    const props = c.props || {}
    //If the tag is there or is not a string 
    // We provide an error
    if(c.tag == null || typeof c.tag != "string"){
        console.log(`Check the tag "${c.tag}" — might be null or not a string`)
    }
    //Create an element from the tag if no issues
    const element = document.createElement(c.tag)

    // Check presence
    if(props === null){
        console.log("There are no props")
    }

    // Add textContent
    // If textContent is present and is type of string of string or number 
    // add it to the component. 
    if (props.textContent != null && 
        (typeof props.textContent === "string" || typeof props.textContent === "number")) {
        element.textContent = props.textContent;
    }
    else{
        console.log(`There is no textContent in ${props.className}`)
    }

    // Add className
    if(props.className != null && typeof props.className == "string"){
        element.className = props.className
    }
    else{
        console.log(`${this} lacks a className`)
    }

    // Add style = {}
    if (props.style && typeof props.style === "object" && Object.keys(props.style).length > 0) {
        for (const key in props.style) {
            if (Object.prototype.hasOwnProperty.call(props.style, key)) {
                element.style[key] = props.style[key];
            }
        }
    } else {
        console.log(`No styles provided for ${props.className || element.tagName}`);
    }

    // Add attributes = {}
    if (props.attributes && typeof props.attributes === "object" && Object.keys(props.attributes).length > 0) {
        for (const key in props.attributes) {
            if (Object.prototype.hasOwnProperty.call(props.attributes, key)) {
                element.setAttribute(key, props.attributes[key]);
            }
        }
    } else {
        console.log(`No attributes provided for ${props.className || element.tagName}`);
    }
  
    
    //Add event listeners
    if (props.events && typeof props.events === "object") {
        for (const [event, handler] of Object.entries(props.events)) {
            element.addEventListener(event, handler);
        }
    }
    else{
        console.log(props.className || element.tagName, "has no events")
    }    

    // Add children = []
    // Loop thru children and create them and append them to the component

    if (Array.isArray(c.children)) {
        for (const child of c.children) {
            const ch = renderComponent(child);
            element.appendChild(ch);
        }
    }
    
    return element
}

=======
// src/Component.js

// State + lifecycle storage
const states = new WeakMap();
const lifecycles = new WeakMap();
const mounted = new WeakSet();

/**
 * Renders or updates a component into a real DOM element.
 * Component shape: { tag: "div", props: {...}, children: [...] }
 */
export function renderComponent(component) {
    if (typeof component.tag !== "string") {
        console.error("Component tag must be a string");
        return document.createTextNode("");
    }

    // Reuse existing DOM element if available
    let element = component._el || document.createElement(component.tag);

    // === Apply props with diffing ===
    const prevProps = component._prevProps || {};
    const nextProps = component.props || {};

    // Text content
    if (nextProps.textContent !== prevProps.textContent) {
        element.textContent = nextProps.textContent || "";
    }

    // Class name (clean up spaces)
    if (nextProps.className !== prevProps.className) {
        element.className = (nextProps.className || "").replace(/\s+/g, " ").trim();
    }

    // Inline styles
    if (nextProps.style) {
        for (const key in nextProps.style) {
            if (nextProps.style[key] !== prevProps.style?.[key]) {
                element.style[key] = nextProps.style[key];
            }
        }
    }

    // Attributes
    if (nextProps.attributes) {
        for (const key in nextProps.attributes) {
            if (nextProps.attributes[key] !== prevProps.attributes?.[key]) {
                element.setAttribute(key, nextProps.attributes[key]);
            }
        }
    }

    // Special props for form controls
    if (["input", "textarea", "select"].includes(component.tag)) {
        if ("value" in nextProps && nextProps.value !== prevProps.value) {
            element.value = nextProps.value;
        }
        if ("checked" in nextProps && nextProps.checked !== prevProps.checked) {
            element.checked = nextProps.checked;
        }
        if ("selectedIndex" in nextProps && nextProps.selectedIndex !== prevProps.selectedIndex) {
            element.selectedIndex = nextProps.selectedIndex;
        }
    }

    // Events
    if (nextProps.events) {
        for (const key in nextProps.events) {
            if (nextProps.events[key] !== prevProps.events?.[key]) {
                if (prevProps.events?.[key]) {
                    element.removeEventListener(key, prevProps.events[key]);
                }
                element.addEventListener(key, nextProps.events[key]);
            }
        }
    }

    // === Render children recursively ===
    if (Array.isArray(component.children)) {
        // Simple diff: clear and re-render
        element.innerHTML = "";
        for (const child of component.children) {
            element.appendChild(renderComponent(child));
        }
    }

    // Save reference + prev props
    component._el = element;
    component._prevProps = { ...nextProps };

    // === Lifecycle handling ===
    if (!mounted.has(component)) {
        mounted.add(component);
        lifecycles.get(component)?.onMount?.(element);
    } else {
        lifecycles.get(component)?.onUpdate?.(element);
    }

    return element;
}

// Lifecycle registration
export function setLifecycle(component, hooks = {}) {
    lifecycles.set(component, hooks);
}

// State helpers
export function setState(component, newState) {
    const prev = states.get(component) || {};
    const next = { ...prev, ...newState };
    states.set(component, next);
    renderComponent(component);
}
export function getState(component) {
    return states.get(component) || {};
}

// Cleanup
export function destroyComponent(component) {
    if (component._el?.parentNode) {
        lifecycles.get(component)?.onUnmount?.(component._el);
        component._el.remove();
        mounted.delete(component);
        lifecycles.delete(component);
        states.delete(component);
    }
}
>>>>>>> refs/remotes/origin/prod
