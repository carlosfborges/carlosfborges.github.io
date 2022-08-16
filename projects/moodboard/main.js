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
	btnsOpenModal = document.querySelectorAll('[data-modal=open]')

	const
	mb = document.querySelector('.mb'),	
	vw = mb.querySelector('.view'),
	ctrlAll = mb.querySelector('.control-all'),
	ctrlR = mb.querySelector('.control-material-right'),
	ctrlL = mb.querySelector('.control-material-left'),
	ctrlRemove = mb.querySelector('.control-remove')

	const
	a = new Alert(alert),
	m = new Modal(modal),
	o = new Observer(vw),
	v = new View(vw),
	ca = new Control(ctrlAll, v),
	cr = new Control(ctrlR, v),
	cl = new Control(ctrlL, v),
	crm = new Control(ctrlRemove, v)


	v.alert = a
	
	ca.alert = a; cr.alert = a; cl.alert = a; crm.alert = a;


	btnsOpenModal.forEach(btn => {

		let 
		ref = btn.getAttribute('data-ref'),
		action = btn.getAttribute('data-action')
		
		const clone = document.querySelector(ref).cloneNode(true)

		clone.style.display = 'block'

		btn.addEventListener('click', () => {

			if (action === 'switch' && v.selectedMaterial === null) {

				a.display('No material selected', 'red');	return false;
			}

			m.display(clone)
		})

		clone.querySelectorAll('.opt .list .item').forEach(item => {
					
			item.addEventListener('click', (e) => {

				e.stopPropagation()

				let src = item.getAttribute('data-img')

				switch(ref) {
					
					case '#materials':
						if (action !== 'switch') v.createMaterial(src)
						else { cr.setImg(src); m.display(); }
						break

					case '#mood-bg':
						v.setBg(src)
						m.display()
						break

					default:
						console.log('Atribute data-ref values: #materials, #mood-bg')
				}		
			})
		})
	})

	window.addEventListener('click', () => v.setSelectedMaterial())
	window.addEventListener('dblclick', (e) => { e.preventDefault() })
	window.addEventListener('resize', () => v.resize())

	
	document.querySelector('body').addEventListener('touchmove', e => setScroll(e))
	document.querySelector('body').addEventListener('dblclick', e => e.preventDefault(e))


	document.querySelector('html').addEventListener('touchmove', e => setScroll(e))
	document.querySelector('html').addEventListener('dblclick', e => e.preventDefault())

	function setScroll(e) {

		const view = e.view

		view.scroll = null; view.scrollBy = null; view.scrollTo = null; 
	}

	v.clear()

})()
