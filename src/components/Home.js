import React from "react"
import Emoji from "./Emoji"
import Header from "./Header"
import styles from "./Styles"

const {Warning} = styles

const Banner = () => {
    return (
        <Warning style={{textAlign: "center"}}>
            <Emoji symbol="🐣" label="Hatching Chick"/> MOOSE is in early-stage development. Sign up below to beta test.
        </Warning>
    )
}

const Home = ({theme, setTheme}) => {

    return (
        <div>
            <Banner/>
            <Header theme={theme} setTheme={setTheme}/>
        </div>
    )
}

export default Home