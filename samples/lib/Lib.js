function move(el, callback) {
  let  
    /* o x inicial do drag*/
    dragOfX = 0,
    /* o y inicial do drag */
    dragOfY = 0;

  /* ao segurar o elemento */
  function dragStart(e) {
    /* define o x inicial do drag */
    dragOfX = e.pageX - el.offsetLeft;
    /* define o y inicial do drag */
    dragOfY = e.pageY - el.offsetTop;
    
    /* adiciona os eventos */
    addEventListener("mousemove", dragMove);
    addEventListener("mouseup", dragEnd);
  }
      
  /* ao ser arrastado */
  function dragMove(e) {
    /* atualiza a posição do elemento */
    el.style.left = (e.pageX - dragOfX) + 'px';
    el.style.top = (e.pageY - dragOfY) + 'px';
  }
      
  /* ao terminar o drag */
  function dragEnd() {
    /* remove os eventos */
    removeEventListener("mousemove", dragMove);
    removeEventListener("mouseup", dragEnd);
  }
      
  /* adiciona o evento que começa o drag */
  el.addEventListener("mousedown", dragStart);

  typeof callback === "function" && callback(el);
}

function link() {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = `./components/${this.constructor.name}.module.css`;
  document.head.append(link);
}

function observer(board, local, save) {
  // Select the node that will be observed for mutations
  const targetNode = document.getElementById(board.id),
    children = targetNode.children;

  // Options for the observer (which mutations to observe)
  const config = { attributes: true, childList: true, subtree: true };

  // Callback function to execute when mutations are observed
  const callback = (mutationList, observer) => {
    /* for (const mutation of mutationList) {
      if (mutation.type === 'childList') {
        console.log('A child node has been added or removed.');
      } else if (mutation.type === 'attributes') {
        console.log(`The ${mutation.attributeName} attribute was modified.`);
      }
    } */
    (
      children.items_container.innerHTML.replace(/[ ]?selected/, "") === local.items &&
      children.background_container.style.backgroundColor === local.backgroundColor
    ) ? 
      document.getElementById(save.id).classList.add("hide") :
      document.getElementById(save.id).classList.remove("hide");
  };

  // Create an observer instance linked to the callback function
  const observer = new MutationObserver(callback);

  // Start observing the target node for configured mutations
  observer.observe(targetNode, config);

  // Later, you can stop observing
  //observer.disconnect();
};

function actions(selected) {
  return [
    { 
      id: "rotateRight",
      text: "rotate right", 
      handler: function() {
        if (!selected()) return; 

        const el = selected(),
          transform = el.style.transform,
          data = el.dataset;

        data.rotate = 5 + Number(data.rotate);
        el.style.transform = transform.replace(/rotate\([-+]?\d*deg\)/, `rotate(${data.rotate}deg)`);
      } 
    }, { 
      id: "rotateLeft",
      text: "rotate left", 
      handler: function() { 
        if (!selected()) return; 

        const el = selected(),
          transform = el.style.transform,
          data = el.dataset;

        data.rotate = -5 + Number(data.rotate);
        el.style.transform = transform.replace(/rotate\([-+]?\d*deg\)/, `rotate(${data.rotate}deg)`);
      } 
    }, { 
      id: "zIndexPlus",
      text: "zIndex +", 
      handler: function() {
        if (!selected()) return; 

        const el = selected(),
          data = el.dataset,
          children = Object.values(el.parentElement.children);

        if (data.index >= children.length - 1) return;

        const next = el.nextElementSibling;

        next.after(el);

        data.index++; 
        next.dataset.index--;
      } 
    }, { 
      id: "zIndexMinus",
      text: "zIndex -", 
      handler: function() {
        if (!selected()) return; 

        const el = selected(),
          data = el.dataset;

        if (data.index == 0) return;

        const previous = el.previousElementSibling;

        previous.before(el);

        data.index--; 
        previous.dataset.index++;
      } 
    }, { 
      id: "scalePlus",
      text: "scale +", 
      handler: function() { 
        if (!selected()) return; 

        const el = selected(),
          data = el.dataset;
        
        let transform = el.style.transform;

        data.scaleX = Number(data.scaleX) + (data.scaleX > 0 ? .1 : -.1); 
        data.scaleY = Number(data.scaleY) + (data.scaleY > 0 ? .1 : -.1);
        
        transform = transform.replace(/scaleX\([-+]?\d*.?\d*\)/, `scaleX(${data.scaleX})`);
        transform = transform.replace(/scaleY\([-+]?\d*.?\d*\)/, `scaleY(${data.scaleY})`);

        el.style.transform = transform;          
      } 
    }, { 
      id: "scaleMinus",
      text: "scale -", 
      handler: function() { 
        if (!selected()) return; 

        const el = selected(),
          data = el.dataset;
        
        let transform = el.style.transform;

        data.scaleX -= (data.scaleX > 0 && data.scaleX > .2 && .1) || (data.scaleX < 0 && data.scaleX < -.2 && -.1);
        data.scaleY -= (data.scaleY > 0 && data.scaleY > .2 && .1) || (data.scaleY < 0 && data.scaleY < -.2 && -.1);
        
        transform = transform.replace(/scaleX\([-+]?\d*.?\d*\)/, `scaleX(${data.scaleX})`);
        transform = transform.replace(/scaleY\([-+]?\d*.?\d*\)/, `scaleY(${data.scaleY})`);

        el.style.transform = transform;
      } 
    }, { 
      id: "mirrorH",
      text: "mirror h", 
      handler: function() { 
        if (!selected()) return; 

        const el = selected(),
          data = el.dataset;
        
        let transform = el.style.transform;

        data.scaleX *= -1; 
        
        el.style.transform = 
          transform.replace(/scaleX\([-+]?\d*.?\d*\)/, `scaleX(${data.scaleX})`);
      } 
    }, , { 
      id: "mirrorV",
      text: "mirror v", 
      handler: function() {
        if (!selected()) return; 

        const el = selected(),
          data = el.dataset;
        
        let transform = el.style.transform;

        data.scaleY *= -1; 
        
        el.style.transform = 
          transform.replace(/scaleY\([-+]?\d*.?\d*\)/, `scaleY(${data.scaleY})`);
      } 
    }, { 
      id: "removeItem",
      text: "remove", 
      handler: function() {
        if (!selected()) return; 

        selected().remove();
      } 
    }
  ];
}

function Local() {
  this.items = localStorage.getItem("items") || "";
  this.backgroundColor = localStorage.getItem("backgroundColor") || "#fff";

  this.setItems = function(items) {
    this.items = items.replace(/[ ]?selected/, "");
    localStorage.setItem("items", this.items);
  }

  this.setBackgroundColor = function(backgroundColor) {
    this.backgroundColor = backgroundColor;
    localStorage.setItem("backgroundColor", this.backgroundColor);
  }

  this.reset = function() {
    this.setItems("");
    this.setBackgroundColor("#fff");
  }
}

export { move, link, observer, actions, Local };