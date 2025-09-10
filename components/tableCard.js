export const tableCard = element => ({
    tag: "div",
    props: {
      className: "card",
      style: `background:${element.color};`
    },
    children: [
      {
        tag: "div",
        props: { className: "element-name-container" },
        children: [
          { tag: "h3", props: { className: "element-name", textContent: element.name } },
          { tag: "h1", props: { className: "element-symbol", textContent: element.symbol } }
        ]
      },
      {
        tag: "div",
        props: { className: "element-info-container" },
        children: [
          { tag: "span", props: { className: "element-electrons", textContent: `e⁻: ${element.electrons}` } },
          { tag: "span", props: { className: "element-protons", textContent: `p⁺: ${element.protons}` } },
          { tag: "span", props: { className: "element-neutrons", textContent: `n⁰: ${element.neutrons}` } }
        ]
      }
    ]
  });
  