'use strict'

// Import dependencies
import {Alert} from 'https://cdn.jsdelivr.net/gh/carlosfborges/public/js/Classes/Alert.min.js'
import {Modal} from 'https://cdn.jsdelivr.net/gh/carlosfborges/public/js/Classes/Modal.min.js'

// Import project classes
import {Moodboard} from './Models/Moodboard.js'

(() => {
	const
	link = document.createElement('link')	
	
	const
	a = new Alert(),
	m = new Modal(),
	mb = new Moodboard(a, m)
})()
