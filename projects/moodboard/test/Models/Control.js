'use strict'

export class Control {
	
	constructor() 
	{		
		for (const arg of arguments) {

			switch (arg.constructor.name) {

				case 'HTMLDivElement': this.el = arg;	break;

				case 'View': this.view = arg;	break;

				case 'Alert': this.alert = arg;	break;

				default: console.log('Parameter not valid');
			}
		}

		this.interval = null

		this.events()
		
		this.buttons = this.el.querySelectorAll('.item')

		for (const btn of this.buttons) this.eventsButton(btn)
	}

	events() 
	{
		this.el.addEventListener('click', e => e.stopPropagation())
	}

	eventsButton(button) 
	{
		const action = button.getAttribute('data-action')

		switch (action) {

			case 'switch':
				// Events for desktop
				button.addEventListener('click', () => this.switchHandler(button))

				// Events for mobile
				button.addEventListener('touchstart', (e) => {
			  	e.stopPropagation(); this.switchHandler(button);
			  })

				break

			case 'rotate-p':
				// Events for desktop
			  button.addEventListener('click', () => { 
			  	clearInterval(this.interval); this.rotateHandler('p'); 
			  })
			  
			  button.addEventListener('mousedown', (e) => {
			  	e.stopPropagation(); clearInterval(this.interval);
			  	this.interval = setInterval(() => this.rotateHandler('p'), 200);
			  })
			  
			  button.addEventListener('mouseup', () => clearInterval(this.interval))
			  
			  // Events for mobile
			  button.addEventListener('touchstart', (e) => {
			  	e.stopPropagation(); clearInterval(this.interval);
			  	this.rotateHandler('p'); this.interval = setInterval(() => this.rotateHandler('p'), 200);
			  })
			  
			  button.addEventListener('touchend', () => clearInterval(this.interval))
			  
			  break

			case 'rotate-m':
			  // Events for desktop
			  button.addEventListener('click', () => { 
			  	clearInterval(this.interval); this.rotateHandler('m'); 
			  })
			  
			  button.addEventListener('mousedown', (e) => {
			  	e.stopPropagation(); clearInterval(this.interval);
			  	this.interval = setInterval(() => this.rotateHandler('m'), 200);
			  })
			  
			  button.addEventListener('mouseup', () => clearInterval(this.interval))
			  
			  // Events for mobile
			  button.addEventListener('touchstart', (e) => {
			  	e.stopPropagation(); clearInterval(this.interval);
			  	this.rotateHandler('m'); this.interval = setInterval(() => this.rotateHandler('m'), 200);
			  })
			  
			  button.addEventListener('touchend', () => clearInterval(this.interval))
			  
			  break

			case 'rotate-all-p':
			  // Events for desktop
			  button.addEventListener('click', () => { 
			  	clearInterval(this.interval); this.rotateAllHandler('p'); 
			  })
			  
			  button.addEventListener('mousedown', (e) => {
			  	e.stopPropagation(); clearInterval(this.interval);
			  	this.interval = setInterval(() => this.rotateAllHandler('p'), 200);
			  })
			  
			  button.addEventListener('mouseup', () => clearInterval(this.interval))
			  
			  // Events for mobile
			  button.addEventListener('touchstart', (e) => {
			  	e.stopPropagation(); clearInterval(this.interval);
			  	this.rotateAllHandler('p'); this.interval = setInterval(() => this.rotateAllHandler('p'), 200);
			  })
			  
			  button.addEventListener('touchend', () => clearInterval(this.interval))
			  
			  break

			case 'rotate-all-m':
			  // Events for desktop
			  button.addEventListener('click', () => { 
			  	clearInterval(this.interval); this.rotateAllHandler('m'); 
			  })
			  
			  button.addEventListener('mousedown', (e) => {
			  	e.stopPropagation(); clearInterval(this.interval);
			  	this.interval = setInterval(() => this.rotateAllHandler('m'), 200);
			  })
			  
			  button.addEventListener('mouseup', () => clearInterval(this.interval))
			  
			  // Events for mobile
			  button.addEventListener('touchstart', (e) => {
			  	e.stopPropagation(); clearInterval(this.interval);
			  	this.rotateAllHandler('m'); this.interval = setInterval(() => this.rotateAllHandler('m'), 200);
			  })
			  
			  button.addEventListener('touchend', () => clearInterval(this.interval))
			  
			  break

			case 'scale-p':
			  // Events for desktop
			  button.addEventListener('click', () => { 
			  	clearInterval(this.interval); this.scaleHandler('xy-p'); 
			  })
			  
			  button.addEventListener('mousedown', (e) => {
			  	e.stopPropagation(); clearInterval(this.interval);
			  	this.interval = setInterval(() => this.scaleHandler('xy-p'), 200);
			  })
			  
			  button.addEventListener('mouseup', () => clearInterval(this.interval))
			  
			  // Events for mobile
			  button.addEventListener('touchstart', (e) => {
			  	e.stopPropagation(); clearInterval(this.interval);
			  	this.scaleHandler('xy-p'); this.interval = setInterval(() => this.scaleHandler('xy-p'), 200);
			  })
			  
			  button.addEventListener('touchend', () => clearInterval(this.interval))
			  
			  break

			case 'scale-m':
				// Events for desktop
			  button.addEventListener('click', () => { 
			  	clearInterval(this.interval); this.scaleHandler('xy-m'); 
			  })
			  
			  button.addEventListener('mousedown', (e) => {
			  	e.stopPropagation(); clearInterval(this.interval);
			  	this.interval = setInterval(() => this.scaleHandler('xy-m'), 200);
			  })
			  
			  button.addEventListener('mouseup', () => clearInterval(this.interval))
			  
			  // Events for mobile
			  button.addEventListener('touchstart', (e) => {
			  	e.stopPropagation(); clearInterval(this.interval);
			  	this.scaleHandler('xy-m'); this.interval = setInterval(() => this.scaleHandler('xy-m'), 200);
			  })
			  
			  button.addEventListener('touchend', () => clearInterval(this.interval))
			  
			  break

			case 'scale-all-p':
			  // Events for desktop
			  button.addEventListener('click', () => { 
			  	clearInterval(this.interval); this.scaleAllHandler('xy-p'); 
			  })
			  
			  button.addEventListener('mousedown', (e) => {
			  	e.stopPropagation(); clearInterval(this.interval);
			  	this.interval = setInterval(() => this.scaleAllHandler('xy-p'), 200);
			  })
			  
			  button.addEventListener('mouseup', () => clearInterval(this.interval))
			  
			  // Events for mobile
			  button.addEventListener('touchstart', (e) => {
			  	e.stopPropagation(); clearInterval(this.interval);
			  	this.scaleAllHandler('xy-p'); this.interval = setInterval(() => this.scaleAllHandler('xy-p'), 200);
			  })
			  
			  button.addEventListener('touchend', () => clearInterval(this.interval))
			  
			  break

			case 'scale-all-m':				
			  // Events for desktop
			  button.addEventListener('click', () => { 
			  	clearInterval(this.interval); this.scaleAllHandler('xy-m'); 
			  })
			  
			  button.addEventListener('mousedown', (e) => {
			  	e.stopPropagation(); clearInterval(this.interval);
			  	this.interval = setInterval(() => this.scaleAllHandler('xy-m'), 200);
			  })
			  
			  button.addEventListener('mouseup', () => clearInterval(this.interval))
			  
			  // Events for mobile
			  button.addEventListener('touchstart', (e) => {
			  	e.stopPropagation(); clearInterval(this.interval);
			  	this.scaleAllHandler('xy-m'); this.interval = setInterval(() => this.scaleAllHandler('xy-m'), 200);
			  })
			  
			  button.addEventListener('touchend', () => clearInterval(this.interval))
			  
			  break

			case 'scaleX-p':
			  // Events for desktop
			  button.addEventListener('click', () => { 
			  	clearInterval(this.interval); this.scaleHandler('x-p'); 
			  })
			  
			  button.addEventListener('mousedown', (e) => {
			  	e.stopPropagation(); clearInterval(this.interval);
			  	this.interval = setInterval(() => this.scaleHandler('x-p'), 200);
			  })
			  
			  button.addEventListener('mouseup', () => clearInterval(this.interval))
			  
			  // Events for mobile
			  button.addEventListener('touchstart', (e) => {
			  	e.stopPropagation(); clearInterval(this.interval);
			  	this.scaleHandler('x-p'); this.interval = setInterval(() => this.scaleHandler('x-p'), 200);
			  })
			  
			  button.addEventListener('touchend', () => clearInterval(this.interval))
			  
			  break

			case 'scaleX-m':
			  // Events for desktop
			  button.addEventListener('click', () => { 
			  	clearInterval(this.interval); this.scaleHandler('x-m'); 
			  })
			  
			  button.addEventListener('mousedown', (e) => {
			  	e.stopPropagation(); clearInterval(this.interval);
			  	this.interval = setInterval(() => this.scaleHandler('x-m'), 200);
			  })
			  
			  button.addEventListener('mouseup', () => clearInterval(this.interval))
			  
			  // Events for mobile
			  button.addEventListener('touchstart', (e) => {
			  	e.stopPropagation(); clearInterval(this.interval);
			  	this.scaleHandler('x-m'); this.interval = setInterval(() => this.scaleHandler('x-m'), 200);
			  })
			  
			  button.addEventListener('touchend', () => clearInterval(this.interval))
			  
			  break

			case 'scaleY-p':				
			  // Events for desktop
			  button.addEventListener('click', () => { 
			  	clearInterval(this.interval); this.scaleHandler('y-p'); 
			  })
			  
			  button.addEventListener('mousedown', (e) => {
			  	e.stopPropagation(); clearInterval(this.interval);
			  	this.interval = setInterval(() => this.scaleHandler('y-p'), 200);
			  })
			  
			  button.addEventListener('mouseup', () => clearInterval(this.interval))
			  
			  // Events for mobile
			  button.addEventListener('touchstart', (e) => {
			  	e.stopPropagation(); clearInterval(this.interval);
			  	this.scaleHandler('y-p'); this.interval = setInterval(() => this.scaleHandler('y-p'), 200);
			  })
			  
			  button.addEventListener('touchend', () => clearInterval(this.interval))
			  
			  break

			case 'scaleY-m':				
			  // Events for desktop
			  button.addEventListener('click', () => { 
			  	clearInterval(this.interval); this.scaleHandler('y-m'); 
			  })
			  
			  button.addEventListener('mousedown', (e) => {
			  	e.stopPropagation(); clearInterval(this.interval);
			  	this.interval = setInterval(() => this.scaleHandler('y-m'), 200);
			  })
			  
			  button.addEventListener('mouseup', () => clearInterval(this.interval))
			  
			  // Events for mobile
			  button.addEventListener('touchstart', (e) => {
			  	e.stopPropagation(); clearInterval(this.interval);
			  	this.scaleHandler('y-m'); this.interval = setInterval(() => this.scaleHandler('y-m'), 200);
			  })
			  
			  button.addEventListener('touchend', () => clearInterval(this.interval))
			  
			  break

			case 'z-up':
				// Events for desktop
				button.addEventListener('click', () => this.zHandler('up'))

				// Events for mobile
				button.addEventListener('touchstart', (e) => {
					e.stopPropagation(); this.zHandler('up')
				})	

				break

			case 'z-down':
				// Events for desktop
				button.addEventListener('click', () => this.zHandler('down'))

				// Events for mobile
				button.addEventListener('touchstart', (e) => {
					e.stopPropagation(); this.zHandler('down')
				})	

				break

			case 'remove':
				// Events for desktop
				button.addEventListener('click', () => this.removeHandler())

				// Events for mobile
				button.addEventListener('touchstart', (e) => {
					e.stopPropagation(); this.removeHandler()
				})	

				break

			case 'clone':
				// Events for desktop
				button.addEventListener('click', () => this.cloneHandler())

				// Events for mobile
				button.addEventListener('touchstart', (e) => {
					e.stopPropagation(); this.cloneHandler()
				})	

				break

			case 'mirror-h':
				// Events for desktop
				button.addEventListener('click', () => this.mirrorHandler('h'))

				// Events for mobile
				button.addEventListener('touchstart', (e) => {
					e.stopPropagation(); this.mirrorHandler('h')
				})	

				break

			case 'mirror-v':
				// Events for desktop
				button.addEventListener('click', () => this.mirrorHandler('v'))

				// Events for mobile
				button.addEventListener('touchstart', (e) => {
					e.stopPropagation(); this.mirrorHandler('v')
				})	

				break

			default:
				console.log(action + ' is not an option of data-action')
		}
	}
	
