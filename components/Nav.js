function Nav({id}) {

  const items = new Map([
    ['about'   , 'Sobre'],
    ['samples' , 'Amostras'],
    ['clients' , 'Clientes'],
    ['contact' , 'Contato']
  ]);

  let itemsHtml = '';
  items.forEach((value, key) => itemsHtml += `<li id="${key}">${value}</li>`);

  this.html = `<nav id="${id}"><ul>${itemsHtml}</ul></nav>`;

  this.render = function() { return this.html }

  this.onClick = function(e) {
    if (!items.has(e.target.id)) return false;
    return true;
  }
  
}

export default Nav;