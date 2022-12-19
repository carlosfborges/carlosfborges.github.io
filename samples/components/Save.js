import { link } from "../lib/Lib.js";

function Save({id,css,board,local}) {

  this.id = id;
  this.css = css || true;

  this.html = function() {
    if (this.css) this.link();
    return (`
      <div id="${this.id}">
        <button id="discard">Discard</button> 
        <button id="save">Save</button> 
      </div>
    `);
  };
  
  this.link = link.bind(this);

  this.setSaved = function() {
    this.saved = document.getElementById(board.id).children.items_container
      .innerHTML.replace(/[ ]?selected/, "");
  }

  this.onClick = function(e) {
    switch(e.target.id) {
      case "discard":
        this.discard();
        break;
      case "save":
        this.save();
        break;
      default:
        return;
    }
  }

  this.discard = function() {
    board.load(local);
  };

  this.save = function() {
    local.setItems(document.getElementById(board.id).children.items_container.innerHTML);
    local.setBackgroundColor(document.getElementById(board.id).children.
      background_container.style.backgroundColor);
    board.load(local);
  };
}

export default Save;