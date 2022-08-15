'use strict'

// Import classes
import {Alert} from './Models/Alert.js'
import {Modal} from './Models/Modal.js'
import {Observer} from './Models/Observer.js'
import {View} from './Models/View.js'
import {Control} from './Models/Control.js'

(() => {

	const
	alert = document.querySelector('.alert')
	
	const
	modal = document.querySelector('.modal'),
	openModal = document.querySelector('[data-modal=open]')

	const
	mb = document.querySelector('.mb'),	
	vw = mb.querySelector('.view'),
	ctrlAll = mb.querySelector('.control-all'),
	ctrlMaterial = mb.querySelector('.control-material'),
	ctrlZ = mb.querySelector('.control-z'),
	ctrlRemove = mb.querySelector('.control-remove')

	const
	ref = document.querySelector('.materials'),
	clone = ref.cloneNode(true)

	const
	a = new Alert(alert),
	m = new Modal(modal),
	o = new Observer(vw),
	v = new View(vw),
	ca = new Control(ctrlAll, v),
	cm = new Control(ctrlMaterial, v),
	cz = new Control(ctrlZ, v),
	cr = new Control(ctrlRemove, v)


	v.alert = a
	
	ca.alert = a; cm.alert = a; cz.alert = a; cr.alert = a;


	clone.style.display = 'block'
	
	clone.querySelectorAll('.opt .list .item').forEach(item => {
		
		item.addEventListener('click', (e) => {

			e.stopPropagation()

			let 
			material = item.getAttribute('data-material'),
			src = item.getAttribute('data-img')

			if (!cm.switch) {

				if (material === 'background') cm.setBg(src)
				
				else v.createMaterial(src)
					
			} else cm.setImg(src)
		})
	})

	openModal.addEventListener('click', () => m.display(clone))

	window.addEventListener('click', () => v.setSelectedMaterial())
	window.addEventListener('resize', () => v.resize())

})()
