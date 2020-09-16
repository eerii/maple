import React, {useEffect} from "react"

const WS = ({ ws, ID, setID, username, name, userlist, setUserlist, messageInput, messageButton, messageList, setMessageList, messageBox, handleNewVideoCallMsg, handleVideoOfferMsg, handleVideoReceivedMsg, handleICECandidateMsg, handleVideoAnswerMsg, handleHangUpMsg, room }) => {

    //WEBSOCKET
    //---------
    //ON RENDER
    useEffect(() => {
        (async () => {
            const token = localStorage.getItem("Token")
            if (token && !ws.current) {
                const wsURL = `${process.env.REACT_APP_WSS}?Auth=${token}&Room=${room}`
                try {
                    ws.current = new WebSocket(wsURL)
                    console.log("[WS]: Connecting to WebSocket...")
                } catch (e) {
                    console.log("[WS]: Error Creating to WebSocket: " + e.message)
                }
            }
        })()
    }, [ws, room])
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
                            console.log(data.room)

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
                    const [ user, name ] = message.split(":")
                    console.log(`[MESSAGE]: User ${user} has logged in at ${time}`)
                    if (!userlist.find(({ username: u }) => u === user)) {
                        setUserlist([...userlist, {connectionID: sender, username: user, name: name, time: (new Date(data.date).getTime() / 1000)}])
                    } else if (!userlist.find(({ connectionID }) => connectionID === sender)) {
                        const tempList = userlist.filter(({ username }) => username !== user)
                        setUserlist([...tempList, {connectionID: sender, username: user, name: name, time: (new Date(data.date).getTime() / 1000)}])
                    }
                    break
                //MESSAGES
                case "message":
                    console.log(`[MESSAGE]: ${sender}(${time}) -> ${message}`)
                    setMessageList([...messageList, {user: sender, message: message, time}])
                    messageBox.current.scrollTo({top: messageBox.current.scrollHeight, behavior: "smooth"})
                    break
                //SIGNALING
                case "new-video":
                    await handleNewVideoCallMsg(data)
                    break
                case "video-offer":
                    await handleVideoOfferMsg(data)
                    break
                case "video-received":
                    await handleVideoReceivedMsg(data)
                    break
                case "video-answer":
                    await handleVideoAnswerMsg(data)
                    break
                case "ice-candidate":
                    await handleICECandidateMsg(data)
                    break
                case "hang-up":
                    handleHangUpMsg(data)
                    break
                case "start-time":
                    console.log("[TIME TRACKING]: Started time tracking " + message)
                    break
                case "add-time":
                    console.log("[TIME TRACKING]: Added time " + message)
                    break
                case "close":
                    console.log("[MESSAGE]: Closed Old User Connection (Make sure you don't login in different browsers)")
                    break
                default:
                    console.log("[MESSAGE]: Unknown message -> " + message)
                    break
            }
        }
    }, [ws, ID, setID, username, userlist, setUserlist, messageList, setMessageList, handleNewVideoCallMsg, handleVideoOfferMsg, handleVideoReceivedMsg, handleICECandidateMsg, handleVideoAnswerMsg, handleHangUpMsg, messageBox])
    //---------


    //USER MANAGEMENT
    //---------
    //SEND USERNAME TO SERVER
    useEffect(() => {
        if (ID) {
            const data = {
                action: "sendMessage",
                data: username + ":" + name,
                type: "username",
                date: Date.now(),
                sender: ID
            }
            ws.current.send(JSON.stringify(data))
        }
    }, [ID, username, name, ws])
    //---------


    return (
        <div/>
    )
}

export default WS