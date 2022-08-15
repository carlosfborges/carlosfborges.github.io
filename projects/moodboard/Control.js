'use strict'

export class Control {
	
	constructor() {		
		this.root = null
		this.dnd = null
		this.hasMask = false
		this.items = []
		this.msg = ''
		this.switchItem = null
		this.switch = false		
	}

	set(root, dnd) {
		this.root = root
		this.dnd = dnd
	}

	add(el) {		
		if (!this.items.includes(el)) { 			
			this.items.push(el) 
			this.addEvents(el)
		}		
	}

	addEvents(el) {
		const 
		obj = this,
		action = el.getAttribute('data-action')

		if (obj.root !== null) {
			obj.root.addEventListener('click', e =>	e.stopPropagation())
		} else {
			obj.notify('Root element not defined')
		}

		switch (action) {

			case 'switch':
				el.addEventListener('click', () => obj.switchHandler.call(obj, el))
				break

			case 'rotate-p':
			  el.addEventListener('click', () => obj.rotateHandler.call(obj, 'p'))
			  break

			case 'rotate-all-p':
			  el.addEventListener('click', () => obj.rotateAllHandler.call(obj, 'p'))
			  break

			case 'rotate-m':
			  el.addEventListener('click', () => obj.rotateHandler.call(obj, 'm'))
			  break

			case 'rotate-all-m':
			  el.addEventListener('click', () => obj.rotateAllHandler.call(obj, 'm'))
			  break

			case 'scale-p':
				el.addEventListener('click', () => obj.scaleHandler.call(obj, 'xy-p'))
				break
			
			case 'scale-all-p':
				el.addEventListener('click', () => obj.scaleAllHandler.call(obj, 'xy-p'))
				break

			case 'scale-m':
				el.addEventListener('click', () => obj.scaleHandler.call(obj, 'xy-m'))
				break

			case 'scale-all-m':
				el.addEventListener('click', () => obj.scaleAllHandler.call(obj, 'xy-m'))
				break

			case 'scaleX-p':
				el.addEventListener('click', () => obj.scaleHandler.call(obj, 'x-p'))
				break

			case 'scaleX-m':
				el.addEventListener('click', () => obj.scaleHandler.call(obj, 'x-m'))
				break

			case 'scaleY-p':
				el.addEventListener('click', () => obj.scaleHandler.call(obj, 'y-p'))
				break

			case 'scaleY-m':
				el.addEventListener('click', () => obj.scaleHandler.call(obj, 'y-m'))
				break

			case 'z-up':
				el.addEventListener('click', () => obj.zHandler.call(obj, 'up'))
				break

			case 'z-down':
				el.addEventListener('click', () => obj.zHandler.call(obj, 'down'))
				break

			case 'remove':
				el.addEventListener('click', () => obj.removeHandler.call(obj))
				break

			default:
				this.notify(action + ' is not an option of data-action')
		}
	}

	switchHandler(el) {
		const slaveItem = this.dnd.selectedItem !== null 
		? this.dnd.selectedItem.children[0] : this.dnd.selectedItem

		if (el !== undefined && this.switchItem === null) {
			this.switchItem = el
		}

		if (slaveItem !== null && this.switchItem !== null) {
		  this.switch = this.switch === false ? true : false
		  this.switchItem.setAttribute('data-status', this.switch)
	  } else {						
				this.notify('Slave item is null and/or argument is undefined')
		}
	}

	rotateHandler() {
		const slaveItem = this.dnd.selectedItem !== null 
		? this.dnd.selectedItem.children[0] : this.dnd.selectedItem

		if (slaveItem !== null) {
		  let flag = arguments[0]
		  
		  switch (flag) {
			  case 'p':						
				  slaveItem.deg = (slaveItem.deg === undefined) ?
				  5 : slaveItem.deg + 5

				  this.transform(slaveItem)				
			    break

			  case 'm':
				  slaveItem.deg = (slaveItem.deg === undefined) ?
				  -5 : slaveItem.deg - 5

				  this.transform(slaveItem)
			    break

			  default:
			    this.notify('Flag must be "p" for plus or "m" for minus')
		  }
	  } else {						
				this.notify('Slave item is null')
		}
	}

