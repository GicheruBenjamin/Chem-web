// src/helpers.js


function updateComponenttextContent(component, textContent){
    component.props.textContent = textContent
    renderComponent(component)
}

function updateComponentClassName(component, className = ""){
    component.props.className = className
    renderComponent(component)
}

function addComponentClasslist(component, className = ""){
    if (component.props.className){
        component.props.className = component.props.className + " " + className
    } else {
        component.props.className = className
    }
    renderComponent(component)
}

function toggleComponentClasslist(component, className = ""){
    if (component.props.className.includes(className)){
        component.props.className = component.props.className.replace(className, "")
    } else {
        component.props.className = component.props.className + " " + className
    }
    renderComponent(component)
}

function removeComponentClasslist(component, className = ""){
    component.props.className = component.props.className.replace(className, "")
    renderComponent(component)
}

function updateComponentStyle(component, style = {}){
    component.props.style = style
    renderComponent(component)
}

function addComponentStyle(component, style = {}){
    for (const key in style){
        component.props.style[key] = style[key]
    }
    renderComponent(component)
}

function removeComponentStyle(component, style = {}){
    for (const key in style){
        component.props.style[key] = ""
    }
    renderComponent(component)
}


function updateComponentAttributes(component, attributes = {}){
    component.props.attributes = attributes
    renderComponent(component)
}

function addComponentAttribute(component, attribute = {}){
    for (const key in attribute){
        component.props.attributes[key] = attribute[key]
    }
    renderComponent(component)
}

function removeComponentAttribute(component, attribute = {}){
    for (const key in attribute){
        component.props.attributes[key] = ""
    }
    renderComponent(component)
}

// addComponentEvent(component, event, callback)
function addComponentEvent(component, event, callback){
    component.props.events[event] = callback
    renderComponent(component)
}

// removeComponentEvent(component, event)
function removeComponentEvent(component, event){
    delete component.props.events[event]
    renderComponent(component)
}

function updateComponentChildren(component, children = []){
    component.children = children
    renderComponent(component)
}

function addComponentChildren(component, children = []){
    component.children.push(...children)
    renderComponent(component)
}

function removeComponentChildren(component, children = []){
    for (const child of children){
        const index = component.children.indexOf(child)
        if (index > -1){
            component.children.splice(index, 1)
        }
    }
    renderComponent(component)
}

//selectComponent(component)
function selectComponent(component){
    component.props.className = component.props.className + " selected"
    renderComponent(component)
}

//deselectComponent(component)
function deselectComponent(component){
    component.props.className = component.props.className.replace("selected", "")
    renderComponent(component)
}