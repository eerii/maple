import React, {useState, useRef} from "react"
import { Redirect } from "react-router-dom"

import Modal from "../components/Modal"

import {isFirefox, isChrome, isEdge, isSafari} from "../components/DetectBrowser"

const EnterVideo = ({ setShowVideo, username }) => {
    const [redirect, setRedirect] = useState(false)
    const [unsupported, setUnsupported] = useState(null)

    const enterButton = useRef(null)

    const useUnsupported = false

    const handleEnter = () => {
        if (useUnsupported) {
            if(isFirefox || isChrome || isEdge) {
                setRedirect(true)
            } else {
                enterButton.current.disabled = true
            }
        } else {
            setRedirect(true)
        }
    }

    if (isSafari && !unsupported) {
        setUnsupported(<div style={{textAlign: "left"}}>
            <p>We currently don't support Safari, we are really sorry.</p>
            <p>The problem lays with Safari's lack of support for some features of WebRTC, the standard we use for secure video calling.</p>
            <p>However, we would like to provide as many options as possible for you.</p>
            <p><b>· Use the latest version of Firefox, Chrome, or Edge.</b></p>
            <p><b>· Download the MOOSE native app for macOS (add link).</b></p>
            <p><b>· iOS or Android works too! You can use your phone.</b></p>
            <p>Again, we would really like to apologize for the inconvenience, we are looking forward to add Safari for macOS to our supported browsers list.</p></div>)
    } else if (!unsupported) {
        setUnsupported(<div style={{textAlign: "left"}}>
            <p>We currently don't support your browser, we are really sorry.</p>
            <p>The problem lays with its lack of support for some features of WebRTC, the standard we use for secure video calling.</p>
            <p>However, we would like to provide as many options as possible for you.</p>
            <p><b>· Use the latest version of Firefox, Chrome, or Edge.</b></p>
            <p><b>· iOS or Android works too! You can use your phone.</b></p>
        </div>)
    }

    return (
        <Modal setVisible={setShowVideo}>
            <h1>Video Room</h1>

            {unsupported && useUnsupported}

            <button onClick={() => handleEnter()} ref={enterButton}>Enter</button>

            {redirect && <Redirect push to="/video/beta"/>}
        </Modal>
    )
}

export default EnterVideo