import React, {useState} from "react"
import axios from "axios"

import Emoji from "../components/Emoji"
import styles from "../config/Styles"

const { FormSubtext, Text } = styles

const Form = () => {
    const [mail, setMail] = useState("")
    const [accept, setAccept] = useState(false) //Honeypot
    const [buttonText, setButtonText] = useState("Submit")
    const [error, setError] = useState(null)
    const [showText, setShowText] = useState(false)

    const handleForm = async (event) => {
        event.preventDefault()
        if(!accept){
            setButtonText("Loading...")
            setError(null)

            try {
                await axios.post(process.env.REACT_APP_URL + "/api/signup", {mail})

                setMail("")
                setButtonText("Done!")
            } catch (e) {
                if (e.response.status === 409) {
                    setError(<Text>You are already registered <Emoji symbol="😊" label="Happy Face"/>! If you need to contact us, please reach to <a href="mailto:hello@moose.exchange">hello@moose.exchange</a> and we will be delighted to help.</Text>)
                } else {
                    setError(<Text>So sorry! <Emoji symbol="😥️" label="Worried Face"/> There was an error, <a href="mailto:hello@moose.exchange">contact us</a> so we may help you.</Text>)
                }
                setButtonText("Submit")
            }
        } else {
            setMail("")
            setButtonText("Done!")
        }
    }

    return (
        <div style={{paddingTop: "30px"}}>
            <form onSubmit={handleForm} onFocus={() => setShowText(true)} onBlur={() => setShowText(false)}>
                <input
                    type="email"
                    value={mail}
                    name="Mail"
                    onChange={({ target }) => setMail(target.value)}
                    placeholder="Email address"
                />
                <input
                    type="checkbox"
                    value={accept}
                    name="Accept"
                    style={{display: "none"}}
                    onChange={({ target }) => setAccept(target.checked)}
                    placeholder="I accept the Terms of Service."
                />
                <button style={{marginLeft: "16px"}} type="submit">{buttonText}</button>
            </form>

            {error}

            <FormSubtext theme={showText ? {opacity: 100} : {opacity: 0}}>We will just use your email to keep you informed of the latest updates. No spam, we promise <Emoji symbol="❤️" label="Heart"/>.</FormSubtext>
        </div>
    )
}

export default Form