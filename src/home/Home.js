import React from "react"

import Emoji from "../components/Emoji"
import Header from "./Header"
import Video from "../video/Video"
//import WebSocket from "../video/WebSocket"

import styles from "../config/Styles"
const { Warning } = styles

const Banner = () => {

    return (
        <Warning style={{textAlign: "center"}}>
            <Emoji symbol="🐣" label="Hatching Chick"/> MOOSE is in early-stage development. Sign up below to beta test.
        </Warning>
    )
}

const Home = (props) => {

    return (
        <div>
            <Banner/>
            {props.showVideo ? <Video show={props.setShowVideo}/> : <Header {...props}/>}
        </div>
    )
}

export default Home