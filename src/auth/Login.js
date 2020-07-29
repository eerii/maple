import React, {useState} from "react"
import styles from "../config/Styles"

const { LoginBackground } = styles

const Login = () => {
    const [user, setUser] = useState("")
    const [pass, setPass] = useState("")
    const [buttonText, setButtonText] = useState("Submit")

    const handleLogin = async (event) => {
        event.preventDefault()
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
        </LoginBackground>
    )
}

export default Login