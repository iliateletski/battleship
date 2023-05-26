import { Board } from "./Board"
import { Mouse } from "./Mouse"

export class Application {
    player = null
    rival = null
    mouse = null
    dragetShip = null
    dragetShipDock = null
    offsetX = null
    offsetY = null
    position = {left: 0, top: 0}

    constructor() {

        const player = new Board()
        const rival = new Board()
        const mouse = new Mouse(document.body)

        Object.assign(this, {player, rival, mouse})
        requestAnimationFrame(() => this.tick())
    }

    tick() {
        requestAnimationFrame(() => this.tick())
        this.mouse.tick()
        this.update()
    }

    setDragetShip(element, parentElement) {
        this.dragetShip = element
        this.dragetShipDock = parentElement
        if(element) {
            const{left, top} = this.dragetShip.getBoundingClientRect()
            this.offsetX = this.mouse.x - left
            this.offsetY = this.mouse.y - top
        } else {
            this.offsetX = null
            this.offsetY = null
        }
        console.log(this.offsetX)
        console.log(this.offsetY)
    }

    update() {
        // Перетаскиваем корабль
        if(this.dragetShip && this.mouse.left) {
            const{left, top} = this.dragetShipDock.getBoundingClientRect()
            this.dragetShip.style.left = `${this.mouse.x - left - this.offsetX}px`
            this.dragetShip.style.top = `${this.mouse.y - top - this.offsetY}px`
        }
        // Бросаем корабль
        if(this.dragetShip && !this.mouse.left) {
            this.dragetShip = null
        }
    }
}