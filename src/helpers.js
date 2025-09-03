// src/helpers.js
import { setState, getState } from "./Component.js";

// ---- Text & Class Helpers ----
export function updateComponentText(component, textContent) {
    setState(component, { props: { ...component.props, textContent } });
}

export function updateComponentClass(component, className = "") {
    setState(component, { props: { ...component.props, className: className.trim() } });
}

export function addComponentClass(component, className = "") {
    const current = (component.props.className || "").split(" ").filter(Boolean);
    if (!current.includes(className)) current.push(className);
    setState(component, { props: { ...component.props, className: current.join(" ") } });
}

export function toggleComponentClass(component, className = "") {
    const current = (component.props.className || "").split(" ").filter(Boolean);
    const index = current.indexOf(className);
    if (index > -1) {
        current.splice(index, 1);
    } else {
        current.push(className);
    }
    setState(component, { props: { ...component.props, className: current.join(" ") } });
}

export function removeComponentClass(component, className = "") {
    const current = (component.props.className || "").split(" ").filter(Boolean);
    setState(component, { props: { ...component.props, className: current.filter(c => c !== className).join(" ") } });
}

// ---- Style Helpers ----
export function updateComponentStyle(component, style = {}) {
    setState(component, { props: { ...component.props, style } });
}

export function addComponentStyle(component, style = {}) {
    const merged = { ...(component.props.style || {}), ...style };
    setState(component, { props: { ...component.props, style: merged } });
}

export function removeComponentStyle(component, keys = []) {
    const newStyle = { ...(component.props.style || {}) };
    for (const key of keys) {
        delete newStyle[key];
    }
    setState(component, { props: { ...component.props, style: newStyle } });
}

// ---- Attribute Helpers ----
export function updateComponentAttributes(component, attributes = {}) {
    setState(component, { props: { ...component.props, attributes } });
}

export function addComponentAttribute(component, attributes = {}) {
    const merged = { ...(component.props.attributes || {}), ...attributes };
    setState(component, { props: { ...component.props, attributes: merged } });
}

export function removeComponentAttribute(component, keys = []) {
    const newAttrs = { ...(component.props.attributes || {}) };
    for (const key of keys) {
        delete newAttrs[key];
    }
    setState(component, { props: { ...component.props, attributes: newAttrs } });
}

// ---- Event Helpers ----
export function addComponentEvent(component, event, callback) {
    const merged = { ...(component.props.events || {}), [event]: callback };
    setState(component, { props: { ...component.props, events: merged } });
}

export function removeComponentEvent(component, event) {
    const newEvents = { ...(component.props.events || {}) };
    delete newEvents[event];
    setState(component, { props: { ...component.props, events: newEvents } });
}

// ---- Children Helpers ----
export function updateComponentChildren(component, children = []) {
    setState(component, { children });
}

export function addComponentChildren(component, children = []) {
    setState(component, { children: [...(component.children || []), ...children] });
}

export function removeComponentChildren(component, children = []) {
    const current = [...(component.children || [])];
    const filtered = current.filter(child => !children.includes(child));
    setState(component, { children: filtered });
}

// ---- Selection Helpers ----
export function selectComponent(component) {
    addComponentClass(component, "selected");
}

export function deselectComponent(component) {
    removeComponentClass(component, "selected");
}
