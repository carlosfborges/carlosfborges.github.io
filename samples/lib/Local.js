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

export default Local;