	switchHandler(button) {}

	rotateHandler(flag) {
		const 
		view = this.view,
		selectedMaterial = view.selectedMaterial,
		alert = this.alert

		if (selectedMaterial !== null) {

			const slave = selectedMaterial.children[0]

			let 
			transform = slave.style.transform.split(' '),
			rotate = transform.filter(trans => trans.indexOf('rotateZ') > -1)

			rotate = rotate.toString()
			rotate = rotate !== '' ?
			 1 * rotate.replace('rotateZ(', '').replace('deg)', '') : 0
		  
		  switch (flag) {

			  case 'p':
				  slave.deg = rotate + 5
				  this.transform(slave)				
			    break

			  case 'm':
				  slave.deg = rotate - 5
				  this.transform(slave)
			    break

			  default:
			    console.log('Flag must be "p" for plus or "m" for minus')
		  }

	  } else {

			if (alert !== undefined && alert !== null) alert.display('No material selected', 'red')

		  else console.log('No material selected', 'red')
		}
	}

	rotateAllHandler(flag) 
	{
		const 
		view = this.view,
		materials = view.materials,
		alert = this.alert

		if (materials.length === 0) {

			alert.display('Add materials first', 'red')

			return false
		}

		if (flag === 'p' || flag === 'm') {
			
			materials.forEach((material) => {
			
				view.setSelectedMaterial(material)
				
				this.rotateHandler(flag)
			})

			view.setSelectedMaterial()

		} else console.log('Flag must be "p" for plus or "m" for minus')
	}

