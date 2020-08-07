import React from "react"
import { useLocation } from "react-router-dom"

import Emoji from "../components/Emoji"
import styles from "../config/Styles"

const { ToggleTheme, ToggleDiv } = styles
const themes = ["light", "moose", "dark"]

const Toggles = ({theme, setTheme, setLogin, loggedIn, setShowVideo, setShowProfile, setGoHome, name}) => {
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
                {(location.pathname.startsWith("/video/")) ?
                    <p style={{margin: "0"}}>Home  <Emoji symbol="🏠️" label="Home"/></p> :
                    <p style={{margin: "0"}}>Video  <Emoji symbol="🧑🏽‍💻️" label="Video"/></p>}
            </ToggleTheme>

            <ToggleTheme
                onClick={() => { loggedIn ? setShowProfile(true) : setLogin(true) }}>
                {loggedIn ? <p style={{margin: "0"}}>{name}  <Emoji symbol="🙋🏽" label="Profile"/></p> : <p style={{margin: "0"}}>Log In  <Emoji symbol="🔒" label="Login"/></p>}
            </ToggleTheme>

            <ToggleTheme
                onClick={themeToggler}>
                { theme === 'light' ?
                    <Emoji symbol="☀️️" label="Light Mode"/> :
                    (theme === 'moose' ?
                        <Emoji symbol="✨️️" label="Colorful Mode"/> :
                        <Emoji symbol="🌙" label="Dark Mode"/>)}
            </ToggleTheme>
        </ToggleDiv>
    )
}

export default Toggles