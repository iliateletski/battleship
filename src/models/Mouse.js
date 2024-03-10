import { addEventListeners } from '../utils/additional'

export class Mouse {
	removeEventListeners = []
	x = null
	y = null
	left = false

	constructor(element) {
		this.removeEventListeners.push(
			addEventListeners(element, 'pointerenter', e => {
				this.tick()
				this.update(e)
			})
		)

		this.removeEventListeners.push(
			addEventListeners(element, 'pointerleave', e => {
				this.tick()
				this.update(e)
			})
		)

		this.removeEventListeners.push(
			addEventListeners(element, 'pointermove', e => {
				this.tick()
				this.update(e)
			})
		)

		this.removeEventListeners.push(
			addEventListeners(element, 'pointerup', e => {
				this.tick()
				this.update(e)
				if (e.button === 0) {
					this.left = false
				}
			})
		)

		this.removeEventListeners.push(
			addEventListeners(element, 'pointerdown', e => {
				this.tick()
				this.update(e)
				if (e.button === 0) {
					this.left = true
				}
			})
		)
	}

	update(e) {
		this.x = e.clientX
		this.y = e.clientY
	}

	tick() {
		this.pUnder = this.under
		this.pX = this.x
		this.pY = this.y
		this.pLeft = this.left
	}

	stop() {
		for (const removeEventListener of this.removeEventListeners) {
			removeEventListener()
		}
	}
}
