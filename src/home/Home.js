import React from "react"
import Emoji from "../components/Emoji"
import Header from "./Header"
import styles from "../config/Styles"

const { Warning } = styles

const Banner = () => {

    return (
        <Warning style={{textAlign: "center"}}>
            <Emoji symbol="🐣" label="Hatching Chick"/> MOOSE is in early-stage development. Sign up below to beta test.
        </Warning>
    )
}

const Home = ({theme, setTheme, setLogin, loggedIn, setLogout}) => {

    return (
        <div>
            <Banner/>
            <Header theme={theme} setTheme={setTheme} setLogin={setLogin} loggedIn={loggedIn} setLogout={setLogout}/>
        </div>
    )
}

export default Home