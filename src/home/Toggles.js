import React from "react"

import Emoji from "../components/Emoji"
import styles from "../config/Styles"

const { ToggleTheme } = styles
const themes = ["light", "moose", "dark"]

const Toggles = ({theme, setTheme, setLogin, loggedIn, setLogout, setShowVideo}) => {
    const themeToggler = () => {
        let i = themes.indexOf(theme) + 1
        i = i >= themes.length ? 0 : i
        setTheme(themes[i])
        localStorage.setItem("Theme", themes[i])
    }

    return (
        <div>
            <ToggleTheme
                onClick={themeToggler}>{ theme === 'light' ? <Emoji symbol="☀️️" label="Light Mode"/> : (theme === 'moose' ? <Emoji symbol="✨️️" label="Colorful Mode"/> : <Emoji symbol="🌙" label="Dark Mode"/>)}
            </ToggleTheme>
            <ToggleTheme
                onClick={() => { loggedIn ? setLogout(true) : setLogin(true) }}>
                {loggedIn ? <Emoji symbol="🔓" label="Log Out"/> : <Emoji symbol="🔒" label="Login"/>}
            </ToggleTheme>
            <ToggleTheme
                onClick={() => { loggedIn ? setShowVideo(true) : setLogin(true) }}>
                <Emoji symbol="🙋🏽‍♀️" label="Video"/>
            </ToggleTheme>
        </div>
    )
}

export default Toggles