function sample(data) {
  return `
    <section class="sample_container">
      <header>
        <h1>${data.title}</h1>
        <ul>
          ${
            (() => {
              let lis = '';
              data.langs.forEach(lang => lis+=`<li><img src="${lang.src}" alt="${lang.title}"></li>`);
              return lis;
            })()
          }
        </ul>
      </header>
      <main>
        <div>
          <h2>${data.about.title}</h2>
          <div>${data.about.html}</div>
        </div>
        <div>
          <h2>${data.applications.title}</h2>
          <div>${data.applications.html}</div>
        </div>
        <div>
          <h2>${data.how.title}</h2>
          <div>${data.how.html}</div>
        </div>
      </main>
      <footer>
        <a class="button" href="${data.link.href}" target="_blank">${data.link.title}</a>
      </footer>
    </section>
  `;
}

function samples(data) {
  let html = '';
  data.forEach(item => html+=sample(item));
  return `
    <article id="samples_page">
      <h1>Amostras</h1>
      ${html}
    </article>
  `;
}

export default samples;