export const searchBar = onInput => ({
    tag: "input",
    props: {
      className: "search-bar",
      type: "text",
      placeholder: "Search elements...",
      events: { input: onInput }
    }
  });
  