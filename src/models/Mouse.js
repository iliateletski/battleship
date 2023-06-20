import { addEventListeners } from "../utils/additional"

export class Mouse {
    removeEventListeners = []
    x = null
    y = null
    left = false

    constructor(element) {

        this.removeEventListeners.push(
            addEventListeners(
                element, 'mouseenter', 
                (e) => {
                    this.tick()
                    this.update(e)
                }
            )
        )

        this.removeEventListeners.push(
            addEventListeners(
                element, 'mouseleave', 
                (e) => {
                    this.tick()
                    this.update(e)
                }
            )
        )

        this.removeEventListeners.push(
            addEventListeners(
                element, 'mousemove', 
                (e) => {
                    this.tick()
                    this.update(e)
                }
            )
        )

        this.removeEventListeners.push(
            addEventListeners(
                element, 'mouseup', 
                (e) => {
                    this.tick()
                    this.update(e)
                    if(e.button === 0) {
                        this.left = false
                    } 
                }
            )
        )

        this.removeEventListeners.push(
            addEventListeners(
                element, 'mousedown', 
                (e) => {
                    this.tick()
                    this.update(e)
                    if(e.button === 0) {
                        this.left = true
                    } 
                }
            )
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
        for(const removeEventListener of this.removeEventListeners) {
            removeEventListener()
        } 
    }
}