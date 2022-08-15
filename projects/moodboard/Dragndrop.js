'use strict'

export class Dragndrop {
	constructor() {
		this.dragItems = []
		this.dropItem = null
		this.draggedItem = null
		this.selectedItem = null
		this.msg = ''
	}

	set(el) {
		const obj = this

		obj.dropItem = el

		obj.dropItem.draggable = true

		el.addEventListener('dragstart', function(e) {
			el.pageX = e.pageX
			el.pageY = e.pageY			
			obj.draggedItem = el
		})

		this.dropItem.addEventListener('dragend', function(e) {
			this.pageX = 0
			this.pageY = 0
			obj.draggedItem = null
		})
		
		this.dropEvents()
		this.setSize()
	}

	resize() {
		if (this.dropItem !== null) {
			const obj = this

			this.setSize()

			this.dragItems.forEach((item) => {
				obj.setSize(item.children[0])
				obj.setPosition(item)
			})
		}
	}

	setSize() {
		const view = this.dropItem

		let
		x = view.clientWidth,
		y = view.clientHeight,			
		vBox = view.getAttribute('data-box').split(' '),
		res = vBox[1] / vBox[0]		

		if (arguments.length > 0) {
			const img = arguments[0]

			let 
			calc,
			nw = img.naturalW,
			nh = img.naturalH,
			res = nh / nw

			calc = x * nw / vBox[0]

			img.style.width = calc + 'px'
			img.style.height = calc * res + 'px'	
		} else {
			view.style.height = x * res + 'px'	
		}		
	}

	setPosition(el) {
		const view = this.dropItem

		let
		x = view.clientWidth,
		y = view.clientHeight,			
		vBox = view.getAttribute('data-box').split(' ')

		el.style.left = 1 * x * el.naturalL / vBox[0] + 'px'
		el.style.top = 1 * y * el.naturalT / vBox[1] + 'px'
	}

	setNaturalPosition(el) {
		const view = this.dropItem

		let
		vBox = view.getAttribute('data-box').split(' ')

		el.naturalL = el.left * vBox[0] / view.clientWidth
		el.naturalT = el.top * vBox[1] / view.clientHeight
	}

	setBackground(url) {
		if (this.dropItem !== null) {
			const s = this.dropItem.style
			s.backgroundImage = 'url("' + url + '")'
			s.backgroundRepeat = 'no-repeat' 
			s.backgroundSize = 'contain'
		} else {
			obj.notify('Element dropItem is null')
		}
	}

	create(src , e) {
		if (this.dropItem !== null)	{			
			const 
			obj = this,
			viewItem = document.createElement('div')
	
			viewItem.innerHTML = `		
			<img src="` + src + `">
			<div class="mask"></div>
			`			
	
			setTimeout(() => {
				const img = viewItem.children[0]
				
				let
				calc,
				nw = img.naturalWidth,
				nh = img.naturalHeight,
				res = nh / nw,
				vBox = obj.dropItem.getAttribute('data-box').split(' ')	
	
				img.naturalW = nw
				img.naturalH = nh				

				calc = obj.dropItem.clientWidth * nw / vBox[0]

				img.style.width = calc + 'px'
				img.style.height = calc * res + 'px'
	
				if (img.complete && nw !== 0) {
					viewItem.draggable = true
					viewItem.classList.add('item')
					viewItem.style.left = viewItem.naturalL = 0
					viewItem.style.top = viewItem.naturalT = 0
					
					viewItem.addEventListener('click', e => obj.clickHandler.call(obj, viewItem, e))

					obj.dragEvents(viewItem)
					obj.dropItem.append(viewItem)
				} else {
					obj.notify('Fail to load a src image')
				}
			}, 1000)
		} else {
			obj.notify('Element dropItem is null')
		}
	}

	dragEvents(el) {
		if (!this.dragItems.includes(el)) { 
			const obj = this

			obj.dragItems.push(el) 
			
			el.style.zIndex = obj.dragItems.indexOf(el)

			// Add drag events
			el.addEventListener('dragstart', e => obj.dragstartHandler.call(obj, el, e))
			el.addEventListener('dragend', e => obj.dragendHandler.call(obj, el, e))
		}
	}

	dropEvents() {
		const obj = this

		// Add drop events
		obj.dropItem.addEventListener('dragenter', e =>	e.preventDefault())		
		obj.dropItem.addEventListener('dragover', e =>	e.preventDefault())		
		obj.dropItem.addEventListener('drop', (e) => {
			if (obj.draggedItem === obj.dropItem) {
				obj.dragItems.forEach((item) => {
					obj.draggedItem = item
					obj.dropHandler.call(obj, e, 'dropRef')
				})
			} else {
				obj.dropHandler.call(obj, e)
			}
		})
	}

	clickHandler(el, e) {
		e.stopPropagation()

		if (this.selectedItem !== null) {
			this.selectedItem.classList.remove('selected')
		}
		
		el.classList.add('selected')
		this.selectedItem = el		
	}

	dragstartHandler(el, e) {
		e.stopPropagation()
		this.draggedItem = el

		el.pageX = e.pageX
		el.pageY = e.pageY				
			
		setTimeout(() => el.style.display = 'none', 0)

		this.msg = ''
	}

	dragendHandler(el, e) {
		e.stopPropagation()
		this.draggedItem.classList.remove('selected')
		this.draggedItem = null

		el.pageX = 0
		el.pageY = 0
				
		setTimeout(() => el.style.display = 'block', 0)		
	}

	dropHandler(e, ref) {
		let
		pageY = ref !== undefined ? this.dropItem.pageY : this.draggedItem.pageY,
		pageX = ref !== undefined ? this.dropItem.pageX : this.draggedItem.pageX

		if (this.draggedItem !== null) {
			let
			top = 1 * this.draggedItem.style.top.replace('px', ''),
			left = 1 * this.draggedItem.style.left.replace('px', ''),
			calcTop = top + e.pageY - pageY,
			calcLeft = left + e.pageX - pageX

			this.draggedItem.style.top = calcTop + 'px'					
			this.draggedItem.style.left = calcLeft + 'px'

			this.draggedItem.top = calcTop
			this.draggedItem.left = calcLeft

			this.setNaturalPosition(this.draggedItem)
		} else {
			this.notify('Selected item is not a dragged element')
		}
	}	

	zUp(el) {		
		let 
		length = this.dragItems.length,
		index = this.dragItems.indexOf(el)

		if (index > -1 && index < length - 1 && length > 1) {
			let i = this.dragItems.indexOf(el)

			this.dragItems[i] = this.dragItems[i + 1]
			this.dragItems[i + 1] = el

			this.refactorZs()
		}
	}

	zDown(el) {		
		let 
		length = this.dragItems.length,
		index = this.dragItems.indexOf(el)

		if (index > -1 && index !== 0 && length > 1) {
			let i = this.dragItems.indexOf(el)

			this.dragItems[i] = this.dragItems[i - 1]
			this.dragItems[i - 1] = el

			this.refactorZs()
		}
	}

	refactorZs() {
		this.dragItems.forEach((obj, index) => {
			obj.style.zIndex = index
		})
	}	

	notify(txt = '') {
		this.msg = txt		
		console.log(this)
	}
}
