import React, {useRef, useState, useEffect} from "react"

import styles from "../config/Styles"
const { Background, LocalVideo, RemoteVideo } = styles

const socketURL = process.env.REACT_APP_WSS + "?Auth=" + localStorage.getItem("Token")

const Video = ({ show }) => {
    //STATE
    const [messages, setMessages] = useState(["Test message"])
    const [newMessage, setNewMessage] = useState("")
    const [isConnection, setIsConnection] = useState(false)
    const [checkConnection, setCheckConnection] = useState(false)

    //REF
    const socket = useRef(new WebSocket(socketURL))
    const localVideo = useRef(null)
    const remoteVideo = useRef(null)


    //WEBSOCKET
    //---------
    //OPEN WEBSOCKET
    useEffect(() => {
        socket.current.onopen = () => {
            console.log("WebSocket Client Connected")
            setIsConnection(true)
        }
        const checkTimer = setTimeout(
            () => setCheckConnection(true),
            1000
        )
        return () => {
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
        socket.current.onmessage = (event) => {
            const [message, type] = event.data.split(":")
            console.log("Message: " + message, "Type: " + type)

            switch (type){
                case 'test':
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
        if (!isConnection && checkConnection) {
            socket.current = new WebSocket(socketURL)
        }
    }, [isConnection, checkConnection])
    //---------


    //SEND A MESSAGE
    const sendMessage = () => {
        socket.current.send(JSON.stringify({action: "sendMessage", data: newMessage}))
        setNewMessage("")
    }


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

            {/*<button onClick={() => sendOffer()}>Call</button>
            <button onClick={() => sendAnswer()}>Answer</button>
            <button onClick={() => disconnectPeerConnection(connection)}>Hang Up</button>
            <button onClick={() => {socket.current.close(); console.log("WebSocket Client Disconnected")}}>Close WS</button>
            <br/><br/>*/}

            <div style={{height: "400px", border: "1px solid black", borderRadius: "3px"}} id="console">
                {messages.map(message => <p style={{color: "black"}} key={message}>{message}</p>)}
            </div>
        </Background>
    )
}

export default Video