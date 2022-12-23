function Header({id}) {
  
  this.html = `
    <header id="${id}">
      <h1 class="small">Hello World! Sou</h1>
      <h1>carlosfborges<br /><span>desenvolvedor web</span></h1>
    </header>
  `;

  this.render = function() {
    return this.html;
  }

}

export default Header;