	rotateAllHandler(flag) {
		if (flag === 'p' || flag === 'm') {
			this.dnd.dragItems.forEach((obj) => {
				this.dnd.selectedItem = obj
				this.rotateHandler(flag)
			})
			this.dnd.selectedItem.classList.remove('selected')
			this.dnd.selectedItem = null
		} else {
			this.notify('Flag must be "p" for plus or "m" for minus')
		}
	}

	scaleHandler() {
		const slaveItem = this.dnd.selectedItem !== null 
		? this.dnd.selectedItem.children[0] : this.dnd.selectedItem

		if (slaveItem !== null) {
			let flag = arguments[0]

			switch (flag) {
				case 'xy-p':
					slaveItem.naturalW = 1 * slaveItem.naturalW + 5
					slaveItem.naturalH = 1 * slaveItem.naturalH + 5
					this.dnd.setSize(slaveItem)
					break

				case 'xy-m':
					slaveItem.naturalW = (1 * slaveItem.naturalW > 20) ? 
					1 * slaveItem.naturalW - 5 : slaveItem.naturalW
					slaveItem.naturalH = (1 * slaveItem.naturalH > 20) ?
					1 * slaveItem.naturalH - 5 : slaveItem.naturalH
					this.dnd.setSize(slaveItem)
					break

				case 'x-p':
					slaveItem.naturalW = 1 * slaveItem.naturalW + 5
					this.dnd.setSize(slaveItem)
					break

				case 'x-m':
					slaveItem.naturalW = (1 * slaveItem.naturalW > 20) ? 
					1 * slaveItem.naturalW - 5 : slaveItem.naturalW
					this.dnd.setSize(slaveItem)
					break

				case 'y-p':
					slaveItem.naturalH = 1 * slaveItem.naturalH + 5
					this.dnd.setSize(slaveItem)
					break

				case 'y-m':
					slaveItem.naturalH = (1 * slaveItem.naturalH > 20) ?
					1 * slaveItem.naturalH - 5 : slaveItem.naturalH
					this.dnd.setSize(slaveItem)
					break

				default:
					this.notify('Please choose one of this arguments: "xy-p", "xy-m", \
					"x-p", "x-m", "y-p" or "y-m"')
			}			
		} else {						
			this.notify('Slave item is null')
		}
	}

	scaleAllHandler(flag) {
		if (flag === 'xy-p' || flag === 'xy-m') {
			this.dnd.dragItems.forEach((obj) => {
				this.dnd.selectedItem = obj
				this.scaleHandler(flag)
			})
			this.dnd.selectedItem.classList.remove('selected')
			this.dnd.selectedItem = null
		} else {
			this.notify('Please choose one of this arguments: "xy-p", "xy-m"')
		}
	}

	transform(slaveItem) {
		let 
		deg = (slaveItem.deg === undefined) ? 0 : slaveItem.deg,
		rot = 'rotateZ(' + deg + 'deg)'

		slaveItem.style.transform = rot
		slaveItem.nextElementSibling.style.transform = rot
	}

	zHandler() {
		const slaveItem = this.dnd.selectedItem !== null 
		? this.dnd.selectedItem.children[0] : this.dnd.selectedItem

		if (slaveItem !== null) {
			let flag = arguments[0]

			switch (flag) {
				case 'up':
					if (this.dnd !== null) {
						this.dnd.zUp(slaveItem.parentElement)							
					} else {
						this.notify('Drag and drop item is null')
					}
				  break

				case 'down':
					if (this.dnd !== null) {
						this.dnd.zDown(slaveItem.parentElement)							
					} else {
						this.notify('Drag and drop item is null')
					}
				  break

				default:
			    this.notify('Flag must be "up" or "down"')
			}
		} else {						
			this.notify('Slave item is null')
		}
	}

	removeHandler() {
		const slaveItem = this.dnd.selectedItem !== null 
		? this.dnd.selectedItem.children[0] : this.dnd.selectedItem

		if (slaveItem !== null) {
			slaveItem.parentElement.remove()
		} else {
			this.notify('Slave item is null')
		}
	}

	notify(txt = '') {
		this.msg = txt		
		console.log(this)		
	}
}
