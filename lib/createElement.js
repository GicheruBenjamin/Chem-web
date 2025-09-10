export function createElement(node) {
    const el = document.createElement(node.tag);
  
    // props
    if (node.props) {
      const { className, textContent, events, ...attrs } = node.props;
  
      if (className) el.className = className;
      if (textContent) el.textContent = textContent;
  
      // set other attributes (id, type, placeholder, etc.)
      Object.entries(attrs).forEach(([key, value]) => {
        if (value !== undefined) el.setAttribute(key, value);
      });
  
      // bind events
      if (events) {
        Object.entries(events).forEach(([event, handler]) => {
          el.addEventListener(event, handler);
        });
      }
    }
  
    // children
    if (node.children) {
      node.children.forEach(child =>
        el.appendChild(
          typeof child === "string" ? document.createTextNode(child) : createElement(child)
        )
      );
    }
  
    return el;
  }
  