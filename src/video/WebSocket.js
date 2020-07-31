import React, {useState, useEffect, useRef} from "react"

import Userlist from "./Userlist"


const WS = ({ ws, ID, setID, username, startCall, sendSignal }) => {
    //STATE
    const [message, setMessage] = useState("")
    const [userlist, setUserlist] = useState([])

    //REFERENCES
    const messageInput = useRef(null)
    const messageButton = useRef(null)


    //WEBSOCKET
    //---------
    //ON RENDER
    useEffect(() => {
        (async () => {
            const token = localStorage.getItem("Token")
            if (token && !ws.current) {
                const wsURL = process.env.REACT_APP_WSS + "?Auth=" + token
                try {
                    ws.current = new WebSocket(wsURL)
                    console.log("[WS]: Connecting to WebSocket...")
                } catch (e) {
                    console.log("[WS]: Error Creating to WebSocket: " + e.message)
                }
            }
        })()
    }, [ws])
    //ADD PROPERTIES TO WEBSOCKET
    useEffect(() => {
        ws.current.onopen = () => {
            console.log("[WS]: WebSocket Client Connected")
            messageInput.current.disabled = false
            messageButton.current.disabled = false

            const data = {
                action: "sendMessage",
                type: "getID",
            }
            ws.current.send(JSON.stringify(data))
        }

        ws.current.onmessage = async (event) => {
            const data = JSON.parse(event.data)
            const time = (data.date) ? (new Date(data.date)).toLocaleTimeString() : ""
            const {message, type, sender} = data

            switch (type) {
                //USER MANAGEMENT
                case "id":
                    setUserlist(data.userlist)
                    if(!ID){
                        try {
                            const userData = data.userlist.find(({ username: u }) => u === username)
                            setID(userData.connectionID)
                        } catch (e) {
                            console.log("[WS]: Error Getting Connection ID")
                        }
                    }
                    break
                case "username":
                    console.log(`[MESSAGE]: User ${message} has logged in at ${time}`)
                    const userExists = userlist.find(({ username: u }) => u === message)
                    if (!userExists) {
                        setUserlist([...userlist, {connectionID: sender, username: message, time: (new Date(data.date).getTime() / 1000)}])
                    }
                    break
                case "userlist":
                    //handleUserListMsg(msg) UPDATE USER LIST
                    break
                //MESSAGES
                case "message":
                    console.log(`[MESSAGE]: ${sender}(${time}) -> ${message}`)
                    break
                //SIGNALING
                case "video-offer":
                    //handleVideoOfferMsg(msg)
                    break;
                case "video-answer":
                    //handleVideoAnswerMsg(msg)
                    break;
                case "ice-candidate":
                    //handleNewICECandidateMsg(msg)
                    break;
                case "hang-up":
                    //handleHangUpMsg(msg)
                    break;
                default:
                    console.log("[MESSAGE]: Unknown message -> " + message)
                    break
            }
        }

        ws.current.onerror = (event) => {
            console.log("[WS]: ERROR ", event)
        }

        ws.current.onclose = () => {
            console.log("[WS]: WebSocket Client Disconnected")
        }
    }, [ws, ID, setID, username, userlist])
    //---------


    //USER MANAGEMENT
    //---------
    //SEND USERNAME TO SERVER
    useEffect(() => {
        if (ID) {
            const data = {
                action: "sendMessage",
                data: username,
                type: "username",
                date: Date.now(),
                sender: ID
            }
            ws.current.send(JSON.stringify(data))
        }
    }, [ID, username, ws])
    //---------


    return (
        <div>
            <h2>Websocket</h2>
            <input ref={messageInput} type="text" size="80" placeholder="Enter message to send" value={message} onChange={(event) => setMessage(event.target.value)} disabled/>
            <button ref={messageButton} onClick={() => sendSignal({data: message, type: "message"})} disabled>Send Message</button>

            <Userlist userlist={userlist} startCall={startCall}/>

            <br/><br/>
        </div>
    )
}

export default WS