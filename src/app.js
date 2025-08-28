
const app = {
    tag : "div",
    props : {
        className : "app",
    },
    children : [
        {
            tag : "div",
            props : {
                className : "app-header",
            },
            children : [
                {
                    tag : "h1",
                    props : {
                        className : "app-header-title",
                    },
                    children : [
                        {
                            tag : "span",
                            props : {
                                className : "app-header-title-text",
                            },
                            children : [
                                "Chem-HTML",
                            ],
                        },
                    ],
                },
            ],
        },
    ]
}

const body = document.body

document.addEventListener("DOMContentLoaded", () => {
    body.appendChild(renderComponent(app))
})