import Prism from "prismjs";

export default (element, options) => {
  element.parentElement.style.position = "relative";
  const pre = document.createElement("pre");
  pre.style.transform = "translate(-" + element.width + "px, 0px)";
  pre.style.width = element.width + "px";
  pre.style.height = element.height + "px";
  const code = document.createElement("code");

  code.textContent =
    "const options = " +
    JSON.stringify(options)
      .replace(/{/, "{\n   ")
      .replace(/,/g, ",\n   ")
      .replace(/}/, "\n}")
      .replace(/"(.*)":/gm, "$1: ");

  code.classList.add("language-javascript");
  pre.appendChild(code);
  element.after(pre);

  Prism.highlightElement(code);
};
