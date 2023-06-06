import { isUnderPoint } from "../utils/additional"
import { ships } from "../utils/consts"
import { Ship } from "./Ship"

export class Preparation {
    app = null
    dragetShip = null
    dragetShipDock = null
    ship = null
    offsetX = null
    offsetY = null

    constructor(app) {
        this.app = app
        for(const{id, startLeft, startTop, size, direction} of ships) {
            const ship = new Ship(id, size, direction, startLeft, startTop)
            this.app.player.addShip(ship)
        }
    }
    
    setDragetShip(element, parentElement, ship) {
        this.dragetShip = element
        this.dragetShipDock = parentElement
        this.ship = ship
        
        if(element) {
            const{left, top} = this.dragetShip.getBoundingClientRect()
            this.offsetX = this.app.mouse.x - left
            this.offsetY = this.app.mouse.y - top
        }
    }

    update() {
        // Перетаскиваем корабль
        if(this.dragetShip && this.app.mouse.left) {
            const{left, top} = this.dragetShipDock.getBoundingClientRect()
            this.ship.setPosition(
                `${this.app.mouse.x - left - this.offsetX}px`,
                `${this.app.mouse.y - top - this.offsetY}px`
            )
        }

        // Бросаем корабль
        if(this.dragetShip && !this.app.mouse.left) {
            const ship = this.dragetShip
            this.dragetShip = null
            this.dragetShipDock = null
            
            const{left, top} = ship.getBoundingClientRect()
            const{width, height} = this.app.player.cells[0].getBoundingClientRect()
            
            const point = {
                x: left + width / 2,
                y: top + height / 2
            }
            
            const cell = this.app.player.cells.find((cell) => isUnderPoint(point, cell))
            
            if(cell) {
                const x = parseInt(cell.dataset.x)
                const y = parseInt(cell.dataset.y)
                this.app.player.addShip(this.ship, y, x)
            } else {
                this.ship.placed
                ? this.ship.setPosition('0', '0')
                : this.ship.setPosition(this.ship.startLeft, this.ship.startTop)
            }
        }
    }

    // Крутим корабль
    rotateShip() {
        if(!this.ship) return false
        this.app.player.rotateShip(this.ship)
    }
    
}
