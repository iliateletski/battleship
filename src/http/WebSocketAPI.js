import { addEventListeners } from "../utils/additional"

export class WebSocketAPI {
    removeEventListeners = []
    socket = null
    app = null
    
    constructor(roomId, app) {
        this.createWebSocket(roomId)
        this.app = app
    }

    async createWebSocket(roomId) {
        const socket = new WebSocket(`${process.env.REACT_APP_WEBSOCKET_URL}/${roomId}`) 

        this.socket = socket

        this.removeEventListeners.push(
            addEventListeners(
                socket, 'open', (e) => console.log(e)
            )
        )

        this.removeEventListeners.push(
            addEventListeners(
                socket, 'message', (e) => this.handleMessage(e)
            )
        )

        this.removeEventListeners.push(
            addEventListeners(
                socket, 'error', (e) => console.log(e)
            )
        )

        this.removeEventListeners.push(
            addEventListeners(
                socket, 'close', (e) => this.handleClose(e)
            )
        )
    }

    handleMessage(e) {
        const message = JSON.parse(e.data)
        const{type} = message

        if(type === 'WaitForSecondPlayer'|| type === 'SetShips' || type === 'StartGame') {
            this.app.game.setGameStatus(type)
        }

        if(type === 'Disconnected') {
            this.closeConnection()
        }

        if(type === 'YourMove') {
            this.app.game.setIsPlayerMove(true)
        }

        if(type === 'ShotResult') {
            this.app.game.isPlayerMove
            ? this.app.rival.addShot(message) 
            : this.app.player.addShot(message)

            if(this.app.game.isPlayerMove && !message.hit) {
                this.app.game.setIsPlayerMove(false)
            } 
        }

        if(type === 'EndGame') {
            this.app.game.setGameStatus(type)
            this.app.game.setWin(message.win)
        }
    }

    sendMessage(body) {
        this.socket.send(JSON.stringify(body))
    }
    
    handleClose(e) {
        this.app.game.setGameStatus(e.type)
        for(const removeEventListener of this.removeEventListeners) {
            removeEventListener()
        } 
    }

    closeConnection() {
        this.socket.close()
    }
}
