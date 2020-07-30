import React, { useState } from "react"
import axios from "axios"

import config from "../config/config"
import Modal from "../components/Modal"

const Login = ({setLogin, setLoggedIn}) => {
    const [user, setUser] = useState("")
    const [pass, setPass] = useState("")
    const [accept, setAccept] = useState(false) //Honeypot
    const [buttonText, setButtonText] = useState("Login")

    const handleLogin = async (event) => {
        event.preventDefault()

        if(!accept) {
            setButtonText("Loading...")

            try {
                const login = await axios.post(
                    config.apiGateway.URL + "/api/login", {
                        username: user,
                        pass: pass,
                    })

                localStorage.setItem("Token", login.data.token)

                setUser("")
                setPass("")
                setButtonText("Done!")
                setLogin(false)
                setLoggedIn(true)
            } catch (e) {
                setButtonText("Error")
            }
        } else {
            setUser("")
            setPass("")
            setButtonText("Done!")
            setLogin(false)
            setLoggedIn(true)
        }
    }

    return (
        <Modal setVisible={setLogin}>
            <h1>Login</h1>

            <form onSubmit={handleLogin}>
                <div style={{paddingBottom: "20px"}}><input
                    type="text"
                    value={user}
                    name="Username"
                    onChange={({ target }) => setUser(target.value)}
                    placeholder="Username"
                /></div>
                <div style={{paddingBottom: "20px"}}><input
                    type="password"
                    value={pass}
                    name="Password"
                    onChange={({ target }) => setPass(target.value)}
                    placeholder="Password"
                /></div>
                <input
                    type="checkbox"
                    value={accept}
                    name="Accept"
                    style={{display: "none"}}
                    onChange={({ target }) => setAccept(target.checked)}
                    placeholder="I accept the Terms of Service."
                />
                <p>Registration is restricted at the moment.</p>
                <p>Join MOOSE beta to try this service.</p>
                <div>
                    {/*<button style={{margin: "10px"}} onClick={() => {}}>Register</button>*/}
                    <button style={{margin: "10px"}} type="submit">{buttonText}</button>
                </div>
            </form>
        </Modal>
    )
}

export default Login