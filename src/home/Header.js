import React from "react"

import Form from "./Form"

import styles from "../config/Styles"

const { MOOSE, Subtitle, Text, Background } = styles

const Header = () => {
    return (
        <Background style={{minHeight: "98vh"}}>
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