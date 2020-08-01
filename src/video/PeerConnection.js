import React, {useEffect, useState} from "react"

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

const PC = ({ pc, createPC, setCreatePC, ID, sendSignal, remoteVideo, hangupButton, getMedia, setGetMedia, remoteSDP, stopCall }) => {
    //STATE
    const [receiverID, setReceiverID] = useState("")
    const [pcDone, setPcDone] = useState(false)


    //RTC PEER CONNECTION
    //---------
    //OUTGOING
    //CREATE PEER CONNECTION
    useEffect(() => {
        if (createPC) {
            try {
                pc.current = new RTCPeerConnection(TurnConfig)
                console.log("[PC]: Peer Connection Established")
                setReceiverID(createPC)
                setGetMedia(true)
                setPcDone(true)
            } catch (e) {
                console.log("[PC]: Peer Connection Error -> " + e.message)
            }
            setCreatePC(null)
        }
    }, [pc, createPC, setCreatePC, setGetMedia])
    //HANDLE ICE CANDIDATE
    useEffect(() => {
        // Handles |icecandidate| events by forwarding the specified
        // ICE candidate (created by our local ICE agent) to the other
        // peer through the signaling server.
        if (pc.current) {
            pc.current.onicecandidate = (event) => {
                if (event.candidate) {
                    console.log("[PC]: (ICE) Outgoing ICE Candidate -> " + event.candidate.candidate)
                    sendSignal({
                        type: "ice-candidate",
                        target: receiverID,
                        data: event.candidate
                    })
                }
            }
        }
    }, [pc, sendSignal, receiverID, pcDone])
    //HANDLE ICE CONNECTION STATE CHANGE
    useEffect(() => {
        // Handle |iceconnectionstatechange| events. This will detect
        // when the ICE connection is closed, failed, or disconnected.
        // This is called when the state of the ICE agent changes.
        if (pc.current) {
            pc.current.oniceconnectionstatechange = () => {
                console.log("[PC]: (ICE) Connection State Changed to " + pc.current.iceConnectionState)
                switch(pc.current.iceConnectionState) {
                    case "closed":
                    case "failed":
                    case "disconnected":
                        //stopCall(receiverID)
                        break
                    default:
                        break
                }
            }
        }
    }, [pc, pcDone, stopCall, receiverID])
    //HANDLE ICE GATHERING STATE CHANGE
    useEffect(() => {
        // Handle the |icegatheringstatechange| event. This lets us know what the
        // ICE engine is currently working on: "new" means no networking has happened
        // yet, "gathering" means the ICE engine is currently gathering candidates,
        // and "complete" means gathering is complete. Note that the engine can
        // alternate between "gathering" and "complete" repeatedly as needs and
        // circumstances change.
        // We don't need to do anything when this happens, but we log it to the
        // console so you can see what's going on when playing with the sample.
        if (pc.current) {
            pc.current.onicegatheringstatechange = () => {
                console.log("[PC]: (ICE) Gathering State Changed to " + pc.current.iceGatheringState)
            }
        }
    }, [pc, pcDone])
    //HANDLE SIGNALING STATE CHANGE
    useEffect(() => {
        // Set up a |signalingstatechange| event handler. This will detect when
        // the signaling connection is closed.
        // NOTE: This will actually move to the new RTCPeerConnectionState enum
        // returned in the property RTCPeerConnection.connectionState when
        // browsers catch up with the latest version of the specification!
        if (pc.current) {
            pc.current.onsignalingstatechange = () => {
                console.log("[PC]: (SIG) Signaling State Changed to " + pc.current.signalingState)
                switch(pc.current.signalingState) {
                    case "closed":
                        stopCall(receiverID)
                        break
                    default:
                        break
                }
            }
        }
    }, [pc, pcDone, stopCall, receiverID])
    //HANDLE NEGOTIATION NEEDED
    useEffect(() => {
        // Called by the WebRTC layer to let us know when it's time to
        // begin, resume, or restart ICE negotiation.
        if (pc.current) {
            pc.current.onnegotiationneeded = () => {
                (async () => {
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

                        console.log("[PC]: (OFFER) - Sending the Offer to the Remote Peer")
                        sendSignal({
                            sender: ID,
                            target: receiverID,
                            type: "video-offer",
                            data: pc.current.localDescription
                        })
                    } catch (e) {
                        console.log("[PC]: (OFFER) - Error During Negotiation")
                        console.log(e)
                    }
                })()
            }
        }
    }, [pc, sendSignal, ID, receiverID, pcDone])
    //HANDLE TRACK
    useEffect(() => {
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
        if (pc.current) {
            pc.current.ontrack = (event) => {
                console.log("[PC]: (TRACK) Received New Track")
                remoteVideo.current.srcObject = event.streams[0]
                hangupButton.current.disabled = false
            }
        }
    }, [pc, hangupButton, remoteVideo, pcDone])
    //---------
    //INCOMING
    //HANDLE VIDEO OFFER
    useEffect(() => {
        (async () => {
            if (remoteSDP && pcDone && pc.current) {
                console.log("[PC]: (ANSWER) Offer Received from " + receiverID)
                try {
                    const description = new RTCSessionDescription(remoteSDP)

                    if (pc.current.signalingState !== "stable") {
                        console.log("[PC]: (ANSWER) Signaling isn't Stable... Rolling back")
                        await pc.current.setLocalDescription({type: "rollback"})
                        await pc.current.setRemoteDescription(description)
                        return
                    } else {
                        console.log("[PC]: (ANSWER) Setting Remote Description")
                        await pc.current.setRemoteDescription(description)
                    }

                    if (!getMedia)
                        setGetMedia(true)

                    console.log("[PC]: (ANSWER) Creating and Sending Answer")
                    const answer = await pc.current.createAnswer()
                    await pc.current.setLocalDescription(answer)

                    sendSignal({
                        sender: ID,
                        target: receiverID,
                        type: "video-answer",
                        data: pc.current.localDescription
                    })

                    console.log("[PC]: (ANSWER) Answer Sent Successfully")
                } catch (e) {
                    console.log("[PC]: (ANSWER) Error During Answer")
                    console.log(e)
                }
            }
        })()
    }, [pc, remoteSDP, ID, receiverID, getMedia, setGetMedia, sendSignal, pcDone])
    //---------


    return (
        <div>
            Peer Connection
            <button ref={hangupButton} onClick={() => { stopCall(receiverID) }}>Hang Up</button>
        </div>
    )
}

export default PC