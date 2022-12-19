const move = (el, callback) => {
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

export default move;