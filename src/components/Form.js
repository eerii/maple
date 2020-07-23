import React, {useState} from "react"
import axios from "axios"

import Emoji from "./Emoji"
import styles from "./Styles"

const {Button, Input, FormSubtext} = styles

const Form = () => {
    const [mail, setMail] = useState("")
    const [res, setRes] = useState(null)

    const handleForm = async (event) => {
        event.preventDefault()

        axios
            .post("/api/signup", {mail})
            .then(res => {
                setRes(res.data)
                setMail("")
            })
            .catch(() => {
                setRes({success: false, message: "Something went wrong. Try again later"})
            })
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
                <Button type="submit">Submit</Button>
            </form>

            {res && res.message}

            <FormSubtext>We will use your email just to keep you informed of the latest updates. No spam, we promise <Emoji symbol="❤️" label="Heart"/></FormSubtext>.
        </div>
    )
}

export default Form