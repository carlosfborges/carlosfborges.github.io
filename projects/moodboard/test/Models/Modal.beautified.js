"use strict";

export class Modal {
    constructor(id, css = !0) {
        try {
            if (void 0 === id) throw "The id is undefined.";
            if ("string" !== typeof id) throw "The id must be type of string";
            this.arrStatus = [ "open", "close" ];
            this.arrType = [ "html", "src" ];
            this.createEl(), this.el.id = id;
            !0 === css && this.createStyle();
            this.children = {
                header: this.el.querySelector("[data-modal-header]"),
                close: this.el.querySelector("[data-modal-close]"),
                content: this.el.querySelector("[data-modal-content]"),
                mask: this.el.querySelector("[data-modal-mask]"),
                loading: this.el.querySelector("[data-modal-loading]")
            };
            this.msgs = {
                open: "Loading ...",
                abort: "Feiled."
            };
            this.addEvents();
        } catch (msg) {
            console.log(msg);
        }
    }
    createEl() {
        this.el = document.createElement("div");
        this.el.innerHTML = `<div data-modal-header><div data-modal-close>Close</div></div><div data-modal-content></div><div data-modal-mask><div data-modal-loading></div></div>`;
        document.querySelector("body").append(this.el);
    }
    createStyle() {
        this.setStatus("close");
        const s = document.createElement("style");
        s.innerHTML = `
			#` + this.el.id + `	{	box-sizing: border-box; background-color: whitesmoke;	padding: 10px; position: fixed;	top: 0;	left: 0; overflow: hidden; width: 100%;	height: 100%; }
			#` + this.el.id + `[data-modal-status='close'] { display: none; }
			#` + this.el.id + `[data-modal-status='open'] { display: block; }
			#` + this.el.id + `[data-modal-type='html'] > div[data-modal-mask] { display: none; }
			#` + this.el.id + ` > div[data-modal-header] { display: flex; justify-content: flex-end; }
			#` + this.el.id + ` > div[data-modal-header] > div[data-modal-close] { cursor: pointer; padding: 0 5px; border-left: 1px solid gray; }
			#` + this.el.id + ` > div[data-modal-content] { background-color: white; margin-top: 10px; height: 100%; overflow-y: auto; }
			#` + this.el.id + ` > div[data-modal-content] > iframe { width: 100%; height: 95%; border: none; }
			#` + this.el.id + ` > div[data-modal-mask] { background-color: rgba(0, 0, 0, 0.7); position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; }
			#` + this.el.id + ` > div[data-modal-mask] > div[data-modal-loading] { color: white; }
		`;
        document.querySelector("head").append(s);
    }
    addEvents() {
        this.children.close.addEventListener("click", () => this.setStatus("close"));
    }
    setStatus(status) {
        if (!this.arrStatus.includes(status)) return console.log("Status not valid."), 
        !1;
        this.el.dataset.modalStatus = status;
    }
    setType(type) {
        if (!this.arrType.includes(type)) return console.log("Type not valid."), 
        !1;
        this.el.dataset.modalType = type;
    }
    setContent(content, type) {
        this.clearContent();
        this.children.loading.innerHTML = this.msgs.open;
        if ("html" === type) return this.children.content.innerHTML = content, !1;
        this.setType("src");
        const iframe = document.createElement("iframe"), doc = (iframe.src = content, 
        this.children.content.append(iframe), iframe.contentWindow.document || iframe.contentDocument);
        let i = 0, iMax = 5e3, step = 1e3, idInterval = setInterval(() => {
            "complete" === doc.readyState && void 0 === clearInterval(idInterval) && this.setType("html");
            i >= iMax && void 0 === clearInterval(idInterval) && this.abortContent();
            i += step;
        }, step);
    }
    display(content, type = "html") {
        if (!1 === this.setType(type)) return !1;
        this.setContent(content, type), this.setStatus("open");
    }
    abortContent() {
        this.clearContent();
        let i = 4e3, idInterval = setInterval(() => {
            i <= 0 && void 0 === clearInterval(idInterval) && this.setStatus("close");
            this.children.loading.innerHTML = this.msgs.abort + " Closing in " + (i - 1e3) / 1e3;
            i -= 1e3;
        }, 1e3);
    }
    clearContent(content = "content") {
        switch (content) {
          case "all":
            this.children.content.innerHTML = "", this.children.loading.innerHTML = "";
            break;

          case "loading":
            this.children.loading.innerHTML = "";
            break;

          default:
            this.children.content.innerHTML = "";
        }
    }
}