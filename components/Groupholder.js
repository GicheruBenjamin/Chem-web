// components/Groupholder.js
// This helps to hold a group of elements
// Group : name . elements , icon , className

const Groupholder = {
    tag: "div",
    props: {
        className: "",// the className of the group
    },
    children: [
        { // name
            tag: "h3",
            props: {
                className: "group-name",
                textContent: "" // the name of the group
            },
        },
        {//icon
            tag: "span",
            props: {
                className: "group-icon",
                textContent: "" // the icon of the group
            },
        },
        { // elements container
            tag: "div",
            props: {
                className: "group-elements-container",
            },
            children: [] // the elements of the group
        }
    ]
}