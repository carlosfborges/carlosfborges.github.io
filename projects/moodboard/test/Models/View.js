'use strict'

export class View {
	
	constructor() 
	{	
		for (const arg of arguments) {

			switch (arg.constructor.name) {

				case 'Alert':	this.alert = arg;	break;

				case 'Modal':	this.modal = arg;	break;

				default:	console.log('Parameter not valid');
			}
		}

		this.el = document.querySelector('.view')

		this.materials = []

		this.controlMasks = this.el.parentElement.querySelectorAll('[data-mask]')

		this.dropCoords = [0, 0]
		
		this.activeEvent = null

		this.selectedMaterial = null 

		this.viewer = document.querySelector('.mb-viewer')

		this.list = document.querySelector('.mb-list-content')
		
		try {

			let 
			naturalW = this.el.getAttribute('naturalW'),
			naturalH = this.el.getAttribute('naturalH')
			
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
				
			this.events()

			if (this.checkStorage()) this.load()
			
		} catch(msg) { console.log(msg) }
	}

	resize() 
	{
		const 
		view = this.el, 
		viewer = this.viewer,
		materials = this.materials,
		widthFactor = this.widthFactor, 
		alert = this.alert,
		bounding = document.body.getBoundingClientRect()
		
		let
		bodyW = bounding.width, 
		screenH = bounding.height * 95 / 100

		let
		refW = bodyW - 2 * 65,
		refH = 80 / 100 * screenH

		let
		width = refW, 
		height = width * widthFactor

		// Limit view height. Must be less then screen height
		if (height >= refH) {

			height = refH; width = height / widthFactor;
		}

		view.style.width = width + 'px'
		view.style.height = height + 'px'

		if (materials.length > 0) this.resizeAllMaterials()

		// if (alert !== undefined && alert !== null) alert.display('Resized')

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

		// Drag and drop events for desktop
		el.addEventListener('dragstart', e => this.handler(e))
		
		el.addEventListener('dragend', e => this.handler(e))

		el.addEventListener('dragenter', e => this.handler(e))

		el.addEventListener('dragover', e => this.handler(e))

		el.addEventListener('dragleave', e => this.handler(e))
		
		el.addEventListener('drop', e => this.handler(e))

		// Touch events for mobile
		el.addEventListener('touchstart', e => this.handler(e))

		el.addEventListener('touchmove', e => this.handler(e))

		el.addEventListener('touchend', e => this.handler(e))
	}

	handler(e) 
	{
		const 
		target = this.el, // View
		materials = this.materials,
		selectedMaterial = this.selectedMaterial,
		parent = target.parentElement,
		alert = this.alert

		let 
		touchLocation, shadow = document.querySelector('.shadow')

		switch (e.type) {

			case 'dragstart':					

				if (selectedMaterial !== null) {

					const img = document.createElement('img')

					e.dataTransfer.setDragImage(img, 0, 0)
					
					return false
				}

				target.pageX = e.pageX;	target.pageY = e.pageY;

				this.activeEvent = e.type

				this.setBorder()

				setTimeout(() => target.style.opacity = 0, 0)	

				break

			case 'dragenter':
			case 'dragover':
			case 'dragleave':

				e.preventDefault()
		
				break

			case 'dragend':

				if (selectedMaterial !== null) return false

				this.setBorder()

				setTimeout(() => target.style.opacity = 1, 0)

				this.updateStorage()
		
				break				

			case 'drop':

				this.dropCoords = [e.pageX, e.pageY]

				if (this.activeEvent === 'dragstart')	this.moveAllMaterials()

				this.activeEvent = e.type	
		
				break

			case 'touchstart':

				e.stopPropagation()

				if (selectedMaterial !== null) return false

				this.activeEvent = e.type

				this.setBorder()

				touchLocation = e.targetTouches[0]

				target.pageX = touchLocation.pageX;	target.pageY = touchLocation.pageY;

				target.shadowLeft = 16

				target.shadowTop = 16

				setTimeout(() => target.style.opacity = 0, 0)				

				this.setOverflowY('none')

				break

			case 'touchmove':

				e.stopPropagation()

				if (selectedMaterial !== null) return false

				this.activeEvent = e.type

				touchLocation = e.targetTouches[0]

				this.dropCoords = [touchLocation.pageX, touchLocation.pageY]

				this.setShadow(target, touchLocation)

				this.setOverflowY('hidden')

				break

			case 'touchend':

				if (selectedMaterial !== null) return false

				if (this.activeEvent === 'touchmove')	{

					shadow.remove(); this.moveAllMaterials();
				}

				setTimeout(() => target.style.opacity = 1, 0)

				this.activeEvent = e.type;

				this.setBorder()

				this.updateStorage()

				this.setOverflowY('auto')

				break

			default:
		
				console.log('Event type undefined!')
		}
	}

