

// Select elements
const body = document.body;

// Function to create a components
function Component(el, props = {}) {
    if (typeof el !== "string") {
        throw new Error("Component: 'el' must be a string representing an HTML tag name.");
    }

    const element = document.createElement(el);

    // Apply basic props
    if (props.className) element.className = props.className;
    if (props.id) element.id = props.id;
    if (props.title) element.title = props.title;

    // Apply inline styles
    if (props.style && typeof props.style === "object") {
        Object.assign(element.style, props.style);
    }

    // Apply data-* attributes
    if (props.dataset && typeof props.dataset === "object") {
        for (const [key, value] of Object.entries(props.dataset)) {
            element.dataset[key] = value;
        }
    }

    // Apply custom attributes
    if (props.attributes && typeof props.attributes === "object") {
        for (const [key, value] of Object.entries(props.attributes)) {
            element.setAttribute(key, value);
        }
    }

    // Add event listeners
    if (props.events && typeof props.events === "object") {
        for (const [event, handler] of Object.entries(props.events)) {
            if (typeof handler === "function") {
                element.addEventListener(event, handler);
            } else {
                throw new Error(`Component: Event handler for '${event}' must be a function.`);
            }
        }
    }

    // Handle children: string, number, DOM node, or array (including nested)
    if (props.children !== undefined) {
        const appendChild = (child) => {
            if (typeof child === "string" || typeof child === "number") {
                element.appendChild(document.createTextNode(child));
            } else if (child instanceof HTMLElement) {
                element.appendChild(child);
            } else {
                throw new Error("Component: children must be string, number, DOM node, or array of these.");
            }
        };

        if (Array.isArray(props.children)) {
            props.children.flat(Infinity).forEach(appendChild);
        } else {
            appendChild(props.children);
        }
    }

    return element;
}


const alkaliMetals = [
    { name: 'Hydrogen', symbol: 'H', electrons: 1, protons: 1, neutrons: 0, color: '#F2F2F2' },
    { name: 'Lithium', symbol: 'Li', electrons: 3, protons: 3, neutrons: 4, color: '#CC6666' },
    { name: 'Sodium', symbol: 'Na', electrons: 11, protons: 11, neutrons: 12, color: '#CC6666' },
    { name: 'Potassium', symbol: 'K', electrons: 19, protons: 19, neutrons: 20, color: '#CC6666' },
    { name: 'Rubidium', symbol: 'Rb', electrons: 37, protons: 37, neutrons: 48, color: '#CC6666' },
    { name: 'Cesium', symbol: 'Cs', electrons: 55, protons: 55, neutrons: 78, color: '#CC6666' },
    { name: 'Francium', symbol: 'Fr', electrons: 87, protons: 87, neutrons: 136, color: '#CC6666' }
  ];
  
const alkalineEarthMetals = [
{ name: 'Beryllium', symbol: 'Be', electrons: 4, protons: 4, neutrons: 5, color: '#FFD700' },
{ name: 'Magnesium', symbol: 'Mg', electrons: 12, protons: 12, neutrons: 12, color: '#FFD700' },
{ name: 'Calcium', symbol: 'Ca', electrons: 20, protons: 20, neutrons: 20, color: '#FFD700' },
{ name: 'Strontium', symbol: 'Sr', electrons: 38, protons: 38, neutrons: 50, color: '#FFD700' },
{ name: 'Barium', symbol: 'Ba', electrons: 56, protons: 56, neutrons: 81, color: '#FFD700' },
{ name: 'Radium', symbol: 'Ra', electrons: 88, protons: 88, neutrons: 138, color: '#FFD700' }
];

const group13 = [
{ name: 'Boron', symbol: 'B', electrons: 5, protons: 5, neutrons: 6, color: '#8A2BE2' },
{ name: 'Aluminum', symbol: 'Al', electrons: 13, protons: 13, neutrons: 14, color: '#DAA520' },
{ name: 'Gallium', symbol: 'Ga', electrons: 31, protons: 31, neutrons: 39, color: '#DAA520' },
{ name: 'Indium', symbol: 'In', electrons: 49, protons: 49, neutrons: 66, color: '#DAA520' },
{ name: 'Thallium', symbol: 'Tl', electrons: 81, protons: 81, neutrons: 123, color: '#DAA520' },
{ name: 'Nihonium', symbol: 'Nh', electrons: 113, protons: 113, neutrons: 173, color: '#DAA520' }
];

