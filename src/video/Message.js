import React, {useState} from "react"

import styles from "../config/Styles"
const { MessageBox: MessageBoxStyle, Message: MessageStyle, ReplyMessage, FormSubtext } = styles

const Message = ({ message, myself, user, time}) => {
    return (
        <div>
            {(user === myself) ?
                <MessageStyle>
                    <p style={{fontSize: "10px", margin: "0"}}>{user} at {time}</p>
                    <p style={{margin: "0"}}>{message}</p>
                </MessageStyle> :
                <ReplyMessage>
                    <p style={{fontSize: "10px", margin: "0"}}>{user} at {time}</p>
                    <p style={{margin: "0"}}>{message}</p>
                </ReplyMessage>}
        </div>
    )
}

const MessageBox = ({ sendSignal, username, messageInput, messageButton, messageList, messageBox }) => {
    const [message, setMessage] = useState("")
    const [showText, setShowText] = useState(false)

    const handleSendMessage = (event) => {
        event.preventDefault()

        sendSignal({
            data: message,
            type: "message",
            sender: username, //Use ID?
            date: (Date.now() / 1000)
        })

        setMessage("")
    }

    return (
        <div>
            <h2>Messages</h2>
            <MessageBoxStyle ref={messageBox}>
                {messageList.map(({ message, user, time }) => <Message key={user+time+Math.floor(Math.random() * 20)} user={user} message={message} time={time} myself={username}/>)}
            </MessageBoxStyle>
            <br/>
            <form onSubmit={handleSendMessage} onFocus={() => setShowText(true)} onBlur={() => setShowText(false)}>
                <input
                    type="text"
                    ref={messageInput}
                    value={message}
                    name="Message"
                    onChange={({ target }) => setMessage(target.value)}
                    placeholder="Enter a message to send"
                    disabled
                />
                <button type="submit" ref={messageButton}>Send</button>
            </form>
            <FormSubtext theme={showText ? {opacity: 100} : {opacity: 0}}>All the members of the room will be able to see this message.</FormSubtext>
            <br/>
        </div>
    )
}

export default MessageBox