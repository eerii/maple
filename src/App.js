import React, {useEffect, useState} from "react"
import jwt from "jsonwebtoken"

import Home from "./home/Home"
import Login from "./auth/Login"

import { ThemeProvider } from "styled-components"
import GlobalStyle from "./config/GlobalStyles"
import { mooseTheme, lightTheme, darkTheme } from "./config/Styles"

export default function App() {
    const [theme, setTheme] = useState(localStorage.getItem('Theme') || 'moose')
    const [login, setLogin] = useState(false)
    const [loggedIn, setLoggedIn] = useState(false)
    const [logout, setLogout] = useState(false)
    const [showVideo, setShowVideo] = useState(false)

    useEffect(() => {
        (async () => {
            const token = localStorage.getItem("Token")

            if(token) {
                const decoded = await jwt.decode(token, {complete: true})
                const time = new Date().getTime()

                if(decoded.exp < time) {
                    localStorage.removeItem("Token")
                } else {
                    setLoggedIn(true)
                }
            }
        })()
    }, [])

    useEffect(() => {
        if(logout) {
            localStorage.removeItem("Token")
            setLoggedIn(false)
            setLogout(false)
        }
    }, [logout])

    return (
        <ThemeProvider theme={theme === 'light' ? lightTheme : (theme === 'moose' ? mooseTheme : darkTheme)}>
            <GlobalStyle/>
            <Home theme={theme} setTheme={setTheme} setLogin={setLogin} loggedIn={loggedIn} setLogout={setLogout} showVideo={showVideo} setShowVideo={setShowVideo}/>}
            {(login && !loggedIn) && <Login setLogin={setLogin} setLoggedIn={setLoggedIn}/>}
        </ThemeProvider>
    )
}