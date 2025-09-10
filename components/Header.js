// components/Header.js
// Header of the page
// Title , description , author

const Header = {
    tag: "div",
    props: {
        className: "header",
    },
    children: [
        {
            tag: "h1",
            props: {
                className: "title",
                textContent: "Periodic Table" // the title of the page
            },
        },
        {
            tag: "p",
            props: {
                className: "description",
                textContent: "A periodic table" // the description of the page
            },
        },
        {
            tag: "p",
            props: {
                className: "author",
                textContent: "Author" // the author of the page
            },
        }
    ]
}