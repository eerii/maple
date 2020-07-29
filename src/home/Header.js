import React from "react"
import Form from "./Form"
import styles from "../config/Styles"
import Emoji from "../components/Emoji"

const { MOOSE, Subtitle, Text, Background, ToggleTheme } = styles
const themes = ["light", "moose", "dark"]

const Header = ({theme, setTheme}) => {
    const themeToggler = () => {
        let i = themes.indexOf(theme) + 1
        i = i >= themes.length ? 0 : i
        setTheme(themes[i])
        localStorage.setItem("Theme", themes[i])
    }

    return (
        <Background>
            {<ToggleTheme
                onClick={themeToggler}>{ theme === 'light' ? <Emoji symbol="☀️️" label="Light Mode"/> : (theme === 'moose' ? <Emoji symbol="✨️️" label="Colorful Mode"/> : <Emoji symbol="🌙" label="Dark Mode"/>)}
            </ToggleTheme>}

            <MOOSE>MOOSE</MOOSE>
            <Subtitle>Bank time,<br/>Exchange purpose.</Subtitle>

            <Text>MOOSE is an MIT award-winning mutually-beneficial skill exchange platform.</Text>
            <Text>We believe that when you share, it should always be fair.</Text>
            <Text>Sign up below to join MOOSE Beta.</Text>

            <Form/>
        </Background>
    )
}

export default Header