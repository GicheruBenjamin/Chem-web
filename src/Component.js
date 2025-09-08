// src/Component.js
export class Component {
    constructor(config = {}) {
      this.tag = config.tag || "div";
      this.props = config.props || {};
      this.children = config.children || [];
      this._root = null;
      this._mounted = false;
  
      // state
      this.state = { ...(this.props.initState || {}) };
    }
  
    // create a real DOM element from config
    _createElement(config) {
      if (config == null) return document.createTextNode("");
      if (typeof config === "string" || typeof config === "number") {
        return document.createTextNode(String(config));
      }
  
      const el = document.createElement(config.tag || "div");
      const props = config.props || {};
  
      // textContent
      if (props.textContent != null) {
        el.textContent = String(props.textContent);
      }
  
      // className
      if (props.className) {
        el.className = props.className;
      }
  
      // attributes
      if (props.attributes) {
        Object.entries(props.attributes).forEach(([k, v]) => {
          if (v != null) el.setAttribute(k, v);
        });
      }
  
      // style
      if (props.style) {
        Object.assign(el.style, props.style);
      }
  
      // events
      if (props.events) {
        Object.entries(props.events).forEach(([ev, fn]) => {
          if (typeof fn === "function") el.addEventListener(ev, fn);
        });
      }
  
      // ref
      if (typeof props.ref === "function") {
        props.ref(el);
      }
  
      // children
      if (Array.isArray(config.children)) {
        config.children.forEach((child) => el.appendChild(this._createElement(child)));
      }
  
      return el;
    }
  
    // paint the component (first render or after setState)
    render() {
      const tree = {
        tag: this.tag,
        props: this.props,
        children: this.children,
      };
      return this._createElement(tree);
    }
  
    // mount into a parent DOM node
    mount(parent) {
      if (this._mounted) return;
      this._root = this.render();
      parent.appendChild(this._root);
      this._mounted = true;
  
      if (typeof this.props.onMount === "function") {
        this.props.onMount(this._root, this.state);
      }
    }
  
    // unmount from DOM
    unmount() {
      if (!this._mounted) return;
      if (typeof this.props.onUnmount === "function") {
        this.props.onUnmount(this._root, this.state);
      }
      this._root.remove();
      this._mounted = false;
      this._root = null;
    }
  
    // update state and re-render
    setState(updater) {
      const prevState = { ...this.state };
      const nextState =
        typeof updater === "function" ? updater(prevState) : updater;
      this.state = { ...prevState, ...nextState };
  
      if (this._mounted) {
        const newRoot = this.render();
        this._root.replaceWith(newRoot);
        this._root = newRoot;
  
        if (typeof this.props.onUpdate === "function") {
          this.props.onUpdate(this._root, prevState, this.state);
        }
      }
    }
  }
  