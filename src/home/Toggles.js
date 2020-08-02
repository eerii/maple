import React from "react"
import { useLocation } from "react-router-dom"

import Emoji from "../components/Emoji"
import styles from "../config/Styles"

const { ToggleTheme, ToggleDiv } = styles
const themes = ["light", "moose", "dark"]

const Toggles = ({theme, setTheme, setLogin, loggedIn, setLogout, setShowVideo, setGoHome}) => {
    const location = useLocation()

    const themeToggler = () => {
        let i = themes.indexOf(theme) + 1
        i = i >= themes.length ? 0 : i
        setTheme(themes[i])
        localStorage.setItem("Theme", themes[i])
    }

    return (
        <ToggleDiv>
            <ToggleTheme
                onClick={() => { loggedIn ?
                    ((location.pathname.startsWith("/video/")) ? setGoHome(true) : setShowVideo(true)) :
                    setLogin(true) }}>
                <Emoji symbol="🙋🏽‍♀️" label="Video"/>
            </ToggleTheme>

            <ToggleTheme
                onClick={() => { loggedIn ? setLogout(true) : setLogin(true) }}>
                {loggedIn ? <Emoji symbol="🔓" label="Log Out"/> : <Emoji symbol="🔒" label="Login"/>}
            </ToggleTheme>

            <ToggleTheme
                onClick={themeToggler}>{ theme === 'light' ? <Emoji symbol="☀️️" label="Light Mode"/> : (theme === 'moose' ? <Emoji symbol="✨️️" label="Colorful Mode"/> : <Emoji symbol="🌙" label="Dark Mode"/>)}
            </ToggleTheme>
        </ToggleDiv>
    )
}

export default Toggles