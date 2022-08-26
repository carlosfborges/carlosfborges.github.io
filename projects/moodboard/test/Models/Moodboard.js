'use strict'

export class Moodboard {

	constructor()
	{
		for (const arg of arguments) {

			switch (arg.constructor.name) {

				case 'Modal': this.modal = arg; break;

				default: console.log('Parameter not valid');					
			}
		}

		this.el = document.querySelector('#cfb-moodboard')

		this.materialsRef = document.querySelector(this.el.dataset.materialsRef)

		this.backgroundsRef = document.querySelector(this.el.dataset.backgroundsRef)

		this.cloneMaterials = this.materialsRef.cloneNode(true)

		this.cloneBackgrounds = this.backgroundsRef.cloneNode(true)

		this.createEls()

		// Set components of moodboard

		this.mb = this.el.querySelector('.mb')

		this.view = this.mb.querySelector('.view')

		this.btns = this.mb.querySelectorAll('[data-modal-target]')

		this.ctrls = {
			all: this.mb.querySelector('.control-all'),
			right: this.mb.querySelector('.control-material-right'),
			left: this.mb.querySelector('.control-material-left'),
			remove: this.mb.querySelector('.control-remove'),
		}

		this.btnsEvents()
	}

	createEls()
	{
		let html = 
		`
			<!-- The Moodboard -->

			<div class="mb">
			  <div class="view" naturalW="600" naturalH="500"></div>
			  
			  <!-- Add Materials -->

			  <div data-modal-action="open" data-modal-target="#modal-mood" data-ref="materials" class="add-materials">
			  	<img src="svg/folder-plus.svg" width="28" height="28" style="margin-right: 5px;" />
			  	Add Materials
			  </div>

			  <!-- Add/Change Background -->

				<div data-modal-action="open" data-modal-target="#modal-mood" data-ref="backgrounds" class="background">
			  	<img src="svg/image.svg" width="28" height="28" style="margin-right: 5px;" />
			  	Background
			  </div>  

			  <!-- Control -->

				<div class="control control-all">		
					<div class="group horizontal">
						<div class="label">Rotate All</div>
						<div class="btn-group">
							<div class="item" data-action="rotate-all-m">			
								<img src="svg/arrow-rotate-left.svg" width="24" height="24" />
							</div>
							<div class="item" data-action="rotate-all-p">
								<img src="svg/arrow-rotate-right.svg" width="24" height="24" />
							</div>
						</div>
					</div>
					<div class="group horizontal">
						<div class="label">Scale All</div>
						<div class="btn-group">
							<div class="item" data-action="scale-all-p">
								<img src="svg/arrow-up-right-from-square.svg" width="24" height="24" />
							</div>
							<div class="item" data-action="scale-all-m">
								<img src="svg/arrow-up-right-from-square.svg" width="24" height="24" style="transform: scale(-1, -1);" />
							</div>		
						</div>
					</div>
					<div data-mask="true"></div>
				</div>

				<div class="control control-material-right">		
					<div class="group vertical">
						<div class="label">Rotate</div>
						<div class="btn-group">
							<div class="item" data-action="rotate-m">
								<img src="svg/arrow-rotate-left.svg" width="24" height="24" />
							</div>
							<div class="item" data-action="rotate-p">
								<img src="svg/arrow-rotate-right.svg" width="24" height="24" />
							</div>		
						</div>
					</div>
					<div class="group vertical">
						<div class="label">Scale</div>
						<div class="btn-group">
							<div class="item" data-action="scale-p">
								<img src="svg/arrow-up-right-from-square.svg" width="24" height="24" />
							</div>
							<div class="item" data-action="scale-m">
								<img src="svg/arrow-up-right-from-square.svg" width="24" height="24" style="transform: scale(-1, -1);" />
							</div>		
						</div>
					</div>
					<div class="group vertical">
						<div class="label">Scale X</div>
						<div class="btn-group">
							<div class="item" data-action="scaleX-p">
								<img src="svg/arrow-right.svg" width="24" height="24" style="border: 3.4px solid black; border-right: none; border-radius: 4px;"/>
							</div>
							<div class="item" data-action="scaleX-m">
								<img src="svg/arrow-left.svg" width="24" height="24" style="border: 3.4px solid black; border-right: none; border-radius: 4px;"/>
							</div>
						</div>
					</div>
					<div class="group vertical">
						<div class="label">Scale Y</div>
						<div class="btn-group">
							<div class="item" data-action="scaleY-p">
								<img src="svg/arrow-down.svg" width="24" height="24" style="border: 3.4px solid black; border-bottom: none; border-radius: 4px;" />
							</div>
							<div class="item" data-action="scaleY-m">
								<img src="svg/arrow-up.svg" width="24" height="24" style="border: 3.4px solid black; border-bottom: none; border-radius: 4px;"/>
							</div>
						</div>
					</div>	
					<div data-mask="true"></div>	
				</div>

				<div class="control control-material-left">		
					<div class="group vertical">
						<div class="label">Edit Img</div>
						<div class="btn-group">
							<div class="item" data-status="false" data-action="switch" data-modal-action="open" data-modal-target="#modal-mood" data-ref="materials">
								<img src="svg/image.svg" width="24" height="24" />
							</div>		
						</div>
					</div>
					<div class="group vertical">
						<div class="label">Clone</div>
						<div class="btn-group">
							<div class="item" data-action="clone">
								<img src="svg/clone.svg" width="24" height="24" />
							</div>
						</div>
					</div>
					<div class="group vertical">
						<div class="label">Z index</div>
						<div class="btn-group">
							<div class="item" data-action="z-up">
								<img src="svg/arrow-up-wide-short.svg" width="24" height="24" />
							</div>
							<div class="item" data-action="z-down">
								<img src="svg/arrow-down-wide-short.svg" width="24" height="24" />
							</div>
						</div>
					</div>
					<div class="group vertical">
						<div class="label">Mirror</div>
						<div class="btn-group">
							<div class="item" data-action="mirror-h" style="display: flex;">
								<img src="svg/square-regular.svg" width="11" height="24" style="border-right: 0.5px dashed black; padding-right: 1px" />
								<img src="svg/square.svg" width="11" height="24" style="padding-left: 1px;" />
							</div>
							<div class="item" data-action="mirror-v" style="display: flex; flex-direction: column;">
								<img src="svg/square.svg" width="24" height="11" />
								<img src="svg/square-regular.svg" width="24" height="11" style="border-top: 0.5px dashed black;" />
							</div>
						</div>
					</div>
					<div data-mask="true"></div>		
				</div>
				<div class="control control-remove">		
					<div class="group horizontal" style="border-width: 0;">
						<div class="label">Remove</div>
						<div class="btn-group">
							<div class="item" data-action="remove">
								<img src="svg/trash-can.svg" width="24" height="24" />
							</div>
						</div>
					</div>
					<div data-mask="true"></div>
				</div>
			</div>
		`

		this.el.innerHTML = html
	}

	btnsEvents()
	{
		this.btns.forEach(btn => {

			this.cloneMaterials.style.display = 'block'
			this.cloneBackgrounds.style.display = 'block'

			btn.addEventListener('click', () => this.modalHandler(btn))

			btn.addEventListener('touchstart', () => this.modalHandler(btn))
		})
	}

	modalHandler(btn)
	{
		switch (btn.dataset.ref) {

			case 'materials': this.modal.display(this.cloneMaterials); break;

			case 'backgrounds': this.modal.display(this.cloneBackgrounds); break;

			default: console.log('Attribute data-ref must be materials or backgrounds')
		}
	}
}
