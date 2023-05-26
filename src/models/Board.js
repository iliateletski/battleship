import { COL_MARKERS } from "../utils/consts";

export class Board {
    board = []
    shots = []
    ships = [
        [{size: 4, direction: 'row'}],
        [{size: 3, direction: 'row'}, {size: 3, direction: 'row'}],
        [{size: 2, direction: 'row'}, {size: 2, direction: 'row'}, {size: 2, direction: 'row'}],
        [{size: 1, direction: 'row'}, {size: 1, direction: 'row'}, {size: 1, direction: 'row'}, {size: 1, direction: 'row'}]
    ]

    constructor() {
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

        this.board = board
    }

    inField(x, y) {
        if(!Number.isInteger(x) || !Number.isInteger(y)) {
            return false
        }
        return x >= 0 && x < 10 && y >= 0 && y < 10
    }

    addShip(ship, x, y) {
        if(this.inField(x, y)) {
            
        }
    }

    removeShip() {

    }

    removeAllShip() {

    }

    addShot() {

    }

    removeShot() {
        
    }

    removeAllShot() {

    }

    setDirection() {

    }

}