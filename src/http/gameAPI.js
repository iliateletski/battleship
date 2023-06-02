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
        this.socket.onmessage = (e) => {
            const message = JSON.parse(e.data)
            const{type} = message

            switch(type) {
                case 'WaitForSecondPlayer': this.app.setGameStatus(type); break
                case 'SetShips': this.app.setGameStatus(type); break
                case 'StartGame': this.app.setGameStatus(type); break
                case 'YourMove' : this.app.setIsMyMove(true); break
                case 'ShotResult' : 
                    this.app.setShotResult(message)
                    this.app.isMyMove
                    ? this.app.rival.addShot(message) 
                    : this.app.player.addShot(message)

                    if(this.app.isMyMove && !message.hit) {
                        this.app.setIsMyMove(false)
                    }
                break

                case 'EndGame': 
                    this.app.setGameStatus(type)
                    this.app.setWin(message.win)    
                break

            }

        }
        this.socket.onerror = (e) => {
            console.log(e)
        }
    }

    sendMessage(body) {
        this.socket.send(JSON.stringify(body))
    }
}
