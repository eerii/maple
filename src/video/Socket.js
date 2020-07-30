import { createPeerConnection } from "./PeerConnection"

export const connectWebSocket = (socket, token, username, stream, tracks, setTracks, remoteVideoRef) => {
    // noinspection JSValidateTypes
    socket.current = new WebSocket(process.env.REACT_APP_WSS + "?Auth=" + token)

    socket.current.onopen = () => {
        console.log("Websocket Connection Open")
        console.log(stream.current)
        createPeerConnection(socket, username, stream, tracks, setTracks, remoteVideoRef)
        //socket.current.send(JSON.stringify({"action":"sendMessage", "data":"helloworld"}))
    }

    socket.current.onmessage = (event) => {
        const data = JSON.parse(event.data)

        switch (data.type){
            /*case 'candidate':
                handleCandidate(jsonData.data, jsonData.id);
                break;
            case 'offer':
                handleOffer(jsonData.data, jsonData.id);
                break;
            case 'answer':
                handleAnswer(jsonData.data, jsonData.id);
                break;*/
            default:
                console.log(data)
                break
        }
    }

    socket.current.onerror = (event) => {
        console.error(event)
    }

    socket.current.onclose = () => {
        console.log("Websocket Connection Close")
    }
}