	// Materials
	createMaterial(item) 
	{
		const 
		parent = this.el, 
		materials = this.materials,
		material = document.createElement('div'),
		alert = this.alert

		let
		value = item.dataset.viewMaterialValue,
		src = item.dataset.viewMaterialSrc

		try {

			material.setAttribute('data-img', src)
			// material.setAttribute('data-title', title)
			material.setAttribute('data-value', value)

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

					this.updateStorage()	

					setTimeout(() => {

						if (alert !== undefined && alert !== null) alert.display('Material created')
							
					}, 500)
				
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
		clone = material.cloneNode(true),
		// bounding = clone.getBoundingClientRect(),
		alert = this.alert

		this.setSelectedMaterial()

		clone.classList.remove('selected')

		clone.pageX = 0; clone.pageY = 0;	this.dropCoords = [10, 10];

		this.moveMaterial(clone, false)
		
		this.eventsMaterial(clone)

		parent.append(clone)

		materials.forEach((mat) => {

			if (Object.is(mat, material)) newMaterials.push(mat, clone)

			else newMaterials.push(mat)
		})

		this.materials = newMaterials

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
			width = Math.round(naturalW * parseInt(parent.style.width) / this.naturalW),
			left = Math.round(parseInt(parent.style.width) * naturalL / this.naturalW),
			top = Math.round(parseInt(parent.style.height) * naturalT / this.naturalH)

			img.widthFactor = 1 * (naturalH / naturalW).toFixed(2)

			// Resize
			img.style.width = width + 'px'			
			img.style.height = Math.round(img.widthFactor * width) + 'px'

			// Position
			imgParent.style.left = left + 'px'
			imgParent.style.top = top + 'px'	

			// this.updateStorage()			

		} catch(msg) { console.log(msg)	} 
	}

	resizeAllMaterials() 
	{
		this.materials.forEach(material => this.resizeMaterial(material.children[0]))
	}

