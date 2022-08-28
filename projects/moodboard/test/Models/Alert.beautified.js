"use strict";

class Alert {
    constructor(e = "") {
        this.defaultStyle = "css/alert.css", this.createStyle(e), setTimeout(() => {
            this.createEl(), this.arrStatus = [ "init", "open", "close" ], this.arrType = [ "success", "error" ], 
            this.components = {
                header: this.el.querySelector("[data-alert-header]"),
                close: this.el.querySelector("[data-alert-close]"),
                msg: this.el.querySelector("[data-alert-msg]")
            }, this.addEvents();
        }, 500);
    }
    createEl() {
        this.el = document.createElement("div"), this.el.dataset.alert = "", this.el.dataset.alertStatus = "init", 
        this.el.innerHTML = '<div data-alert-header><div data-alert-close>Close</div></div><div data-alert-msg data-alert-type=""></div>', 
        document.querySelector("body").append(this.el);
    }
    createStyle(e) {
        const t = document.createElement("link");
        t.rel = "stylesheet", t.type = "text/css", t.href = "" === e ? this.defaultStyle : e, 
        document.querySelector("head").append(t);
    }
    addEvents() {
        this.components.close.addEventListener("click", () => this.setStatus("close"));
    }
    setStatus(e) {
        if (!this.arrStatus.includes(e)) return console.log("Status not valid."), 
        !1;
        this.el.dataset.alertStatus = e;
    }
    setType(e) {
        if (!this.arrType.includes(e)) return console.log("Type not valid."), !1;
        this.components.msg.dataset.alertType = e;
    }
    display(e, t = "success") {
        if (this.components.msg.innerHTML = e, !1 === this.setType(t)) return !1;
        this.setStatus("open");
    }
}

export {
    Alert
};