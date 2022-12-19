function Local() {
  localStorage.getItem("items") || localStorage.setItem("items", "");
  localStorage.getItem("backgroundColor") || localStorage.setItem("backgroundColor", "rgb(255, 255, 255)");

  this.items = localStorage.getItem("items");
  this.backgroundColor = localStorage.getItem("backgroundColor");

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
    this.setBackgroundColor("rgb(255, 255, 255)");
  }
}

export default Local;