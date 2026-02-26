// ~/lib/Component.js

   // Function to append children 
function appendChild(element, child) {
    if (child == null) return
  
    if (typeof child === "string" || typeof child === "number") {
      element.appendChild(document.createTextNode(child))
    } else if (child instanceof Node) {
      element.appendChild(child)
    } else if (Array.isArray(child)) {
      child.forEach(c => appendChild(element, c))
    } else {
      throw new Error("Invalid child type")
    }
}


export default function Component(el, props = {}) {
      // Validate that `el` is a string representing a valid HTML tag name
      if (typeof el !== "string") {
          throw new Error("The 'el' parameter must be a string representing an HTML element tag.");
      }

      // Create a new element
      const element = document.createElement(el);

     // Apply classes (className + ui merged)
      const classes = []

      if (props.className) {
        if (typeof props.className === "string") {
          classes.push(props.className)
        } else {
          throw new Error("className must be a string")
        }
      }

      if (props.ui) {
        if (typeof props.ui === "string") {
          classes.push(props.ui)
        } else if (Array.isArray(props.ui)) {
          classes.push(...props.ui)
        } else {
          throw new Error("ui must be string or array")
        }
      }

      if (classes.length) {
        element.className = classes.join(" ")
}

      // Apply id if provided
      if (props.id) {
          element.id = props.id;
      }

      // Apply inline styles if provided (as an object)
      if (props.style && typeof props.style === "object") {
          Object.assign(element.style, props.style);
      }

  
      // Handle children
      if (props.children) {
          appendChild(element, props.children)
      }

      // Apply attributes if provided (as an object)
      if (props.attributes && typeof props.attributes === "object") {
        for (const [key, value] of Object.entries(props.attributes)) {
          if (typeof value === "boolean") {
            element[key] = value
          } else {
            element.setAttribute(key, value)
          }
        }
      }

      // Apply data set if provided (as an object)
      if (props.dataset && typeof props.dataset === "object") {
        for (const [key, value] of Object.entries(props.dataset)) {
          element.dataset[key] = value
        }
      }

      // Apply ref if provided
      if (props.ref) {
        if (typeof props.ref === "function") {
          props.ref(element)
        } else {
          throw new Error("ref must be a function")
        }
      }

      // Add event listeners if provided (as an object)
      if (props.events && typeof props.events === "object") {
          for (const [event, handler] of Object.entries(props.events)) {
              if (typeof handler === "function") {
                  element.addEventListener(event, handler);
              } else {
                  throw new Error(`Event handler for '${event}' must be a function.`);
              }
          }
      }

      // Return the created and configured element
      return element;

}