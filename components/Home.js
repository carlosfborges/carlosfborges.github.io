function Home({id}) {

  const 
    html    = document.getElementsByTagName('html')[0],
    bgImage = window.getComputedStyle(html).getPropertyValue('background-image'),
    langs   = new Map([
      ['html'       , 'https://cdn.pixabay.com/photo/2017/08/05/11/16/logo-2582748_1280.png'],
      ['css'        , 'https://cdn.pixabay.com/photo/2017/08/05/11/16/logo-2582747_1280.png'],
      ['javascript' , 'https://logodownload.org/wp-content/uploads/2022/04/javascript-logo-1.png'],
      ['php'        , 'https://logospng.org/download/php/logo-php-512.png'],
      ['mysql'      , 'https://seeklogo.com/images/M/MySQL-logo-F6FF285A58-seeklogo.com.png'],
      ['mongodb'    , 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/MongoDB_Logo.svg/2560px-MongoDB_Logo.svg.png'],
      ['git'        , 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Git-logo.svg/1024px-Git-logo.svg.png'],
      ['react'      , 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png'],
      ['node'       , 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/2560px-Node.js_logo.svg.png'],
      ['typescript' , 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg']
    ]);
  
  let langsHtml = '';
  langs.forEach((value, key) => langsHtml += `<li><img src="${value}" alt="${key}" /></li>`);

  this.screenType = window.screen.orientation.type;
  this.html = `<section id="${id}"><ul>${langsHtml}</ul></section>`;

  this.render = function() { return this.html }

  this.onScroll = function() { this.createEffect() }

  this.createEffect = function() {
    const el = document.getElementById(id);
    html.style.backgroundImage = (this.screenType === 'portrait-primary') ? 
      bgImage.replace('45deg', 45 + el.scrollLeft / 5 + 'deg') :
      bgImage.replace('45deg', 45 + el.scrollTop / 5 + 'deg');
  }

  this.animaLangs = function(step) {
    const el = document.getElementById(id);
    this.screenType === 'portrait-primary' ? (el.scrollLeft += step) : (el.scrollTop += step);
    this.createEffect();
  }

}

export default Home;