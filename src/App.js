import React, {useEffect, useState} from "react"
import {
    BrowserRouter as Router,
    Switch,
    Route, Redirect
} from "react-router-dom"
import jwt from "jsonwebtoken"

import Home from "./home/Home"
import Login from "./auth/Login"
import VideoHub from "./video/VideoHub"
import VideoRoom from "./video/VideoRoom"
import Toggles from "./home/Toggles"

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
    const [goHome, setGoHome] = useState(false)

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

    //CLEAN WHEN GOING HOME
    useEffect(() => {
        setShowVideo(false)
        setGoHome(false)
    }, [goHome])

    return (
        <Router>
            <ThemeProvider theme={theme === 'light' ? lightTheme : (theme === 'moose' ? mooseTheme : darkTheme)}>
                <GlobalStyle/>
                <Toggles theme={theme} setTheme={setTheme} setLogin={setLogin} loggedIn={loggedIn} setLogout={setLogout} setShowVideo={setShowVideo} setGoHome={setGoHome}/>
                {goHome && <Redirect push to="/"/>}
                <Switch>
                    <Route exact path="/video/:room">
                        <VideoRoom username={username}/>
                    </Route>
                    <Route path="/">
                        <Home setGoHome={setGoHome}/>
                        {(login && !loggedIn) && <Login setLogin={setLogin} setLoggedIn={setLoggedIn} setUsername={setUsername}/>}
                        {showVideo && <VideoHub setShowVideo={setShowVideo} username={username}/>}
                    </Route>
                </Switch>
            </ThemeProvider>
        </Router>
    )
}