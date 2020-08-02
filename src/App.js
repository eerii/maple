import React, {useEffect, useState} from "react"
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom"
import jwt from "jsonwebtoken"

import Home from "./home/Home"
import Login from "./auth/Login"
import VideoHub from "./video/VideoHub"

import { ThemeProvider } from "styled-components"
import GlobalStyle from "./config/GlobalStyles"
import { mooseTheme, lightTheme, darkTheme } from "./config/Styles"

export default function App() {
    const [theme, setTheme] = useState(localStorage.getItem('Theme') || 'moose')

    const [login, setLogin] = useState(false)
    const [loggedIn, setLoggedIn] = useState(false)
    const [logout, setLogout] = useState(false)
    const [username, setUsername] = useState()

    const [showVideo, setShowVideo] = useState(false)

    //VERIFY TOKEN
    useEffect(() => {
        (async () => {
            const token = localStorage.getItem("Token")

            if(token) {
                const decoded = await jwt.verify(token, process.env.REACT_APP_SECRET)
                const time = new Date().getTime() / 1000

                if(decoded.exp < time) {
                    setLogout(true)
                } else {
                    setLoggedIn(true)
                    setUsername(decoded.username)
                }
            }
        })()
    }, [])

    //LOGOUT
    useEffect(() => {
        if(logout) {
            localStorage.removeItem("Token")
            setLoggedIn(false)
            setLogout(false)
            setUsername(null)
        }
    }, [logout])

    return (
        <Router>
            <ThemeProvider theme={theme === 'light' ? lightTheme : (theme === 'moose' ? mooseTheme : darkTheme)}>
                <GlobalStyle/>
                <Switch>
                    <Route path="/video/:room">
                        <VideoHub/>
                    </Route>
                    <Route path="/">
                        <Home theme={theme} setTheme={setTheme} setLogin={setLogin} loggedIn={loggedIn} setLogout={setLogout} setShowVideo={setShowVideo}/>
                        {(login && !loggedIn) && <Login setLogin={setLogin} setLoggedIn={setLoggedIn} setUsername={setUsername}/>}
                        {showVideo && (loggedIn ? <VideoHub setShowVideo={setShowVideo} username={username}/> : (setShowVideo(false) && setLogin(true)))}
                    </Route>
                </Switch>
            </ThemeProvider>
        </Router>
    )
}