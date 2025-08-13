// App js entry point of the application

import { elementsgroups } from './data.js';
import Component from './Component.js';

// Header Component
function HeaderComponent() {
  return new Component("header", {
    className: "header",
    children: new Component("h1", {
      children: "Periodic Table"
    })
  });
}

// Element symbol component (inside the element card)
function elementsymbol(element) {
  return new Component("div", {
    className: "element-symbol",
    style: { backgroundColor: element.color },
    children: element.symbol, // use children string for text
    attributes: { 'aria-hidden': 'true' }
  });
}

// Element info section (inside the element card)
function elementcardinfo(element) {
  return new Component("div", {
    className: "element-card-info",
    children: [
      new Component("div", { className: "element-name", children: element.name }),
      new Component("span", { className: "element-electrons", children: `e=${element.electrons}` }),
      new Component("span", { className: "element-protons", children: `p=${element.protons}` }),
      new Component("span", { className: "element-neutrons", children: `n=${element.neutrons}` })
    ]
  });
}

// Full element card
function elementcard(element) {
  return new Component("div", {
    className: "element-card",
    attributes: {
      role: "button",
      tabindex: "0",
      'aria-label': `${element.name} (${element.symbol})`
    },
    // events handlers are bound to the Component instance (this inside handler -> component)
    events: {
      click() { 
        // this refers to the Component instance for the element card
        // showPreview is an external function expected to exist in scope
        if (typeof showPreview === 'function') showPreview(element);
      },
      keydown(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (typeof showPreview === 'function') showPreview(element);
        }
      }
    },
    children: [
      elementsymbol(element),
      elementcardinfo(element)
    ]
  });
}

// Group icon card
function groupiconcard(group) {
  return new Component("div", {
    className: "group-icon-card",
    children: [
      new Component("span", { className: "group-icon", children: group.icon }),
      new Component("span", { className: "group-name", children: group.groupname })
    ]
  });
}

// Group container
function groupcontainer(group) {
  return new Component("section", {
    className: group.className,
    attributes: { 'aria-label': group.groupname },
    children: [
      groupiconcard(group),
      new Component("div", {
        className: "group-elements-container",
        // pass array of Component instances; the Component class will append them
        children: group.elements.map(elementcard)
      })
    ]
  });
}

function MainLayout() {
  return new Component("main", {
    className: "main-layout",
    // pass array of Component instances (one per group)
    children: elementsgroups.map(groupcontainer)
  });
}

// Example preview helper (keeps same API used by events above)
function showPreview(elementObj) {
  // find existing preview (if created via Component earlier it will be a DOM node)
  let previewEl = document.querySelector('.element-preview');
  if (previewEl) previewEl.remove();

  const preview = new Component('aside', {
    className: 'element-preview',
    attributes: { role: 'dialog', 'aria-label': `${elementObj.name} preview` },
    children: [
      new Component('h3', { children: elementObj.name }),
      new Component('p', { children: `Symbol: ${elementObj.symbol}` }),
      new Component('p', { children: `e:${elementObj.electrons} p:${elementObj.protons} n:${elementObj.neutrons}` }),
      new Component('button', {
        children: 'Close',
        events: { click() { preview.remove(); } },
        attributes: { 'aria-label': `Close preview for ${elementObj.name}` }
      })
    ]
  });

  document.body.appendChild(preview.render());
}

// Initialization: append rendered root components to the DOM
function Init() {
  // If importing as module, ensure elementsgroups exists in scope.
  const headerComp = HeaderComponent();
  const mainComp = MainLayout();

  document.body.prepend(headerComp.render());
  document.body.appendChild(mainComp.render());
}

document.addEventListener("DOMContentLoaded", Init);