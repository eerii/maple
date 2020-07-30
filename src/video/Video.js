import React, {useEffect, useRef, useState} from "react"

import { connectWebSocket } from "./Socket"
import { getWebcam } from "./GetWebcam"

import styles from "../config/Styles"
const { Background, LocalVideo, RemoteVideo } = styles

const Video = ({username}) => {
    const [tracks, setTracks] = useState([])

    const remoteVideoRef = useRef()
    const localVideoRef = useRef()
    const socket = useRef()
    const stream = useRef()

    useEffect(() => {
        (async () => {
            const token = localStorage.getItem("Token")
            if (token) {
                const isWebcam = await getWebcam(stream)
                if (isWebcam) {
                    localVideoRef.current.srcObject = stream.current
                    if (typeof socket !== "undefined")
                        connectWebSocket(socket, token, username, stream, tracks, setTracks, remoteVideoRef)
                }
            }
        })()
    }, [])

    return (
        <Background>
            <h1 style={{paddingTop: "15vh"}}>Video</h1>

            <div id="videoContainer">
                <RemoteVideo id="remoteVideo" ref={remoteVideoRef} autoPlay playsinline/>
                <LocalVideo id="localVideo" ref={localVideoRef} muted autoPlay playsinline/>
            </div>
        </Background>
    )
}

export default Video