const group14 = [
{ name: 'Carbon', symbol: 'C', electrons: 6, protons: 6, neutrons: 6, color: '#228B22' },
{ name: 'Silicon', symbol: 'Si', electrons: 14, protons: 14, neutrons: 14, color: '#8A2BE2' },
{ name: 'Germanium', symbol: 'Ge', electrons: 32, protons: 32, neutrons: 41, color: '#8A2BE2' },
{ name: 'Tin', symbol: 'Sn', electrons: 50, protons: 50, neutrons: 69, color: '#DAA520' },
{ name: 'Lead', symbol: 'Pb', electrons: 82, protons: 82, neutrons: 125, color: '#DAA520' },
{ name: 'Flerovium', symbol: 'Fl', electrons: 114, protons: 114, neutrons: 175, color: '#DAA520' }
];

const group15 = [
    { name: 'Nitrogen', symbol: 'N', electrons: 7, protons: 7, neutrons: 7, color: '#006699' },
    { name: 'Phosphorus', symbol: 'P', electrons: 15, protons: 15, neutrons: 16, color: '#006699' },
    { name: 'Arsenic', symbol: 'As', electrons: 33, protons: 33, neutrons: 42, color: '#006699' },
    { name: 'Antimony', symbol: 'Sb', electrons: 51, protons: 51, neutrons: 71, color: '#006699' },
    { name: 'Bismuth', symbol: 'Bi', electrons: 83, protons: 83, neutrons: 126, color: '#006699' },
    { name: 'Moscovium', symbol: 'Mc', electrons: 115, protons: 115, neutrons: 174, color: '#006699' }
  ];
  
  const group16 = [
    { name: 'Oxygen', symbol: 'O', electrons: 8, protons: 8, neutrons: 8, color: '#FF8C00' },
    { name: 'Sulfur', symbol: 'S', electrons: 16, protons: 16, neutrons: 16, color: '#FF8C00' },
    { name: 'Selenium', symbol: 'Se', electrons: 34, protons: 34, neutrons: 45, color: '#FF8C00' },
    { name: 'Tellurium', symbol: 'Te', electrons: 52, protons: 52, neutrons: 76, color: '#FF8C00' },
    { name: 'Polonium', symbol: 'Po', electrons: 84, protons: 84, neutrons: 125, color: '#FF8C00' },
    { name: 'Livermorium', symbol: 'Lv', electrons: 116, protons: 116, neutrons: 177, color: '#FF8C00' }
  ];
  
  const halogens = [
    { name: 'Fluorine', symbol: 'F', electrons: 9, protons: 9, neutrons: 10, color: '#00CED1' },
    { name: 'Chlorine', symbol: 'Cl', electrons: 17, protons: 17, neutrons: 18, color: '#00CED1' },
    { name: 'Bromine', symbol: 'Br', electrons: 35, protons: 35, neutrons: 45, color: '#00CED1' },
    { name: 'Iodine', symbol: 'I', electrons: 53, protons: 53, neutrons: 74, color: '#00CED1' },
    { name: 'Astatine', symbol: 'At', electrons: 85, protons: 85, neutrons: 125, color: '#00CED1' },
    { name: 'Tennessine', symbol: 'Ts', electrons: 117, protons: 117, neutrons: 177, color: '#00CED1' }
  ];
  
  const nobleGases = [
    { name: 'Helium', symbol: 'He', electrons: 2, protons: 2, neutrons: 2, color: '#FF69B4' },
    { name: 'Neon', symbol: 'Ne', electrons: 10, protons: 10, neutrons: 10, color: '#FF69B4' },
    { name: 'Argon', symbol: 'Ar', electrons: 18, protons: 18, neutrons: 22, color: '#FF69B4' },
    { name: 'Krypton', symbol: 'Kr', electrons: 36, protons: 36, neutrons: 48, color: '#FF69B4' },
    { name: 'Xenon', symbol: 'Xe', electrons: 54, protons: 54, neutrons: 77, color: '#FF69B4' },
    { name: 'Radon', symbol: 'Rn', electrons: 86, protons: 86, neutrons: 136, color: '#FF69B4' },
    { name: 'Oganesson', symbol: 'Og', electrons: 118, protons: 118, neutrons: 176, color: '#FF69B4' }
  ];
  
  const group3 = [
    { name: 'Scandium', symbol: 'Sc', electrons: 21, protons: 21, neutrons: 24, color: '#4682B4' },
    { name: 'Yttrium', symbol: 'Y', electrons: 39, protons: 39, neutrons: 50, color: '#4682B4' },
    { name: 'Lanthanum', symbol: 'La', electrons: 57, protons: 57, neutrons: 82, color: '#4682B4' },
    { name: 'Actinium', symbol: 'Ac', electrons: 89, protons: 89, neutrons: 138, color: '#4682B4' }
  ];
  
  const group4 = [
    { name: 'Titanium', symbol: 'Ti', electrons: 22, protons: 22, neutrons: 26, color: '#4682B4' },
    { name: 'Zirconium', symbol: 'Zr', electrons: 40, protons: 40, neutrons: 51, color: '#4682B4' },
    { name: 'Hafnium', symbol: 'Hf', electrons: 72, protons: 72, neutrons: 106, color: '#4682B4' },
    { name: 'Rutherfordium', symbol: 'Rf', electrons: 104, protons: 104, neutrons: 157, color: '#4682B4' }
  ];
  
  const lanthanides = [
    { name: 'Lanthanum', symbol: 'La', electrons: 57, protons: 57, neutrons: 82, color: '#9370DB' },
    { name: 'Cerium', symbol: 'Ce', electrons: 58, protons: 58, neutrons: 82, color: '#9370DB' },
    { name: 'Praseodymium', symbol: 'Pr', electrons: 59, protons: 59, neutrons: 82, color: '#9370DB' },
    { name: 'Neodymium', symbol: 'Nd', electrons: 60, protons: 60, neutrons: 84, color: '#9370DB' },
    { name: 'Promethium', symbol: 'Pm', electrons: 61, protons: 61, neutrons: 84, color: '#9370DB' },
    { name: 'Samarium', symbol: 'Sm', electrons: 62, protons: 62, neutrons: 88, color: '#9370DB' },
    { name: 'Europium', symbol: 'Eu', electrons: 63, protons: 63, neutrons: 89, color: '#9370DB' },
    { name: 'Gadolinium', symbol: 'Gd', electrons: 64, protons: 64, neutrons: 93, color: '#9370DB' },
    { name: 'Terbium', symbol: 'Tb', electrons: 65, protons: 65, neutrons: 94, color: '#9370DB' },
    { name: 'Dysprosium', symbol: 'Dy', electrons: 66, protons: 66, neutrons: 97, color: '#9370DB' },
    { name: 'Holmium', symbol: 'Ho', electrons: 67, protons: 67, neutrons: 98, color: '#9370DB' },
    { name: 'Erbium', symbol: 'Er', electrons: 68, protons: 68, neutrons: 99, color: '#9370DB' },
    { name: 'Thulium', symbol: 'Tm', electrons: 69, protons: 69, neutrons: 100, color: '#9370DB' },
    { name: 'Ytterbium', symbol: 'Yb', electrons: 70, protons: 70, neutrons: 103, color: '#9370DB' },
    { name: 'Lutetium', symbol: 'Lu', electrons: 71, protons: 71, neutrons: 104, color: '#9370DB' }
  ];
  
  const actinides = [
    { name: 'Actinium', symbol: 'Ac', electrons: 89, protons: 89, neutrons: 138, color: '#DA70D6' },
    { name: 'Thorium', symbol: 'Th', electrons: 90, protons: 90, neutrons: 142, color: '#DA70D6' },
    { name: 'Protactinium', symbol: 'Pa', electrons: 91, protons: 91, neutrons: 140, color: '#DA70D6' },
    { name: 'Uranium', symbol: 'U', electrons: 92, protons: 92, neutrons: 146, color: '#DA70D6' },
    { name: 'Neptunium', symbol: 'Np', electrons: 93, protons: 93, neutrons: 144, color: '#DA70D6' },
    { name: 'Plutonium', symbol: 'Pu', electrons: 94, protons: 94, neutrons: 150, color: '#DA70D6' },
    { name: 'Americium', symbol: 'Am', electrons: 95, protons: 95, neutrons: 148, color: '#DA70D6' },
    { name: 'Curium', symbol: 'Cm', electrons: 96, protons: 96, neutrons: 151, color: '#DA70D6' },
    { name: 'Berkelium', symbol: 'Bk', electrons: 97, protons: 97, neutrons: 150, color: '#DA70D6' },
    { name: 'Californium', symbol: 'Cf', electrons: 98, protons: 98, neutrons: 153, color: '#DA70D6' },
    { name: 'Einsteinium', symbol: 'Es', electrons: 99, protons: 99, neutrons: 153, color: '#DA70D6' },
    { name: 'Fermium', symbol: 'Fm', electrons: 100, protons: 100, neutrons: 157, color: '#DA70D6' },
    { name: 'Mendelevium', symbol: 'Md', electrons: 101, protons: 101, neutrons: 157, color: '#DA70D6' },
    { name: 'Nobelium', symbol: 'No', electrons: 102, protons: 102, neutrons: 157, color: '#DA70D6' },
    { name: 'Lawrencium', symbol: 'Lr', electrons: 103, protons: 103, neutrons: 159, color: '#DA70D6' }
  ];
  

const elements = [
    alkaliMetals, alkalineEarthMetals, group13, group14, group15, group16, halogens, nobleGases, group3, group4, lanthanides, actinides
];



// Adding elements to the DOM
document.addEventListener("DOMContentLoaded", () => {});