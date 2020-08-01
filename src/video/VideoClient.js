import React, {useCallback, useRef, useState} from "react"

import WS from "./WebSocket"

import styles from "../config/Styles"
const { Background, LocalVideo, RemoteVideo } = styles

const TurnConfig = {
    iceServers: [
        {
            urls: 'stun:stun.' + process.env.REACT_APP_TURN_IP + ':' + process.env.REACT_APP_TURN_PORT
        },
        {
            urls: 'turn:turn.' + process.env.REACT_APP_TURN_IP + ':' + process.env.REACT_APP_TURN_PORT,
            username: process.env.REACT_APP_TURN_USER,
            credential: process.env.REACT_APP_TURN_PASS
        }
    ]
}

const mediaConstraints = {
    audio: true,
    video: {
        aspectRatio: {
            ideal: 0.8
        }
    }
}

const VideoClient = ({ username }) => {
    const [ID, setID] = useState(null)
    const remoteID = useRef(null)

    const [isMedia, setIsMedia] = useState(false)

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
    const startCall = async (id) => {
        if (pc.current) {
            alert("You can't start a call now! There is another call open.")
            return
        }
        if (id === ID) {
            alert("I'm afraid I can't let you talk to yourself. That would be weird.")
            return
        }
        remoteID.current = id
        console.log("[CALLING]: Calling user " + remoteID.current)

        await createPeerConnection()

        const stream = await getMedia()
        if (stream)
            setIsMedia(await setTracks(stream))
    }
    //STOP
    const stopCall = useCallback( (id=null) => {
        console.log(`[END]: Closing Peer Connection${id ? ` with ${id}` : ""}`)

        if (id) {
            sendSignal ({
                sender: ID,
                target: id,
                type: "hang-up"
            })
        }

        if (pc.current) {
            pc.current.ontrack = null
            pc.current.onicecandidate = null
            pc.current.oniceconnectionstatechange = null
            pc.current.onicegatheringstatechange = null
            pc.current.onsignalingstatechange = null
            pc.current.onnegotiationneeded = null

            pc.current.getTracks().forEach(track => { track.stop() })
        }

        if (localVideo.current.srcObject) {
            localVideo.current.srcObject.getTracks().forEach(track => { track.stop() })
            localVideo.current.srcObject = null
        }

        if (remoteVideo.current.srcObject) {
            remoteVideo.current.srcObject.getTracks().forEach(track => { track.stop() })
            remoteVideo.current.srcObject = null
        }

        if (pc.current) {
            pc.current.close()
            pc.current = null
        }

        remoteID.current = null
        setIsMedia(false)

        hangupButton.current.disabled = true
    }, [ID])
    //---------


    //PEER CONNECTION HANDLERS
    //---------
    const handleICECandidateEvent = useCallback( (event) => {
        // Handles |icecandidate| events by forwarding the specified
        // ICE candidate (created by our local ICE agent) to the other
        // peer through the signaling server.
        if (event.candidate) {
            console.log("[PC]: (ICE) Outgoing ICE Candidate - " + event.candidate.candidate)
            sendSignal({
                type: "ice-candidate",
                target: remoteID.current,
                data: event.candidate
            })
        }
    }, [])
    const handleICEConnectionStateChangeEvent = useCallback( () => {
        // Handle |iceconnectionstatechange| events. This will detect
        // when the ICE connection is closed, failed, or disconnected.
        // This is called when the state of the ICE agent changes.
        console.log("[PC]: (ICE) Connection State Changed to " + pc.current.iceConnectionState)
        switch(pc.current.iceConnectionState) {
            case "closed":
            case "failed":
            case "disconnected":
                console.log("[PC]: (ICE) Stopping Call Because of ICE State")
                stopCall(remoteID.current)
                break
            default:
                break
        }
    }, [stopCall])
    const handleICEGatheringStateChangeEvent = () => {
        // Handle the |icegatheringstatechange| event. This lets us know what the
        // ICE engine is currently working on: "new" means no networking has happened
        // yet, "gathering" means the ICE engine is currently gathering candidates,
        // and "complete" means gathering is complete. Note that the engine can
        // alternate between "gathering" and "complete" repeatedly as needs and
        // circumstances change.
        // We don't need to do anything when this happens, but we log it to the
        // console so you can see what's going on when playing with the sample.
        console.log("[PC]: (ICE) Gathering State Changed to " + pc.current.iceGatheringState)
    }
    const handleSignalingStateChangeEvent = useCallback( () => {
        // Set up a |signalingstatechange| event handler. This will detect when
        // the signaling connection is closed.
        // NOTE: This will actually move to the new RTCPeerConnectionState enum
        // returned in the property RTCPeerConnection.connectionState when
        // browsers catch up with the latest version of the specification!
        if (pc.current.connectionState) {
            console.log("[PC]: (SIG) Signaling State Changed to " + pc.current.connectionState + " (New Browser, using Connection State)")
            if (pc.current.connectionState === "closed") {
                console.log("[PC]: (SIG) Stopping Call Because of Signaling State")
                stopCall(remoteID.current)
            }
        } else {
            console.log("[PC]: (SIG) Signaling State Changed to " + pc.current.signalingState)
            if (pc.current.signalingState === "closed") {
                console.log("[PC]: (SIG) Stopping Call Because of Signaling State")
                stopCall(remoteID.current)
            }
        }
    }, [stopCall])
    const handleNegotiationNeededEvent = useCallback( async () => {
        // Called by the WebRTC layer to let us know when it's time to
        // begin, resume, or restart ICE negotiation.
        console.log("[PC]: (OFFER) Negotiation Needed")
        try {
            console.log("[PC]: (OFFER) - Creating Offer")
            const offer = await pc.current.createOffer()

            // If the connection hasn't yet achieved the "stable" state,
            // return to the caller. Another negotiationneeded event
            // will be fired when the state stabilizes.
            if (pc.current.signalingState !== "stable") {
                console.log("[PC]: (OFFER) - The connection isn't stable yet, Postponing...")
                return
            }

            console.log("[PC]: (OFFER) - Setting Local Description to the Offer")
            await pc.current.setLocalDescription(offer)

            console.log("[PC]: (OFFER) - Sending the Offer to the Remote Peer " + remoteID.current)
            sendSignal({
                sender: ID,
                target: remoteID.current,
                type: "video-offer",
                data: pc.current.localDescription
            })
        } catch (e) {
            console.log("[PC]: (OFFER) - Error During Negotiation - " + e.message)
        }
    }, [ID])
    const handleTrackEvent = (event) => {
        // Called by the WebRTC layer when events occur on the media tracks
        // on our WebRTC call. This includes when streams are added to and
        // removed from the call.
        //
        // track events include the following fields:
        //
        // RTCRtpReceiver       receiver
        // MediaStreamTrack     track
        // MediaStream[]        streams
        // RTCRtpTransceiver    transceiver
        //
        // In our case, we're just taking the first stream found and attaching
        // it to the <video> element for incoming media.
        console.log("[PC]: (TRACK) Received New Track")
        remoteVideo.current.srcObject = event.streams[0]
        hangupButton.current.disabled = false
    }
    //---------


    //PEER CONNECTION
    //---------
    const createPeerConnection = useCallback( async () => {
        try {
            pc.current = new RTCPeerConnection(TurnConfig)
            console.log("[PC]: Peer Connection Established")

            pc.current.onicecandidate = handleICECandidateEvent
            pc.current.oniceconnectionstatechange = handleICEConnectionStateChangeEvent
            pc.current.onicegatheringstatechange = handleICEGatheringStateChangeEvent
            pc.current.onsignalingstatechange = handleSignalingStateChangeEvent
            pc.current.onnegotiationneeded = handleNegotiationNeededEvent
            pc.current.ontrack = handleTrackEvent
        } catch (e) {
            console.log("[PC]: Peer Connection Error -> " + e.message)
        }
    }, [
        handleICECandidateEvent,
        handleICEConnectionStateChangeEvent,
        handleSignalingStateChangeEvent,
        handleNegotiationNeededEvent
    ])
    //---------


    //USER MEDIA
    //---------
    const getMedia = useCallback (  async () => {
        try {
            console.log("[MEDIA]: Getting User's Media")
            const stream = await navigator.mediaDevices.getUserMedia(mediaConstraints);
            localVideo.current.srcObject = stream
            return stream
        } catch(e) {
            handleMediaError(e)
            return null
        }
    }, [])
    const setTracks = useCallback ( (stream) => {
        try {
            stream.getTracks().forEach(track => {
                pc.current.addTrack(track, stream)
                //pc.current.addTransceiver(track, {streams: [stream]}) TODO: TEST WHICH IS BETTER
                console.log(`[MEDIA]: Adding ${(track.kind === "video") ? "Video" : "Audio"} Track -> `, track)
            })
            console.log("[MEDIA]: User Media is Processed")
            return true
        } catch (e) {
            handleMediaError(e)
            return false
        }
    }, [])
    const handleMediaError = (e) => {
        switch(e.name) {
            case "NotFoundError":
                alert("Unable to open your call because no camera and/or microphone were found.")
                break
            case "SecurityError":
            case "PermissionDeniedError":
                console.log("[MEDIA]: Error getting media " + e.name)
                break
            default:
                console.log("[MEDIA]: Error opening your camera and/or microphone " + e.message)
                break
        }

        console.log("!!! Error with media triggers stop call")
        //stopCall()
    }
    //---------


    //MESSAGE HANDLERS
    //---------
    const handleVideoOfferMsg = useCallback( async (data) => {
        console.log("[PC]: (ANSWER) Received Offer from " + data.sender)
        console.log("[PC]: (ANSWER) Changed Remote ID from " + remoteID.current + " to " + data.sender) //TODO: REMOVE
        remoteID.current = data.sender

        if (!pc.current)
            await createPeerConnection()

        const description = new RTCSessionDescription(data.message)

        if (pc.current.signalingState !== "stable") {
            console.log("[PC]: (ANSWER) Signaling isn't Stable... Rolling back")
            await pc.current.setLocalDescription({type: "rollback"})
            await pc.current.setRemoteDescription(description)
            return
        } else {
            console.log("[PC]: (ANSWER) Setting Remote Description")
            await pc.current.setRemoteDescription(description)
        }

        if(!isMedia) {
            const stream = await getMedia()
            if (stream)
                setIsMedia(await setTracks(stream))
        }

        console.log("[PC]: (ANSWER) Creating and Sending Answer")
        const answer = await pc.current.createAnswer()
        await pc.current.setLocalDescription(answer)

        sendSignal({
            sender: ID,
            target: remoteID.current,
            type: "video-answer",
            data: pc.current.localDescription
        })

        console.log("[PC]: (ANSWER) Answer Sent Successfully")
    }, [ID, createPeerConnection, isMedia, getMedia, setTracks])
    const handleICECandidateMsg = async (data) => {
        try {
            const candidate = new RTCIceCandidate(data.message)
            console.log("[PC]: (ICE) Adding New Candidate - " + candidate.candidate)
            if(candidate.candidate)
                await pc.current.addIceCandidate(candidate)
        } catch (e) {
            console.log("[PC]: (ICE) Error Adding New Candidate - " + e.message)
        }
    }
    const handleVideoAnswerMsg = async (data) => {
        try {
            const answer = new RTCSessionDescription(data.message)
            console.log("[PC]: (ANSWER) Setting Remote Description for Answer")
            await pc.current.setRemoteDescription(answer)
        } catch (e) {
            console.log("[PC]: (ANSWER) Error Handling Answer")
            console.log(e)
        }
    }
    const handleHangUpMsg = useCallback( async (data) => {
        console.log("[END]: Received Hang Up from " + data.sender)
        await stopCall()
    }, [stopCall])
    //---------


    return (
        <Background>
            <h1 style={{paddingTop: "15vh"}}>Video Room</h1>

            <div>
                <RemoteVideo ref={remoteVideo} autoPlay playsinline/>
                <LocalVideo ref={localVideo} muted autoPlay playsinline/>
            </div>

            <button ref={hangupButton} onClick={() => { stopCall(remoteID) }}>Hang Up</button>
            <p>My ID: {ID} - Remote ID: {remoteID.current}</p>

            <WS ws={ws} ID={ID} setID={setID} username={username} startCall={startCall} sendSignal={sendSignal} handleVideoOfferMsg={handleVideoOfferMsg} handleICECandidateMsg={handleICECandidateMsg} handleVideoAnswerMsg={handleVideoAnswerMsg} handleHangUpMsg={handleHangUpMsg}/>
        </Background>
    )
}

export default VideoClient