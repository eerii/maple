import React, {useEffect, useRef, useState} from "react"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom"
import jwt from "jsonwebtoken"

import Home from "./home/Home"
import Toggles from "./home/Toggles"

import Login from "./users/Login"
import Register from "./users/Register"
import Profile from "./users/Profile"
import CompleteProfile from "./users/CompleteProfile"

import EnterVideo from "./video/EnterVideo"
import VideoRoom from "./video/VideoRoom"

import { ThemeProvider } from "styled-components"
import GlobalStyle from "./config/GlobalStyles"
import styles, { mooseTheme, lightTheme, darkTheme } from "./config/Styles"
import FAQ from "./info/FAQ";
const { Background } = styles

export default function App() {
    const [theme, setTheme] = useState(localStorage.getItem('Theme') || 'moose')

    const [login, setLogin] = useState(false)
    const [loggedIn, setLoggedIn] = useState(false)
    const [logout, setLogout] = useState(false)

    const [register, setRegister] = useState(false)

    const [goHome, setGoHome] = useState(false)
    const goHomeTimer = useRef(null)

    const [showVideo, setShowVideo] = useState(false)

    const [username, setUsername] = useState()
    const [name, setName] = useState("")
    const [tokens, setTokens] = useState(0)
    const [userStatus, setUserStatus] = useState(null)
    const [ID, setID] = useState(null)

    const [showProfile, setShowProfile] = useState(false)

    //VERIFY TOKEN
    useEffect(() => {
        (async () => {
            const token = localStorage.getItem("Token")

            if(token) {
                try {
                    const decoded = await jwt.verify(token, process.env.REACT_APP_SECRET)
                    setLoggedIn(true)
                    setUsername(decoded.username)
                    setName(decoded.name)
                    setTokens(decoded.tokens)
                    setUserStatus(decoded.status)
                } catch (e) {
                    console.log("Token Expired... Please log in again")
                    setLogout(true)
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
            setID(null)
            setShowVideo(false)
        }
    }, [logout])

    useEffect(() => {
        if (!loggedIn) {
            goHomeTimer.current = setTimeout(() => setGoHome(true), 500)
        } else {
            clearTimeout(goHomeTimer.current)
            goHomeTimer.current = null
        }
    }, [loggedIn])

    //CLEAN WHEN GOING HOME
    useEffect(() => {
        setID(null)
        setShowVideo(false)
        setGoHome(false)
    }, [goHome])

    return (
        <Router>
            <ThemeProvider theme={theme === 'light' ? lightTheme : (theme === 'moose' ? mooseTheme : darkTheme)}>
                <GlobalStyle/>
                <Toggles theme={theme} setTheme={setTheme} setLogin={setLogin} loggedIn={loggedIn} setShowProfile={setShowProfile} setShowVideo={setShowVideo} setGoHome={setGoHome} name={name}/>
                {goHome && <Redirect push to="/"/>}
                {loggedIn && userStatus === 1 && <CompleteProfile/>}
                <Switch>
                    <Route exact path="/video/:room">
                        {loggedIn && <VideoRoom username={username} name={name} ID={ID} setID={setID} loggedIn={loggedIn}/>}
                        {!loggedIn && <Background/>}
                    </Route>
                    <Route exact path="/faq">
                        <FAQ/>
                    </Route>
                    <Route path="/">
                        <Home setGoHome={setGoHome}/>
                        {(login && !loggedIn) && <Login setLogin={setLogin} setLoggedIn={setLoggedIn} setUsername={setUsername} setName={setName} setTokens={setTokens} setUserStatus={setUserStatus} setRegister={setRegister}/>}
                        {(register && !loggedIn) && <Register setRegister={setRegister} setLoggedIn={setLoggedIn} setUsername={setUsername} setName={setName} setTokens={setTokens} setUserStatus={setUserStatus} setLogin={setLogin}/>}

                        {showProfile && <Profile username={username} name={name} tokens={tokens} setShowProfile={setShowProfile} setLogout={setLogout}/>}

                        {showVideo && <EnterVideo setShowVideo={setShowVideo} username={username}/>}
                    </Route>
                </Switch>
            </ThemeProvider>
        </Router>
    )
}