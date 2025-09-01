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
