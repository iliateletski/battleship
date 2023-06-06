import { inField, isUnderPoint } from "../utils/additional"
import { ships } from "../utils/consts"
import { Ship } from "./Ship"

export class Preparation {
    app = null
    dragetShip = null
    dragetShipDock = null
    ship = null
    offsetX = null
    offsetY = null
    shipCells = []
    prevCell = null

    constructor(app) {
        this.app = app
        for(const{id, startLeft, startTop, size, direction} of ships) {
            const ship = new Ship(id, size, direction, startLeft, startTop)
            this.app.player.addShip(ship)
        }
    }

    setShipCells(marker, clear) {
        for(let shipCell of this.shipCells) {
            shipCell.placedMarker = marker
        }
        if(clear) this.shipCells = []
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

    getCell() {
        const{left, top} = this.dragetShip.getBoundingClientRect()
        const cell = this.app.player.cells[0]
        const{width, height} = cell.getBoundingClientRect() 

        const point = {
            x: left + width / 2,
            y: top + height / 2
        }

        const currentCell = this.app.player.cells.find((cell) => isUnderPoint(point, cell))

        return (
            currentCell
            ?{x: parseInt(currentCell.dataset.x), y: parseInt(currentCell.dataset.y)}
            : null
        )
    }

    markCell() {
        const cell = this.getCell()
        if(!cell) {
            this.setShipCells(null, true)
            return
        }

        if(!this.ship.moving && this.ship.placed) {
            this.app.player.removeShip(this.ship)
        }

        const{y, x} = cell
        let currentCell = this.app.player.board[y][x]

        const dRow = this.ship.direction ==='row'
        const dColumn = this.ship.direction ==='column'

        let placedMarker = 'green'

        for(let i = 0; i < this.ship.size; i++) {
            const dy = y + dColumn * i
            const dx = x + dRow * i

            if(!inField(dy, dx)) {
                this.setShipCells(null, true)
                return
            }
            const{board} = this.app.player
            this.shipCells.push(board[dy][dx])
            if(!board[dy][dx].free) placedMarker = 'red'
        }

        this.setShipCells(placedMarker)

        if(this.prevCell !== currentCell) {
            this.setShipCells(null, true)
        }
        
        this.prevCell = currentCell
    }

    moveShip() {
        const{left, top} = this.dragetShipDock.getBoundingClientRect()
        this.ship.setPosition(
            `${this.app.mouse.x - left - this.offsetX}px`,
            `${this.app.mouse.y - top - this.offsetY}px`
        )
        this.markCell()
    }

    placeShip() {
        const cell = this.getCell()
        this.dragetShip = null
        this.dragetShipDock = null
        
        if(cell) {
            const{y, x} = cell
            this.app.player.addShip(this.ship, y, x)
        } else {
            this.ship.placed
            ? this.ship.setPosition('0', '0')
            : this.ship.setPosition(this.ship.startLeft, this.ship.startTop)
        }
    }

    update() {
        if(this.dragetShip && this.app.mouse.left) {
            this.moveShip()        
        }

        if(this.dragetShip && !this.app.mouse.left) {
            this.placeShip()
        }
    }

    rotateShip() {
        if(!this.ship) return false
        this.app.player.rotateShip(this.ship)
    }
}
