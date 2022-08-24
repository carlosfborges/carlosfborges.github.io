(() => {

'use strict'

const 
head = document.querySelector('head'),
body = document.querySelector('body'),
moodboard = document.querySelector('#cfb-moodboard')

try {

	// Checking all HTML set

	if (moodboard === null) 
		throw 'Moodboard is null'

	let 
	ref = moodboard.dataset.materialsRef,
	viewOriginalWidth = moodboard.dataset.viewOriginalWidth,
	viewOriginalHeight = moodboard.dataset.viewOriginalHeight

	if (ref === undefined) 
		throw 'Attribute data-materials-ref must be set on moodboard element.'

	if (ref === '') 
		throw 'Attribute data-materials-ref must have some value.'
		
	moodboard.dataset.viewOriginalWidth = 
		(viewOriginalWidth !== undefined && viewOriginalWidth !== '') ? 
		viewOriginalWidth : 500

	moodboard.dataset.viewOriginalHeight = 
		(viewOriginalHeight !== undefined && viewOriginalHeight !== '') ? 
		viewOriginalHeight : 500

	const materialsRef = document.querySelector(ref)

	if (materialsRef === null) 
		throw 'Element materials ref is null.'

	const 
	items = materialsRef.querySelectorAll('[data-view-material-value]'),
	keys = [
		'viewMaterialValue', 
		'viewMaterialSrc', 
		'viewMaterialOriginalWidth',
		'viewMaterialOriginalHeight'
		]
	
	if (items.length === 0) 
		throw 'Materials Ref items not found. Check dataset.'

	items.forEach(item => {

		let i = 0

		Object.keys(item.dataset).forEach(data => { if (keys.includes(data)) i++ })
		 		
		if (i !== 4) 
			throw 'Some item(s) of Material Ref element doesn\'t have all dataset.' 
	})

	// Everything is checked. 

	// Let's create dependencies elements: alert and modals

	const 
	alert = document.createElement('div'),
	modalMood = document.createElement('div')

	alert.id = 'alert'
	modalMood.id = 'modal-mood'

	body.append(alert, modalMood)

	// Let's create a style and script elements.

	const 
	link = document.createElement('link'),
	script = document.createElement('script')

	link.rel = 'stylesheet' 
	link.type = 'text/css'
	link.href = 'main2.css'

	head.append(link)

	script.src = 'main.js'
	script.type = 'module'

	body.append(script)

} catch (error) { console.log(error) }

})()
