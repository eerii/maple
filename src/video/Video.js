import React, {useEffect} from "react"

import { connectToSocket } from "./Socket"

import styles from "../config/Styles"
const { Background } = styles

const Video = () => {
    useEffect(() => {
        const token = localStorage.getItem("Token") //TODO: CHANGE TO MINI TOKEN
        if (token)
            connectToSocket(token)
    }, [])

    return (
        <Background>
            <h1 style={{paddingTop: "15vh"}}>Video</h1>
        </Background>
    )
}

export default Video