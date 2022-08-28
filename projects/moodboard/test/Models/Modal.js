'use strict'

export class Modal 
{
	constructor(css = '')
	{
		this.defaultStyle = 'css/modal.css'

		this.createStyle(css)

		setTimeout(() => {

			this.arrStatus = ['init', 'open', 'close'] 

			this.arrType = ['html', 'src']

			this.msgs = {	open: 'Loading ...', abort: 'Feiled.'	}

			this.createEl()

			this.components = {
				header: this.el.querySelector('[data-modal-header]'),
				close: this.el.querySelector('[data-modal-close]'),
				content: this.el.querySelector('[data-modal-content]'),
				mask: this.el.querySelector('[data-modal-mask]'),
				loading: this.el.querySelector('[data-modal-loading]')
			}

			this.addEvents()
		}, 500)
	}

	createEl()
	{		
		this.el = document.createElement('div')

		this.el.dataset.modal = ''

		this.el.dataset.modalStatus = 'init'

		this.el.innerHTML = `<div data-modal-header><div data-modal-close>Close</div></div><div data-modal-content></div><div data-modal-mask><div data-modal-loading></div></div>`

		document.querySelector('body').append(this.el)
	}

	createStyle(css)
	{		
		const l = document.createElement('link')

		l.rel = 'stylesheet', l.type = "text/css", l.href = ('' === css) ? this.defaultStyle : css

		document.querySelector('head').append(l)
	}

	addEvents()
	{
		this.components.close.addEventListener('click', () => this.setStatus('close'))
	}

	setStatus(status)
	{
		if (!this.arrStatus.includes(status)) return console.log('Status not valid.'), !1

		this.el.dataset.modalStatus = status
	}

	setType(type)
	{
		if (!this.arrType.includes(type)) return console.log('Type not valid.'), !1

		this.el.dataset.modalType = type
	}

	setContent(content, type)
	{
		this.clearContent()

		this.components.loading.innerHTML = this.msgs.open

		if ('html' === type) return this.components.content.innerHTML = content, !1

		this.setType('src')

		const 
		iframe = document.createElement('iframe'), 
		doc = (
			iframe.src = content,	this.components.content.append(iframe), 
			iframe.contentWindow.document || iframe.contentDocument
		)

		let	i = 0, iMax = 5e3, step = 1e3, idInterval = setInterval(() => {

			'complete' === doc.readyState && void(0) === clearInterval(idInterval) && this.setType('html')

			i >= iMax && void(0) === clearInterval(idInterval) && this.abortContent()

			i += step
		}, step)
	}

	display(content, type = 'html') 
	{
		if (!1 === this.setType(type)) return !1

		this.setContent(content, type),	this.setStatus('open')
	}

	abortContent()
	{
		this.clearContent()
		
		let i = 4e3,	idInterval = setInterval(() => {

			i <= 0 && void(0) === clearInterval(idInterval) && this.setStatus('close')

			this.components.loading.innerHTML = this.msgs.abort + ' Closing in ' + (i - 1e3) / 1e3

			i -= 1e3
		}, 1e3)
	}

	clearContent(content = 'content')
	{
		switch (content) {

			case 'all': this.components.content.innerHTML = '', this.components.loading.innerHTML = ''; break

			case 'loading': this.components.loading.innerHTML = ''; break

			default: this.components.content.innerHTML = ''
		}
	}
}
