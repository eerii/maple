import React from "react"

import HangupIcon from "../icons/Hangup.js"

import styles from "../config/Styles"
const { RemoteVideo, LocalVideo, Modal, ModalVideo, VideoBox, VideoDeclineButton } = styles

const VideoFrame = ({ remoteVideo, localVideo, hangupButton, stopCall, remoteID, onVideoCall }) => {
    return (
        <Modal style={{display: (onVideoCall ? "" : "none")}}>
            <ModalVideo>
                <div>
                    <RemoteVideo ref={remoteVideo} autoPlay playsInline/>
                    <VideoBox>
                        <LocalVideo ref={localVideo} muted autoPlay playsInline/>
                    </VideoBox>
                </div>

                <VideoDeclineButton style={{position: "fixed", right: "30px", bottom: "45px"}} ref={hangupButton} onClick={() => { stopCall(remoteID) }}><HangupIcon width="32px" height="32px"/></VideoDeclineButton>
            </ModalVideo>
        </Modal>
    )
}

export default VideoFrame