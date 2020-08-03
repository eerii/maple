import React from "react"

import PickupIcon from "../icons/Pickup.js"
import HangupIcon from "../icons/Hangup.js"

import Modal from "../components/Modal"
import styles from "../config/Styles"
const { VideoAcceptButton, VideoDeclineButton } = styles

const VideoAccept = ({ setShowVideoAccept, caller="User" }) => {
    return (
        <Modal setVisible={setShowVideoAccept}>
            <h2>Incoming Video Call</h2>
            <h1>{caller}</h1>
            <div>
                <VideoDeclineButton onClick={() => {}}><HangupIcon width="36px" height="36px"/></VideoDeclineButton>
                <VideoAcceptButton onClick={() => {}}><PickupIcon width="36px" height="36px"/></VideoAcceptButton>
            </div>
        </Modal>
    )
}

export default VideoAccept