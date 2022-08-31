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
		this.createEls(),
		this.idTimeout = null,		
		this.objResize = {viewWidth: null, factor: null},
		this.viewItemIdCounter = this.viewItemIdCounter || 0,
		this.removeDatasetItemSelected(), this.display('btns')
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

	createStyle()
	{
		const l = document.createElement('link');
		l.rel = 'stylesheet', l.type = "text/css", l.href = this.defaultStyle,
		document.querySelector('head').append(l)
	}

	checkSessionStorage()
	{
		return void(0) !== sessionStorage.getItem('moodboard') && 
		null !== sessionStorage.getItem('moodboard')
	}

	setSessionStorage()	{sessionStorage.setItem('moodboard', this.el.outerHTML)}

	removeSessionStorage() {sessionStorage.removeItem('moodboard')}

	load()
	{
		this.el.outerHTML = sessionStorage.getItem('moodboard'), 
		this.el = document.querySelector('#cfb-moodboard'), this.setComponents()
		return true
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

	createEls()
	{		
		this.checkSessionStorage() && this.load() ||
		(() => {
			let html = 
			`
			  <!-- Group position top -->

			  <div data-moodboard-group-row1>
			  	<div data-moodboard-group-column1></div>
			  	<div data-moodboard-group-column2>
					  <div data-moodboard-btn-add-materials>
					  	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2022 Fonticons, Inc. --><path d="M464 96h-192l-64-64h-160C21.5 32 0 53.5 0 80v352C0 458.5 21.5 480 48 480h416c26.5 0 48-21.5 48-48v-288C512 117.5 490.5 96 464 96zM336 311.1h-56v56C279.1 381.3 269.3 392 256 392c-13.27 0-23.1-10.74-23.1-23.1V311.1H175.1C162.7 311.1 152 301.3 152 288c0-13.26 10.74-23.1 23.1-23.1h56V207.1C232 194.7 242.7 184 256 184s23.1 10.74 23.1 23.1V264h56C349.3 264 360 274.7 360 288S349.3 311.1 336 311.1z"/></svg>
					  	Add Materials
					  </div>
						<div data-moodboard-btn-background>
					  	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2022 Fonticons, Inc. --><path d="M447.1 32h-384C28.64 32-.0091 60.65-.0091 96v320c0 35.35 28.65 64 63.1 64h384c35.35 0 64-28.65 64-64V96C511.1 60.65 483.3 32 447.1 32zM111.1 96c26.51 0 48 21.49 48 48S138.5 192 111.1 192s-48-21.49-48-48S85.48 96 111.1 96zM446.1 407.6C443.3 412.8 437.9 416 432 416H82.01c-6.021 0-11.53-3.379-14.26-8.75c-2.73-5.367-2.215-11.81 1.334-16.68l70-96C142.1 290.4 146.9 288 152 288s9.916 2.441 12.93 6.574l32.46 44.51l93.3-139.1C293.7 194.7 298.7 192 304 192s10.35 2.672 13.31 7.125l128 192C448.6 396 448.9 402.3 446.1 407.6z"/></svg>
					  	Background
					  </div>
				  </div>
				  <div data-moodboard-group-column3></div>
			  </div>  

				<!-- Group position middle -->

				<div data-moodboard-group-row2>
					<div data-moodboard-group-column1>							
						<div>
							<div>Clone</div>
							<div>
								<div data-moodboard-ctrl-clone>
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2022 Fonticons, Inc. --><path d="M0 224C0 188.7 28.65 160 64 160H128V288C128 341 170.1 384 224 384H352V448C352 483.3 323.3 512 288 512H64C28.65 512 0 483.3 0 448V224zM224 352C188.7 352 160 323.3 160 288V64C160 28.65 188.7 0 224 0H448C483.3 0 512 28.65 512 64V288C512 323.3 483.3 352 448 352H224z"/></svg>
								</div>
							</div>
						</div>
						<div>
							<div>Z index</div>
							<div>
								<div data-moodboard-ctrl-z-index-up>
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Free 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2022 Fonticons, Inc. --><path d="M416 288h-95.1c-17.67 0-32 14.33-32 32s14.33 32 32 32H416c17.67 0 32-14.33 32-32S433.7 288 416 288zM352 416h-32c-17.67 0-32 14.33-32 32s14.33 32 32 32h32c17.67 0 31.1-14.33 31.1-32S369.7 416 352 416zM480 160h-159.1c-17.67 0-32 14.33-32 32s14.33 32 32 32H480c17.67 0 32-14.33 32-32S497.7 160 480 160zM544 32h-223.1c-17.67 0-32 14.33-32 32s14.33 32 32 32H544c17.67 0 32-14.33 32-32S561.7 32 544 32zM151.6 41.95c-12.12-13.26-35.06-13.26-47.19 0l-87.1 96.09C4.475 151.1 5.35 171.4 18.38 183.3c6.141 5.629 13.89 8.414 21.61 8.414c8.672 0 17.3-3.504 23.61-10.39L96 145.9v302C96 465.7 110.3 480 128 480s32-14.33 32-32.03V145.9L192.4 181.3C204.4 194.3 224.6 195.3 237.6 183.3c13.03-11.95 13.9-32.22 1.969-45.27L151.6 41.95z"/></svg>
								</div>
								<div data-moodboard-ctrl-z-index-down>
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Free 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2022 Fonticons, Inc. --><path d="M416 288h-95.1c-17.67 0-32 14.33-32 32s14.33 32 32 32H416c17.67 0 32-14.33 32-32S433.7 288 416 288zM544 32h-223.1c-17.67 0-32 14.33-32 32s14.33 32 32 32H544c17.67 0 32-14.33 32-32S561.7 32 544 32zM352 416h-32c-17.67 0-32 14.33-32 32s14.33 32 32 32h32c17.67 0 31.1-14.33 31.1-32S369.7 416 352 416zM480 160h-159.1c-17.67 0-32 14.33-32 32s14.33 32 32 32H480c17.67 0 32-14.33 32-32S497.7 160 480 160zM192.4 330.7L160 366.1V64.03C160 46.33 145.7 32 128 32S96 46.33 96 64.03v302L63.6 330.7c-6.312-6.883-14.94-10.38-23.61-10.38c-7.719 0-15.47 2.781-21.61 8.414c-13.03 11.95-13.9 32.22-1.969 45.27l87.1 96.09c12.12 13.26 35.06 13.26 47.19 0l87.1-96.09c11.94-13.05 11.06-33.31-1.969-45.27C224.6 316.8 204.4 317.7 192.4 330.7z"/></svg>
								</div>
							</div>
						</div>
						<div>
							<div>Mirror</div>
							<div>
								<div data-moodboard-ctrl-mirror-h>
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2022 Fonticons, Inc. --><path d="M384 32C419.3 32 448 60.65 448 96V416C448 451.3 419.3 480 384 480H64C28.65 480 0 451.3 0 416V96C0 60.65 28.65 32 64 32H384zM384 80H64C55.16 80 48 87.16 48 96V416C48 424.8 55.16 432 64 432H384C392.8 432 400 424.8 400 416V96C400 87.16 392.8 80 384 80z"/></svg>
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2022 Fonticons, Inc. --><path d="M0 96C0 60.65 28.65 32 64 32H384C419.3 32 448 60.65 448 96V416C448 451.3 419.3 480 384 480H64C28.65 480 0 451.3 0 416V96z"/></svg>
								</div>
								<div data-moodboard-ctrl-mirror-v>
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2022 Fonticons, Inc. --><path d="M0 96C0 60.65 28.65 32 64 32H384C419.3 32 448 60.65 448 96V416C448 451.3 419.3 480 384 480H64C28.65 480 0 451.3 0 416V96z"/></svg>
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2022 Fonticons, Inc. --><path d="M384 32C419.3 32 448 60.65 448 96V416C448 451.3 419.3 480 384 480H64C28.65 480 0 451.3 0 416V96C0 60.65 28.65 32 64 32H384zM384 80H64C55.16 80 48 87.16 48 96V416C48 424.8 55.16 432 64 432H384C392.8 432 400 424.8 400 416V96C400 87.16 392.8 80 384 80z"/></svg>
								</div>
							</div>
						</div>												
					</div>

				  <div data-moodboard-group-column2 data-moodboard-view></div>
					  
				  <div data-moodboard-group-column3>		
						<div>
							<div>Rotate</div>
							<div>
								<div data-moodboard-ctrl-rotate-left>
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2022 Fonticons, Inc. --><path d="M480 256c0 123.4-100.5 223.9-223.9 223.9c-48.86 0-95.19-15.58-134.2-44.86c-14.14-10.59-17-30.66-6.391-44.81c10.61-14.09 30.69-16.97 44.8-6.375c27.84 20.91 61 31.94 95.89 31.94C344.3 415.8 416 344.1 416 256s-71.67-159.8-159.8-159.8C205.9 96.22 158.6 120.3 128.6 160H192c17.67 0 32 14.31 32 32S209.7 224 192 224H48c-17.67 0-32-14.31-32-32V48c0-17.69 14.33-32 32-32s32 14.31 32 32v70.23C122.1 64.58 186.1 32.11 256.1 32.11C379.5 32.11 480 132.6 480 256z"/></svg>
								</div>
								<div data-moodboard-ctrl-rotate-right>
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2022 Fonticons, Inc. --><path d="M496 48V192c0 17.69-14.31 32-32 32H320c-17.69 0-32-14.31-32-32s14.31-32 32-32h63.39c-29.97-39.7-77.25-63.78-127.6-63.78C167.7 96.22 96 167.9 96 256s71.69 159.8 159.8 159.8c34.88 0 68.03-11.03 95.88-31.94c14.22-10.53 34.22-7.75 44.81 6.375c10.59 14.16 7.75 34.22-6.375 44.81c-39.03 29.28-85.36 44.86-134.2 44.86C132.5 479.9 32 379.4 32 256s100.5-223.9 223.9-223.9c69.15 0 134 32.47 176.1 86.12V48c0-17.69 14.31-32 32-32S496 30.31 496 48z"/></svg>
								</div>		
							</div>
						</div>
						<div>
							<div>Scale</div>
							<div>
								<div data-moodboard-ctrl-scale-plus>
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2022 Fonticons, Inc. --><path d="M256 64C256 46.33 270.3 32 288 32H415.1C415.1 32 415.1 32 415.1 32C420.3 32 424.5 32.86 428.2 34.43C431.1 35.98 435.5 38.27 438.6 41.3C438.6 41.35 438.6 41.4 438.7 41.44C444.9 47.66 447.1 55.78 448 63.9C448 63.94 448 63.97 448 64V192C448 209.7 433.7 224 416 224C398.3 224 384 209.7 384 192V141.3L214.6 310.6C202.1 323.1 181.9 323.1 169.4 310.6C156.9 298.1 156.9 277.9 169.4 265.4L338.7 96H288C270.3 96 256 81.67 256 64V64zM0 128C0 92.65 28.65 64 64 64H160C177.7 64 192 78.33 192 96C192 113.7 177.7 128 160 128H64V416H352V320C352 302.3 366.3 288 384 288C401.7 288 416 302.3 416 320V416C416 451.3 387.3 480 352 480H64C28.65 480 0 451.3 0 416V128z"/></svg>
								</div>
								<div data-moodboard-ctrl-scale-minus>
								  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style="transform: scale(-1, -1);"><!--! Font Awesome Free 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2022 Fonticons, Inc. --><path d="M256 64C256 46.33 270.3 32 288 32H415.1C415.1 32 415.1 32 415.1 32C420.3 32 424.5 32.86 428.2 34.43C431.1 35.98 435.5 38.27 438.6 41.3C438.6 41.35 438.6 41.4 438.7 41.44C444.9 47.66 447.1 55.78 448 63.9C448 63.94 448 63.97 448 64V192C448 209.7 433.7 224 416 224C398.3 224 384 209.7 384 192V141.3L214.6 310.6C202.1 323.1 181.9 323.1 169.4 310.6C156.9 298.1 156.9 277.9 169.4 265.4L338.7 96H288C270.3 96 256 81.67 256 64V64zM0 128C0 92.65 28.65 64 64 64H160C177.7 64 192 78.33 192 96C192 113.7 177.7 128 160 128H64V416H352V320C352 302.3 366.3 288 384 288C401.7 288 416 302.3 416 320V416C416 451.3 387.3 480 352 480H64C28.65 480 0 451.3 0 416V128z"/></svg>
								</div>		
							</div>
						</div>
						<div>
							<div>Scale X</div>
							<div>
								<div data-moodboard-ctrl-scalex-plus>
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2022 Fonticons, Inc. --><path d="M438.6 278.6l-160 160C272.4 444.9 264.2 448 256 448s-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L338.8 288H32C14.33 288 .0016 273.7 .0016 256S14.33 224 32 224h306.8l-105.4-105.4c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160C451.1 245.9 451.1 266.1 438.6 278.6z"/></svg>
								</div>
								<div data-moodboard-ctrl-scalex-minus>
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2022 Fonticons, Inc. --><path d="M447.1 256C447.1 273.7 433.7 288 416 288H109.3l105.4 105.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L109.3 224H416C433.7 224 447.1 238.3 447.1 256z"/></svg>
								</div>
							</div>
						</div>
						<div>
							<div>Scale Y</div>
							<div>
								<div data-moodboard-ctrl-scaley-plus>
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Free 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2022 Fonticons, Inc. --><path d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z"/></svg>
								</div>
								<div data-moodboard-ctrl-scaley-minus>
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Free 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2022 Fonticons, Inc. --><path d="M374.6 246.6C368.4 252.9 360.2 256 352 256s-16.38-3.125-22.62-9.375L224 141.3V448c0 17.69-14.33 31.1-31.1 31.1S160 465.7 160 448V141.3L54.63 246.6c-12.5 12.5-32.75 12.5-45.25 0s-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0l160 160C387.1 213.9 387.1 234.1 374.6 246.6z"/></svg>
								</div>
							</div>
						</div>							
					</div>
				</div>

			  <!-- Group position bottom -->

			  <div data-moodboard-group-row3>
			  	<div data-moodboard-group-column1></div>
					<div data-moodboard-group-column2>		
						<div data-moodboard-ctrl-remove>
							<div>Remove</div>
							<div>
								<div>
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2022 Fonticons, Inc. --><path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM31.1 128H416V448C416 483.3 387.3 512 352 512H95.1C60.65 512 31.1 483.3 31.1 448V128zM111.1 208V432C111.1 440.8 119.2 448 127.1 448C136.8 448 143.1 440.8 143.1 432V208C143.1 199.2 136.8 192 127.1 192C119.2 192 111.1 199.2 111.1 208zM207.1 208V432C207.1 440.8 215.2 448 223.1 448C232.8 448 240 440.8 240 432V208C240 199.2 232.8 192 223.1 192C215.2 192 207.1 199.2 207.1 208zM304 208V432C304 440.8 311.2 448 320 448C328.8 448 336 440.8 336 432V208C336 199.2 328.8 192 320 192C311.2 192 304 199.2 304 208z"/></svg>
								</div>
							</div>
						</div>					
					</div>
					<div data-moodboard-group-column3></div>
				</div>
			`
			this.el.innerHTML = html,	this.setComponents(),	this.setSessionStorage()
		})()
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

	windowEvents()
	{
		window.addEventListener('resize', () => this.resize())
	}	

	docEvents()
	{
		document.querySelector('body').addEventListener('click', () => this.removeDatasetItemSelected())
	}

	viewEvents()
	{
		this.components.view.addEventListener('dragenter', e => {
			e.preventDefault(), this.alert.display('enter')
		}),
		this.components.view.addEventListener('dragover', e => {
			e.preventDefault(), this.alert.display('over')
		}),
		this.components.view.addEventListener('dragleave', e => {
			e.preventDefault(), this.alert.display('leave')
		}),
		this.components.view.addEventListener('drop', e => { 
			const selected = this.components.view.querySelector('#' + e.dataTransfer.getData('id'))

			let left = parseInt(selected.style.left) || 0, top = parseInt(selected.style.top)	|| 0			

			left = 1 * left + e.pageX - e.dataTransfer.getData('px0'), 
			top = 1 * top + e.pageY - e.dataTransfer.getData('py0'),
			selected.style.left = left + 'px', selected.style.top = top + 'px',
			this.addDatasetItemSelected(selected),
			this.alert.display('drop') 
		})
	}

	btnsEvents()
	{
		this.components.btns.addMaterials.addEventListener('click', () => { 
			this.modal.display(this.materialsRef.outerHTML.replace('display: none', '')) 
			this.materialsRefItemEvent(this.modal.el.querySelectorAll('[data-material-ref-value]'))
		})
		this.components.btns.background.addEventListener('click', () => { 
			this.modal.display(this.backgroundsRef.outerHTML.replace('display: none', '')) 
			this.backgroundsRefItemEvent(this.modal.el.querySelectorAll('[data-background-ref-value]'))
		})
	}

	ctrlEvents()
	{
		this.components.ctrls.clone.addEventListener('click', e => { 
			e.stopPropagation()
			this.checkDatasetItemSelected() && (() => {
				const 
				el =  this.components.view.querySelector('[data-item-selected]'),
				c =  el.cloneNode(true)

				c.id = this.getViewItemId(), this.removeDatasetItemSelected(), 
				this.viewItemEvents(c),	el.after(c), this.setSessionStorage(),
				this.alert.display('clone') 
			})()
		})
		this.components.ctrls.zIndexUp.addEventListener('click', e => {
			e.stopPropagation()
			this.checkDatasetItemSelected() && (() => {
				const 
				el =  this.components.view.querySelector('[data-item-selected]'),
				next =  el.nextElementSibling

				null !== next && next.after(el), this.setSessionStorage(),
				this.alert.display('zIndexUp') 
			})()
		})
		this.components.ctrls.zIndexDown.addEventListener('click', e => {
			e.stopPropagation()
			this.checkDatasetItemSelected() && (() => {
				const 
				el =  this.components.view.querySelector('[data-item-selected]'),
				previous =  el.previousElementSibling
	
				null !== previous && previous.before(el), this.setSessionStorage(),
				this.alert.display('zIndexDown') 
			})()
		})
		this.components.ctrls.mirrorH.addEventListener('click', e => { 
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
		})
		this.components.ctrls.mirrorV.addEventListener('click', e => {
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
		})
		this.components.ctrls.rotateL.addEventListener('click', e => { 
			e.stopPropagation()
			this.checkDatasetItemSelected() && (() => {
				let 
				tStr = this.components.view.querySelector('[data-item-selected]').style.transform,
				tArr = tStr.split(' '),
				r = 0, str = ''

				tArr.forEach((item) => { (-1 < item.indexOf('deg') && (r = item.replace('rotateZ(', '').replace('deg)', ''))) || (str += item) })

				this.components.view.querySelector('[data-item-selected]').style.transform = 'rotateZ(' + (1 * r - 5) + 'deg) ' + str,
				
				this.setSessionStorage(), this.alert.display('rotateL')
			})()
		})
		this.components.ctrls.rotateR.addEventListener('click', e => { 
			e.stopPropagation()
			this.checkDatasetItemSelected() && (() => {
				let 
				tStr = this.components.view.querySelector('[data-item-selected]').style.transform,
				tArr = tStr.split(' '),
				r = 0, str = ''

				tArr.forEach((item) => { (-1 < item.indexOf('deg') && (r = item.replace('rotateZ(', '').replace('deg)', ''))) || (str += item) })

				this.components.view.querySelector('[data-item-selected]').style.transform = 'rotateZ(' + (1 * r + 5) + 'deg) ' + str,
				
				this.setSessionStorage(), this.alert.display('rotateR')
			})()
		})
		this.components.ctrls.scaleP.addEventListener('click', e => { 
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
		})
		this.components.ctrls.scaleM.addEventListener('click', e => { 
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

				sx = 1 * sx, sx = sx >= 0 ? sx > 0.1 && (sx - 0.1) || sx : sx < -0.1 && (sx + 0.1) || sx, 
				sy = 1 * sy, sy = sy >= 0 ? sy > 0.1 && (sy - 0.1) || sy : sy + 0.1	&& (sy + 0.1) || sy

				this.components.view.querySelector('[data-item-selected]').style.transform = str + ' scaleX(' + sx + ') scaleY(' + sy + ')',
				this.setSessionStorage(),	this.alert.display('scaleM')
			})()
		})
		this.components.ctrls.scaleXP.addEventListener('click', e => {
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

				this.components.view.querySelector('[data-item-selected]').style.transform = str + ' scaleX(' + sx + ') scaleY(' + sy + ')',
				this.setSessionStorage(),	this.alert.display('scaleXP')
			})()
		})
		this.components.ctrls.scaleXM.addEventListener('click', e => {
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

				sx = 1 * sx, sx = sx >= 0 ? sx > 0.1 && (sx - 0.1) || sx : sx < -0.1 && (sx + 0.1) || sx

				this.components.view.querySelector('[data-item-selected]').style.transform = str + ' scaleX(' + sx + ') scaleY(' + sy + ')',
				this.setSessionStorage(),	this.alert.display('scaleXM')
			})()
		})
		this.components.ctrls.scaleYP.addEventListener('click', e => {
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

				sy = 1 * sy, sy = sy >= 0 ? sy + 0.1 : sy - 0.1

				this.components.view.querySelector('[data-item-selected]').style.transform = str + ' scaleX(' + sx + ') scaleY(' + sy + ')',
				this.setSessionStorage(),	this.alert.display('scaleYP')
			})()
		})
		this.components.ctrls.scaleYM.addEventListener('click', e => {
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

				sy = 1 * sy, sy = sy >= 0 ? sy > 0.1 && (sy - 0.1) || sy : sy + 0.1	&& (sy + 0.1) || sy

				this.components.view.querySelector('[data-item-selected]').style.transform = str + ' scaleX(' + sx + ') scaleY(' + sy + ')',
				this.setSessionStorage(),	this.alert.display('scaleYM')
			})()
		})
		this.components.ctrls.remove.addEventListener('click', e => { 
			e.stopPropagation()
			this.checkDatasetItemSelected() && (() => {
				this.components.view.querySelector('[data-item-selected]').remove()
				this.setSessionStorage(), this.alert.display('remove') 
			})()
		})
	}

	materialsRefItemEvent(items)
	{
		items.forEach(item => item.addEventListener('click', () => {			
			const img = document.createElement('img');			
			img.id = this.getViewItemId(),
			img.draggable = !0, img.src = item.dataset.materialRefSrc, img.dataset.viewItem = '', 
			this.viewItemEvents(img),	this.components.view.append(img),	
			this.setSessionStorage(), this.alert.display('add material')
		}))
	}

	backgroundsRefItemEvent(items)
	{
		items.forEach(item => item.addEventListener('click', () => {
			this.components.view.style.backgroundImage = 'url("' + item.dataset.backgroundRefSrc + '")'
			this.setSessionStorage(), this.alert.display('add background')
		}))
	}

	viewItemEvents(item)
	{
		item.addEventListener('click', (e) => { 			
			e.stopPropagation(), this.removeDatasetItemSelected(),	
			this.addDatasetItemSelected(item)
		}),
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

	addDatasetItemSelected(item)
	{
		item.dataset.itemSelected = '', this.display()
	}

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

	getViewItemId()
	{
		return (this.viewItemIdCounter++, "item" + this.viewItemIdCounter)
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

	viewStatus(status = 'active')	
	{
		'inactive' === status && (this.components.view.dataset.inactive = '') ||
		'active' === status && this.components.view.removeAttribute('data-inactive')
	}

	display(type = 'all')
	{
		'all' === type && (this.showBtns(), this.showCtrls(), this.viewStatus()) ||
		'view' === type && (this.hideBtns(), this.hideCtrls(), this.viewStatus('inactive')) ||
		'btns' === type && (this.showBtns(), this.hideCtrls(), this.viewStatus())		
	}
}