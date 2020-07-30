import React, {useEffect, useRef, useState} from "react"

import styles from "../config/Styles"
const { Background, LocalVideo, RemoteVideo } = styles

const TurnConfig = {
    iceServers: [
        {
            urls: 'stun:stun.' + process.env.REACT_APP_TURN_IP + ':' + process.env.REACT_APP_TURN_PORT
        },
        {
            urls: 'turn:turn.' + process.env.REACT_APP_TURN_IP + ':' + process.env.REACT_APP_TURN_PORT,
            username: process.env.REACT_APP_TURN_USER,
            credential: process.env.REACT_APP_TURN_PASS
        }
    ]
}

const Video = ({username}) => {
    const [tracks, setTracks] = useState([])

    const remoteVideoRef = useRef()
    const localVideoRef = useRef()
    const socket = useRef()
    const stream = useRef()
    const channel = useRef()
    const connection = useRef()


    //LOAD AT START
    useEffect(() => {
        (async () => {
            const token = localStorage.getItem("Token")
            if (token) {
                const isWebcam = true //await getWebcam(stream)
                if (isWebcam) {
                    localVideoRef.current.srcObject = stream.current
                    await connectWebSocket(token)
                }
            }
        })()
    }, [])


    //GET WEBCAM
    const getWebcam = async () => {
        const constraints = {
            audio: true,
            video: {
                facingMode: "user",
                width: { ideal: 1920 },
                height: { ideal: 1080 }
            }
        }

        //navigator.getWebcam = (navigator.getUserMedia || navigator.webKitGetUserMedia || navigator.moxGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia)

        if (navigator.mediaDevices.getUserMedia) {
            try {
                stream.current = await navigator.mediaDevices.getUserMedia(constraints)
                return true
            } catch (e) {
                console.log("Failed to get Webcam ", e)
                return false
            }
        }
        else {
            console.log("Web cam is not accessible.")
            /*await navigator.getWebcam({ audio: true, video: true },
                (s) => {
                    stream.current = s
                    return true
                },
                () => {
                    console.log("Web cam is not accessible.")
                    return false
                });*/
        }
    }


    //CONNECT TO THE SOCKET
    const connectWebSocket = async (token) => {
        socket.current = (new WebSocket(process.env.REACT_APP_WSS + "?Auth=" + token))

        socket.current.onopen = () => {
            console.log("Websocket Connection Open")
            createPeerConnection()
        }

        socket.current.onmessage = (event) => {
            const data = JSON.parse(event.data)

            switch (data.type){
                case 'candidate':
                    handleCandidate(data.data, data.id);
                    break;
                case 'offer':
                    handleOffer(data.data, data.id);
                    break;
                case 'answer':
                    handleAnswer(data.data, data.id);
                    break;
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


    //PEER CONNECTION
    const createPeerConnection = () => {
        connection.current = new RTCPeerConnection(TurnConfig)

        if (stream.current) {
            for (const track of stream.current.getTracks()) {
                console.log("Sending Stream Track: ", track)
                setTracks([...tracks, (connection.current.addTrack(track, stream.current))])
            }
        } else {
            console.log("No Stream Available.")
        }


        connection.current.ontrack = event => {
            console.log("Received Stream.")
            remoteVideoRef.current.srcObject = event.streams[0]
        }

        connection.current.ondatachannel = (event) => {
            console.log("Received a DataChannel.")
            channel.current = event.channel
            setChannelEvents(event.channel)
        }

        connection.current.onicecandidate = (event) => {
            if (event.candidate) {
                console.log("Sending Ice Candidate - " + event.candidate.candidate)

                socket.current.send(JSON.stringify(
                    {
                        action: 'sendMessage',
                        type: 'candidate',
                        data: event.candidate,
                        id: username
                    }
                ))
            }
        }

        connection.current.onconnectionstatechange = (event) => {
            switch(connection.current.connectionState) {
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
    //DISCONNECT PEER CONNECTION
    const disconnectPeerConnection = () => {
        connection.current.close()
    }


    //CHANNEL
    //CHANNEL EVENTS
    const setChannelEvents = (channel) => {
        channel.onmessage = (event) => {
            const data = JSON.parse(event.data)
            console.log("New message: " + data)
            //TODO: Show messages
        }

        channel.onerror = function (event) {
            console.log('DataChannel Error.')
            console.error(event)
        }

        channel.onclose = function () {
            console.log('DataChannel Closed.')
        }
    }
    //SEND OFFER
    const sendOffer = async () => {
        if(channel.current)
            channel.current.close()

        channel.current = connection.current.createDataChannel('channel', {})
        setChannelEvents(channel.current)

        try {
            const offer = await connection.current.createOffer()
            console.log("Sent Offer: ", offer)

            socket.current.send(JSON.stringify(
                {
                    action: 'sendMessage',
                    type: 'offer',
                    data: offer,
                    id: username
                }
            ))

            await connection.current.setLocalDescription(offer)
        } catch (e) {
            console.log("Error Creating Offer: " + e.message)
        }
    }
    //SEND ANSWER
    const sendAnswer = async () => {
        try {
            const answer = await connection.current.createAnswer()
            console.log("Sent Answer: ", answer)

            socket.current.send(JSON.stringify(
                {
                    action: 'sendMessage',
                    type: 'answer',
                    data: answer,
                    id: username
                }
            ))
        } catch (e) {
            console.log("Error Creating Answer: " + e.message)
        }
    }
    //SEND MESSAGE
    const sendMessage = (message) => {
        channel.current.send(
            JSON.stringify({
                "action":"sendMessage",
                "data": message
    }))}


    //HANDLERS
    //CANDIDATE
    const handleCandidate = (candidate, id) => {
        if(username !== id){
            console.log("Adding Ice Candidate - " + candidate.candidate)
            connection.current.addIceCandidate(new RTCIceCandidate(candidate))
        }
    }
    //OFFER
    const handleOffer = (offer, id) => {
        if(username !== id) {
            console.log("Recieved The Offer.")
            connection.current.setRemoteDescription(new RTCSessionDescription(offer))
        }
    }
    //ANSWER
    const handleAnswer = (answer, id) => {
        if(username !== id){
            console.log("Recieved The Answer")
            connection.current.setRemoteDescription(new RTCSessionDescription(answer))
        }
    }


    return (
        <Background>
            <h1 style={{paddingTop: "15vh"}}>Video</h1>

            <div id="videoContainer">
                <RemoteVideo id="remoteVideo" ref={remoteVideoRef} autoPlay playsinline/>
                <LocalVideo id="localVideo" ref={localVideoRef} muted autoPlay playsinline/>
            </div>

            <button id="sendOfferButton" onClick={() => sendOffer()}>Call</button>
            <button id="answerButton" onClick={() => sendAnswer()}>Answer</button>
            <button id="hangUpButton" onClick={() => disconnectPeerConnection()}>Hang Up</button>
            <br/><br/>

            <input id="messageInput" type="text" size="80" placeholder="Enter message to send"/>
            <button id="sendMessageButton" onClick={() => sendMessage()}>Send Message</button>
            <br/><br/>
        </Background>
    )
}

export default Video