import React, {useEffect, useState} from "react"

import Modal from "../components/Modal"

const VideoCalling = ({ setShowVideoCallingUI, status, calling="User" }) => { //TODO: Click outside cancel modal
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
    }, [status])

    //TODO: Add option to cancel clicking outside

    return (
        <Modal setVisible={() => {}}>
            <h2>Calling...</h2>
            <h1>{calling}</h1>
            <p>Status: {callState}</p>
        </Modal>
    )
}

export default VideoCalling