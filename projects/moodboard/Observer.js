'use strict'

export class Observer {
	constructor(target, config) {
		this.target = target !== undefined ? target : null
		this.config = config !== undefined ? config :
		{ attributes: true, childList: true, characterData: true }
		this.el = new MutationObserver(mutations => this.event(mutations))

		this.el.observe(this.target, this.config)
	}

	event(mutations) {
		mutations.forEach((mutation) => {
			if (mutation.type === 'childList') console.log(this.target.children)
		})
	}

	disconnect() {
		this.el.disconnect()
	}
}
