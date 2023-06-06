import { host } from "."

export const fetchRoomId = async () => {
    const response = await host.post('/start')
    console.log(response)
    return response
}

export class GameAPI {
    socket = null
    app = null
    
    constructor(roomId, app) {
        this.createWebSocket(roomId)
        this.app = app
    }

    async createWebSocket(roomId) {
        let socket

        if(roomId) {
            socket = new WebSocket(`${process.env.REACT_APP_WEBSOCKET_URL}/${roomId}`)
        } else {
            const{data} = await fetchRoomId() 
            socket = new WebSocket(`${process.env.REACT_APP_WEBSOCKET_URL}/${data.roomId}`)
        }

        this.socket = socket

        this.socket.onopen = (e) => {
            console.log(e)
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

        if(type === 'WaitForSecondPlayer'|| type === 'SetShips' || type === 'StartGame' || type === 'Disconnected') {
            this.app.game.setGameStatus(type)
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
    
    handlerClose(e) {
        console.log(e)
    }


    closeConnection() {
        this.socket.close()
    }
}
