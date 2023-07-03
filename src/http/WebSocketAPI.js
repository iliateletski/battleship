import { addEventListeners } from "../utils/additional"

export class WebSocketAPI {
    removeEventListeners = []
    socket = null
    app = null
    roomId = null
    
    constructor(roomId, app) {
        this.createWebSocket(roomId)
        this.app = app
        this.roomId = roomId
    }

    async createWebSocket(roomId) {
        const socket = new WebSocket(`${process.env.REACT_APP_WEBSOCKET_URL}/${roomId}`) 

        this.socket = socket

        this.removeEventListeners.push(
            addEventListeners(
                socket, 'open', (e) => {
                    console.log(e)
                    this.isOpenSocket = true
                }
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
        return socket.readyState < 2 ? true : false 
    }

    handleMessage(e) {
        const message = JSON.parse(e.data)
        const{type} = message
        console.log(message)

        if(type === 'WaitForSecondPlayer'|| type === 'SetShips' || type === 'StartGame') {
            this.app.game.setGameStatus(type)
        }

        if(type === 'Continue') {
            setTimeout(() => {
                this.app.game.setGameStatus('StartGame')
            }, 3000)
        }

        if(type === 'Disconnected') {
            this.app.game.setGameStatus(type)
            console.log(type)
            console.log('переподключение')
            setTimeout(() => {
                if(this.app.game.gameStatus === 'Disconnected') this.closeConnection()
                console.log('соедененеие разорвано')
            },10000)
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
    
    async reconnect() {
        if(!this.roomId) return false
        return await this.createWebSocket(this.roomId)
    }

    async handleClose(e) {
        this.app.game.setGameStatus('Disconnected')
        const reconnect = this.reconnect()
        if(!reconnect) {
            this.app.game.setGameStatus(e.type)
            this.roomId = null
            for(const removeEventListener of this.removeEventListeners) {
                removeEventListener()
            } 
        }
        console.log(e.type, this.socket.readyState)
    }

    closeConnection() {
        this.roomId = null
        this.socket.close()
    }
}
