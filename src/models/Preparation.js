import { isUnderPoint } from "../utils/additional"

export class Preparation {
    app = null
    dragetShip = null
    dragetShipDock = null
    ship = null
    offsetX = null
    offsetY = null

    constructor(app) {
        this.app = app
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
        console.log(console.log(this.dragetShipDock))
        // console.log(this.offsetY)
    }

    update() {
        // Перетаскиваем корабль
        if(this.dragetShip && this.app.mouse.left) {
            const{left, top} = this.dragetShipDock.getBoundingClientRect()
            this.dragetShip.style.left = `${this.app.mouse.x - left - this.offsetX}px`
            this.dragetShip.style.top = `${this.app.mouse.y - top - this.offsetY}px`
        }
        // Бросаем корабль
        if(this.dragetShip && !this.app.mouse.left) {
            const ship = this.dragetShip
            this.dragetShipDock = null
            
            const{left, top} = ship.getBoundingClientRect()
            const{width, height} = this.app.player.cells[0].getBoundingClientRect()
            
            const point = {
                x: left + width / 2,
                y: top + height / 2
            }
            
            const cell = this.app.player.cells.find((cell) => isUnderPoint(point, cell))
            // console.log(cell)
            
            if(cell) {
                const x = parseInt(cell.dataset.x)
                const y = parseInt(cell.dataset.y)
                this.app.player.addShip(this.ship, y, x)
            } else {
                ship.style.top = this.ship.top
                ship.style.left = this.ship.left
            }

            this.dragetShip = null
        }
    }
    
}
