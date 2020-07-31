import React, {useState, useEffect, useRef} from "react"

const WS = ({ ws, username }) => {
    //STATE
    const [message, setMessage] = useState("")
    const [ID, setID] = useState(null)

    //REFERENCES
    const messageInput = useRef(null)
    const messageButton = useRef(null)
    const userlist = useRef([])



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
        }

        ws.current.onmessage = async (event) => {
            const data = JSON.parse(event.data)
            const time = (data.date) ? (new Date(data.date)).toLocaleTimeString() : ""
            const {message, type, sender} = data

            switch (type) {
                //USER MANAGEMENT
                case "id":
                    setID(message)
                    if (data.userlist)
                        userlist.current = data.userlist
                    break
                case "username":
                    console.log(`[MESSAGE]: User ${message} has logged in at ${time}`)
                    const userExists = userlist.current.find(({ username }) => username === message)
                    if (!userExists)
                    {
                        userlist.current = [...userlist, {connectionID: sender, username: message, time: (new Date(data.date).getTime() / 1000)}]
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
                case "new-ice-candidate":
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
    }, [ws])
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


    //MESSAGES
    //---------
    const sendMessage = (message) => {
        const data = {
            action: "sendMessage",
            ...message
        }

        ws.current.send(JSON.stringify(data))
        setMessage("")
    }
    //---------

    return (
        <div>
            <h2>Websocket</h2>
            <input ref={messageInput} type="text" size="80" placeholder="Enter message to send" value={message} onChange={(event) => setMessage(event.target.value)} disabled/>
            <button ref={messageButton} onClick={() => sendMessage({data: message, type: "message"})} disabled>Send Message</button>
        </div>
    )
}

export default WS