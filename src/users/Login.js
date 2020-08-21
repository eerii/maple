import React, { useState } from "react"
import axios from "axios"
import jwt from "jsonwebtoken"

import Modal from "../components/Modal"
import styles from "../config/Styles"
const { LinkText } = styles

const Login = ({setLogin, setLoggedIn, setUsername, setName, setUserStatus, setRegister}) => {
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
                    process.env.REACT_APP_URL + "/api/login", {
                        username: user,
                        pass: pass,
                    })

                localStorage.setItem("Token", login.data.token)

                setUser("")
                setPass("")
                setButtonText("Done!")
                setLogin(false)
                setLoggedIn(true)
                setUsername(user.toLowerCase())

                const decoded = await jwt.verify(login.data.token, process.env.REACT_APP_SECRET)
                setName(decoded.name)
                setUserStatus(decoded.status)
            } catch (e) {
                setButtonText("Error")
            }
        } else {
            setUser("")
            setPass("")
            setButtonText("Done!")
            setLogin(false)
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
                <p>Only MOOSE beta users can register at this time.</p>
                <div>
                    <button style={{margin: "10px"}} type="submit">{buttonText}</button>
                    <LinkText onClick={() => {
                        setRegister(true)
                        setLogin(false)
                    }}>or Register</LinkText>
                </div>
            </form>
        </Modal>
    )
}

export default Login