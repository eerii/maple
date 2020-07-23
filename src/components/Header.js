import React from "react"
import Form from "./Form"
import Emoji from "./Emoji"
import styles from "./Styles"

const {MOOSE, H1, Text, Warning} = styles

const Banner = () => {
    return (
        <Warning>
            <Emoji symbol="🐣" label="Hatching Chick"/> MOOSE is in early development. Help us make it a reality by signing up today!
        </Warning>
    )
}

const Header = () => {
    return (
        <div style={{textAlign: "center"}}>
            <Banner/>

            <MOOSE>MOOSE</MOOSE>
            <H1>Bank time<br/>Exchange purpose</H1>

            <Text>MOOSE is an award-winning skill exchange platform.</Text>
            <Text>We envision a more human way of sharing, based around time banking.</Text>
            <Text>Join our beta programme to try it first.</Text>

            <Form/>
        </div>
    )
}

export default Header