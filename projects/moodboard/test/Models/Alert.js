'use strict'

export class Alert 
{
	constructor(css = '')
	{
		this.defaultStyle = 'css/alert.css'

		this.createStyle(css)

		setTimeout(() => {

			this.createEl()

			this.arrStatus = ['init', 'open', 'close'] 

			this.arrType = ['success', 'error']
			
			this.components = {
				header: this.el.querySelector('[data-alert-header]'),
				close: this.el.querySelector('[data-alert-close]'),
				msg: this.el.querySelector('[data-alert-msg]')
			} 
			
			this.addEvents()
		}, 500)
	}

	createEl()
	{		
		this.el = document.createElement('div')

		this.el.dataset.alert = ''

		this.el.dataset.alertStatus = 'init'

		this.el.innerHTML = `<div data-alert-header><div data-alert-close>Close</div></div><div data-alert-msg data-alert-type=""></div>`

		document.querySelector('body').append(this.el)
	}

	createStyle(css)
	{		
		const l = document.createElement('link')

		l.rel = 'stylesheet',	l.type = 'text/css', l.href = ('' === css) ? this.defaultStyle : css

		document.querySelector('head').append(l)
	}

	addEvents()
	{
		this.components.close.addEventListener('click', () => this.setStatus('close'))
	}

	setStatus(status)
	{
		if (!this.arrStatus.includes(status)) return console.log('Status not valid.'), !1

		this.el.dataset.alertStatus = status
	}

	setType(type)
	{
		if (!this.arrType.includes(type)) return console.log('Type not valid.'), !1

		this.components.msg.dataset.alertType = type
	}

	display(msg, type = 'success') 
	{
		this.components.msg.innerHTML = msg

		if (!1 === this.setType(type)) return !1

		this.setStatus('open');
	}
}
