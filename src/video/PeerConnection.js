import React, {useEffect} from "react"

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

const PC = ({ pc, createPC, setCreatePC, sendSignal, remoteVideo, hangupButton }) => {
    //RTC PEER CONNECTION
    //---------
    //CREATE PEER CONNECTION
    useEffect(() => {
        if (createPC) {
            try {
                pc.current = new RTCPeerConnection(TurnConfig)
                console.log("[PC]: Peer Connection Established")

                //HANDLE ICE CANDIDATE
                pc.onicecandidate = (event) => {
                    if (event.candidate) {
                        console.log("[PC]: (ICE) Outgoing ICE Candidate -> " + event.candidate.candidate)
                        sendSignal({
                            type: "ice-candidate",
                            target: createPC,
                            message: event.candidate
                        })
                    }
                }
                //HANDLE TRACK
                pc.ontrack = (event) => {
                    console.log("[PC]: (TRACK) Received New Track")
                    remoteVideo.current.srcObject = event.streams[0]
                    hangupButton.current.disabled = false
                }
            } catch (e) {
                console.log("[PC]: Peer Connection Error -> " + e.message)
            }
            setCreatePC(false)
        }
    }, [pc, createPC, setCreatePC, hangupButton, remoteVideo, sendSignal])
    //---------


    return (
        <div>
            Peer Connection
        </div>
    )
}

export default PC