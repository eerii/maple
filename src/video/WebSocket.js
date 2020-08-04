import React, {useEffect} from "react"

const WS = ({ ws, ID, setID, username, userlist, setUserlist, messageInput, messageButton, messageList, setMessageList, messageBox, handleVideoOfferMsg, handleVideoReceivedMsg, handleICECandidateMsg, handleVideoAnswerMsg, handleHangUpMsg }) => {

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

        ws.current.onerror = (event) => {
            console.log("[WS]: ERROR ", event)
        }

        ws.current.onclose = () => {
            console.log("[WS]: WebSocket Client Disconnected")
        }
    }, [ws, messageInput, messageButton])
    //ON MESSAGE
    useEffect(() => {
        ws.current.onmessage = async (event) => {
            const data = JSON.parse(event.data)
            const time = (data.date) ? (new Date(data.date)).toLocaleTimeString() : ""
            const {message, type, sender} = data

            switch (type) {
                //USER MANAGEMENT
                case "id":
                    let tempList = data.userlist
                    if(!ID){
                        try {
                            const userData = data.userlist.filter(({ username: u }) => u === username)
                            let latestUser
                            if (userData.length > 1) {
                                latestUser = userData.reduce((max, current) => max.time > current.time ? max : current)
                                await data.userlist.forEach(user => {
                                    if (user.username === latestUser.username) {
                                        if (user.connectionID !== latestUser.connectionID) {
                                            const data = {
                                                action: "sendMessage",
                                                type: "close",
                                                sender: user.connectionID
                                            }
                                            ws.current.send(JSON.stringify(data))
                                            tempList = tempList.filter(({ connectionID }) => connectionID !== user.connectionID)
                                        }
                                    }
                                })
                            } else {
                                latestUser = userData[0]
                            }
                            setID(latestUser.connectionID)
                        } catch (e) {
                            console.log("[WS]: Error Getting Connection ID")
                        }
                        setUserlist(tempList)
                    }
                    break
                case "username":
                    console.log(`[MESSAGE]: User ${message} has logged in at ${time}`)
                    if (!userlist.find(({ username: u }) => u === message)) {
                        setUserlist([...userlist, {connectionID: sender, username: message, time: (new Date(data.date).getTime() / 1000)}])
                    } else if (!userlist.find(({ connectionID }) => connectionID === sender)) {
                        const tempList = userlist.filter(({ username }) => username !== message)
                        setUserlist([...tempList, {connectionID: sender, username: message, time: (new Date(data.date).getTime() / 1000)}])
                    }
                    break
                //MESSAGES
                case "message":
                    console.log(`[MESSAGE]: ${sender}(${time}) -> ${message}`)
                    setMessageList([...messageList, {user: sender, message: message, time}])
                    messageBox.current.scrollTo({top: messageBox.current.scrollHeight, behavior: "smooth"})
                    break
                //SIGNALING
                case "video-offer":
                    await handleVideoOfferMsg(data)
                    break;
                case "video-received":
                    await handleVideoReceivedMsg(data)
                    break;
                case "video-answer":
                    await handleVideoAnswerMsg(data)
                    break;
                case "ice-candidate":
                    await handleICECandidateMsg(data)
                    break;
                case "hang-up":
                    handleHangUpMsg(data)
                    break;
                case "close":
                    console.log("[MESSAGE]: Closed Old User Connection (Make sure you don't login in different browsers)")
                    break;
                default:
                    console.log("[MESSAGE]: Unknown message -> " + message)
                    break
            }
        }
    }, [ws, ID, setID, username, userlist, setUserlist, messageList, setMessageList, handleVideoOfferMsg, handleVideoReceivedMsg, handleICECandidateMsg, handleVideoAnswerMsg, handleHangUpMsg, messageBox])
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
        <div/>
    )
}

export default WS