	scaleHandler(flag) {
		const 
		view = this.view,
		selectedMaterial = view.selectedMaterial,
		alert = this.alert

		if (selectedMaterial !== null) {

			const slave = selectedMaterial.children[0]

			let 
			naturalW = 1 * slave.getAttribute('naturalW'),
			naturalH = 1 * slave.getAttribute('naturalH')

			switch (flag) {

				case 'xy-p':
					slave.setAttribute('naturalW', naturalW + 5)
					slave.setAttribute('naturalH', naturalH + 5)
					view.resizeMaterial(slave)
					break

				case 'xy-m':
					slave.setAttribute('naturalW', (naturalW > 20) ? naturalW - 5 : naturalW)
					slave.setAttribute('naturalH', (naturalH > 20) ? naturalH - 5 : naturalH)
					view.resizeMaterial(slave)
					break

				case 'x-p':
					slave.setAttribute('naturalW', naturalW + 5)
					view.resizeMaterial(slave)
					break

				case 'x-m':
					slave.setAttribute('naturalW', (naturalW > 20) ? naturalW - 5 : naturalW)
					view.resizeMaterial(slave)
					break

				case 'y-p':
					slave.setAttribute('naturalH', naturalH + 5)
					view.resizeMaterial(slave)
					break

				case 'y-m':
					slave.setAttribute('naturalH', (naturalH > 20) ? naturalH - 5 : naturalH)
					view.resizeMaterial(slave)
					break

				default:
					console.log('Please choose one of this arguments: "xy-p", "xy-m", \
					"x-p", "x-m", "y-p" or "y-m"')
			}

			view.updateStorage()		

			if (alert !== undefined && alert !== null) alert.display('Material scaled')

		} else {

			if (alert !== undefined && alert !== null) alert.display('No material selected', 'red')

		  else console.log('No material selected', 'red')
		}
	}

