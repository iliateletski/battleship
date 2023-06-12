import { makeAutoObservable } from "mobx";

export class Game {
    _isOnlineGame = true
    _isPlayerMove = false
    _win = false
    _gameStatus = ''
    
    constructor(app) {
        this.app = app
        makeAutoObservable(this)
    }

    addShot(y, x) {
        if(this.gameStatus !== 'StartGame' || !this.isPlayerMove) return false
        // const key = `y${y}x${x}`
        // const{shots} = this.app.rival
        // if(shots.has(key)) return false
        if(this.app.rival.board[y][x].shot) return false
        if(this.isOnlineGame) {
            this.app.socket.sendMessage({type: 'Shot', y, x})
        }
    }

    setIsOlineGame(boolean) {
        this._isOnlineGame = boolean
    }

    setGameStatus(status) {
        this._gameStatus = status
        console.log(this._gameStatus)
    }

    setIsPlayerMove(boolean) {
        this._isPlayerMove = boolean
        console.log(this._isPlayerMove)
    }

    setWin(boolean) {
        this._win = boolean
        console.log(this._win)
    }

    get isOnlineGame() {
        return this._isOnlineGame
    }

    get isPlayerMove() {
        return this._isPlayerMove
    }

    get win() {
        return this._win
    }

    get gameStatus() {
        return this._gameStatus
    }
}