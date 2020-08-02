import React, {useState} from "react"
import { Redirect } from "react-router-dom"

import Modal from "../components/Modal"

const VideoHub = ({ setShowVideo, username }) => {
    const [redirect, setRedirect] = useState(false)

    const handleEnter = () => {
        console.log("Entering... " + username)
        setRedirect(true)
    }

    return (
        <Modal setVisible={setShowVideo}>
            <h1>Video Room</h1>
            <button onClick={() => handleEnter()}>Enter</button>
            {redirect && <Redirect push to="/video/beta"/>}
        </Modal>
    )
}

export default VideoHub