	scaleAllHandler(flag) 
	{
		const 
		view = this.view,
		materials = view.materials,
		alert = this.alert

		if (materials.length === 0) {

			alert.display('Add materials first', 'red')

			return false
		}

		if (flag === 'xy-p' || flag === 'xy-m') {
			
			materials.forEach((material) => {
				
				view.setSelectedMaterial(material)

				this.scaleHandler(flag)
			})

			view.setSelectedMaterial()

		} else console.log('Please choose one of this arguments: "xy-p", "xy-m"')
	}

	transform(slave) 
	{
		let 
		transform = slave.style.transform,
		newTransform = '',
		deg = (slave.deg === undefined) ? 0 : slave.deg,
		result

		transform = transform.indexOf('rotateZ') === -1 ? 
			transform + ' rotateZ(' + deg + ')' : transform

		const 
		view = this.view,
		alert = this.alert,
		arrTransform = transform.split(' ')

		arrTransform.forEach((trans) => {

			result = trans

			if (trans.indexOf('rotateZ') !== -1)							
				result = 'rotateZ(' + deg + 'deg)'

			newTransform += result + ' '
		})

		slave.style.transform = newTransform
		slave.nextElementSibling.style.transform = newTransform

		view.updateStorage()

		if (alert !== undefined && alert !== null) alert.display('Material rotated')
	}

	zHandler(flag) 
	{
		const 
		selectedMaterial = this.view.selectedMaterial,
		alert = this.alert

		if (selectedMaterial !== null) {

			switch (flag) {

				case 'up':
					this.zUp(selectedMaterial)
				  break

				case 'down':
					this.zDown(selectedMaterial)
				  break

				default:
			    console.log('Flag must be "up" or "down"')
			}

		} else {

			if (alert !== undefined && alert !== null) alert.display('No material selected', 'red')

		  else console.log('No material selected')
		}
	}

