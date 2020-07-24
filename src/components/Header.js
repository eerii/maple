import React from "react"
import Form from "./Form"
import styles from "./Styles"
import Emoji from "./Emoji"

const {MOOSE, Subtitle, Text, HeaderStyle, ToggleTheme} = styles

const Header = ({theme, setTheme}) => {
    const themeToggler = () => { theme === 'light' ? setTheme('dark') : setTheme('light') }

    return (
        <HeaderStyle>
            <ToggleTheme onClick={themeToggler}>{ theme === 'light' ? <Emoji symbol="🌘" label="Dark Mode"/> : <Emoji symbol="☀️" label="Light Mode"/> }</ToggleTheme>

            <MOOSE>MOOSE</MOOSE>
            <Subtitle>Bank time,<br/>Exchange purpose.</Subtitle>

            <Text>MOOSE is an MIT award-winning mutually-beneficial skill exchange platform.</Text>
            <Text>We believe that when you share, it should always be fair.</Text>
            <Text>Sign up below to join MOOSE Beta.</Text>

            <Form/>
        </HeaderStyle>
    )
}

export default Header