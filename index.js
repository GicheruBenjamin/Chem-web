// Entry point
import renderComponent from "./src/Component.js"

// Have the body
const body = document.body

const Card = {
    tag : "div",
    props : {
        textContent: " Hello I am here.",
        className: "card",
    }
}


// Mount when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
    body.appendChild(renderComponent(Card))
})
