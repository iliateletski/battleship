import { isUnderPoint } from "../utils/additional"
import { Board } from "./Board"
import { Mouse } from "./Mouse"

export class Application {
    player = null
    rival = null
    mouse = null
    dragetShip = null
    dragetShipDock = null
    ship = null
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

    setDragetShip(element, parentElement, ship) {
        this.dragetShip = element
        this.dragetShipDock = parentElement
        this.ship = ship
        
        
        if(element) {
            const{left, top} = this.dragetShip.getBoundingClientRect()
            this.offsetX = this.mouse.x - left
            this.offsetY = this.mouse.y - top
        }
        console.log(console.log(this.dragetShipDock))
        // console.log(this.offsetY)
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
            const ship = this.dragetShip
            this.dragetShipDock = null
            
            const{left, top} = ship.getBoundingClientRect()
            const{width, height} = this.player.cells[0].getBoundingClientRect()
            
            const point = {
                x: left + width / 2,
                y: top + height / 2
            }
            
            const cell = this.player.cells.find((cell) => isUnderPoint(point, cell))
            // console.log(cell)
            
            if(cell) {
                const x = parseInt(cell.dataset.x)
                const y = parseInt(cell.dataset.y)
                this.player.addShip(this.ship, y, x)
            } else {
                ship.style.top = this.ship.top
                ship.style.left = this.ship.left
            }

            this.dragetShip = null




        }
    }
}