import React from "react"

import Form from "./Form"
import Toggles from "./Toggles"

import styles from "../config/Styles"

const { MOOSE, Subtitle, Text, Background} = styles

const Header = (props) => {
    return (
        <Background>
            <Toggles {...props}/>

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