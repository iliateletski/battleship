export class Mouse {
    under = false
    pUnder = false

    x = null
    pX = null

    y = null
    pY = null

    left = false
    pLeft = false

    constructor(element) {
        element.addEventListener('mouseenter', (e) => {
            this.tick()
            this.update(e)
        })

        element.addEventListener('mouseleave', (e) => {
            this.tick()
            this.update(e)
            this.under = false
        })

        element.addEventListener('mousemove', (e) => {
            this.tick()
            this.update(e)
        })

        element.addEventListener('mouseup', (e) => {
            this.tick()
            this.update(e)
            if(e.button === 0) {
                this.left = false
            } 
        })

        element.addEventListener('mousedown', (e) => {
            this.tick()
            this.update(e)
            if(e.button === 0) {
                this.left = true;
            }
        })

    }

    update(e) {
        this.x = e.clientX
        this.y = e.clientY
        this.under = true
    }

    tick() {
        this.pUnder = this.under
        this.pX = this.x
        this.pY = this.y
        this.pLeft = this.left
    }


}