import React, {useEffect, useState} from "react"
import {useParams} from "react-router-dom"
import axios from "axios"

import styles from "../config/Styles"
import Login from "./Login";
const { Background } = styles

const Verify = ({ loggedIn, setUserStatus, setLogin, setLoggedIn, setUsername, setName, setRegister }) => {
    const { hash } = useParams()
    const [error, setError] = useState(null)

    useEffect(() => {
        (async () => {
            if (loggedIn) {
                try {
                    const token = localStorage.getItem("Token")

                    const headers = {
                        'Authorization': `Bearer ${token}`
                    }

                    const post = await axios.post(
                        process.env.REACT_APP_URL + "/api/verifyUser",
                        { hash },
                        { headers: headers })

                    localStorage.setItem("Token", post.data.token)

                    setUserStatus(1)
                } catch (e) {
                    console.log("ERROR: " + e.response.data.error)
                    setError(e.response.data.error)
                }
            }
        })()
    }, [loggedIn, setUserStatus, hash])

    return (
        <div>
            <Background style={{padding: "15vh 48px", display: "flex", justifyContent: "center", height: "90vh"}}>
                {loggedIn ?
                    <div>
                        <h1>Verifying User...</h1>
                        <h4>{error}</h4>
                        {error !== null && <p>Please make sure you are using the correct URL and contact us at <a href="mailto:hello@moose.exchange">hello@moose.exchange</a></p>}
                    </div> :
                    <Login setLogin={setLogin} setLoggedIn={setLoggedIn} setUsername={setUsername} setName={setName} setUserStatus={setUserStatus} setRegister={setRegister}/>}
            </Background>
        </div>
    )
}

export default Verify