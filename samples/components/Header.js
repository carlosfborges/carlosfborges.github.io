import { link } from "../lib/Lib.js";

function Header({id,css,board}) {
  
  this.id = id;
  this.css = css || true;
  
  this.html = function() {
    if (this.css) this.link();
    return (`
      <header id="${this.id}">
        <form id="formAddItem" action="">
          <label for="imgSrc">Image:</label>
          <input id="imgSrc" name="imgSrc" type="text" placeholder="https://..." required />
          <button type="submit">Add Item</button>
        </form>
      </header>
    `);
  };
  
  this.link = link.bind(this);

  this.onSubmit = async function(e) {
    e.preventDefault();
    if (e.type !== "submit") return;
    const src = e.target.elements.imgSrc.value;
    await fetch(src).catch(error => console.log(error));
    board.addItem({width: 200, alt: "added item", src: src});
  }

}

export default Header;