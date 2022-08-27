'use strict'

// Import dependencies
import {Alert} from './Models/Alert.min.js'
import {Modal} from './Models/Modal.min.js'

// Import project classes
import {Moodboard} from './Models/Moodboard.js'
import {View} from './Models/View.js'
import {Control} from './Models/Control.js'

(() => {

// HTML elements

const
html = document.querySelector('html'),
head = document.querySelector('head'),
body = document.querySelector('body'),
moodboard = document.querySelector('#cfb-moodboard'),
link = document.createElement('link')

// Setup objects: alert, modal and view

const
a = new Alert('moodboard-alert'),
m = new Modal('moodboard-modal'),
mb = new Moodboard(m)//,
//v = new View(a, m)//,
//ca = new Control(mb.ctrls.all, v, a),
//cr = new Control(mb.ctrls.right, v, a),
//cl = new Control(mb.ctrls.left, v, a),
//crm = new Control(mb.ctrls.remove, v, a)


link.rel = 'stylesheet', link.type = 'text/css', link.href = 'main.css', head.append(link)

})()

/*
v.setOverflowY = function(value) {
	body.style.overflowY = value
	html.style.overflowY = value
	mm.el.querySelector('.content').style.overflowY = value
}

mm.btns.forEach((btn) => {

	let ref = btn.getAttribute('data-ref')

	btn.addEventListener('click', () => mmHandler(ref))
	btn.addEventListener('touchstart', () => mmHandler(ref))
})

mm.handlerContent = function(e, el) {
	e.stopPropagation(); v.setSelectedMaterial();
}
*/
/*
mb.btns.forEach((btn) => {

	let 
	ref = btn.dataset.ref,
	materialRef = mb.materialsRef,
	action = btn.getAttribute('data-action')
	
	const clone = materialRef.cloneNode(true)

	clone.style.display = 'block'

	btn.addEventListener('click', e => btnHandler(e, action, clone))
	btn.addEventListener('touchstart', e => btnHandler(e, action, clone))

	clone.querySelectorAll('[data-view-material-value]').forEach(item => {
			
		item.addEventListener('click', e => itemHandler(e, action, item, ref))
		item.addEventListener('touchstart', e => itemHandler(e, action, item, ref))
	})
})
*/

/*
mb.btns.forEach((btn) => {

	console.log(btn)

	let action = btn.dataset.action

	mb.cloneMaterials.querySelectorAll('[data-view-material-value]').forEach(mt => {
			
		mt.addEventListener('click', e => materialHandler(e, action, mt))
		
		mt.addEventListener('touchstart', e => materialHandler(e, action, mt))
	})

	mb.cloneBackgrounds.querySelectorAll('[data-mb-bg-value]').forEach(bg => {
			
		bg.addEventListener('click', e => backgroundHandler(e, bg))
		
		bg.addEventListener('touchstart', e => backgroundHandler(e, bg))
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

function materialHandler(e, action, item) {
	
	switch (e.type) {

		case 'click':
		case 'touchstart':
			if (action === 'switch') {
				cr.setImg(item); mm.display(); return false; 
			}

			v.createMaterial(item);	break;

		default: console.log('Event type not valid.')
	}	
}

function backgroundHandler(e, item) {
	
	v.setBg(item.dataset.mbBgSrc);	mm.display();
}








/*
// Handler functions
function btnHandler(e, action, clone) {

	switch (e.type) {

		case 'click':
		case 'touchstart':

			if (action === 'switch' && v.selectedMaterial === null) {

				a.display('No material selected', 'red');	return false;
			}

			mm.display(clone)

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

			switch(ref) {
				
				case '#materials':

					if (action !== 'switch') v.createMaterial(item)
				
					else { cr.setImg(item); mm.display(); }
				
					break

				case '#mood-bg':
				
					v.setBg(item.dataset.view.MaterialSrc)
				
					mm.display()
				
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
*/

