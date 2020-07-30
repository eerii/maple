import config from "../config/config"

export const connectToSocket = (token) => {
    const socket = new WebSocket(config.apiGateway.WSS + "?Auth=" + token)

    // Create WebRTC connection only if the socket connection is successful.
    socket.onopen = (event) => {
        console.log('WebSocket Connection Open.')
        createRTCPeerConnection()
    }

    // Handle messages recieved in socket
    /*socket.onmessage = (event) => {
        data = JSON.parse(event.data)

        switch (data.type){
            case 'candidate':
                handleCandidate(data.data, data.id)
                break
            case 'offer':
                handleOffer(data.data, data.id)
                break
            case 'answer':
                handleAnswer(data.data, data.id)
                break
            default:
                break
        }
    }*/

    socket.onerror = (event) => {
        console.error(event)
        console.log('WebSocket Connection Error. Make sure web socket URL is correct and web socket server is up and running at - ' + config.apiGateway.WSS)
    }

    socket.onclose = (event) => {
        console.log('WebSocket Connection Closed. Please Reload the page.')
        //document.getElementById("sendOfferButton").disabled = true;
        //document.getElementById("answerButton").disabled = true;
    }
}