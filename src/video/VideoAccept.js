import React from "react"

import PickupIcon from "../icons/Pickup.js"
import HangupIcon from "../icons/Hangup.js"

import Modal from "../components/Modal"
import styles from "../config/Styles"
const { VideoAcceptButton, VideoDeclineButton } = styles

const VideoAccept = ({ setContinueVideoAccept, caller="Awesome User" }) => { //TODO: Click outside cancel modal
    const stopCallClickOutside = () => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm("Are you sure you want to stop the call?"))
            setContinueVideoAccept(2)
    }

    return (
        <Modal setVisible={() => stopCallClickOutside()}>
            <h2>Incoming Video Call</h2>
            <h1>{caller}</h1>
            <div>
                <VideoDeclineButton onClick={() => setContinueVideoAccept(2)}><HangupIcon width="36px" height="36px"/></VideoDeclineButton>
                <VideoAcceptButton onClick={() => setContinueVideoAccept(1)}><PickupIcon width="36px" height="36px"/></VideoAcceptButton>
            </div>
        </Modal>
    )
}

export default VideoAccept