import { COL_MARKERS } from "../utils/consts";
import { makeAutoObservable } from "mobx";
import { inField, changeCellState } from "../utils/additional";


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
                const cell = {x, y, ship: null, free: true, shot: null}
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

            if(ship.moving) {
                ship.moving = false
                continue
            }
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

        if(ship.placed) this.removeShip(ship)
        
        if(inField(y, x)) {

            const dRow = ship.direction ==='row'
            const dColumn = ship.direction ==='column'
            
            for(let i = 0; i < ship.size; i++) {
                const dx =  x + dRow * i
                const dy = y + dColumn * i

                if(!inField(dy, dx) || !this.board[dy][dx].free) {
                    ship.placed
                    ? ship.setPosition('0', '0')
                    : ship.setPosition(ship.startLeft, ship.startTop)
                    this.createBoard()
                    return false
                }
            }  
            
            Object.assign(ship, {placed: true, moving: false, x, y, left: '0', top: '0'})
            this.createBoard()
        }
        console.log(this.ships)
        return true
    }

    shipPoints() {
        const shipPoints = {type: 'UserReady', ships: []}
        this.ships.forEach(s => {
            const points = []
            if(s.placed) {
                for(let i = 0; i < s.size; i++) {
                    points.push({y: s.y, x: s.x + i })
                }
                shipPoints.ships.push({points})
            }
        })
        console.log(shipPoints)
        return shipPoints
    }

    setCells(cell) {
        this.cells = [...this.cells, cell]
    }
    
    removeShip(ship) {
        console.log('remove')
        Object.assign(ship, {moving: true})
        this.createBoard()
    }

    rotateShip(ship) {
        if(!ship.placed) return false

        const{x, y} = ship
        const newDirection = ship.direction === 'row' ? 'column' : 'row'

        const dRow = newDirection ==='row'
        const dColumn = newDirection ==='column'
        
        for(let i = 2; i < ship.size; i++) {
            const dx =  x + dRow * i
            const dy = y + dColumn * i

            if(!inField(dy, dx)) return false
            if(!this.board[dy][dx].free) {
                this.createBoard()
                return false 
            }
        } 

        Object.assign(ship, {direction: newDirection})
        this.createBoard()
    }

    removeAllShip() {

    }

    addShot(shotResult) {
        console.log(shotResult)
        const key = `y${shotResult.y}x${shotResult.x}`
        this.shots.set(key, shotResult)
        this.createBoard()
        console.log(key)
    }

    removeShot() {
        
    }

    removeAllShot() {

    }

}