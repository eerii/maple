import React, {useRef, useState} from "react"

import WS from "./WebSocket"
import PC from "./PeerConnection"
import GetMedia from "./GetMedia"

import styles from "../config/Styles"
const { Background, LocalVideo, RemoteVideo } = styles

const VideoClient = ({ username }) => {
    const [ID, setID] = useState(null)
    const [createPC, setCreatePC] = useState(null)
    const [remoteSDP, setRemoteSDP] = useState(null)
    const [getMedia, setGetMedia] = useState(false)

    const ws = useRef(null)
    const pc = useRef(null)

    const localVideo = useRef(null)
    const remoteVideo = useRef(null)
    const hangupButton = useRef(null)


    //SIGNALING
    //---------
    const sendSignal = (message) => {
        const data = {
            action: "sendMessage",
            ...message
        }
        ws.current.send(JSON.stringify(data))
    }
    //---------


    //CALLING
    //---------
    //START
    const startCall = (id) => {
        if (pc.current) {
            alert("You can't start a call now! There is another call open.")
            return
        }
        if (id === ID) {
            alert("I'm afraid I can't let you talk to yourself. That would be weird.")
            return
        }
        setCreatePC(id)
    }
    //STOP
    const stopCall = (id=null) => {
        console.log(`[END]: Closing Peer Connection${id ? ` with ${id}` : ""}`)

        if (id) {
            sendSignal ({
                sender: ID,
                target: id,
                type: "hang-up"
            })
        }

        if (pc) {
            pc.current.ontrack = null
            pc.current.onicecandidate = null
            pc.current.oniceconnectionstatechange = null
            pc.current.onicegatheringstatechange = null
            pc.current.onsignalingstatechange = null
            pc.current.onnegotiationneeded = null

            pc.current.getTransceivers().forEach(transceiver => { transceiver.stop() })
        }

        if (localVideo.current.srcObject) {
            localVideo.srcObject.getTracks().forEach(track => { track.stop() })
        }

        if (remoteVideo.current.srcObject) {
            remoteVideo.current.srcObject.getTracks().forEach(track => { track.stop() })
        }

        if (pc) {
            pc.current.close()
            pc.current = null
        }

        setGetMedia(false)
        setCreatePC(false)
        setRemoteSDP(false)

        hangupButton.current.disabled = true
    }
    //---------


    //MESSAGE HANDLERS
    //---------
    //HANDLE VIDEO OFFER
    const handleVideoOfferMsg = async (data) => {
        if (!pc.current) {
            setCreatePC(data.sender)
        }
        setRemoteSDP(data.message)
    }
    //HANDLE ICE CANDIDATE
    const handleICECandidateMsg = async (data) => {
        try {
            const candidate = new RTCIceCandidate(data.message)
            console.log("[PC]: (ICE) Adding New Candidate - " + JSON.stringify(candidate))
            if(candidate.candidate)
                await pc.current.addIceCandidate(candidate)
        } catch (e) {
            console.log("[PC]: (ICE) Error Adding New Candidate")
            console.log(e)
        }
    }
    //HANDLE VIDEO ANSWER
    const handleVideoAnswerMsg = async (data) => {
        try {
            const answer = new RTCSessionDescription(data.message)
            console.log("[PC]: (NEG) Setting Remote Description for Answer")
            await pc.current.setRemoteDescription(answer)
        } catch (e) {
            console.log("[PC]: (NEG) Error Handling Answer")
            console.log(e)
        }
    }
    //HANDLE HANG UP
    const handleHangUpMsg = (data) => {
        console.log("[END]: Received Hang Up from " + data.sender)
        stopCall()
    }
    //---------


    return (
        <Background>
            <h1 style={{paddingTop: "15vh"}}>Video Room</h1>

            <div id="camera-box">
                <RemoteVideo ref={remoteVideo} autoPlay playsinline/>
                <LocalVideo ref={localVideo} muted autoPlay playsinline/>
            </div>

            <WS ws={ws} ID={ID} setID={setID} username={username} startCall={startCall} sendSignal={sendSignal} handleVideoOfferMsg={handleVideoOfferMsg} handleICECandidateMsg={handleICECandidateMsg} handleVideoAnswerMsg={handleVideoAnswerMsg} handleHangUpMsg={handleHangUpMsg}/>

            <PC pc={pc} createPC={createPC} setCreatePC={setCreatePC} ID={ID} sendSignal={sendSignal} remoteVideo={remoteVideo} hangupButton={hangupButton} getMedia={getMedia} setGetMedia={setGetMedia} remoteSDP={remoteSDP} stopCall={stopCall}/>

            {getMedia && <GetMedia pc={pc} localVideo={localVideo} stopCall={stopCall}/>}
        </Background>
    )
}

export default VideoClient