import React, {useEffect, useState} from "react"

import HangupIcon from "../icons/Hangup.js"

import styles from "../config/Styles"
const { RemoteVideo, LocalVideo, Modal, ModalVideo, VideoBox, VideoDeclineButton, VideoOverlay } = styles

const catUrl = "https://cataas.com/cat/gif"

//TODO: Ask if they like dogs or cats

const VideoFrame = ({ remoteVideo, localVideo, hangupButton, stopCall, remoteID, onVideoCall, showDisconnected }) => {
    const [showCancel, setShowCancel] = useState(false)

    useEffect(() => {
        if (showDisconnected) {
            setShowCancel(false)
            setTimeout(() => setShowCancel(true), 10000)
        }
    }, [showDisconnected])

    return (
        <Modal style={{display: (onVideoCall ? "" : "none")}}>
            <ModalVideo>
                <div>
                    <RemoteVideo ref={remoteVideo} autoPlay playsInline/>
                    <VideoBox>
                        <LocalVideo ref={localVideo} muted autoPlay playsInline/>
                    </VideoBox>
                    <VideoOverlay style={{display: `${showDisconnected ? "block" : "none"}`}}>
                        <div style={{top: "50%", left: "50%", margin: "0", transform: "translate(-50%, -50%)", position: "absolute"}}>
                            <h2>Trying to reconnect...</h2>
                            <p>The call has temporarily disconnected. It should come back in a second!</p>
                            <p>Meanwhile, don't worry, we got you covered. Enjoy this cute cat :3</p>
                            <img src={catUrl} alt={"Cute Cat Gif"} style={{borderRadius: "12px"}}/>
                            {showCancel && <div>
                                <p>This is taking more than we planned. Do you want to cancel the call?</p>
                                <button onClick={() => { console.log("Stop"); stopCall(remoteID) }}>Cancel Call</button>
                            </div>}
                        </div>
                    </VideoOverlay>
                </div>

                <VideoDeclineButton style={{position: "fixed", right: "30px", bottom: "45px", zIndex: "900"}} ref={hangupButton} onClick={() => { stopCall(remoteID) }}><HangupIcon width="32px" height="32px"/></VideoDeclineButton>
            </ModalVideo>
        </Modal>
    )
}

export default VideoFrame