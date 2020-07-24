import React, {useState} from "react"
import axios from "axios"

import config from "../config"

import Emoji from "./Emoji"
import styles from "./Styles"

const {Button, Input, FormSubtext, Text} = styles

const Form = () => {
    const [mail, setMail] = useState("")
    const [buttonText, setButtonText] = useState("Submit")
    const [error, setError] = useState(null)

    const handleForm = async (event) => {
        event.preventDefault()

        axios
            .post(config.apiGateway.URL + "/api/signup", {mail})
            .then(res => {
                setMail("")
                setButtonText("Done!")
            })
            .catch(() => {
                setError(<Text>So sorry! <Emoji symbol="😥️" label="Worried Face"/> There was an error, <a style={{color: "lightyellow"}} href="mailto:moosehour@gmail.com">contact us</a> so we may help you.</Text>)
                setButtonText("Submit")
            })
        setButtonText("Loading...")
    }

    return (
        <div style={{paddingTop: "3vh"}}>
            <form onSubmit={handleForm}>
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

            <FormSubtext>We will use your email just to keep you informed of the latest updates. No spam, we promise <Emoji symbol="❤️" label="Heart"/></FormSubtext>.
        </div>
    )
}

export default Form