import React from "react"

import Emoji from "../components/Emoji"
import Header from "./Header"
import VideoClient from "../video/VideoClient"

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
            {props.showVideo ? <VideoClient show={props.setShowVideo} username={props.username}/> : <Header {...props}/>}
        </div>
    )
}

export default Home