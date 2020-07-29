import React, { useState } from "react"
import { Redirect } from "react-router-dom"
import styles from "../config/Styles"
import axios from "axios"
import config from "../config/config"

const { LoginBackground } = styles

const Login = () => {
    const [user, setUser] = useState("")
    const [pass, setPass] = useState("")
    const [buttonText, setButtonText] = useState("Submit")
    const [redirect, setRedirect] = useState(false)

    const handleLogin = async (event) => {
        event.preventDefault()

        setButtonText("Loading...")

        try {
            const login = await axios.post(
                config.apiGateway.URL + "/api/login", {
                    username: user,
                    pass: pass,
                })

            localStorage.setItem("UserCert", login.data.token)

            setUser("")
            setPass("")
            setButtonText("Done!")
            setRedirect(true)
        } catch (e) {
            setButtonText("Error")
        }
    }

    return (
        <LoginBackground>
            <h1 style={{paddingTop: "30vh"}}>Login</h1>

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
                <div><button type="submit">{buttonText}</button></div>
            </form>

            {redirect ? <Redirect exact to="/" /> : ""}
        </LoginBackground>
    )
}

export default Login