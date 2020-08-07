import React, {useEffect, useState} from "react"
import times from "lodash.times"

import HangupIcon from "../icons/Hangup.js"

import styles from "../config/Styles"
const { RemoteVideo, LocalVideo, Modal, ModalVideo, VideoBox, VideoDeclineButton, VideoOverlay: VideoOverlayStyle, VideoTag, VideoTagAlt, TimeTokenBar: TimeTokenBarStyle, TimeToken, TimeTokenFill, Tooltip, TooltipHover, TooltipContainer } = styles

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

const TimeTokenBar = ({ percent, number }) => {
    return (
        <TimeTokenBarStyle>
            {times(number, i => <TimeToken key={i}> <TimeTokenFill key={i} percent={100}/> </TimeToken>)}
            <TimeToken key={"actual"}> <TimeTokenFill key={"actual"} percent={percent}/> </TimeToken>
        </TimeTokenBarStyle>
    )
}

const VideoFrame = ({ remoteVideo, localVideo, hangupButton, stopCall, remoteID, onVideoCall, showDisconnected, isMaster }) => {
    const [showCancel, setShowCancel] = useState(false)

    useEffect(() => {
        if (showDisconnected) {
            setShowCancel(false)
            setTimeout(() => setShowCancel(true), 10000)
        }
    }, [showDisconnected])

    const [tokensSpent, setTokensSpent] = useState(0)
    const [tokenPercent, setTokenPercent] = useState(0)
    const [timer, setTimer] = useState(null)

    useEffect(() => {
        if (!timer) {
            setTimer(setTimeout(() => {
                clearTimeout(timer)
                setTimer(null)
                if (tokenPercent >= 90) {
                    setTokenPercent(0)
                    setTokensSpent(tokensSpent + 1)
                } else {
                    setTokenPercent(tokenPercent + 10)
                }
            }, 60 * 1000)) //1 minute
        }
    }, [timer, tokenPercent, tokensSpent])

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

                        <TimeTokenBar percent={tokenPercent} number={tokensSpent}/>
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