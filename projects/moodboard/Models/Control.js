'use strict'

export class Control {
	
	constructor(el, view) 
	{		
		this.el = el		
		
		this.view = view			

		this.alert = null

		try {

			if (el === undefined || el === null) throw 'Attribute el must be set'

			if (view === undefined || view === null) throw 'Attribute view must be set'

			this.events()
			
			this.buttons = el.querySelectorAll('.item')

			for (const btn of this.buttons) this.eventsButton(btn)

		} catch (msg) { console.log(msg) }
	}

	events() 
	{
		this.el.addEventListener('click', e => e.stopPropagation())
	}

	eventsButton(button) 
	{
		const action = button.getAttribute('data-action')

		let id

		switch (action) {

			case 'switch':
				button.addEventListener('click', () => this.switchHandler(button))
				break

			case 'rotate-p':
			  button.addEventListener('click', () => this.rotateHandler('p'))
			  button.addEventListener('mousedown', (e) => {
			  	e.stopPropagation(); id = setInterval(() => this.rotateHandler('p'), 200);
			  })
			  button.addEventListener('mouseup', () => clearInterval(id))
			  break

			case 'rotate-m':
			  button.addEventListener('click', () => this.rotateHandler('m'))
			  button.addEventListener('mousedown', () => id = setInterval(() => this.rotateHandler('m'), 200))
			  button.addEventListener('mouseup', () => clearInterval(id))
			  break

			case 'rotate-all-p':
			  button.addEventListener('click', () => this.rotateAllHandler('p'))
			  button.addEventListener('mousedown', () => id = setInterval(() => this.rotateAllHandler('p'), 200))
			  button.addEventListener('mouseup', () => clearInterval(id))
			  break

			case 'rotate-all-m':
			  button.addEventListener('click', () => this.rotateAllHandler('m'))
			  button.addEventListener('mousedown', () => id = setInterval(() => this.rotateAllHandler('m'), 200))
			  button.addEventListener('mouseup', () => clearInterval(id))
			  break

			case 'scale-p':
				button.addEventListener('click', () => this.scaleHandler('xy-p'))
				button.addEventListener('mousedown', () => id = setInterval(() => this.scaleHandler('xy-p'), 200))
			  button.addEventListener('mouseup', () => clearInterval(id))
				break

			case 'scale-m':
				button.addEventListener('click', () => this.scaleHandler('xy-m'))
				button.addEventListener('mousedown', () => id = setInterval(() => this.scaleHandler('xy-m'), 200))
			  button.addEventListener('mouseup', () => clearInterval(id))
				break

			case 'scale-all-p':
				button.addEventListener('click', () => this.scaleAllHandler('xy-p'))
				button.addEventListener('mousedown', () => id = setInterval(() => this.scaleAllHandler('xy-p'), 200))
			  button.addEventListener('mouseup', () => clearInterval(id))
				break

			case 'scale-all-m':
				button.addEventListener('click', () => this.scaleAllHandler('xy-m'))
				button.addEventListener('mousedown', () => id = setInterval(() => this.scaleAllHandler('xy-m'), 200))
			  button.addEventListener('mouseup', () => clearInterval(id))
				break

			case 'scaleX-p':
				button.addEventListener('click', () => this.scaleHandler('x-p'))
				button.addEventListener('mousedown', () => id = setInterval(() => this.scaleHandler('x-p'), 200))
			  button.addEventListener('mouseup', () => clearInterval(id))
				break

			case 'scaleX-m':
				button.addEventListener('click', () => this.scaleHandler('x-m'))
				button.addEventListener('mousedown', () => id = setInterval(() => this.scaleHandler('x-m'), 200))
			  button.addEventListener('mouseup', () => clearInterval(id))
				break

			case 'scaleY-p':
				button.addEventListener('click', () => this.scaleHandler('y-p'))
				button.addEventListener('mousedown', () => id = setInterval(() => this.scaleHandler('y-p'), 200))
			  button.addEventListener('mouseup', () => clearInterval(id))
				break

			case 'scaleY-m':
				button.addEventListener('click', () => this.scaleHandler('y-m'))
				button.addEventListener('mousedown', () => id = setInterval(() => this.scaleHandler('y-m'), 200))
			  button.addEventListener('mouseup', () => clearInterval(id))
				break

			case 'z-up':
				button.addEventListener('click', () => this.zHandler('up'))
				break

			case 'z-down':
				button.addEventListener('click', () => this.zHandler('down'))
				break

			case 'remove':
				button.addEventListener('click', () => this.removeHandler())
				break

			case 'clone':
				button.addEventListener('click', () => this.cloneHandler())
				break

			case 'mirror-h':
				button.addEventListener('click', () => this.mirrorHandler('h'))
				break

			case 'mirror-v':
				button.addEventListener('click', () => this.mirrorHandler('v'))
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

	/*setBg(src)
	{
		const 
		view = this.view.el,
		alert = this.alert


		if (view !== null) {

			const s = view.style

			s.backgroundImage = (src !== undefined && src !== '') ? 'url("' + src + '")' : 'none'
			s.backgroundRepeat = 'no-repeat' 
			s.backgroundSize = 'cover'

			view.updateStorage()

			if (alert !== undefined && alert !== null) alert.display('Background changed')

		} else console.log('Element dropItem is null')
	}*/

	setImg(src) 
	{
		const 
		view = this.view,		
		slave = view.selectedMaterial.children[0],
		alert = this.alert

		slave.src = src

		view.setSelectedMaterial()

		view.updateStorage()

		if (alert !== undefined && alert !== null) alert.display('Material changed')
	}	
}
