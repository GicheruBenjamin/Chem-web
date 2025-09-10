// components/tableCard.js
//Card to display a  periodic table
// Element : name , symbol , electrons , protons , neutrons , color


const card = {
    tag: "div",
    props: {
        className: "card",
        styles : {
            color : "" , // the color of the card is dynamic
        }
    },
    //children 2 divs containers : 1. name and symbol 2.electrons , protons and neutrons
    children: [
        {
            tag: "div",
            props: {
                className: "element-name-container",
            },
            //children : name , symbol
            children: [
                {
                    tag: "h3",
                    props: {
                        className: "element-name",
                        textContent: "" //Dynamic name
                    },
                },
                {
                    tag: "h1",
                    props: {
                        className: "element-symbol",
                        textContent: "" //Dynamic symbol
                    },
                }
            ]
        },
        {
            tag: "div",
            props: {
                className: "element-info-container",
            },
            children: [
                {
                    tag: "span",
                    props: {
                        className: "element-electrons",
                        textContent: "" //Dynamic electrons
                    },
                },
                {
                    tag: "span",
                    props: {
                        className: "element-protons",
                        textContent: "" //Dynamic protons
                    },
                },
                {
                    tag: "span",
                    props: {
                        className: "element-neutrons",
                        textContent: "" //Dynamic neutrons
                    },
                }
            ]
        }
    ]
}