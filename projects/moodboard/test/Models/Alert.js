'use strict'

export class Alert 
{
	constructor(id, css = !0)
	{
		try {

			if (void 0 === id) throw 'The id is undefined.'

			if ('string' !== typeof id) throw 'The id must be type of string'

			this.arrStatus = ['open', 'close'];	this.arrType = ['success', 'error']

			this.createEl()

			this.el.id = id;

			!0 === css && this.createStyle()

			this.children = {
				close: this.el.querySelector('[data-alert-close]'),
				msg: this.el.querySelector('[data-alert-msg]')
			}

			this.addEvents()

		} catch (msg) { console.log(msg) }
	}

	createEl()
	{		
		this.el = document.createElement('div')

		this.el.innerHTML = `<div data-alert-close>Close</div><div data-alert-msg data-alert-type=""></div>`

		document.querySelector('body').append(this.el)
	}

	createStyle()
	{
		this.setStatus('close')
		
		const s = document.createElement('style')

		s.innerHTML = `	
			#` + this.el.id + `	{	box-sizing: border-box;	background-color: whitesmoke;	padding: 10px; position: absolute;	top: 0;	left: 0; width: 100%;	}
			#` + this.el.id + `[data-alert-status='close'] { display: none; }
			#` + this.el.id + `[data-alert-status='open'] { display: flex; flex-direction: row-reverse; }
			#` + this.el.id + ` > div[data-alert-close] { cursor: pointer; padding: 0 5px; border-left: 1px solid gray; }
			#` + this.el.id + ` > div[data-alert-msg] { width: 100%; text-align: center; padding: 0 10px; }
			#` + this.el.id + ` > div[data-alert-type="success"] { color: green; }
			#` + this.el.id + ` > div[data-alert-type="error"] { color: red; }
		`

		document.querySelector('head').append(s)
	}

	addEvents()
	{
		this.children.close.addEventListener('click', () => this.setStatus('close'))
	}

	setStatus(status)
	{
		if (!this.arrStatus.includes(status)) return console.log('Status not valid.'), !1

		this.el.dataset.alertStatus = status
	}

	setType(type)
	{
		if (!this.arrType.includes(type)) return console.log('Type not valid.'), !1

		this.children.msg.dataset.alertType = type
	}

	display(msg, type = 'success') 
	{
		this.children.msg.innerHTML = msg

		if (!1 === this.setType(type)) return !1

		this.setStatus('open');
	}
}
