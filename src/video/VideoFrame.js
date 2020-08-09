import React, {useEffect, useState} from "react"

import HangupIcon from "../icons/Hangup.js"
import TimeTokenBar from "./TimeToken"

import styles from "../config/Styles"
const { RemoteVideo, LocalVideo, Modal, ModalVideo, VideoBox, VideoDeclineButton, VideoOverlay: VideoOverlayStyle, VideoTag, VideoTagAlt, Tooltip, TooltipHover, TooltipContainer } = styles

const catUrl = "https://cataas.com/cat/gif"

//TODO: Ask if they like dogs or cats

const VideoOverlay = ({ showDisconnected, showCancel, stopCall, remoteID }) => {
    return (
        <VideoOverlayStyle style={{display: `${showDisconnected ? "block" : "none"}`}}>
            <div style={{top: "50%", left: "50%", margin: "0", transform: "translate(-50%, -50%)", position: "absolute"}}>
                <h2>Trying to reconnect...</h2>
                <p>The call has temporarily disconnected. It should come back in a second!</p>
                <p>Meanwhile, don't worry, we got you covered. Enjoy this cute cat :3</p>
                <img src={catUrl} alt={"Cute Cat Gif"} style={{borderRadius: "12px", maxHeight: "400px", width: "400px"}}/>
                {showCancel && <div>
                    <p>This is taking more than we planned. Do you want to cancel the call?</p>
                    <button onClick={() => { stopCall(remoteID.current) }}>Cancel Call</button>
                </div>}
            </div>
        </VideoOverlayStyle>
    )
}

const VideoFrame = ({ remoteVideo, localVideo, hangupButton, stopCall, remoteID, onVideoCall, showDisconnected, isMaster }) => {
    const [showCancel, setShowCancel] = useState(false)

    useEffect(() => {
        let disconnectedTimer
        if (showDisconnected) {
            setShowCancel(false)
            disconnectedTimer = setTimeout(() => setShowCancel(true), 10000)
        }
        return () => {
            clearTimeout(disconnectedTimer)
        }
    }, [showDisconnected])

    const [tokensSpent, setTokensSpent] = useState(0)
    const [tokenPercent, setTokenPercent] = useState(0)

    return (
        <Modal style={{display: (onVideoCall ? "" : "none")}}>
            <ModalVideo>
                <div>
                    <RemoteVideo ref={remoteVideo} autoPlay playsInline/>
                    <VideoBox>
                        <LocalVideo ref={localVideo} muted autoPlay playsInline/>
                    </VideoBox>
                    <VideoOverlay showDisconnected={showDisconnected} stopCall={stopCall} remoteID={remoteID} showCancel={showCancel}/>
                </div>

                <VideoDeclineButton style={{position: "fixed", right: "30px", bottom: "45px", zIndex: "900"}} ref={hangupButton} onClick={() => { stopCall(remoteID.current) }}><HangupIcon width="32px" height="32px"/></VideoDeclineButton>

                <TooltipContainer>
                    <TooltipHover>
                        {isMaster ?
                            <VideoTag>Obtaining Time Tokens</VideoTag> :
                            <VideoTagAlt>Spending Time Tokens</VideoTagAlt>}

                        <TimeTokenBar percent={tokenPercent} setTokenPercent={setTokenPercent} number={tokensSpent} setTokensSpent={setTokensSpent}/>
                    </TooltipHover>
                    <Tooltip left={isMaster ? "256" : "250"}>
                        {tokensSpent * 10 + tokenPercent / 10} minutes, {tokensSpent} tokens
                    </Tooltip>
                </TooltipContainer>
            </ModalVideo>
        </Modal>
    )
}

export default VideoFrame