	removeHandler() 
	{
		const
		view = this.view,
		materials = view.materials,
		selectedMaterial = view.selectedMaterial,
		newMaterials = materials.filter(mat => !Object.is(mat, selectedMaterial) ),
		alert = this.alert

		if (selectedMaterial !== null) {

			selectedMaterial.remove()

			alert.display('Material removed')
			
			this.view.materials = newMaterials

			this.refactorZs()

			view.setSelectedMaterial()

			view.updateStorage()

		} else {

			if (alert !== undefined && alert !== null) alert.display('No material selected', 'red')

		  else console.log('No material selected')
		}
	}

	cloneHandler()
	{
		const
		view = this.view,
		selectedMaterial = view.selectedMaterial,
		alert = this.alert

		if (selectedMaterial !== null) {

			const 
			clone = view.cloneMaterial(selectedMaterial),
			img = clone.children[0]

			let transform = img.style.transform

			img.deg = (transform.indexOf('rotateZ') > -1) ? 1 * 
			transform.slice(transform.indexOf('(') + 1, transform.indexOf('d')) : 0

			alert.display('Material cloned')

			this.refactorZs()

		} else {

			if (alert !== undefined && alert !== null) alert.display('No material selected', 'red')

		  else console.log('No material selected')
		}	
	}

	mirrorHandler(flag) 
	{
		const 
		view = this.view,
		selectedMaterial = view.selectedMaterial,
		alert = this.alert

		if (selectedMaterial !== null) {

			const img = selectedMaterial.children[0]

			let 
			transform = img.style.transform,
			newTransform = ''

			transform = transform.indexOf('scale') === -1 ? 
				transform + ' scaleX(1) scaleY(1)' : transform

			const arrTransform = transform.split(' ')

			switch (flag) {

				case 'h':
					arrTransform.forEach(trans => {

						let result = trans

						if (trans.indexOf('scaleX') !== -1)							
							result = (trans.indexOf('-') !== -1) ? 'scaleX(1)' : 'scaleX(-1)'

						newTransform += result + ' '
					})

					img.style.transform = newTransform
				  break

				case 'v':
					arrTransform.forEach(trans => {

						let result = trans

						if (trans.indexOf('scaleY') !== -1)							
							result = (trans.indexOf('-') !== -1) ? 'scaleY(1)' : 'scaleY(-1)'

						newTransform += result + ' '
					})

					img.style.transform = newTransform
				  break

				default:
			    console.log('Flag must be "h" or "v"')
			}

			view.updateStorage()

			if (
				alert !== undefined && 
				alert !== null &&
				(flag === 'h' || flag === 'v')
				) alert.display('Material mirror')

		} else {

			if (alert !== undefined && alert !== null) alert.display('No material selected', 'red')

		  else console.log('No material selected')
		}
	}

	zUp(selectedMaterial) 
	{
		const materials = this.view.materials

		let 
		length = materials.length,
		index = materials.indexOf(selectedMaterial)

		if (index > -1 && index < length - 1 && length > 1) {
			
			let i = materials.indexOf(selectedMaterial)

			materials[i] = materials[i + 1]
			materials[i + 1] = selectedMaterial

			this.refactorZs()
		}
	}

	zDown(selectedMaterial) 
	{
		const materials = this.view.materials

		let 
		length = materials.length,
		index = materials.indexOf(selectedMaterial)

		if (index > -1 && index !== 0 && length > 1) {

			let i = materials.indexOf(selectedMaterial)

			materials[i] = materials[i - 1]
			materials[i - 1] = selectedMaterial

			this.refactorZs()
		}
	}

	refactorZs() 
	{
		const 
		view = this.view,
		materials = view.materials,
		alert = this.alert

		materials.forEach((material, index) => material.style.zIndex = index)

		view.updateStorage()

		if (alert !== undefined && alert !== null) alert.display('Plan Z changed')
	}

	setImg(item) 
	{
		const 
		view = this.view,	
		slave = view.selectedMaterial,	
		img = view.selectedMaterial.children[0],
		alert = this.alert

		slave.dataset.viewMaterialValue = item.dataset.viewMaterialValue
		slave.dataset.viewMaterialSrc = item.dataset.viewMaterialSrc

		img.src = item.dataset.viewMaterialSrc

		view.setSelectedMaterial()

		view.updateStorage()

		if (alert !== undefined && alert !== null) alert.display('Material changed')
	}	
}
