'use strict'

export class Alert {

	constructor(el)
	{
		this.el = el

		this.status = 'close'
	}

	display(msg, color = 'green') 
	{
		const el = this.el

		if (this.status !== 'close') return false		

		this.status = 'anima'

		el.innerHTML = msg
		el.style.color = color

		this.animaAlert()
	}

	animaAlert() 
	{
		const el = this.el

		el.style.display = 'block'

		const anima = {
			i: { open: 0, close: 0, },
			time: {	delay: 0, open: 400,	wait: 1500,	close: 200, }, // Durations
			interval: { open: 20, close: 20, }, // Interval per iteration
			steps: function(from, to) { 
				let 
				open = (to - from) * this.interval.open / this.time.open,
				close = (from - to) * this.interval.close / this.time.close

				return [open, close]
			},
		}			
			
		let 
		opacity = { from: 0, to: 1, },
		right = { from: 0, to: 50, }
	
		opacity.value = opacity.from
		opacity.steps = anima.steps(opacity.from, opacity.to)

		right.value = right.from
		right.steps = anima.steps(right.from, right.to)
	
		setTimeout(() => {

			const id = setInterval(() => {

				if (anima.i.open >= anima.time.open) {					

					clearInterval(id)

					this.status = 'open'

					setTimeout(() => {

						const id = setInterval(() => {

							if (anima.i.close >= anima.time.close) {

								clearInterval(id)

								el.style.display = 'none'

								this.status = 'close'
							}

							opacity.value += opacity.steps[1]

							right.value += right.steps[1]

							anima.i.close += anima.interval.close

							el.style.opacity = (opacity.value < opacity.from) ? opacity.from : opacity.value

							el.style.paddingRight = (right.value < right.from) ? right.from + 'px' : right.value + 'px'

						}, anima.interval.close)

					}, anima.time.wait)
				}

				opacity.value += opacity.steps[0]

				right.value += right.steps[0]

				anima.i.open += anima.interval.open

				el.style.opacity = (opacity.value > opacity.to) ? opacity.to : opacity.value

				el.style.paddingRight = (right.value > right.to) ? right.to + 'px' : right.value + 'px'

			}, anima.interval.open)
		
		}, anima.time.delay)		
	}
}