	moveMaterial(material, checkArea = true) 
	{
		const 
		parent = this.el,
		dropCoords = this.dropCoords,
		bounding = parent.getBoundingClientRect(),
		range = [
			bounding.x, bounding.x + bounding.width, // x-min, x-max
			bounding.y, bounding.y + bounding.height // y-min, y-max
		]

		let 
		left = 1 * material.style.left.replace('px', ''),
		top = 1 * material.style.top.replace('px', ''),
		x = Math.round(left + dropCoords[0] - material.pageX),
		y = Math.round(top + dropCoords[1] - material.pageY)

		if (
			checkArea === true && (
			dropCoords[0] <= range[0] || dropCoords[0] >= range[1] ||
			dropCoords[1] <= range[2] || dropCoords[1] >= range[3] )
		) return false

		// Move
		material.style.left = x + 'px';	material.style.top = y + 'px';

		// Set natural position
		material.setAttribute('naturalL', Math.round(x * this.naturalW / parent.clientWidth))
		material.setAttribute('naturalT', Math.round(y * this.naturalH / parent.clientHeight))

		// this.updateStorage()	
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

			this.el.style.cursor = 'auto'

			this.setMask(false)

		}	else {

			if (this.selectedMaterial !== null)
				this.selectedMaterial.classList.remove('selected')				

			this.selectedMaterial = null	

			this.el.style.cursor = 'move'
			
			this.setMask(true)
		}
	}

	eventsMaterial(material) 
	{		
		material.draggable = true

		// Drag and drop events for desktop
		material.addEventListener('dragstart', e => this.handlerMaterial(e, material))
		
		material.addEventListener('dragend', e => this.handlerMaterial(e, material))

		// Touch events for mobile
		material.addEventListener('touchstart', e => this.handlerMaterial(e, material))

		material.addEventListener('touchmove', e => this.handlerMaterial(e, material))

		material.addEventListener('touchend', e => this.handlerMaterial(e, material))

		// Click events
		material.addEventListener('click', e => this.handlerMaterial(e, material))
	}	

	handlerMaterial(e) 
	{
		const 
		parent = this.el, 
		target = (arguments.length === 2) ? arguments[1] : e.target,
		alert = this.alert

		let distX = 0, distY = 0, 
		touchLocation, shadow = document.querySelector('.shadow')

		switch (e.type) {

			case 'dragstart':

				e.stopPropagation()

				if (this.selectedMaterial === null || !Object.is(target, this.selectedMaterial)) 
					return false
				
				target.pageX = e.pageX
				
				target.pageY = e.pageY

				setTimeout(() => target.style.display = 'none', 0)

				break			

			case 'dragend':

				e.stopPropagation()

				if (this.selectedMaterial === null || !Object.is(target, this.selectedMaterial)) 
					return false
		
				setTimeout(() => target.style.display = 'block', 0)

				if (this.activeEvent === 'drop') this.moveMaterial(target)

				this.updateStorage()
		
				break

			case 'touchstart':

				e.stopPropagation()

				if (
					this.selectedMaterial === null || 
					!Object.is(target, this.selectedMaterial)
				) return false

				touchLocation = e.targetTouches[0]
				
				target.pageX = touchLocation.pageX
				
				target.pageY = touchLocation.pageY

				target.shadowLeft = target.style.left !== null ? 1 * parseInt(target.style.left) : 0

				target.shadowTop = target.style.top !== null ? 1 * parseInt(target.style.top) : 0

				this.activeEvent = e.type

				setTimeout(() => target.style.display = 'none', 0)

				this.setOverflowY('hidden')				

				break

			case 'touchmove':

				e.stopPropagation()				

				if (this.selectedMaterial === null || !Object.is(target, this.selectedMaterial)) 
					return false

				touchLocation = e.targetTouches[0]

				this.dropCoords = [touchLocation.pageX, touchLocation.pageY]

				this.activeEvent = e.type

				this.setShadow(target, touchLocation)

				this.setOverflowY('hidden')
				
				break

			case 'touchend':

				e.stopPropagation()

				if (this.selectedMaterial === null || !Object.is(target, this.selectedMaterial)) 
					return false

				if (this.activeEvent === 'touchmove') {

					shadow.remove()
					
					this.moveMaterial(target)
				}

				setTimeout(() => target.style.display = 'block', 0)

				this.setOverflowY('auto')

				this.updateStorage()

				break

			case 'click':

				e.stopPropagation()

				if (Object.is(target, this.selectedMaterial)) this.setSelectedMaterial()
		
				else this.setSelectedMaterial(target)
		
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

		view.childNodes.forEach((mat) => {
			mat.style.display = 'block'
			this.eventsMaterial(mat); this.materials.push(mat);
		})	

		this.resize()	
	}

	updateStorage()
	{
		let 
		bg = this.el.style.backgroundImage,
		content = 
			this.el.innerHTML.replace('selected', '').replace('none', 'block')

		localStorage.setItem('viewBg', bg)
		localStorage.setItem('viewContent', content)

		this.updateViewer(bg, content)

		this.updateList()
	}

	checkStorage()
	{
		return (
			localStorage.getItem('viewBg') !== 'url("")' ||
			localStorage.getItem('viewContent') !== ''
		)
	}

	getStorage()
	{
		return { 
			bg: localStorage.getItem('viewBg'),
			content: localStorage.getItem('viewContent'),
		}
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

	setShadow(target, touchLocation)
	{
		const 
		parent = Object.is(target, this.el) ? this.el.parentElement : this.el

		let shadow = document.querySelector('.shadow')

		if (shadow === undefined || shadow === null) {

			shadow = target.cloneNode(true)

			shadow.classList.add('shadow')

			var s = shadow.style

			s.position = 'absolute'; s.display = 'block';	s.opacity = 0.5;

			parent.append(shadow)	
		}

		shadow.style.left = target.shadowLeft + touchLocation.pageX - target.pageX + 'px'

		shadow.style.top = target.shadowTop + touchLocation.pageY - target.pageY + 'px'
	}

	setBorder(style = '1px solid grey')
	{
		const s = this.el.style

		s.border = (s.border === 'none') ? style : 'none'
	}

	setOverflowY(value)
	{
		document.querySelector('body').style.overflowY = value
		document.querySelector('html').style.overflowY = value
	}

	updateViewer(bg, content)
	{
		const viewer = this.viewer

		let bodyW = document.body.clientWidth

		if (viewer !== undefined && viewer !== null) {

			viewer.style.width = this.el.style.width
			viewer.style.height = this.el.style.height

			viewer.classList.add('mb')

			viewer.innerHTML = '<div class="view">' + content + '</div>'

			const view = viewer.querySelector('.view')
			
			view.style.backgroundImage = bg
			view.style.backgroundSize = 'cover'
			view.style.backgroundRepeat = 'no-repeat'

			if (bodyW <= 700) this.scaleViewer(bodyW)

			else this.scaleViewer()
		
		}	else console.log('Element .mb-viewer not set')
	}

	scaleViewer(bodyW)
	{
		const 
		viewer = this.viewer,		
		style = viewer.style

		if (bodyW === undefined || bodyW === null) {

			style.transform = 'scale(1)';	return false;
		}
		
		let widthFactor = 1 * (bodyW - 10) / viewer.clientWidth

		style.transform = 'scale(' + widthFactor + ')'
	}

	updateList()
	{
		const 
		materials = this.materials,
		list = this.list // html element

		let titles = [], imgs = [], html = ''

		if (list === undefined || list === null) return false

		list.classList.add('materials')
		list.innerHTML = ''

		materials.forEach(mat => titles.push(mat.getAttribute('data-title')))

		titles = [... new Set(titles)]

		titles.forEach((title) => {

			if (title !== null) {
			
				html += `
					<div class="list">
						<h5 class="list-title">` + title + `</h5>
						<div class="list-content">
				`
	
				materials.forEach((mat) => {
	
					let
					src = mat.getAttribute('data-img'),
					title2 = mat.getAttribute('data-title'),
					value = mat.getAttribute('data-value')
	
					if (title === title2 && imgs.indexOf(src) === -1) {
	
						html += `<div class="item"><img src="` + src + `" />` + value + `</div>`
	
						imgs.push(src)
					}
				})
	
				html += `</div></div>`
			}
		})	

		list.innerHTML = html	
	}
}
