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

