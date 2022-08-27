(() => {

'use strict'

const 
head = document.querySelector('head'),
body = document.querySelector('body'),
moodboard = document.querySelector('#cfb-moodboard')

try {

	// Checking all HTML set

	if (null === moodboard)	throw 'Moodboard is null'

	let 
	ref = moodboard.dataset.materialsRef,
	viewOriginalWidth = moodboard.dataset.viewOriginalWidth,
	viewOriginalHeight = moodboard.dataset.viewOriginalHeight

	if (void(0) === ref) throw 'Attribute data-materials-ref must be set on moodboard element.'

	if ('' === ref) throw 'Attribute data-materials-ref must have some value.'
		
	const materialsRef = document.querySelector(ref)

	if (null === materialsRef) throw 'Element materials ref is null.'

	const 
	items = materialsRef.querySelectorAll('[data-view-material-value]'),
	keys = [
		'viewMaterialValue', 
		'viewMaterialSrc', 
		'viewMaterialOriginalWidth',
		'viewMaterialOriginalHeight'
		]
	
	if (0 === items.length) throw 'Materials Ref items not found. Check dataset.'

	items.forEach(item => {

		let i = 0

		Object.keys(item.dataset).forEach(data => { keys.includes(data) && i++ })
		 		
		if (4 !== i) throw 'Some item(s) of Material Ref element doesn\'t have all dataset.' 
	})

	// Everything is checked. 
	// Let's create the script element.

	const script = document.createElement('script')

	script.src = 'main.js',	script.type = 'module',	body.append(script)
	
	// Reset originals dimensions

	moodboard.dataset.viewOriginalWidth = 
		(void(0) !== viewOriginalWidth && '' !== viewOriginalWidth) ? 
		viewOriginalWidth : 500

	moodboard.dataset.viewOriginalHeight = 
		(void(0) !== viewOriginalHeight && '' !== viewOriginalHeight) ? 
		viewOriginalHeight : 500

} catch (error) { console.log(error) }

})()
