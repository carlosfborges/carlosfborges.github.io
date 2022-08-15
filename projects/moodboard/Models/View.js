'use strict'

export class View {
	
	constructor(el = null, materials = []) 
	{		
		this.el = el

		this.materials = materials

		this.controlMasks = el.parentElement.querySelectorAll('[data-mask]')

		this.dropCoords = [0, 0]
		
		this.activeEvent = null

		this.selectedMaterial = null 

		this.alert = null
		
		try {	

			this.load()

			if (el === undefined || el === null) throw 'Attribute el must be set'

			let 
			naturalW = el.getAttribute('naturalW'),
			naturalH = el.getAttribute('naturalH')
			
			if (
				naturalW === undefined || 
				naturalW === null ||
				naturalW === ''
				) throw 'Atribute naturalWidth must be set'

			if (
				naturalH === undefined || 
				naturalH === null ||
				naturalH === ''
				) throw 'Atribute naturalHeight must be set'

			this.naturalW = 1 * naturalW
		
			this.naturalH = 1 * naturalH

			this.widthFactor = 1 * (this.naturalH / this.naturalW).toFixed(2)
				
			this.resize()

			this.events()

			this.setSelectedMaterial()
			
		} catch(msg) { console.log(msg) }		
	}

	resize() 
	{
		const 
		view = this.el, 
		materials = this.materials,
		widthFactor = this.widthFactor, 
		alert = this.alert

		let
		bodyW = document.body.clientWidth,
		screenH = window.screen.availHeight

		let
		refW = bodyW - 100,
		refH = 80 / 100 * screenH

		let
		width = refW, 
		height = width * widthFactor

		// Limit view height. Must be less then screen height
		if (height >= refH) {

			height = refH

			width = height / widthFactor
		}

		view.style.width = width + 'px'

		view.style.height = height + 'px'

		if (materials.length > 0) this.resizeAllMaterials()

		if (alert !== undefined && alert !== null) alert.display('Resized')

		this.updateStorage()	
	}

	setBg(src) 
	{
		const s = this.el.style

		s.backgroundImage = 'url(' + src + ')'
		s.backgroundSize = 'cover'
		s.backgroundRepeat = 'no-repeat'	

		this.updateStorage()		
	}

	events() 
	{		
		const el = this.el

		el.draggable = true

		el.addEventListener('dragstart', e => this.handler(e))
		
		el.addEventListener('dragend', e => this.handler(e))

		el.addEventListener('dragenter', e => this.handler(e))

		el.addEventListener('dragover', e => this.handler(e))

		el.addEventListener('dragleave', e => this.handler(e))
		
		el.addEventListener('drop', e => this.handler(e))
	}

	handler(e) 
	{
		const target = this.el, alert = this.alert

		switch (e.type) {

			case 'dragstart':

				this.activeEvent = e.type

				target.pageX = e.pageX
				target.pageY = e.pageY

				setTimeout(() => target.display = 'none', 0)

				break

			case 'dragend':

			  // this.activeEvent = e.type
		
				target.display = 'block'
		
				break

			case 'dragenter':

				e.preventDefault()

			  // this.activeEvent = e.type
		
				break

			case 'dragover':

				e.preventDefault()

			  // this.activeEvent = e.type
		
				break

			case 'dragleave':

				e.preventDefault()

			  // this.activeEvent = e.type
		
				break

			case 'drop':

				this.dropCoords = [e.pageX, e.pageY]

				if (this.activeEvent === 'dragstart')	this.moveAllMaterials()

				this.activeEvent = e.type	

				this.updateStorage()				
		
				break

			default:
		
				console.log('Event type undefined!')
		}
	}

	// Materials
	createMaterial(src) 
	{
		const 
		parent = this.el, 
		materials = this.materials,
		material = document.createElement('div'),
		alert = this.alert

		// this.setSelectedMaterial()

		try {

			if (parent === undefined || parent === null) throw 'Attribute el must be set'

			if (src === undefined || src === null || src === '') throw 'Parameter src must be set'

			material.innerHTML = `
			<img src="` + src + `">
			<div class="mask"></div>
		`

			setTimeout(() => {

				const img = material.children[0]

				img.setAttribute('naturalW', img.naturalWidth)
				img.setAttribute('naturalH', img.naturalHeight)

				this.resizeMaterial(img)

				if (img.complete && img.naturalWidth > 0) {

					material.draggable = true

					material.classList.add('item')

					material.style.left = 0
					material.style.top = 0	
					material.style.zIndex = materials.length

					material.setAttribute('naturalL', 0)
					material.setAttribute('naturalT', 0)

					this.eventsMaterial(material)

					parent.append(material)

					materials.push(material)

					this.setSelectedMaterial()

					setTimeout(() => {

						if (alert !== undefined && alert !== null) alert.display('Material created')
							
					}, 500)

					this.updateStorage()	
				
				} else {

					if (alert !== undefined && alert !== null) alert.display('Fail to load image', 'red')

					else console.log('Fail to load image')	
				}

			}, 1000)			

		} catch(msg) { console.log(msg)	} 
	}

	cloneMaterial(material) 
	{
		const 
		parent = this.el, 
		materials = this.materials,
		newMaterials = [],
		clone = material.cloneNode(true)
		alert = this.alert

		this.setSelectedMaterial()

		clone.classList.remove('selected')

		clone.style.left = 1 * clone.style.left.replace('px', '') + 10 + 'px'
		clone.style.top = 1 * clone.style.top.replace('px', '') + 10 + 'px'

		this.eventsMaterial(clone)

		parent.append(clone)

		materials.forEach((mat) => {

			if (Object.is(mat, material)) newMaterials.push(mat, clone)

			else newMaterials.push(mat)
		})

		this.materials = newMaterials

		this.updateStorage()	

		return clone
	}

