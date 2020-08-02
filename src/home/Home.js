import React from "react"

import Emoji from "../components/Emoji"
import Header from "./Header"

import styles from "../config/Styles"
import Toggles from "./Toggles";
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
            <Toggles {...props}/>
            <Header {...props}/>
        </div>
    )
}

export default Home