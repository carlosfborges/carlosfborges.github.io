import { link, actions } from "../lib/Lib.js";

function Actions({id,css,board}) {
  
  this.id = id;
  this.css = css || true;
  this.children = actions(board.getSelected.bind(board));
  
  this.html = function() {
    
    if (this.css) this.link();

    const map = this.children.map(child => `<button id="${child.id}">${child.text}</button>`);

    return `
      <div id="${this.id}" class="disabled">
        ${map.join("\n\r")}
      </div>
    `;
  };
  
  this.link = link.bind(this);

  this.onClick = function(e) {

    switch(e.target.id) {
      case id:
        break;
      case "removeItem":
        this.getButton(e.target.id).handler();
        board.setSelected();
        this.disabled(!0);
        board.setIndexes();
        break;
      default:
        this.getButton(e.target.id).handler();
    }
  }

  this.getButton = function(id) {
    return this.children.filter(child => child.id === id)[0];
  }

  this.disabled = function(value) {
    const el = document.getElementById(id);
    value ? el.classList.add("disabled") : el.classList.remove("disabled");
  }
}

export default Actions;