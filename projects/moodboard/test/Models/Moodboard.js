'use strict'
export class Moodboard {
	constructor()
	{ 
		for (const arg of arguments) {
			switch (arg.constructor.name) {
				case 'Modal': this.modal = arg; break;
				case 'Alert': this.alert = arg; break;				
				case 'String': this.defaultStyle = arg; break;
				default: console.log('Parameter not valid');					
			}
		}
		// this.removeSessionStorage(),
		this.defaultStyle = this.defaultStyle || 'main.css', this.createStyle(),
		this.el = document.querySelector('#cfb-moodboard'),
		this.materialsRef = document.querySelector(this.el.dataset.materialsRef),
		this.backgroundsRef = document.querySelector(this.el.dataset.backgroundsRef),
		this.idTimeout = null, this.idInterval = null,
		this.objResize = {viewWidth: null, factor: null},
		this.viewItemIdCounter = this.viewItemIdCounter || 0,
		this.createEls()
	}	
	createStyle()
	{
		const l = document.createElement('link');
		l.rel = 'stylesheet', l.type = "text/css", l.href = this.defaultStyle,
		document.querySelector('head').append(l)
	}
	createEls()
	{	
		this.checkSessionStorage() && this.load() ||
		fetch('components.html')
		.then(response => response.blob())
		.then(myBlob => myBlob.text())
		.then(myText => {this.el.innerHTML = myText, this.afterCreateLoad()})
	}
	load()
	{
		this.el.outerHTML = sessionStorage.getItem('moodboard'), 
		this.el = document.querySelector('#cfb-moodboard'), //this.setComponents(),
		this.afterCreateLoad(); return true
	}
	afterCreateLoad()
	{
		this.setComponents(),	this.setSessionStorage(),		
		this.removeDatasetItemSelected(), this.display('btns')
	}
	setComponents()
	{
		this.components = {
			view: this.el.querySelector('[data-moodboard-view]'),
			btns: {
				addMaterials: this.el.querySelector('[data-moodboard-btn-add-materials]'),
				background: this.el.querySelector('[data-moodboard-btn-background')
			},
			ctrls: {
				clone: this.el.querySelector('[data-moodboard-ctrl-clone]'),
				zIndexUp: this.el.querySelector('[data-moodboard-ctrl-z-index-up]'), 
				zIndexDown: this.el.querySelector('[data-moodboard-ctrl-z-index-down]'),
				mirrorH: this.el.querySelector('[data-moodboard-ctrl-mirror-h]'), 
				mirrorV: this.el.querySelector('[data-moodboard-ctrl-mirror-v]'),
				rotateL: this.el.querySelector('[data-moodboard-ctrl-rotate-left]'), 
				rotateR: this.el.querySelector('[data-moodboard-ctrl-rotate-right]'),
				scaleP: this.el.querySelector('[data-moodboard-ctrl-scale-plus]'), 
				scaleM: this.el.querySelector('[data-moodboard-ctrl-scale-minus]'),
				scaleXP: this.el.querySelector('[data-moodboard-ctrl-scalex-plus]'), 
				scaleXM: this.el.querySelector('[data-moodboard-ctrl-scalex-minus]'),
				scaleYP: this.el.querySelector('[data-moodboard-ctrl-scaley-plus]'), 
				scaleYM: this.el.querySelector('[data-moodboard-ctrl-scaley-minus]'),
				remove:  this.el.querySelector('[data-moodboard-ctrl-remove]')
			}
		},
		this.resize(), this.addEvents()
	}
	resize()
	{	
		this.el.dataset.moodboardHide = '', clearTimeout(this.idTimeout),
	
		this.el.style.width = '100%', this.el.style.height = '100%',

		this.idTimeout = setTimeout(() => {
			this.el.clientWidth >= this.el.clientHeight && 			
			(this.el.style.width = this.el.clientHeight + 'px', this.el.style.height = this.el.clientHeight + 'px')

			this.el.clientWidth <= this.el.clientHeight && 
			(this.el.style.height = this.el.clientWidth + 'px', this.el.style.width = this.el.clientWidth + 'px') &&
			(this.components.view.style.height = this.el.clientWidth - 130 + 'px'),
			
			void(0) === this.components.view.dataset.size && 
			(this.components.view.dataset.size = this.components.view.offsetWidth), 

			this.resizeViewItems(),	this.el.removeAttribute('data-moodboard-hide')
		}, 200)
	}
	resizeViewItems()
	{		
		let factor = this.components.view.clientWidth / this.components.view.dataset.size;		
		1 !== factor &&
		this.components.view.querySelectorAll('[data-view-item]').forEach(item => {
			item.style.left = parseInt(factor * parseInt(item.style.left)) + 'px',
			item.style.top = parseInt(factor * parseInt(item.style.top)) + 'px'
		}),
		this.components.view.dataset.size = this.components.view.clientWidth
	}
	addEvents()
	{
		this.windowEvents(), this.docEvents(), this.viewEvents(), 
		this.btnsEvents(), this.ctrlEvents(),
		0 < this.components.view.querySelectorAll('[data-view-item]').length &&
		this.components.view.querySelectorAll('[data-view-item]').forEach((item, index) => {
			this.viewItemIdCounter = index + 1, (item.id = index + 1) && (item.id = 'item' + item.id), 
			this.viewItemEvents(item)
		})
	}
	windowEvents() {window.addEventListener('resize', () => this.resize())}	
	docEvents()
	{
		document.querySelector('body').addEventListener('mousedown', () => this.removeDatasetItemSelected()),
		document.querySelector('body').addEventListener('mouseup', () => this.removeDatasetItemSelected())
	}
	viewEvents()
	{
		this.components.view.addEventListener('dragenter', e => {e.preventDefault(), this.alert.display('enter')}),
		this.components.view.addEventListener('dragover', e => {e.preventDefault(), this.alert.display('over')}),
		this.components.view.addEventListener('dragleave', e => {e.preventDefault(), this.alert.display('leave')}),
		this.components.view.addEventListener('drop', e => { 
			const selected = this.components.view.querySelector('#' + e.dataTransfer.getData('id'));
			let left = parseInt(selected.style.left) || 0, top = parseInt(selected.style.top)	|| 0;	
			left = 1 * left + e.pageX - e.dataTransfer.getData('px0'), 
			top = 1 * top + e.pageY - e.dataTransfer.getData('py0'),
			selected.style.left = left + 'px', selected.style.top = top + 'px',
			this.addDatasetItemSelected(selected),
			this.alert.display('drop') 
		})
	}
	btnsEvents()
	{
		// mousedown
		this.components.btns.addMaterials.addEventListener('mousedown', () => { 
			this.modal.display(this.materialsRef.outerHTML.replace('display: none', '')) 
			this.materialsRefItemEvent(this.modal.el.querySelectorAll('[data-material-ref-value]'))
		}),
		this.components.btns.background.addEventListener('mousedown', () => { 
			this.modal.display(this.backgroundsRef.outerHTML.replace('display: none', '')) 
			this.backgroundsRefItemEvent(this.modal.el.querySelectorAll('[data-background-ref-value]'))
		}),
		// mouseup
		this.components.btns.addMaterials.addEventListener('mouseup', e => e.stopPropagation()),
		this.components.btns.background.addEventListener('mouseup', e => e.stopPropagation())
	}
	ctrlEvents()
	{
		// LEFT SIDE CTRL
		// mousedown
		this.components.ctrls.clone.addEventListener('mousedown', e => { 
			e.stopPropagation()
			this.checkDatasetItemSelected() && (() => {
				const 
				el =  this.components.view.querySelector('[data-item-selected]'),
				c =  el.cloneNode(true)

				c.id = this.getViewItemId(), this.removeDatasetItemSelected(), 
				this.addDatasetItemSelected(c),	this.viewItemEvents(c),	
				el.after(c), this.setSessionStorage(), this.alert.display('clone') 
			})()
		}),
		this.components.ctrls.zIndexUp.addEventListener('mousedown', e => {
			e.stopPropagation()
			this.checkDatasetItemSelected() && (() => {
				const 
				el =  this.components.view.querySelector('[data-item-selected]'),
				next =  el.nextElementSibling

				null !== next && next.after(el), this.setSessionStorage(),
				this.alert.display('zIndexUp') 
			})()
		}),
		this.components.ctrls.zIndexDown.addEventListener('mousedown', e => {
			e.stopPropagation()
			this.checkDatasetItemSelected() && (() => {
				const 
				el =  this.components.view.querySelector('[data-item-selected]'),
				previous =  el.previousElementSibling
	
				null !== previous && previous.before(el), this.setSessionStorage(),
				this.alert.display('zIndexDown') 
			})()
		}),
		this.components.ctrls.mirrorH.addEventListener('mousedown', e => { 
			e.stopPropagation()
			this.checkDatasetItemSelected() && (() => {
				let 
				tStr = this.components.view.querySelector('[data-item-selected]').style.transform,
				tArr = tStr.split(' '),
				r = 0, sx = 1, sy = 1, str = ''

				tArr.forEach((item) => { 
					-1 < item.indexOf('deg') && (r = item.replace('rotateZ(', '').replace('deg)', '')) ||
					-1 < item.indexOf('scaleX') && (sx = item.replace('scaleX(', '').replace(')', '')) ||
					-1 < item.indexOf('scaleY') && (sy = item.replace('scaleY(', '').replace(')', '')) || 
					(str += item) 
				})

				r = -1 * r, sx = -1 * sx

				this.components.view.querySelector('[data-item-selected]').style.transform = 'rotateZ(' + r + 'deg) scaleX(' + sx + ') scaleY(' + sy + ')'
				this.setSessionStorage(), this.alert.display('mirrorH') 
			})()
		}),
		this.components.ctrls.mirrorV.addEventListener('mousedown', e => {
			e.stopPropagation()
			this.checkDatasetItemSelected() && (() => {
				let 
				tStr = this.components.view.querySelector('[data-item-selected]').style.transform,
				tArr = tStr.split(' '),
				r = 0, sx = 1, sy = 1, str = ''

				tArr.forEach((item) => { 
					-1 < item.indexOf('deg') && (r = item.replace('rotateZ(', '').replace('deg)', '')) ||
					-1 < item.indexOf('scaleX') && (sx = item.replace('scaleX(', '').replace(')', '')) ||
					-1 < item.indexOf('scaleY') && (sy = item.replace('scaleY(', '').replace(')', '')) || 
					(str += item) 
				})

				r = -1 * r, sy = -1 * sy

				this.components.view.querySelector('[data-item-selected]').style.transform = 'rotateZ(' + r + 'deg) scaleX(' + sx + ') scaleY(' + sy + ')'
				this.setSessionStorage(), this.alert.display('mirrorV') 
			})()
		}),
		// mouseup
		this.components.ctrls.clone.addEventListener('mouseup', e => e.stopPropagation()),
		this.components.ctrls.zIndexUp.addEventListener('mouseup', e => e.stopPropagation()),			
		this.components.ctrls.zIndexDown.addEventListener('mouseup', e => e.stopPropagation()),
		this.components.ctrls.mirrorH.addEventListener('mouseup', e => e.stopPropagation()),
		this.components.ctrls.mirrorV.addEventListener('mouseup', e => e.stopPropagation()),			
		// RIGHT SIDE CTRL
		// mousedown
		this.components.ctrls.rotateL.addEventListener('mousedown', e => {
			this.handlerRotateL(e), 
			this.idTimeout = setTimeout(() => this.idInterval = setInterval(() => this.handlerRotateL(e), 100), 500)
		}),
		this.components.ctrls.rotateR.addEventListener('mousedown', e => {
			this.handlerRotateR(e), 
			this.idTimeout = setTimeout(() => this.idInterval = setInterval(() => this.handlerRotateR(e), 100), 500)
		}),
		this.components.ctrls.scaleP.addEventListener('mousedown', e => {
			this.handlerScaleP(e),
			this.idTimeout = setTimeout(() => this.idInterval = setInterval(() => this.handlerScaleP(e), 100), 500)
		}),
		this.components.ctrls.scaleM.addEventListener('mousedown', e => {
			this.handlerScaleM(e),
			this.idTimeout = setTimeout(() => this.idInterval = setInterval(() => this.handlerScaleM(e), 100), 500)
		}),
		this.components.ctrls.scaleXP.addEventListener('mousedown', e => {
			this.handlerScaleXP(e),
			this.idTimeout = setTimeout(() => this.idInterval = setInterval(() => this.handlerScaleXP(e), 100), 500)
		}),
		this.components.ctrls.scaleXM.addEventListener('mousedown', e => {
			this.handlerScaleXM(e),
			this.idTimeout = setTimeout(() => this.idInterval = setInterval(() => this.handlerScaleXM(e), 100), 500)
		}),
		this.components.ctrls.scaleYP.addEventListener('mousedown', e => {
			this.handlerScaleYP(e),
			this.idTimeout = setTimeout(() => this.idInterval = setInterval(() => this.handlerScaleYP(e), 100), 500)
		}),
		this.components.ctrls.scaleYM.addEventListener('mousedown', e => {
			this.handlerScaleYM(e),
			this.idTimeout = setTimeout(() => this.idInterval = setInterval(() => this.handlerScaleYM(e), 100), 500)
		}),
		// mouseup
		this.components.ctrls.rotateL.addEventListener('mouseup', e => {e.stopPropagation(), clearTimeout(this.idTimeout), clearInterval(this.idInterval)}),
		this.components.ctrls.rotateR.addEventListener('mouseup', e => {e.stopPropagation(), clearTimeout(this.idTimeout), clearInterval(this.idInterval)}),
		this.components.ctrls.scaleP.addEventListener('mouseup', e => {e.stopPropagation(), clearTimeout(this.idTimeout), clearInterval(this.idInterval)}),
		this.components.ctrls.scaleM.addEventListener('mouseup', e => {e.stopPropagation(), clearTimeout(this.idTimeout), clearInterval(this.idInterval)}),
		this.components.ctrls.scaleXP.addEventListener('mouseup', e => {e.stopPropagation(), clearTimeout(this.idTimeout), clearInterval(this.idInterval)}),
		this.components.ctrls.scaleXM.addEventListener('mouseup', e => {e.stopPropagation(), clearTimeout(this.idTimeout), clearInterval(this.idInterval)}),
		this.components.ctrls.scaleYP.addEventListener('mouseup', e => {e.stopPropagation(), clearTimeout(this.idTimeout), clearInterval(this.idInterval)}),
		this.components.ctrls.scaleYM.addEventListener('mouseup', e => {e.stopPropagation(), clearTimeout(this.idTimeout), clearInterval(this.idInterval)}),
		// BOTTOM ROW CTRL
		// mousedown
		this.components.ctrls.remove.addEventListener('mousedown', e => { 
			e.stopPropagation()
			this.checkDatasetItemSelected() && (() => {
				this.components.view.querySelector('[data-item-selected]').remove()
				this.setSessionStorage(), this.alert.display('remove') 
			})()
		}),
		// mouseup
		this.components.ctrls.remove.addEventListener('mouseup', e => e.stopPropagation())			
	}
	/* HANDLERS */
	handlerRotateL(e)
	{
		e.stopPropagation(),			
		this.checkDatasetItemSelected() && (() => {
			let 
			tStr = this.components.view.querySelector('[data-item-selected]').style.transform,
			tArr = tStr.split(' '),
			r = 0, str = ''

			tArr.forEach((item) => { (-1 < item.indexOf('deg') && (r = item.replace('rotateZ(', '').replace('deg)', ''))) || (str += item) })

			this.components.view.querySelector('[data-item-selected]').style.transform = 'rotateZ(' + (1 * r - 5) + 'deg) ' + str,
			
			this.setSessionStorage(), this.alert.display('rotateL')
		})()
	}
	handlerRotateR(e)
	{
		e.stopPropagation(),
		this.checkDatasetItemSelected() && (() => {
			let 
			tStr = this.components.view.querySelector('[data-item-selected]').style.transform,
			tArr = tStr.split(' '),
			r = 0, str = ''

			tArr.forEach((item) => { (-1 < item.indexOf('deg') && (r = item.replace('rotateZ(', '').replace('deg)', ''))) || (str += item) })

			this.components.view.querySelector('[data-item-selected]').style.transform = 'rotateZ(' + (1 * r + 5) + 'deg) ' + str,
			
			this.setSessionStorage(), this.alert.display('rotateR')
		})()
	}
	handlerScaleP(e)
	{
		e.stopPropagation()
		this.checkDatasetItemSelected() && (() => {
			let 
			tStr = this.components.view.querySelector('[data-item-selected]').style.transform,
			tArr = tStr.split(' '),
			sx = 1, sy = 1, str = ''

			tArr.forEach((item) => { 
				-1 < item.indexOf('scaleX') && (sx = item.replace('scaleX(', '').replace(')', '')) ||
				-1 < item.indexOf('scaleY') && (sy = item.replace('scaleY(', '').replace(')', '')) || 
				(str += item) 
			})

			sx = 1 * sx, sx = sx >= 0 ? sx + 0.1 : sx - 0.1, 
			sy = 1 * sy, sy = sy >= 0 ? sy + 0.1 : sy - 0.1				

			this.components.view.querySelector('[data-item-selected]').style.transform = str + ' scaleX(' + sx + ') scaleY(' + sy + ')',
			this.setSessionStorage(),	this.alert.display('scaleP')
		})()
	}
	handlerScaleM(e)
	{
		e.stopPropagation(),
		this.checkDatasetItemSelected() && (() => {
			let 
			tStr = this.components.view.querySelector('[data-item-selected]').style.transform,
			tArr = tStr.split(' '),
			sx = 1, sy = 1, str = ''

			tArr.forEach((item) => { 
				-1 < item.indexOf('scaleX') && (sx = item.replace('scaleX(', '').replace(')', '')) ||
				-1 < item.indexOf('scaleY') && (sy = item.replace('scaleY(', '').replace(')', '')) || 
				(str += item) 
			})

			sx = 1 * sx, sx = sx >= 0 ? sx > 0.1 && (sx - 0.1) || sx : sx < -0.1 && (sx + 0.1) || sx, 
			sy = 1 * sy, sy = sy >= 0 ? sy > 0.1 && (sy - 0.1) || sy : sy + 0.1	&& (sy + 0.1) || sy

			this.components.view.querySelector('[data-item-selected]').style.transform = str + ' scaleX(' + sx + ') scaleY(' + sy + ')',
			this.setSessionStorage(),	this.alert.display('scaleM')
		})()
	}
	handlerScaleXP(e)
	{
		e.stopPropagation(),
		this.checkDatasetItemSelected() && (() => {
			let 
			tStr = this.components.view.querySelector('[data-item-selected]').style.transform,
			tArr = tStr.split(' '),
			sx = 1, sy = 1, str = ''

			tArr.forEach((item) => { 
				-1 < item.indexOf('scaleX') && (sx = item.replace('scaleX(', '').replace(')', '')) ||
				-1 < item.indexOf('scaleY') && (sy = item.replace('scaleY(', '').replace(')', '')) || 
				(str += item) 
			})

			sx = 1 * sx, sx = sx >= 0 ? sx + 0.1 : sx - 0.1, 

			this.components.view.querySelector('[data-item-selected]').style.transform = str + ' scaleX(' + sx + ') scaleY(' + sy + ')',
			this.setSessionStorage(),	this.alert.display('scaleXP')
		})()
	}
	handlerScaleXM(e)
	{
		e.stopPropagation(),
		this.checkDatasetItemSelected() && (() => {
			let 
			tStr = this.components.view.querySelector('[data-item-selected]').style.transform,
			tArr = tStr.split(' '),
			sx = 1, sy = 1, str = ''

			tArr.forEach((item) => { 
				-1 < item.indexOf('scaleX') && (sx = item.replace('scaleX(', '').replace(')', '')) ||
				-1 < item.indexOf('scaleY') && (sy = item.replace('scaleY(', '').replace(')', '')) ||  
				(str += item) 
			})

			sx = 1 * sx, sx = sx >= 0 ? sx > 0.1 && (sx - 0.1) || sx : sx < -0.1 && (sx + 0.1) || sx

			this.components.view.querySelector('[data-item-selected]').style.transform = str + ' scaleX(' + sx + ') scaleY(' + sy + ')',
			this.setSessionStorage(),	this.alert.display('scaleXM')
		})()
	}
	handlerScaleYP(e)
	{
		e.stopPropagation(),
		this.checkDatasetItemSelected() && (() => {
			let 
			tStr = this.components.view.querySelector('[data-item-selected]').style.transform,
			tArr = tStr.split(' '),
			sx = 1, sy = 1, str = ''

			tArr.forEach((item) => { 
				-1 < item.indexOf('scaleX') && (sx = item.replace('scaleX(', '').replace(')', '')) ||
				-1 < item.indexOf('scaleY') && (sy = item.replace('scaleY(', '').replace(')', '')) ||
				(str += item) 
			})

			sy = 1 * sy, sy = sy >= 0 ? sy + 0.1 : sy - 0.1

			this.components.view.querySelector('[data-item-selected]').style.transform = str + ' scaleX(' + sx + ') scaleY(' + sy + ')',
			this.setSessionStorage(),	this.alert.display('scaleYP')
		})()
	}
	handlerScaleYM(e)
	{
		e.stopPropagation(),
		this.checkDatasetItemSelected() && (() => {
			let 
			tStr = this.components.view.querySelector('[data-item-selected]').style.transform,
			tArr = tStr.split(' '),
			sx = 1, sy = 1, str = ''

			tArr.forEach((item) => { 
				-1 < item.indexOf('scaleX') && (sx = item.replace('scaleX(', '').replace(')', '')) ||
				-1 < item.indexOf('scaleY') && (sy = item.replace('scaleY(', '').replace(')', '')) || 
				(str += item) 
			})

			sy = 1 * sy, sy = sy >= 0 ? sy > 0.1 && (sy - 0.1) || sy : sy + 0.1	&& (sy + 0.1) || sy

			this.components.view.querySelector('[data-item-selected]').style.transform = str + ' scaleX(' + sx + ') scaleY(' + sy + ')',
			this.setSessionStorage(),	this.alert.display('scaleYM')
		})()
	}
	materialsRefItemEvent(items)
	{
		items.forEach(item => item.addEventListener('mousedown', () => {			
			const img = document.createElement('img');			
			img.id = this.getViewItemId(),
			img.draggable = !0, img.src = item.dataset.materialRefSrc, img.dataset.viewItem = '', 
			this.viewItemEvents(img),	this.components.view.append(img),	
			this.setSessionStorage(), this.alert.display('add material')
		}))
	}
	viewItemEvents(item)
	{
		item.addEventListener('mousedown', e => { 
			e.stopPropagation(), this.removeDatasetItemSelected(), this.addDatasetItemSelected(item)
		}),
		item.addEventListener('mouseup', e => e.stopPropagation()),
		item.addEventListener('dragstart', e => {
			e.stopPropagation(), this.removeDatasetItemSelected(),						
			e.dataTransfer.setData('id', item.id),
			e.dataTransfer.setData('px0', e.pageX), e.dataTransfer.setData('py0', e.pageY),
			setTimeout(() => item.style.opacity = 0, 0),
			this.alert.display(e.type)
		}),
		item.addEventListener('dragend', e => {	
			e.stopPropagation(), setTimeout(() => {item.style.opacity = 1, this.setSessionStorage()}, 0), 
			this.alert.display(e.type)
		})
	}
	backgroundsRefItemEvent(items)
	{
		items.forEach(item => item.addEventListener('mousedown', () => {
			this.components.view.style.backgroundImage = 'url("' + item.dataset.backgroundRefSrc + '")'
			this.setSessionStorage(), this.alert.display('add background')
		}))
	}
	addDatasetItemSelected(item) {item.dataset.itemSelected = '', this.display()}
	removeDatasetItemSelected()
	{
		null !== this.components.view.querySelector('[data-item-selected]') &&
		this.components.view.querySelector('[data-item-selected]').removeAttribute('data-item-selected'),
		this.display('btns')
	}
	checkDatasetItemSelected()
	{
		let result = !1
		null !== this.components.view.querySelector('[data-item-selected]') && (result = !0)
		return !1 === result && this.alert.display('No material selected.'), result
	}
	display(type = 'all')
	{
		'all' === type && (this.showBtns(), this.showCtrls(), this.viewStatus()) ||
		'view' === type && (this.hideBtns(), this.hideCtrls(), this.viewStatus('inactive')) ||
		'btns' === type && (this.showBtns(), this.hideCtrls(), this.viewStatus())		
	}
	hideBtns() {
		this.el.querySelectorAll('[data-moodboard-group-row1]').forEach(item => item.dataset.hide = '')
	}
	hideCtrls() {
		this.el.querySelectorAll('[data-moodboard-group-column1]').forEach(item => item.dataset.hide = ''),
		this.el.querySelectorAll('[data-moodboard-group-column3]').forEach(item => item.dataset.hide = ''),
		this.el.querySelectorAll('[data-moodboard-group-row3]').forEach(item => item.dataset.hide = '')
	}
	showBtns() {
		this.el.querySelectorAll('[data-moodboard-group-row1]').forEach(item => item.removeAttribute('data-hide'))
	}
	showCtrls() {
		this.el.querySelectorAll('[data-moodboard-group-column1]').forEach(item => item.removeAttribute('data-hide')),
		this.el.querySelectorAll('[data-moodboard-group-column3]').forEach(item => item.removeAttribute('data-hide')),
		this.el.querySelectorAll('[data-moodboard-group-row3]').forEach(item => item.removeAttribute('data-hide'))
	}
	getViewItemId() {return (this.viewItemIdCounter++, "item" + this.viewItemIdCounter)}
	viewStatus(status = 'active')	
	{
		'inactive' === status && (this.components.view.dataset.inactive = '') ||
		'active' === status && this.components.view.removeAttribute('data-inactive')
	}
	checkSessionStorage()
	{
		return void(0) !== sessionStorage.getItem('moodboard') && 
		null !== sessionStorage.getItem('moodboard')
	}
	setSessionStorage()	{sessionStorage.setItem('moodboard', this.el.outerHTML)}
	removeSessionStorage() {sessionStorage.removeItem('moodboard')}	
}