import React from "react"
import { useLocation } from "react-router-dom"

import Emoji from "../components/Emoji"
import styles from "../config/Styles"

const { ToggleTheme, ToggleDiv, ToggleText } = styles
const themes = ["light", "moose", "dark"]

const Toggles = ({theme, setTheme, setLogin, loggedIn, setShowVideo, setShowProfile, setGoHome, name }) => {
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
                onClick={() => { (location.pathname === "/") ?
                    (loggedIn ? setShowVideo(true) : setLogin(true)) :
                    setGoHome(true)}}>
                {(location.pathname === "/") ?
                    <ToggleText style={{margin: "0"}}>Video  <Emoji symbol="🧑🏽‍💻️" label="Video"/></ToggleText> :
                    <ToggleText style={{margin: "0"}}>Home  <Emoji symbol="🏠️" label="Home"/></ToggleText>}
            </ToggleTheme>

            <ToggleTheme
                onClick={() => { loggedIn ? setShowProfile(true) : setLogin(true) }}>
                {loggedIn ? <ToggleText style={{margin: "0"}}>{name}  <Emoji symbol="🙋🏽" label="Profile"/></ToggleText> : <ToggleText style={{margin: "0"}}>Log In  <Emoji symbol="🔒" label="Login"/></ToggleText>}
            </ToggleTheme>

            {/*loggedIn && <ToggleTheme
                onClick={() => { setShowSearch(true) }}>
                <ToggleText><Emoji symbol="🔍" label="Search"/></ToggleText>
            </ToggleTheme>*/}

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