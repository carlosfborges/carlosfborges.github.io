function link() {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = `./components/${this.constructor.name}.module.css`;
  document.head.append(link);
}

export default link;