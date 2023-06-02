import { makeAutoObservable } from "mobx";

export class Game {
    isOnlineGame = true
    gameStatus = 'StartGame'
    shotResult = null
    isPlayerMove = true
    win = false
    
    constructor(app) {
        this.app = app
        makeAutoObservable(this)
    }

    addShot(y, x) {
        if(this.gameStatus !== 'StartGame' || !this.isPlayerMove) return false
        
        const key = `y${y}x${x}`
        const{shots} = this.app.rival
        if(shots.has(key)) return false

        if(this.isOnlineGame) {
            this.app.socket.sendMessage({type: 'Shot', y, x})
        }
    }

    setIsOlineGame(boolean) {
        this.isOnlineGame = boolean
    }

    setGameStatus(status) {
        this.gameStatus = status
        console.log(this.gameStatus)
    }

    setIsPlayerMove(boolean) {
        this.isPlayerMove = boolean
        console.log(this.isPlayerMove)
    }

    setShotResult(shotResult) {
        this.shotResult = shotResult
        console.log(this.shotResult)
    }

    setWin(boolean) {
        this.win = boolean
        console.log(this.win)
    }
}