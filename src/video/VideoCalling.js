import React, {useEffect, useState} from "react"

import Modal from "../components/Modal"

const VideoCalling = ({ setShowVideoCallingUI, stopCall, status, callingID, callingUser }) => {
    const [callState, setCallState] = useState("Not initialized")

    useEffect(() => {
        switch (status) {
            case 0:
                setCallState("Call started")
                return
            case 1:
                setCallState("Call sent to user")
                return
            case 2:
                setCallState("Call received by user")
                return
            case 3:
                setCallState("Call accepted by user")
                setShowVideoCallingUI(false)
                return
            default:
                return
        }
    }, [status, setShowVideoCallingUI])

    const stopCallClickOutside = async () => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm("Are you sure you want to stop the call?"))
            await stopCall(callingID)
    }

    return (
        <Modal setVisible={() => stopCallClickOutside()}>
            <h2>Calling...</h2>
            <h1>{callingUser.current}</h1>
            <p>Status: {callState}</p>
        </Modal>
    )
}

export default VideoCalling