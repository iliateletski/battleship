export class WebSocketAPI {
    socket = null
    app = null
    
    constructor(roomId, app) {
        this.createWebSocket(roomId)
        this.app = app
    }

    async createWebSocket(roomId) {
        const socket = new WebSocket(`${process.env.REACT_APP_WEBSOCKET_URL}/${roomId}`) 

        this.socket = socket

        this.socket.onopen = (e) => {
            console.log(socket.readyState)
        }
        this.socket.onmessage = (e) => this.handlerMessage(e)

        this.socket.onerror = (e) => {
            console.log(e)
        }

        this.socket.onclose = (e) => this.handlerClose(e)
    }

    handlerMessage(e) {
        const message = JSON.parse(e.data)
        const{type} = message
        console.log(message)

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

            if(this.app.game.isPlayerMove && message.kill) {
                const{y, x} = message
                this.app.rival.markKillShip(y, x)  
            }
        }

        if(type === 'EndGame') {
            this.app.game.setGameStatus(type)
            this.app.game.setWin(message.win)
        }
        console.log(this.socket.readyState)
    }

    sendMessage(body) {
        console.log(body)
        this.socket.send(JSON.stringify(body))
    }
    
    handlerClose(e) {
        this.app.game.setGameStatus(e.type)
        console.log(this.socket.readyState)
    }

    closeConnection() {
        this.socket.close()
        console.log(this.socket.readyState)
    }
}
