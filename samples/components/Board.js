import { link, move } from "../lib/Lib.js";

function Board({id,css}) {

  this.id = id;
  this.css = css || true;
  this.children = undefined;
  this.selected = undefined;
  this.actions = undefined;
  
  this.html = function() {
    if (this.css) this.link();
    return (`
      <div id="${this.id}">
        <div id="background_container"></div>
        <div id="items_container"></div>
      </div>
    `);
  };
  
  this.link = link.bind(this);

  this.onClick = function(e) {
    switch(e.target.id) {
      case "items_container":
        this.setSelected();
        this.actions && this.actions.disabled(!0);
        break;
      default:
        this.setSelected(e.target.parentElement);
        this.actions && this.actions.disabled(!1);
    }
  }

  this.onMove = function() {
    const children = this.children.items_container.children;
    Object.values(children).forEach(child => move(child));
  }

  this.setSelected = function(value) {
    const children = this.children.items_container.children;
    Object.values(children).forEach(child => child.classList.remove("selected"));
    this.selected = value;
    this.selected && this.selected.classList.add("selected");
  }

  this.setItems = function(items) {
    this.children.items_container.innerHTML = items;
    this.onMove();
  }

  this.setColor = function(backgroundColor) {
    if (!this.children) return;
    this.children.background_container.style.backgroundColor = backgroundColor;
  }

  this.load = function({backgroundColor, items}) {
    this.children = document.getElementById(id).children;
    backgroundColor && this.setColor(backgroundColor);
    items && this.setItems(items);
    this.actions && this.actions.disabled(!0);
  }

  this.getSelected = function() { return this.selected };

  this.addItem = function({width, alt, src}) {
    const container = this.children.items_container;
    let html = `
      <div class="item" data-index="" data-rotate="0" data-scale-x="1" data-scale-y="1" style="transform: rotate(0deg) scaleX(1) scaleY(1); left: 0px; top: 0px;">
        <img width="${width}" alt="${alt}" src="${src}">
        <div class="mask"></div>
      </div>
    `;
    this.setSelected();
    html = html.replace(/data-index=""/, `data-index="${container.children.length}"`);
    html = html.replace(/width=""/, `width="${width}"`);
    html = html.replace(/alt=""/, `alt="${alt}"`);
    html = html.replace(/src=""/, `src="${src}"`);
    container.innerHTML += html;
    this.onMove();
  }

  this.setIndexes = function() {
    const children = this.children.items_container.children;
    Object.values(children).forEach((child, index) => child.dataset.index = index);
  };

}

export default Board;