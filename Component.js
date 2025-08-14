// Component.js

export default class Component {
    static context = {};
    static routes = {};
    static currentComponent = null; // track mounted component for cleanup

    constructor(el, props = {}) {
        // Element handling
        if (typeof el === "string") {
            if (el.startsWith("#") || el.startsWith(".")) {
                const found = document.querySelector(el);
                if (!found) throw new Error(`No element found for selector: ${el}`);
                this.element = found;
            } else {
                this.element = document.createElement(el);
            }
        } else if (el instanceof HTMLElement) {
            this.element = el;
        } else {
            throw new Error("The 'el' parameter must be a tag name, selector, or HTMLElement.");
        }

        this.props = props;
        this.childrenComponents = [];
        this.boundElements = {};
        this.eventListeners = [];

        // State with reactivity
        const initialState = props.initialState || {};
        this.state = new Proxy(initialState, {
            set: (target, key, value) => {
                if (target[key] === value) return true; // no change
                target[key] = value;
                this.updateBoundElements(key, value);
                this.onUpdate();
                return true;
            }
        });

        // Apply setup methods
        this.#applyMeta();
        this.#applyAccessibility();
        this.#applyClassName();
        this.#applyId();
        this.#applyStyles();
        this.#applyChildren();
        this.#applyAttributes();
        this.#applyEvents();
    }

    // ---------------- Lifecycle ----------------
    onMount() {
        if (typeof this.props.onMount === "function") this.props.onMount(this);
    }
    onUpdate() {
        if (typeof this.props.onUpdate === "function") this.props.onUpdate(this);
    }
    onUnmount() {
        if (typeof this.props.onUnmount === "function") this.props.onUnmount(this);
    }

    mount(target) {
        if (typeof target === "string") {
            target = document.querySelector(target);
            if (!target) throw new Error(`No mount target found for selector: ${target}`);
        }
        if (!(target instanceof HTMLElement)) {
            throw new Error("Mount target must be an HTMLElement or a valid selector.");
        }
        target.appendChild(this.element);
        this.onMount();
    }

    unmount() {
        this.remove();
    }

    // ---------------- State ----------------
    setState(partial) {
        if (typeof partial !== "object") throw new Error("setState() expects an object.");
        for (const [key, value] of Object.entries(partial)) {
            this.state[key] = value;
        }
    }

    bindText(key, node) {
        if (!this.boundElements[key]) this.boundElements[key] = [];
        this.boundElements[key].push(node);
        node.textContent = this.state[key] ?? ""; // avoid "undefined"
    }
    updateBoundElements(key, value) {
        if (this.boundElements[key]) {
            this.boundElements[key].forEach(node => node.textContent = value ?? "");
        }
    }

    // ---------------- Context ----------------
    static setContext(key, value) { Component.context[key] = value; }
    static getContext(key) { return Component.context[key]; }

    // ---------------- Meta ----------------
    #applyMeta() {
        if (this.props.meta && typeof this.props.meta === "object") {
            for (const [name, content] of Object.entries(this.props.meta)) {
                let metaTag = document.querySelector(`meta[name="${name}"]`);
                if (!metaTag) {
                    metaTag = document.createElement("meta");
                    metaTag.setAttribute("name", name);
                    document.head.appendChild(metaTag);
                }
                metaTag.setAttribute("content", content);
            }
        }
    }

    // ---------------- Accessibility ----------------
    #applyAccessibility() {
        if (this.props.aria && typeof this.props.aria === "object") {
            for (const [attr, value] of Object.entries(this.props.aria)) {
                this.element.setAttribute(`aria-${attr}`, value);
            }
        }
        if (this.props.role) {
            this.element.setAttribute("role", this.props.role);
        }
    }

    // ---------------- DOM Setup ----------------
    #applyClassName() {
        if (this.props.className) this.element.className = this.props.className;
    }
    #applyId() {
        if (this.props.id) this.element.id = this.props.id;
    }
    #applyStyles() {
        if (this.props.style && typeof this.props.style === "object") {
            Object.assign(this.element.style, this.props.style);
        }
    }
    #applyChildren() {
        if (!this.props.children) return;

        const appendChild = (child) => {
            if (child instanceof Component) {
                this.element.appendChild(child.render());
                this.childrenComponents.push(child);
            } else if (child instanceof HTMLElement) {
                this.element.appendChild(child);
            } else if (typeof child === "string") {
                this.element.appendChild(document.createTextNode(child));
            } else {
                throw new Error("Invalid child type.");
            }
        };

        if (Array.isArray(this.props.children)) {
            this.props.children.forEach(appendChild);
        } else {
            appendChild(this.props.children);
        }
    }
    #applyAttributes() {
        if (this.props.attributes && typeof this.props.attributes === "object") {
            for (const [key, value] of Object.entries(this.props.attributes)) {
                this.element.setAttribute(key, value);
            }
        }
    }
    #applyEvents() {
        if (this.props.events && typeof this.props.events === "object") {
            for (const [event, handler] of Object.entries(this.props.events)) {
                if (typeof handler === "function") {
                    const boundHandler = handler.bind(this);
                    this.element.addEventListener(event, boundHandler);
                    this.eventListeners.push({ event, handler: boundHandler });
                }
            }
        }
    }

    // ---------------- Public API ----------------
    render() {
        return this.element;
    }
    remove() {
        this.onUnmount();

        // Remove child components
        this.childrenComponents.forEach(child => {
            if (child instanceof Component) {
                child.remove();
            }
        });

        // Remove event listeners
        this.eventListeners.forEach(({ event, handler }) => {
            this.element.removeEventListener(event, handler);
        });

        if (this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
    }

    // ---------------- Routing ----------------
    static route(path, componentFn) {
        Component.routes[path] = componentFn;
    }
    static navigate(path) {
        if (Component.routes[path]) {
            if (Component.currentComponent) {
                Component.currentComponent.remove();
            }
            const comp = Component.routes[path]();
            comp.mount(document.body);
            Component.currentComponent = comp;
            history.pushState({}, "", path);
        }
    }
}
