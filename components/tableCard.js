// Table card component

var tableCardelectronstext = {
    tag : "span",
    props : {
        className : "table-card-electrons",
    },
}
var tableCardprotonstext = {
    tag : "span",
    props : {
        className : "table-card-protons",
    },
}
var tableCardneutronstext = {
    tag : "span",
    props : {
        className : "table-card-neutrons",
    },
}
var tableCardElementnametext = {
    tag : "h3",
    props : {
        className : "table-card-element-name",
    },
}
var tableCardElementsymboltext = {
    tag : "span",
    props : {
        className : "table-card-element-symbol",
    },
}
var table_card = {
    tag : "div",
    props :{
        className : "table-card",
    },
    children : [
        tableCardelectronstext,
        tableCardprotonstext,
        tableCardneutronstext,
        tableCardElementnametext,
        tableCardElementsymboltext,
    ],
}