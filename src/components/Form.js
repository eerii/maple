import React, {useState} from "react"
import axios from "axios"

import config from "../config"

import Emoji from "./Emoji"
import styles from "./Styles"

const {Button, Input, FormSubtext, Text, Link} = styles

const Form = () => {
    const [mail, setMail] = useState("")
    const [buttonText, setButtonText] = useState("Submit")
    const [error, setError] = useState(null)
    const [showText, setShowText] = useState(false)

    const handleForm = async (event) => {
        event.preventDefault()

        axios
            .post(config.apiGateway.URL + "/api/signup", {mail})
            .then(res => {
                setMail("")
                setButtonText("Done!")
            })
            .catch(() => {
                setError(<Text>So sorry! <Emoji symbol="😥️" label="Worried Face"/> There was an error, <Link href="mailto:moosehour@gmail.com">contact us</Link> so we may help you.</Text>)
                setButtonText("Submit")
            })
        setButtonText("Loading...")
    }

    return (
        <div style={{paddingTop: "30px"}}>
            <form onSubmit={handleForm} onFocus={() => setShowText(true)} onBlur={() => setShowText(false)}>
                <Input
                    type="text"
                    value={mail}
                    name="Mail"
                    onChange={({ target }) => setMail(target.value)}
                    placeholder="Email address"
                />
                <Button type="submit">{buttonText}</Button>
            </form>

            {error}

            <FormSubtext theme={showText ? {opacity: 100} : {opacity: 0}}>We will just use your email to keep you informed of the latest updates. No spam, we promise <Emoji symbol="❤️" label="Heart"/>.</FormSubtext>
        </div>
    )
}

export default Form