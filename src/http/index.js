import axios from "axios"


export const host = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

// export const socket = new WebSocket(`${process.env.REACT_APP_WEBSOCKET_URL}`)

// socket.onopen = (e) => {
//     console.log(e)
// } 

// export const fetchRoomId = async () => {
//     console.log(process.env.REACT_APP_API_URL)
//     const response = await host.post('start')
//     return response
// }
