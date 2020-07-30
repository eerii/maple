export const sendMessage = (channel, message) => {
    channel.current.send(
        JSON.stringify({
            "action":"sendMessage",
            "data": message
    }))
}