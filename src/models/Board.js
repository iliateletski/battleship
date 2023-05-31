import { COL_MARKERS } from "../utils/consts";
import { makeAutoObservable } from "mobx";
import { GameAPI } from "../http/gameAPI";

export class Board {
    socket = null
    board = []
    cells = []
    shots = []
    ships = [
        {id: 1, top: '0', left: '0', x: null, y: null, size: 4, direction: 'row', placed: false },
        {id: 2, top: '50px', left: '0', x: null, y: null, size: 3, direction: 'row', placed: false },
        {id: 5, top: '50px', left: '100px', x: null, y: null, size: 3, direction: 'row', placed: false },
        {id: 3, top: '100px', left: '0', x: null, y: null, size: 2, direction: 'row', placed: false },
        {id: 6, top: '100px', left: '75px', x: null, y: null, size: 2, direction: 'row', placed: false }, 
        {id: 8, top: '100px', left: '150px', x: null, y: null, size: 2, direction: 'row', placed: false },
        {id: 7, top: '150px', left: '0px', x: null, y: null, size: 1, direction: 'row', placed: false }, 
        {id: 9, top: '150px', left: '50px', x: null, y: null, size: 1, direction: 'row', placed: false }, 
        {id: 4, top: '150px', left: '100px', x: null, y: null, size: 1, direction: 'row', placed: false },
        {id: 10, top: '150px', left: '150px', x: null, y: null, size: 1, direction: 'row', placed: false }
    ]

    constructor() {
        this.createBoard()
        makeAutoObservable(this)
    }

    createBoard() {
        const board = []

        for(let y = 0; y < 10; y++) {
            const row = []
            for(let x = 0; x < 10; x++) {
                const cell = {x, y, ship: null, free: true}
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
            board[y][x].ship = {...ship, left: '0', top: '0'}

            for(let i = 0; i < ship.size; i++) {
                board[y][x + i].free = false
            }
                                
        }
        console.log(board)
        this.board = board
    }

    addShip(ship, y, x) {
        
        if(ship.placed) this.removeShip(ship)
        

        if(this.inField(y, x)) {
            if(ship.direction = 'row') {
                this.board[y][x].ship = {
                    ...ship,
                    placed: true,
                    top: '0',
                    left: '0', 
                    // moving: true,
                    x,
                    y
                }
                for(let i = 0; i < ship.size; i++) {
                    this.board[y][x + i].free = false
                }
            }
            
            this.ships = this.ships.map(s => {
                return (
                    s.id !== ship.id 
                    ? s 
                    : {...s, placed: true, x, y}
                )

            })
        }
        console.log(this.ships)

        this.createBoard()
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
        // console.log(this.cells)
    }

    inField(y, x) {
        if(!Number.isInteger(x) || !Number.isInteger(y)) {
            return false
        }
        return x >= 0 && x < 10 && y >= 0 && y < 10
    }

    removeShip(ship) {
        const{x, y} = ship
        this.board[y][x].ship = null
        this.ships = this.ships.map(s => {
            return (
            s.id === ship.id 
            ? {...s, placed: false, x: null, y: null}
            : s 
        )})
    }

    removeAllShip() {

    }

    addShot(y, x) {
        console.log(y, x)
        this.socket.sendMessage({type: 'Shot', y, x})
    }

    removeShot() {
        
    }

    removeAllShot() {

    }

    setDirection() {

    }

    createSocket(roomId) {
        this.socket = new GameAPI(roomId)
    }

}