const observer = function(board, local, save) {
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

export default observer;