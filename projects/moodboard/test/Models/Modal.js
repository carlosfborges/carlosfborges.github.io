'use strict'

export class Modal {

	constructor(el, html = '')
	{
		this.el = el

		this.btns = document.querySelectorAll('[data-modal-target="#' + el.id + '"]')

		this.html = html
		
		this.status = 'close'

		this.events()
	}

	display(html = '') 
	{
		if (this.status === 'anima') return false

		this.html = html

		const 
		modal = this.el, 
		content = modal.querySelector('.content'),
		section = content.querySelector('.section'),
		status = this.status			

		this.status = (status === 'close') ? 'open' : 'close'

		if (html !== '') {

			if (typeof html === 'string')	section.innerhtml = html

			else {

				section.innerHTML = ''

				section.append(html)
			}

		}

		this.animaModal(status)

		this.animaContent(status)
	}	

	animaModal(status) 
	{
		const el = this.el

		// Animation - Open
		if (status === 'close') {

			el.style.display = 'block'

			const anima = {
				i: { open: 0, close: 0, },
				time: {	delay: 0, open: 400,	wait: 0,	close: 0, }, // Durations
				interval: { open: 20, close: 20, }, // Interval per iteration
				steps: function(from, to) { 
					let 
					open = (to - from) * this.interval.open / this.time.open,
					close = (from - to) * this.interval.close / this.time.close

					return [open, close]
				},
			}
			
			let opacity = { from: 0, to: 1, }
	
			opacity.value = opacity.from
			opacity.steps = anima.steps(opacity.from, opacity.to)
	
			setTimeout(() => {
	
				const id = setInterval(() => {
	
					if (anima.i.open >= anima.time.open) clearInterval(id)
	
					opacity.value += opacity.steps[0]
	
					anima.i.open += anima.interval.open
	
					el.style.opacity = (opacity.value > opacity.to) ? opacity.to : opacity.value
	
				}, anima.interval.open)
			
			}, anima.time.delay)

		// Animation - Close
		} else {

			const anima = {
				i: { open: 0, close: 0, },
				time: {	delay: 500, open: 0,	wait: 0,	close: 400, }, // Durations
				interval: { open: 20, close: 20, }, // Interval per iteration
				steps: function(from, to) { 
					let 
					open = (to - from) * this.interval.open / this.time.open,
					close = (from - to) * this.interval.close / this.time.close

					return [open, close]
				},
			}
		
			let opacity = { from: 0, to: 1, }

			opacity.value = opacity.to
			opacity.steps = anima.steps(opacity.from, opacity.to)

			setTimeout(() => {				

				const id = setInterval(() => {

					if (anima.i.close >= anima.time.close) {

						clearInterval(id)

						el.style.display = 'none'
					}

					opacity.value += opacity.steps[1]

					anima.i.close += anima.interval.close

					el.style.opacity = (opacity.value < opacity.from) ? opacity.from : opacity.value

				}, anima.interval.close)
			
			}, anima.time.delay)			
		}
	}

	animaContent(status) 
	{
		const 
		el = this.el.querySelector('.content')

		// Animation - Open
		if (status === 'close') {

			const anima = {
				i: { open: 0, close: 0, },
				time: {	delay: 500, open: 400,	wait: 0,	close: 0, }, // Durations
				interval: { open: 20, close: 20, }, // Interval per iteration
				steps: function(from, to) { 
					let 
					open = (to - from) * this.interval.open / this.time.open,
					close = (from - to) * this.interval.close / this.time.close

					return [open, close]
				},
			}
			
			let opacity = { from: 0, to: 1, }
	
			opacity.value = opacity.from
			opacity.steps = anima.steps(opacity.from, opacity.to)
	
			setTimeout(() => {
	
				const id = setInterval(() => {
	
					if (anima.i.open >= anima.time.open) clearInterval(id)
	
					opacity.value += opacity.steps[0]
	
					anima.i.open += anima.interval.open
	
					el.style.opacity = (opacity.value > opacity.to) ? opacity.to : opacity.value
	
				}, anima.interval.open)
			
			}, anima.time.delay)

		// Animation - Close
		} else {
			
			const anima = {
				i: { open: 0, close: 0, },
				time: {	delay: 0, open: 0,	wait: 0,	close: 400, }, // Durations
				interval: { open: 20, close: 20, }, // Interval per iteration
				steps: function(from, to) { 
					let 
					open = (to - from) * this.interval.open / this.time.open,
					close = (from - to) * this.interval.close / this.time.close

					return [open, close]
				},
			}
		
			let opacity = { from: 0, to: 1, }

			opacity.value = opacity.to
			opacity.steps = anima.steps(opacity.from, opacity.to)

			setTimeout(() => {				

				const id = setInterval(() => {

					if (anima.i.close >= anima.time.close) clearInterval(id)

					opacity.value += opacity.steps[1]

					anima.i.close += anima.interval.close

					el.style.opacity = (opacity.value < opacity.from) ? opacity.from : opacity.value

				}, anima.interval.close)
			
			}, anima.time.delay)
		}
	}

	events()
	{
		const 
		modal = this.el,
		close = modal.querySelector('.close'),
		content = modal.querySelector('.content')

		// Events for desktop
		modal.addEventListener('click', e => this.display())

		content.addEventListener('click', e => this.handlerContent(e, content))

		close.addEventListener('click', e => this.display())

		// Events for mobile
		modal.addEventListener('touchstart', e => this.display())

		content.addEventListener('touchstart', e => this.handlerContent(e, content))

		close.addEventListener('touchstart', e => this.display())		
	}

	handlerContent(e, el = null)
	{
		e.stopPropagation()
	}
}	
			