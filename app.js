

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



const Header = Component("header", {
    className: "header",
    children: "Periodic Table"
});



//  A variable that holds the data for all the elements
// Allows mapping around the data
const periodicTableElements = [
  // S block elements
    // Period 1
    { name: "Hydrogen", symbol: "H", electrons: 1, protons: 1, neutrons: 0, group: 1, category: "nonmetal", color: "#228B22" },
    { name: "Helium", symbol: "He", electrons: 2, protons: 2, neutrons: 2, group: 18, category: "noble gas", color: "#1E90FF" },
  
    // Period 2
    { name: "Lithium", symbol: "Li", electrons: 3, protons: 3, neutrons: 4, group: 1, category: "alkali metal", color: "#FF4500" },
    { name: "Beryllium", symbol: "Be", electrons: 4, protons: 4, neutrons: 5, group: 2, category: "alkaline earth metal", color: "#FF8C00" },
  
    // Period 3
    { name: "Sodium", symbol: "Na", electrons: 11, protons: 11, neutrons: 12, group: 1, category: "alkali metal", color: "#FF4500" },
    { name: "Magnesium", symbol: "Mg", electrons: 12, protons: 12, neutrons: 12, group: 2, category: "alkaline earth metal", color: "#FF8C00" },
  
    // Period 4
    { name: "Potassium", symbol: "K", electrons: 19, protons: 19, neutrons: 20, group: 1, category: "alkali metal", color: "#FF4500" },
    { name: "Calcium", symbol: "Ca", electrons: 20, protons: 20, neutrons: 20, group: 2, category: "alkaline earth metal", color: "#FF8C00" },
  
    // Period 5
    { name: "Rubidium", symbol: "Rb", electrons: 37, protons: 37, neutrons: 48, group: 1, category: "alkali metal", color: "#FF4500" },
    { name: "Strontium", symbol: "Sr", electrons: 38, protons: 38, neutrons: 50, group: 2, category: "alkaline earth metal", color: "#FF8C00" },
  
    // Period 6
    { name: "Cesium", symbol: "Cs", electrons: 55, protons: 55, neutrons: 78, group: 1, category: "alkali metal", color: "#FF4500" },
    { name: "Barium", symbol: "Ba", electrons: 56, protons: 56, neutrons: 81, group: 2, category: "alkaline earth metal", color: "#FF8C00" },
  
    // Period 7
    { name: "Francium", symbol: "Fr", electrons: 87, protons: 87, neutrons: 136, group: 1, category: "alkali metal", color: "#FF4500" },
    { name: "Radium", symbol: "Ra", electrons: 88, protons: 88, neutrons: 138, group: 2, category: "alkaline earth metal", color: "#FF8C00" },
  // D block elements
          // Period 4
  { name: "Scandium", symbol: "Sc", electrons: 21, protons: 21, neutrons: 24, group: 3, category: "transition metal", color: "#FFD700" },
  { name: "Titanium", symbol: "Ti", electrons: 22, protons: 22, neutrons: 26, group: 4, category: "transition metal", color: "#FFD700" },
  { name: "Vanadium", symbol: "V", electrons: 23, protons: 23, neutrons: 28, group: 5, category: "transition metal", color: "#FFD700" },
  { name: "Chromium", symbol: "Cr", electrons: 24, protons: 24, neutrons: 28, group: 6, category: "transition metal", color: "#FFD700" },
  { name: "Manganese", symbol: "Mn", electrons: 25, protons: 25, neutrons: 30, group: 7, category: "transition metal", color: "#FFD700" },
  { name: "Iron", symbol: "Fe", electrons: 26, protons: 26, neutrons: 30, group: 8, category: "transition metal", color: "#FFD700" },
  { name: "Cobalt", symbol: "Co", electrons: 27, protons: 27, neutrons: 32, group: 9, category: "transition metal", color: "#FFD700" },
  { name: "Nickel", symbol: "Ni", electrons: 28, protons: 28, neutrons: 31, group: 10, category: "transition metal", color: "#FFD700" },
  { name: "Copper", symbol: "Cu", electrons: 29, protons: 29, neutrons: 35, group: 11, category: "transition metal", color: "#FFD700" },
  { name: "Zinc", symbol: "Zn", electrons: 30, protons: 30, neutrons: 35, group: 12, category: "transition metal", color: "#FFD700" },

  // Period 5
  { name: "Yttrium", symbol: "Y", electrons: 39, protons: 39, neutrons: 50, group: 3, category: "transition metal", color: "#FFD700" },
  { name: "Zirconium", symbol: "Zr", electrons: 40, protons: 40, neutrons: 51, group: 4, category: "transition metal", color: "#FFD700" },
  { name: "Niobium", symbol: "Nb", electrons: 41, protons: 41, neutrons: 52, group: 5, category: "transition metal", color: "#FFD700" },
  { name: "Molybdenum", symbol: "Mo", electrons: 42, protons: 42, neutrons: 54, group: 6, category: "transition metal", color: "#FFD700" },
  { name: "Technetium", symbol: "Tc", electrons: 43, protons: 43, neutrons: 55, group: 7, category: "transition metal", color: "#FFD700" },
  { name: "Ruthenium", symbol: "Ru", electrons: 44, protons: 44, neutrons: 57, group: 8, category: "transition metal", color: "#FFD700" },
  { name: "Rhodium", symbol: "Rh", electrons: 45, protons: 45, neutrons: 58, group: 9, category: "transition metal", color: "#FFD700" },
  { name: "Palladium", symbol: "Pd", electrons: 46, protons: 46, neutrons: 60, group: 10, category: "transition metal", color: "#FFD700" },
  { name: "Silver", symbol: "Ag", electrons: 47, protons: 47, neutrons: 61, group: 11, category: "transition metal", color: "#FFD700" },
  { name: "Cadmium", symbol: "Cd", electrons: 48, protons: 48, neutrons: 64, group: 12, category: "transition metal", color: "#FFD700" },

  // Period 6 (using La in group 3)
  { name: "Lanthanum", symbol: "La", electrons: 57, protons: 57, neutrons: 82, group: 3, category: "transition metal", color: "#FFD700" },
  { name: "Hafnium", symbol: "Hf", electrons: 72, protons: 72, neutrons: 106, group: 4, category: "transition metal", color: "#FFD700" },
  { name: "Tantalum", symbol: "Ta", electrons: 73, protons: 73, neutrons: 108, group: 5, category: "transition metal", color: "#FFD700" },
  { name: "Tungsten", symbol: "W", electrons: 74, protons: 74, neutrons: 110, group: 6, category: "transition metal", color: "#FFD700" },
  { name: "Rhenium", symbol: "Re", electrons: 75, protons: 75, neutrons: 111, group: 7, category: "transition metal", color: "#FFD700" },
  { name: "Osmium", symbol: "Os", electrons: 76, protons: 76, neutrons: 114, group: 8, category: "transition metal", color: "#FFD700" },
  { name: "Iridium", symbol: "Ir", electrons: 77, protons: 77, neutrons: 115, group: 9, category: "transition metal", color: "#FFD700" },
  { name: "Platinum", symbol: "Pt", electrons: 78, protons: 78, neutrons: 117, group: 10, category: "transition metal", color: "#FFD700" },
  { name: "Gold", symbol: "Au", electrons: 79, protons: 79, neutrons: 118, group: 11, category: "transition metal", color: "#FFD700" },
  { name: "Mercury", symbol: "Hg", electrons: 80, protons: 80, neutrons: 121, group: 12, category: "transition metal", color: "#FFD700" },

  // Period 7 (using Ac in group 3)
  { name: "Actinium", symbol: "Ac", electrons: 89, protons: 89, neutrons: 138, group: 3, category: "transition metal", color: "#FFD700" },
  { name: "Rutherfordium", symbol: "Rf", electrons: 104, protons: 104, neutrons: 157, group: 4, category: "transition metal", color: "#FFD700" },
  { name: "Dubnium", symbol: "Db", electrons: 105, protons: 105, neutrons: 157, group: 5, category: "transition metal", color: "#FFD700" },
  { name: "Seaborgium", symbol: "Sg", electrons: 106, protons: 106, neutrons: 160, group: 6, category: "transition metal", color: "#FFD700" },
  { name: "Bohrium", symbol: "Bh", electrons: 107, protons: 107, neutrons: 161, group: 7, category: "transition metal", color: "#FFD700" },
  { name: "Hassium", symbol: "Hs", electrons: 108, protons: 108, neutrons: 169, group: 8, category: "transition metal", color: "#FFD700" },
  { name: "Meitnerium", symbol: "Mt", electrons: 109, protons: 109, neutrons: 169, group: 9, category: "transition metal", color: "#FFD700" },
  { name: "Darmstadtium", symbol: "Ds", electrons: 110, protons: 110, neutrons: 171, group: 10, category: "transition metal", color: "#FFD700" },
  { name: "Roentgenium", symbol: "Rg", electrons: 111, protons: 111, neutrons: 173, group: 11, category: "transition metal", color: "#FFD700" },
  { name: "Copernicium", symbol: "Cn", electrons: 112, protons: 112, neutrons: 173, group: 12, category: "transition metal", color: "#FFD700" }, 

  // P block elements
  { name: "Carbon", symbol: "C", electrons: 6, protons: 6, neutrons: 6, group: 14, category: "nonmetal", color: "#228B22" },
  { name: "Nitrogen", symbol: "N", electrons: 7, protons: 7, neutrons: 7, group: 15, category: "nonmetal", color: "#228B22" },
  { name: "Oxygen", symbol: "O", electrons: 8, protons: 8, neutrons: 8, group: 16, category: "nonmetal", color: "#228B22" },
  { name: "Fluorine", symbol: "F", electrons: 9, protons: 9, neutrons: 10, group: 17, category: "halogen", color: "#20B2AA" },
  { name: "Neon", symbol: "Ne", electrons: 10, protons: 10, neutrons: 10, group: 18, category: "noble gas", color: "#1E90FF" },

  // Period 3
  { name: "Aluminum", symbol: "Al", electrons: 13, protons: 13, neutrons: 14, group: 13, category: "post-transition metal", color: "#DAA520" },
  { name: "Silicon", symbol: "Si", electrons: 14, protons: 14, neutrons: 14, group: 14, category: "metalloid", color: "#8A2BE2" },
  { name: "Phosphorus", symbol: "P", electrons: 15, protons: 15, neutrons: 16, group: 15, category: "nonmetal", color: "#228B22" },
  { name: "Sulfur", symbol: "S", electrons: 16, protons: 16, neutrons: 16, group: 16, category: "nonmetal", color: "#228B22" },
  { name: "Chlorine", symbol: "Cl", electrons: 17, protons: 17, neutrons: 18, group: 17, category: "halogen", color: "#20B2AA" },
  { name: "Argon", symbol: "Ar", electrons: 18, protons: 18, neutrons: 22, group: 18, category: "noble gas", color: "#1E90FF" },

  // Period 4
  { name: "Gallium", symbol: "Ga", electrons: 31, protons: 31, neutrons: 39, group: 13, category: "post-transition metal", color: "#DAA520" },
  { name: "Germanium", symbol: "Ge", electrons: 32, protons: 32, neutrons: 41, group: 14, category: "metalloid", color: "#8A2BE2" },
  { name: "Arsenic", symbol: "As", electrons: 33, protons: 33, neutrons: 42, group: 15, category: "metalloid", color: "#8A2BE2" },
  { name: "Selenium", symbol: "Se", electrons: 34, protons: 34, neutrons: 45, group: 16, category: "nonmetal", color: "#228B22" },
  { name: "Bromine", symbol: "Br", electrons: 35, protons: 35, neutrons: 45, group: 17, category: "halogen", color: "#20B2AA" },
  { name: "Krypton", symbol: "Kr", electrons: 36, protons: 36, neutrons: 48, group: 18, category: "noble gas", color: "#1E90FF" },

  // Period 5
  { name: "Indium", symbol: "In", electrons: 49, protons: 49, neutrons: 66, group: 13, category: "post-transition metal", color: "#DAA520" },
  { name: "Tin", symbol: "Sn", electrons: 50, protons: 50, neutrons: 69, group: 14, category: "post-transition metal", color: "#DAA520" },
  { name: "Antimony", symbol: "Sb", electrons: 51, protons: 51, neutrons: 71, group: 15, category: "metalloid", color: "#8A2BE2" },
  { name: "Tellurium", symbol: "Te", electrons: 52, protons: 52, neutrons: 76, group: 16, category: "metalloid", color: "#8A2BE2" },
  { name: "Iodine", symbol: "I", electrons: 53, protons: 53, neutrons: 74, group: 17, category: "halogen", color: "#20B2AA" },
  { name: "Xenon", symbol: "Xe", electrons: 54, protons: 54, neutrons: 77, group: 18, category: "noble gas", color: "#1E90FF" },

  // Period 6
  { name: "Thallium", symbol: "Tl", electrons: 81, protons: 81, neutrons: 123, group: 13, category: "post-transition metal", color: "#DAA520" },
  { name: "Lead", symbol: "Pb", electrons: 82, protons: 82, neutrons: 125, group: 14, category: "post-transition metal", color: "#DAA520" },
  { name: "Bismuth", symbol: "Bi", electrons: 83, protons: 83, neutrons: 126, group: 15, category: "post-transition metal", color: "#DAA520" },
  { name: "Polonium", symbol: "Po", electrons: 84, protons: 84, neutrons: 125, group: 16, category: "post-transition metal", color: "#DAA520" },
  { name: "Astatine", symbol: "At", electrons: 85, protons: 85, neutrons: 125, group: 17, category: "metalloid", color: "#8A2BE2" },
  { name: "Radon", symbol: "Rn", electrons: 86, protons: 86, neutrons: 136, group: 18, category: "noble gas", color: "#1E90FF" },

  // Period 7 (synthetic)
  { name: "Nihonium", symbol: "Nh", electrons: 113, protons: 113, neutrons: 173, group: 13, category: "post-transition metal", color: "#DAA520" },
  { name: "Flerovium", symbol: "Fl", electrons: 114, protons: 114, neutrons: 175, group: 14, category: "post-transition metal", color: "#DAA520" },
  { name: "Moscovium", symbol: "Mc", electrons: 115, protons: 115, neutrons: 175, group: 15, category: "post-transition metal", color: "#DAA520" },
  { name: "Livermorium", symbol: "Lv", electrons: 116, protons: 116, neutrons: 177, group: 16, category: "post-transition metal", color: "#DAA520" },
  { name: "Tennessine", symbol: "Ts", electrons: 117, protons: 117, neutrons: 177, group: 17, category: "halogen", color: "#20B2AA" },
  { name: "Oganesson", symbol: "Og", electrons: 118, protons: 118, neutrons: 176, group: 18, category: "noble gas", color: "#1E90FF" },

   // Lanthanides (period 6, atomic numbers 57–71)
   { name: "Lanthanum", symbol: "La", electrons: 57, protons: 57, neutrons: 82, group: 3, category: "lanthanide", color: "#FF8C00" },
   { name: "Cerium", symbol: "Ce", electrons: 58, protons: 58, neutrons: 82, group: 3, category: "lanthanide", color: "#FF8C00" },
   { name: "Praseodymium", symbol: "Pr", electrons: 59, protons: 59, neutrons: 82, group: 3, category: "lanthanide", color: "#FF8C00" },
   { name: "Neodymium", symbol: "Nd", electrons: 60, protons: 60, neutrons: 84, group: 3, category: "lanthanide", color: "#FF8C00" },
   { name: "Promethium", symbol: "Pm", electrons: 61, protons: 61, neutrons: 84, group: 3, category: "lanthanide", color: "#FF8C00" },
   { name: "Samarium", symbol: "Sm", electrons: 62, protons: 62, neutrons: 88, group: 3, category: "lanthanide", color: "#FF8C00" },
   { name: "Europium", symbol: "Eu", electrons: 63, protons: 63, neutrons: 90, group: 3, category: "lanthanide", color: "#FF8C00" },
   { name: "Gadolinium", symbol: "Gd", electrons: 64, protons: 64, neutrons: 93, group: 3, category: "lanthanide", color: "#FF8C00" },
   { name: "Terbium", symbol: "Tb", electrons: 65, protons: 65, neutrons: 94, group: 3, category: "lanthanide", color: "#FF8C00" },
   { name: "Dysprosium", symbol: "Dy", electrons: 66, protons: 66, neutrons: 97, group: 3, category: "lanthanide", color: "#FF8C00" },
   { name: "Holmium", symbol: "Ho", electrons: 67, protons: 67, neutrons: 98, group: 3, category: "lanthanide", color: "#FF8C00" },
   { name: "Erbium", symbol: "Er", electrons: 68, protons: 68, neutrons: 99, group: 3, category: "lanthanide", color: "#FF8C00" },
   { name: "Thulium", symbol: "Tm", electrons: 69, protons: 69, neutrons: 100, group: 3, category: "lanthanide", color: "#FF8C00" },
   { name: "Ytterbium", symbol: "Yb", electrons: 70, protons: 70, neutrons: 103, group: 3, category: "lanthanide", color: "#FF8C00" },
   { name: "Lutetium", symbol: "Lu", electrons: 71, protons: 71, neutrons: 104, group: 3, category: "lanthanide", color: "#FF8C00" },
 
   // Actinides (period 7, atomic numbers 89–103)
   { name: "Actinium", symbol: "Ac", electrons: 89, protons: 89, neutrons: 138, group: 3, category: "actinide", color: "#FF4500" },
   { name: "Thorium", symbol: "Th", electrons: 90, protons: 90, neutrons: 142, group: 3, category: "actinide", color: "#FF4500" },
   { name: "Protactinium", symbol: "Pa", electrons: 91, protons: 91, neutrons: 140, group: 3, category: "actinide", color: "#FF4500" },
   { name: "Uranium", symbol: "U", electrons: 92, protons: 92, neutrons: 146, group: 3, category: "actinide", color: "#FF4500" },
   { name: "Neptunium", symbol: "Np", electrons: 93, protons: 93, neutrons: 144, group: 3, category: "actinide", color: "#FF4500" },
   { name: "Plutonium", symbol: "Pu", electrons: 94, protons: 94, neutrons: 150, group: 3, category: "actinide", color: "#FF4500" },
   { name: "Americium", symbol: "Am", electrons: 95, protons: 95, neutrons: 148, group: 3, category: "actinide", color: "#FF4500" },
   { name: "Curium", symbol: "Cm", electrons: 96, protons: 96, neutrons: 151, group: 3, category: "actinide", color: "#FF4500" },
   { name: "Berkelium", symbol: "Bk", electrons: 97, protons: 97, neutrons: 150, group: 3, category: "actinide", color: "#FF4500" },
   { name: "Californium", symbol: "Cf", electrons: 98, protons: 98, neutrons: 153, group: 3, category: "actinide", color: "#FF4500" },
   { name: "Einsteinium", symbol: "Es", electrons: 99, protons: 99, neutrons: 153, group: 3, category: "actinide", color: "#FF4500" },
   { name: "Fermium", symbol: "Fm", electrons: 100, protons: 100, neutrons: 157, group: 3, category: "actinide", color: "#FF4500" },
   { name: "Mendelevium", symbol: "Md", electrons: 101, protons: 101, neutrons: 157, group: 3, category: "actinide", color: "#FF4500" },
   { name: "Nobelium", symbol: "No", electrons: 102, protons: 102, neutrons: 157, group: 3, category: "actinide", color: "#FF4500" },
   { name: "Lawrencium", symbol: "Lr", electrons: 103, protons: 103, neutrons: 159, group: 3, category: "actinide", color: "#FF4500" }
];
  

// Adding elements to the DOM
body.appendChild(Header);
document.addEventListener("DOMContentLoaded", () => {});