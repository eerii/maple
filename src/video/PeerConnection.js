import { TurnConfig } from "./Config"

export const createPeerConnection = (socket, username, stream, tracks, setTracks, remoteVideoRef) => {
    const connection = new RTCPeerConnection(TurnConfig)

    if (stream.current) {
        for (const track of stream.current.getTracks()) {
            console.log("Sending Stream.")
            setTracks([...tracks, (connection.addTrack(track, stream.current))])
        }
    } else {
        console.log("No Stream Available.")
    }


    connection.ontrack = event => {
        console.log("Received Stream.")
        remoteVideoRef.current.srcObject = event.streams[0]
    }

    connection.ondatachannel = (event) => {
        console.log("Received a DataChannel.")
        //setChannelEvents(event.channel)
    }

    connection.onicecandidate = (event) => {
        if (event.candidate) {
            console.log("Sending Ice Candidate - " + event.candidate.candidate)

            socket.current.send(JSON.stringify(
                {
                    action: 'onMessage',
                    type: 'candidate',
                    data: event.candidate,
                    id: username
                }
            ))
        }
    }

    connection.onconnectionstatechange = (event) => {
        switch(connection.connectionState) {
            case "connected":
                console.log("Web RTC Peer Connection Connected.")
                break
            case "disconnected":
                console.log("Web RTC Peer Connection Disconnected. Please reload the page to reconnect.")
                break
            case "failed":
                console.log("Web RTC Peer Connection Failed. Please reload the page to reconnect.")
                console.log(event)
                break;
            case "closed":
                console.log("Web RTC Peer Connection Failed. Please reload the page to reconnect.")
                break
            default:
                break
        }
    }

    console.log("Web RTC Peer Connection Created.")
}