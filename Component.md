# Component Class Structure

## Properties

### Instance Properties
- **`el`** *(string)* — Tag name of the HTML element (e.g., `"div"`, `"button"`).
- **`props`** *(object)* — Configuration object passed during creation.
- **`state`** *(Proxy<object>)* — Reactive state object; changes trigger UI updates.
- **`element`** *(HTMLElement)* — The actual DOM element created by the component.
- **`boundElements`** *(object)* — Maps state keys to arrays of DOM nodes for reactive binding.
- **`eventListeners`** *(array)* — Stores event listeners for cleanup when unmounting.

### Static Properties
- **`context`** *(object)* — Global key-value store shared between all components.
- **`routes`** *(object)* — Path-to-component mappings for simple routing.

---

## Methods

### Public Instance Methods
- **`render()`** → Returns the DOM element for appending to the document.
- **`remove()`** → Calls `onUnmount()`, cleans up listeners, and removes the element from the DOM.
- **`bindText(key, node)`** → Binds a text node to a state key for automatic updates.
- **`updateBoundElements(key, value)`** → Updates all bound nodes when state changes.
- **`onMount()`** → Lifecycle hook: called after element creation.
- **`onUpdate()`** → Lifecycle hook: called after state changes.
- **`onUnmount()`** → Lifecycle hook: called before element removal.

### Private Instance Methods
- **`#applyMeta()`** → Creates/updates `<meta>` tags in the document head.
- **`#applyAccessibility()`** → Sets ARIA attributes and roles.
- **`#applyClassName()`** → Applies the CSS class name.
- **`#applyId()`** → Applies the HTML element ID.
- **`#applyStyles()`** → Applies inline CSS styles.
- **`#applyChildren()`** → Appends children (strings, DOM nodes, or Components).
- **`#applyAttributes()`** → Sets HTML attributes from an object.
- **`#applyEvents()`** → Attaches event listeners and stores them for cleanup.

### Static Methods
- **`setContext(key, value)`** → Stores a value in the global context.
- **`getContext(key)`** → Retrieves a value from the global context.
- **`route(path, componentFn)`** → Registers a route that returns a Component instance.
- **`navigate(path)`** → Clears the body and renders the component for the given route.

classDiagram
    class Component {
        <<static>> context : object
        <<static>> routes : object

        + el : string
        + props : object
        + state : Proxy<object>
        + element : HTMLElement
        + boundElements : object
        + eventListeners : array

        + render() : HTMLElement
        + remove() : void
        + bindText(key, node) : void
        + updateBoundElements(key, value) : void
        + onMount() : void
        + onUpdate() : void
        + onUnmount() : void

        # applyMeta() : void
        # applyAccessibility() : void
        # applyClassName() : void
        # applyId() : void
        # applyStyles() : void
        # applyChildren() : void
        # applyAttributes() : void
        # applyEvents() : void

        <<static>> setContext(key, value) : void
        <<static>> getContext(key) : any
        <<static>> route(path, componentFn) : void
        <<static>> navigate(path) : void
    }

    %% self-association: component may contain child components
    Component "1" -- "0..*" Component : children