	resizeMaterial(img) 
	{
		const parent = this.el, imgParent = img.parentElement

		try {

			if (parent === undefined || parent === null) throw 'Attribute el must be set'

			if (img.src === undefined || img.src === null || img.src === '') throw 'Parameter src must be set'

			let
			naturalW = img.getAttribute('naturalW'),
			naturalH = img.getAttribute('naturalH'),
			naturalL = imgParent.getAttribute('naturalL'),
			naturalT = imgParent.getAttribute('naturalT'),
			width = Math.round(naturalW * parent.clientWidth / this.naturalW),
			left = Math.round(parent.clientWidth * naturalL / this.naturalW),
			top = Math.round(parent.clientHeight * naturalT / this.naturalH)

			img.widthFactor = 1 * (naturalH / naturalW).toFixed(2)

			// Resize
			img.style.width = width + 'px'			
			img.style.height = Math.round(img.widthFactor * width) + 'px'

			// Position
			imgParent.style.left = left + 'px'
			imgParent.style.top = top + 'px'	

			this.updateStorage()			

		} catch(msg) { console.log(msg)	} 
	}

	resizeAllMaterials() 
	{
		this.materials.forEach(material => this.resizeMaterial(material.children[0]))
	}

	moveMaterial(material) 
	{
		const parent = this.el

		let 
		left = 1 * material.style.left.replace('px', ''),
		top = 1 * material.style.top.replace('px', ''),
		x = Math.round(left + this.dropCoords[0] - material.pageX),
		y = Math.round(top + this.dropCoords[1] - material.pageY)

		// Move
		material.style.left = x + 'px'
		material.style.top = y + 'px'

		// Set natural position
		material.setAttribute('naturalL', Math.round(x * this.naturalW / parent.clientWidth))
		material.setAttribute('naturalT', Math.round(y * this.naturalH / parent.clientHeight))

		this.updateStorage()	
	}

	moveAllMaterials() 
	{
		const view = this.el

		this.materials.forEach(material => {
			
			material.pageX = view.pageX
			material.pageY = view.pageY

			this.moveMaterial(material)
		})
	}

	setSelectedMaterial(material) 
	{		
		if (material !== undefined && material !== null) {

			if (this.selectedMaterial !== null) 
				this.selectedMaterial.classList.remove('selected')

			this.selectedMaterial = material

			material.classList.add('selected')

			this.setMask(false)

		}	else {

			if (this.selectedMaterial !== null)
				this.selectedMaterial.classList.remove('selected')				

			this.selectedMaterial = null	
			
			this.setMask(true)
		}
	}

	eventsMaterial(material) 
	{		
		material.draggable = true

		material.addEventListener('dragstart', e => this.handlerMaterial(e))
		
		material.addEventListener('dragend', e => this.handlerMaterial(e))

		material.addEventListener('click', e => this.handlerMaterial(e, material))
	}	

	handlerMaterial(e) 
	{
		const 
		parent = this.el, 
		target = (arguments.length === 2) ? arguments[1] : e.target,
		alert = this.alert

		let distX = 0, distY = 0

		switch (e.type) {

			case 'dragstart':

				e.stopPropagation()
				
				target.pageX = e.pageX
				
				target.pageY = e.pageY

				setTimeout(() => target.style.display = 'none', 0)

				break

			case 'dragend':

				e.stopPropagation()
		
				target.style.display = 'block'

				if (this.activeEvent === 'drop') this.moveMaterial(target)
		
				break

			case 'click':

				e.stopPropagation()
		
				this.setSelectedMaterial(target)
		
				break

			default:

				console.log('Event type undefined!')
		}
	}

	setMask(value)
	{
		const
		view = this.el, 
		cAll = view.parentElement.querySelector('.control-all'),
		cAllMask = cAll.querySelector('[data-mask]'),
		controlMasks = this.controlMasks,
		materials = this.materials
		
		for (const mask of controlMasks) {

			if (Object.is(mask, cAllMask)) {

				mask.setAttribute('data-mask', 
					(this.materials.length === 0) ? true : false)

				continue
			}

			mask.setAttribute('data-mask', value)			
		}
	}

	load(html = '', bg = '')
	{
		const 
		view = this.el

		let 
		materials = view.children, 
		newMaterials = [], index = 0, i,
		viewContent = localStorage.getItem('viewContent'),
		viewBg = localStorage.getItem('viewBg'),
		content = (html === '' && viewContent !== null) ? 
			localStorage.getItem('viewContent') : html,
		bgImage = (bg === '' && viewBg !== null) ? 
			localStorage.getItem('viewBg') : bg

		view.innerHTML = content

		if (bgImage.indexOf('null') === -1) {

			let src = bgImage.replace('url(', '').replace(')', '')

			this.setBg(src)
		}

		for (let mat of materials) {

			this.eventsMaterial(mat)

			for (i = 0; i < materials.length; i++) {

				if (materials[i].style.zIndex == index) {

					newMaterials.push(materials[i])					

					break
				}
			}

			index++
		}		

		materials = this.materials = newMaterials

		this.resizeAllMaterials()	

		this.updateStorage()	
	}

	updateStorage()
	{
		let 
		bg = this.el.style.backgroundImage,
		content  = this.el.innerHTML.replace('selected', '')

		localStorage.setItem('viewBg', bg)
		localStorage.setItem('viewContent', content)
	}

	removeStorage()
	{
		localStorage.removeItem('viewBg')
		localStorage.removeItem('viewContent')
	}

	clear()
	{
		this.removeStorage()

		this.load()
	}
}
