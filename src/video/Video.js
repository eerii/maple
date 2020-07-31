import React, {useRef, useState, useEffect} from "react"

import { hri } from 'human-readable-ids'

import styles from "../config/Styles"
const { Background, LocalVideo, RemoteVideo } = styles

const socketURL = process.env.REACT_APP_WSS + "?Auth=" + localStorage.getItem("Token")

const cameraConstrains = {
    audio: true,
    video: {
        facingMode: "user",
        width: { ideal: 1920 },
        height: { ideal: 1080 }
    }
}

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

const ID = hri.random()

const Video = ({ show }) => {
    //STATE
    const [messages, setMessages] = useState(["Test message"])
    const [newMessage, setNewMessage] = useState("")
    const [isConnection, setIsConnection] = useState(false)
    const [checkConnection, setCheckConnection] = useState(false)
    const [stream, setStream] = useState(null)
    const [connection, setConnection] = useState(null)
    const [channel, setChannel] = useState(null)

    //REF
    const socket = useRef(new WebSocket(socketURL))
    const tracks = useRef([])
    const localVideo = useRef(null)
    const remoteVideo = useRef(null)


    //WEBSOCKET
    //---------
    //OPEN WEBSOCKET
    useEffect(() => {
        let peerTimer
        socket.current.onopen = () => {
            console.log("WebSocket Client Connected")
            setIsConnection(true)
            peerTimer = setTimeout(
                () => setConnection(new RTCPeerConnection(TurnConfig)),
                500
            )
        }
        const checkTimer = setTimeout(
            () => setCheckConnection(true),
            1000
        )
        return () => {
            clearTimeout(peerTimer)
            clearTimeout(checkTimer)
        }
    }, [])
    useEffect(() => {
        if (!localStorage.getItem("Token")) {
            setIsConnection(false)
            show(false)
        }
    }, [show])
    //WHEN A MESSAGE ARRIVES
    useEffect(() => {
        socket.current.onmessage = async (event) => {
            const [message, type, id] = event.data.split("&")
            console.log("Message: " + message, "Type: " + type, "ID: " + id)

            switch (type){
                case 'candidate':
                    await handleCandidate(JSON.parse(message), id)
                    break
                case 'offer':
                    await handleOffer(JSON.parse(message), id)
                    break
                case 'answer':
                    await handleAnswer(JSON.parse(message), id)
                    break
                default:
                    setMessages(messages.concat([message]))
                    break
            }
        }
    })
    //CLOSE THE OLD SOCKET WHEN THE SOCKET CHANGES
    useEffect(() => () => {
        socket.current.close()
        setIsConnection(false)
        console.log("WebSocket Client Disconnected")
    }, [socket])
    //CHECK CONNECTION
    useEffect(() => {
        if (checkConnection && !isConnection) {
            socket.current = new WebSocket(socketURL)
            setCheckConnection(false)
        }
    }, [isConnection, checkConnection])
    //---------


    //CAMERA
    //---------
    const askForCamera = true
    useEffect(() => {
        if (askForCamera) {
            (async () => {
                //navigator.getWebcam = (navigator.getUserMedia || navigator.webKitGetUserMedia || navigator.moxGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia)

                if (navigator.mediaDevices.getUserMedia) {
                    try {
                        setStream(await navigator.mediaDevices.getUserMedia(cameraConstrains))
                        console.log("Webcam is Available")
                    } catch (e) {
                        console.log("Failed to get Webcam ", e)
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
            })()
    }}, [askForCamera])
    useEffect(() => {
        localVideo.current.srcObject = stream
    }, [stream])
    //---------


    //PEER CONNECTION
    //---------
    useEffect(() => {
        if (connection) {
            console.log("Web RTC Peer Connection Created.")

            if (stream && tracks.current.length === 0) {
                for (const t of stream.getTracks()) {
                    console.log("Sending Stream Track: ", t)
                    tracks.current = [...tracks.current, (connection.addTrack(t, stream))]
                }
            } else {
                console.log("No Stream Available.")
            }
        }
    }, [connection, stream])
    useEffect(() => {
        if (connection) {
            connection.ontrack = event => {
                console.log("Received Stream.")
                console.log(event.streams)
                remoteVideo.current.srcObject = event.streams[0]
            }

            connection.ondatachannel = (event) => {
                console.log("Received a DataChannel.")
                setChannel(event.channel)
            }

            connection.onicecandidate = (event) => {
                if (event.candidate) {
                    console.log("Sending Ice Candidate - " + event.candidate.candidate)

                    socket.current.send(JSON.stringify(
                        {
                            action: 'sendMessage',
                            data: JSON.stringify(event.candidate) + '&candidate&' + ID,
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
        }
    }, [connection])
    //---------


    //CHANNEL
    //---------
    useEffect(() => {
        if (channel) {
            channel.onmessage = (event) => {
                const [message, type] = event.data.split(":")
                console.log("New message: " + message + "Type: " + type)
                //TODO: ADD MESSAGE
            }

            channel.onerror = (event) => {
                console.log('DataChannel Error.')
                console.error(event)
            }

            channel.onclose = () => {
                console.log('DataChannel Closed.')
            }
        }
    }, [channel])
    //SEND OFFER
    const sendOffer = async () => {
        if(channel)
            channel.close()

        setChannel(connection.createDataChannel('channel', {}))

        try {
            const offer = await connection.createOffer()
            console.log("Sent Offer: ", offer)

            socket.current.send(JSON.stringify(
                {
                    action: 'sendMessage',
                    data: JSON.stringify(offer) + '&offer&' + ID,
                }
            ))

            await connection.setLocalDescription(offer)
        } catch (e) {
            console.log("Error Creating Offer: " + e.message)
        }
    }
    //SEND ANSWER
    const sendAnswer = async () => {
        try {
            const answer = await connection.createAnswer()
            console.log("Sent Answer: ", answer)

            socket.current.send(JSON.stringify(
                {
                    action: 'sendMessage',
                    data: JSON.stringify(answer) + '&answer&' + ID,
                }
            ))
        } catch (e) {
            console.log("Error Creating Answer: " + e.message)
        }
    }
    //SEND A MESSAGE
    const sendMessage = () => {
        socket.current.send(JSON.stringify({action: "sendMessage", data: newMessage}))
        setNewMessage("")
    }
    //---------

    //HANDLERS
    //---------
    //CANDIDATE
    const handleCandidate = async (candidate, id) => {
        if(ID !== id){
            console.log("Adding Ice Candidate - " + candidate.candidate)
            await connection.addIceCandidate(new RTCIceCandidate(candidate))
        }
    }
    //OFFER
    const handleOffer = async (offer, id) => {
        if(ID !== id) {
            console.log("Received The Offer")
            await connection.setRemoteDescription(new RTCSessionDescription(offer))
        }
    }
    //ANSWER
    const handleAnswer = async (answer, id) => {
        if(ID !== id){
            console.log("Received The Answer")
            await connection.setRemoteDescription(new RTCSessionDescription(answer))
        }
    }
    //---------


    //WEBPAGE
    return (
        <Background>
            <h1 style={{paddingTop: "15vh"}}>Video</h1>

            <div id="videoContainer">
                <RemoteVideo id="remoteVideo" ref={remoteVideo} autoPlay playsinline/>
                <LocalVideo id="localVideo" ref={localVideo} muted autoPlay playsinline/>
            </div>

            <input type="text" size="80" placeholder="Enter message to send" value={newMessage} onChange={(e) => setNewMessage(e.target.value)}/>
            <button onClick={() => sendMessage()}>Send Message</button>
            <br/><br/>

            <button onClick={() => sendOffer()}>Send Offer</button>
            <button onClick={() => sendAnswer()}>Send Answer</button>
            <button onClick={() => {connection.close(); console.log("Peer Connection Closed")}}>Close PC</button>
            <button onClick={() => {socket.current.close(); console.log("WebSocket Client Disconnected")}}>Close WS</button>
            <br/><br/>

            <div style={{height: "400px", border: "1px solid black", borderRadius: "3px"}} id="console">
                {messages.map(message => <p style={{color: "black"}} key={message}>{message}</p>)}
            </div>
        </Background>
    )
}

export default Video