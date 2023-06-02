import { GameAPI } from "../http/gameAPI"
import { isUnderPoint } from "../utils/additional"
import { Board } from "./Board"
import { Mouse } from "./Mouse"
import { Preparation } from "./Preparation"
import { makeAutoObservable } from "mobx";
import { Game } from "./Game"

export class Application {
    
    constructor() {
        this.isOnlineGame = true
        this.gameStatus = null
        this.shotResult = null
        this.isMyMove = false
        this.win = false
        this.socket = null
        this.player = new Board()
        this.rival = new Board()
        this.mouse = new Mouse(document.body)
        this.preparation = new Preparation(this)
        this.game = new Game(this) 
        requestAnimationFrame(() => this.tick())
        makeAutoObservable(this)
    }

    tick() {
        requestAnimationFrame(() => this.tick())
        this.mouse.tick()
        this.preparation.update()
    }

    initWebSocket(roomId) {
        this.socket = new GameAPI(roomId, this)
        console.log(this.socket)
    }

    setIsOlineGame(boolean) {
        this.isOnlineGame = boolean
    }

    setGameStatus(status) {
        this.gameStatus = status
        console.log(this.gameStatus)
    }

    setIsMyMove(boolean) {
        this.isMyMove = boolean
        console.log(this.isMyMove)
    }

    setShotResult(shotResult) {
        this.shotResult = shotResult
        // console.log(this.shotResult)
    }

    setWin(boolean) {
        this.win = boolean
        console.log(this.win)
    }

    
}