'use strict'

// Import classes
import {Alert} from './Models/Alert.js'
import {Modal} from './Models/Modal.js'
// import {Observer} from './Models/Observer.js'
import {View} from './Models/View.js'
import {Control} from './Models/Control.js'

(() => {

	const
	body = document.querySelector('body'),
	html = document.querySelector('html')

	const
	alert = document.querySelector('.alert')
	
	const
	modalMood = document.querySelector('#modal-mood'),
	modal = document.querySelector('#modal')

	const
	mb = document.querySelector('.mb'),	
	vw = mb.querySelector('.view'),
	ctrlAll = mb.querySelector('.control-all'),
	ctrlR = mb.querySelector('.control-material-right'),
	ctrlL = mb.querySelector('.control-material-left'),
	ctrlRemove = mb.querySelector('.control-remove')

	const
	a = new Alert(alert),
	mm = new Modal(modalMood),
	m = new Modal(modal),
	// o = new Observer(vw),
	v = new View(vw),
	ca = new Control(ctrlAll, v),
	cr = new Control(ctrlR, v),
	cl = new Control(ctrlL, v),
	crm = new Control(ctrlRemove, v)


	v.alert = a

	v.setOverflowY = function(value) {
		body.style.overflowY = value
		html.style.overflowY = value
		mm.el.querySelector('.content').style.overflowY = value
	}
	
	ca.alert = a; cr.alert = a; cl.alert = a; crm.alert = a;

	
	mm.btns.forEach((btn) => {

		let ref = btn.getAttribute('data-ref')

		btn.addEventListener('click', () => mmHandler(ref))
		btn.addEventListener('touchstart', () => mmHandler(ref))
	})

	mm.handlerContent = function(e, el) {
		e.stopPropagation(); v.setSelectedMaterial();
	}

	m.btns.forEach((btn) => {

		let 
		ref = btn.getAttribute('data-ref'),
		action = btn.getAttribute('data-action')
		
		const clone = document.querySelector(ref).cloneNode(true)

		clone.style.display = 'block'

		btn.addEventListener('click', e => btnHandler(e, action, clone))
		btn.addEventListener('touchstart', e => btnHandler(e, action, clone))

		clone.querySelectorAll('.opt .list .item').forEach(item => {
				
			item.addEventListener('click', e => itemHandler(e, action, item, ref))
			item.addEventListener('touchstart', e => itemHandler(e, action, item, ref))
		})
	})

	
	// Window events
	window.addEventListener('resize', () => v.resize())
	
	
	// Body events
	body.addEventListener('click', () => v.setSelectedMaterial())

	// Body events for mobile
	body.addEventListener('touchstart', (e) => {
		
		e.preventDefault(); v.setSelectedMaterial();
	})


	body.addEventListener('touchmove', e => e.preventDefault())
	body.addEventListener('touchend', e => e.preventDefault())
	

	// Html events
	html.addEventListener('click', () => v.setSelectedMaterial())

	// Html events for mobile
	html.addEventListener('touchstart', (e) => {
		
		e.preventDefault(); v.setSelectedMaterial();
	})

	html.addEventListener('touchmove', e => e.preventDefault())
	html.addEventListener('touchend', e => e.preventDefault())


	// Handler functions
	function btnHandler(e, action, clone) {

		switch (e.type) {

			case 'click':
			case 'touchstart':

				if (action === 'switch' && v.selectedMaterial === null) {

					a.display('No material selected', 'red');	return false;
				}

				m.display(clone)

				break

			default:
				
				a.display('Flag must be click');
		}
	}

	function itemHandler(e, action, item, ref) {
		
		switch (e.type) {

			case 'click':
			case 'touchstart':

				e.stopPropagation()

				let 
				src = item.getAttribute('data-img'),
				title = item.getAttribute('data-title'),
				value = item.getAttribute('data-value')

				switch(ref) {
					
					case '#materials':

						if (action !== 'switch') v.createMaterial(src, title, value)
					
						else { cr.setImg(src, title, value); m.display(); }
					
						break

					case '#mood-bg':
					
						v.setBg(src)
					
						m.display()
					
						break

					default:
					
						console.log('Atribute data-ref values: #materials, #mood-bg')
				}

				break

			default:
				
				a.display('Flag must be click');
		}	
	}

	function mmHandler(ref) {
		
		if (ref === 'new' && v.checkStorage()) {

			if (confirm('Do you want to create a new moodboard?')) {

				v.clear(); mm.display();
			}
		} else {

			mm.display(); v.resize()
		}		
	}

})()
