import { COL_MARKERS } from "../utils/consts";
import { makeAutoObservable } from "mobx";
import { inField, changeCellState, shipIteration } from "../utils/additional";
import { Ship } from "./Ship";


export class Board {
    board = []
    cells = []
    shots = new Map()
    ships = []

    constructor() {
        this.createBoard()
        makeAutoObservable(this)
    }

    createBoard() {
        const board = []

        for(let y = 0; y < 10; y++) {
            const row = []
            for(let x = 0; x < 10; x++) {
                const cell = {x, y, ship: null, free: true, shot: null, placedMarker: null}
                row.push(cell) 
            }  
            board.push(row) 
        }

        for(let i = 0; i < 10; i++) {
            board[0][i].colMarker = COL_MARKERS[i]
            board[i][0].rowMarker = i + 1
        }

        for(const ship of this.ships) {
            if(!ship.placed) continue
            const{y, x} = ship
            board[y][x].ship = ship

            if(ship.moving) continue
            changeCellState(board, ship, false)
        }

        for(const shot of this.shots.values()) {
            const{y, x} = shot
            board[y][x].shot = shot
        }

        console.log(board)
        this.board = board
        console.log(this.ships)
    }

    addShip(ship, y, x) {

        if(!this.ships.includes(ship)) {
            this.ships.push(ship)
        } 
        
        if(inField(y, x)) { 

            const shipInField = shipIteration(
                (y, x) => {
                    if(!inField(y, x) || !this.board[y][x].free) {
                        ship.placed
                        ? ship.setPosition('0', '0')
                        : ship.setPosition(ship.startLeft, ship.startTop)
                        ship.moving = false
                        this.createBoard()
                        return false
                    }
                    return true
                }, ship, {x, y}
            )

            if(!shipInField) return false
            
            Object.assign(ship, {placed: true, moving: false, x, y, left: '0', top: '0'})
            this.createBoard()
        }
        console.log(this.ships)
        return true
    }

    shipPoints() {
        const shipPoints = {type: 'UserReady', ships: []}
        for(const ship of this.ships) {
            if(!ship.placed) return null
            const points = []
            // for(let i = 0; i < ship.size; i++) {
            //     points.push({y: ship.y, x: ship.x + i })
            // }
            shipIteration((y, x) => {
                points.push({y, x})
                return true
            }, ship)
            shipPoints.ships.push({points})
        }
        
        return shipPoints
    }

    setCells(cell) {
        this.cells = [...this.cells, cell]
    }
    
    removeShip(ship) {
        Object.assign(ship, {moving: true})
        this.createBoard() 
    }

    rotateShip(ship) {
        if(!ship.placed) return false

        const newDirection = ship.direction === 'row' ? 'column' : 'row'

        const shipInField = shipIteration(
            (y, x) => {
                if(!inField(y, x)) return false
                if(!this.board[y][x].free) {
                    this.createBoard()
                    return false 
                }
                return true
                
            }, ship, {newDirection, count: 2}
        )

        if(!shipInField) return false

        Object.assign(ship, {direction: newDirection})
        this.createBoard()
    }

    addShot(shotResult) {
        console.log(shotResult)
        const key = `y${shotResult.y}x${shotResult.x}`
        this.shots.set(key, shotResult)
        const{y, x} = shotResult
        this.board[y][x].shot = shotResult
        // this.createBoard()
    }

    markKillShip(y, x) {
        let dx = false
        let dy = false
        let size = 1
        let shipPoint = {x, y}

        if(this.shots.has(`y${y}x${x - 1}`) || this.shots.has(`y${y}x${x + 1}`)) {
            dx = true
        }
    
        if(this.shots.has(`y${y - 1}x${x}`) || this.shots.has(`y${y + 1}x${x}`)) {
            dy = true
        }

        if(!dy && !dx) {
            this.board[y][x].ship = new Ship(y, size, 'row', '0', '0')
            return
        }

        for(let i = 1; i < 4; i++) {
            let cY = y - i * dy
            let cX = x - i * dx
            if(this.shots.has(`y${cY}x${cX}`)) {
                size++
                shipPoint = {
                    x: shipPoint.x > cX ? cX : shipPoint.x,
                    y: shipPoint.y > cY ? cY : shipPoint.y
                }
            } else break
        }

        for(let i = 1; i < 4; i++) {
            let cY = y + i * dy
            let cX = x + i * dx
            if(this.shots.has(`y${cY}x${cX}`)) {
                size++
                shipPoint = {
                    x: shipPoint.x > cX ? cX : shipPoint.x,
                    y: shipPoint.y > cY ? cY : shipPoint.y
                } 
            } else break
        }
        shipPoint = {...shipPoint, size, direction: dx ? 'row' : 'column'}
        this.board[shipPoint.y][shipPoint.x].ship = new Ship(y, shipPoint.size, shipPoint.direction, '0', '0')
    }
}