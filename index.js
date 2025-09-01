// index.js
const body = document.body;

var profilecard = {
    tag : "div",
    props : {
        className : "card",
        id : "card",
        title: "Profile Card",
        style : {
            "color": "white",
            "background" : "black",
            "width" : "200px",
            "height" : "200px",
            "border" : "1px solid black",
            "text-align" : "center",
            "padding" : "10px",
            "margin" : "10px"
        },
        onmouseover : function() {
            this.style.background = "red";
        }
    },
    children : [
        {
            tag : "h1",
            props : {
                className : "card-title",
                style : {
                    "color" : "white",
                    "text-align" : "center"
                }
            },
            children : ["Hello World!"]
        },
        {
            tag : "button",
            props : {
                className : "card-btn",
                style : {
                    "color" : "white",
                    "background" : "black",
                    "border" : "none",
                    "padding" : "10px",
                    "border-radius" : "5px",
                    "cursor" : "pointer"
                },
                onclick : function() {
                    alert("Hello World!");
                }
            },
            children : ["Click Me!"]
        }
    ]
}

function createComponent(c={}){
    const element = document.createElement(c.tag);
    element.id = c.props.id;
    element.className = c.props.className;
    element.title = c.props.title;
    
}


document.addEventListener('DOMContentLoaded', function() {
    body.textContent = 'Hello World!';
});