import React, {useRef} from "react"

import WS from "./WebSocket"

import styles from "../config/Styles"
const { Background, LocalVideo, RemoteVideo } = styles

const VideoClient = ({ username }) => {
    const ws = useRef(null)

    const localVideo = useRef(null)
    const remoteVideo = useRef(null)

    return (
        <Background>
            <h1 style={{paddingTop: "15vh"}}>Video Room</h1>

            <div id="camera-box">
                <RemoteVideo ref={remoteVideo} autoPlay playsinline/>
                <LocalVideo ref={localVideo} muted autoPlay playsinline/>

                <button onClick={() => {}} disabled>Hang Up</button>
            </div>

            <WS ws={ws} username={username}/>
        </Background>
    )
}

export default VideoClient