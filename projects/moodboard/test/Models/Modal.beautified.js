"use strict";

class Modal {
    constructor(t = "") {
        this.defaultStyle = "css/modal.css", this.createStyle(t), setTimeout(() => {
            this.arrStatus = [ "init", "open", "close" ], this.arrType = [ "html", "src" ], 
            this.msgs = {
                open: "Loading ...",
                abort: "Feiled."
            }, this.createEl(), this.components = {
                header: this.el.querySelector("[data-modal-header]"),
                close: this.el.querySelector("[data-modal-close]"),
                content: this.el.querySelector("[data-modal-content]"),
                mask: this.el.querySelector("[data-modal-mask]"),
                loading: this.el.querySelector("[data-modal-loading]")
            }, this.addEvents();
        }, 500);
    }
    createEl() {
        this.el = document.createElement("div"), this.el.dataset.modal = "", this.el.dataset.modalStatus = "init", 
        this.el.innerHTML = "<div data-modal-header><div data-modal-close>Close</div></div><div data-modal-content></div><div data-modal-mask><div data-modal-loading></div></div>", 
        document.querySelector("body").append(this.el);
    }
    createStyle(t) {
        const e = document.createElement("link");
        e.rel = "stylesheet", e.type = "text/css", e.href = "" === t ? this.defaultStyle : t, 
        document.querySelector("head").append(e);
    }
    addEvents() {
        this.components.close.addEventListener("click", () => this.setStatus("close"));
    }
    setStatus(t) {
        if (!this.arrStatus.includes(t)) return console.log("Status not valid."), 
        !1;
        this.el.dataset.modalStatus = t;
    }
    setType(t) {
        if (!this.arrType.includes(t)) return console.log("Type not valid."), !1;
        this.el.dataset.modalType = t;
    }
    setContent(t, e) {
        if (this.clearContent(), this.components.loading.innerHTML = this.msgs.open, 
        "html" === e) return this.components.content.innerHTML = t, !1;
        this.setType("src");
        const s = document.createElement("iframe"), n = (s.src = t, this.components.content.append(s), 
        s.contentWindow.document || s.contentDocument);
        let a = 0, o = setInterval(() => {
            "complete" === n.readyState && void 0 === clearInterval(o) && this.setType("html"), 
            5e3 <= a && void 0 === clearInterval(o) && this.abortContent(), a += 1e3;
        }, 1e3);
    }
    display(t, e = "html") {
        if (!1 === this.setType(e)) return !1;
        this.setContent(t, e), this.setStatus("open");
    }
    abortContent() {
        this.clearContent();
        let t = 4e3, e = setInterval(() => {
            t <= 0 && void 0 === clearInterval(e) && this.setStatus("close"), this.components.loading.innerHTML = this.msgs.abort + " Closing in " + (t - 1e3) / 1e3, 
            t -= 1e3;
        }, 1e3);
    }
    clearContent(t = "content") {
        switch (t) {
          case "all":
            this.components.content.innerHTML = "", this.components.loading.innerHTML = "";
            break;

          case "loading":
            this.components.loading.innerHTML = "";
            break;

          default:
            this.components.content.innerHTML = "";
        }
    }
}

export {
    Modal
};