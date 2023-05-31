import { host } from "."

export const fetchRoomId = async () => {
    const response = await host.post('/start')
    console.log(response)
    return response
}



export class GameAPI {
    socket = null
    
    constructor(roomId) {
        this.createWebSocket(roomId)
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

        this.socket.onopen = (e) => console.log(e)
        this.socket.onmessage = (e) => console.log(JSON.parse(e.data))
        this.socket.onerror = (e) => console.log(e)
    }


    sendMessage(body) {
        const data = JSON.stringify(body)
        this.socket.send(data)
    }
}
