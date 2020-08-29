import React, {useEffect, useRef, useState} from "react"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect, useLocation
} from "react-router-dom"
import jwt from "jsonwebtoken"

import Home from "./home/Home"
import Toggles from "./home/Toggles"

import FAQ from "./info/FAQ"
import BottomBar from "./info/BottomBar"

import Login from "./users/Login"
import Register from "./users/Register"
import Profile from "./users/Profile"
import CompleteProfile from "./users/CompleteProfile"
import Verify from "./users/Verify"

import Discover from "./search/Discover"
//import SearchBar from "./search/SearchBar"

import EnterVideo from "./video/EnterVideo"
import VideoRoom from "./video/VideoRoom"

import { ThemeProvider } from "styled-components"
import GlobalStyle from "./config/GlobalStyles"
import styles, { mooseTheme, lightTheme, darkTheme } from "./config/Styles"
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
    const [userStatus, setUserStatus] = useState(null)
    const [ID, setID] = useState(null)

    const [showProfile, setShowProfile] = useState(false)

    //const [showSearch, setShowSearch] = useState(false)

    const location = useLocation()
    const allowedLocations = ["/", "/faq", "/verify/:"]

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
            localStorage.removeItem("DiscoverUsers")
            localStorage.removeItem("DiscoverNeed")
            localStorage.removeItem("LocalProfile")
            setLoggedIn(false)
            setLogout(false)
            setUsername(null)
            setID(null)
            setShowVideo(false)
            setUserStatus(null)
        }
    }, [logout])

    useEffect(() => {
        if (!loggedIn) {
            if (!allowedLocations.some((l) => {
                if (l.includes(":")) {
                    return location.pathname.startsWith(l.slice(0, -2))
                } else {
                    return location.pathname === (l)
                }
            }) && goHomeTimer.current === null)
                goHomeTimer.current = setTimeout(() => setGoHome(true), 500)
        } else {
            clearTimeout(goHomeTimer.current)
            goHomeTimer.current = null
        }
    }, [loggedIn, allowedLocations, location.pathname])

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

                <Toggles theme={theme} setTheme={setTheme} setLogin={setLogin} loggedIn={loggedIn} setShowProfile={setShowProfile} setShowVideo={setShowVideo} setGoHome={setGoHome} name={name} /*setShowSearch={setShowSearch}*//>
                {goHome && <Redirect push to="/"/>}

                {(login && !loggedIn) && <Login setLogin={setLogin} setLoggedIn={setLoggedIn} setUsername={setUsername} setName={setName} setUserStatus={setUserStatus} setRegister={setRegister}/>}
                {(register && !loggedIn) && <Register setRegister={setRegister} setLoggedIn={setLoggedIn} setUsername={setUsername} setName={setName} setUserStatus={setUserStatus} setLogin={setLogin}/>}

                {showProfile && <Profile username={username} name={name} setShowProfile={setShowProfile} setLogout={setLogout}/>}
                {loggedIn && userStatus === 1 && <CompleteProfile setUserStatus={setUserStatus}/>} {/*TODO: CHANGE, DISABLED NOW*/}

                {/*loggedIn && showSearch && <SearchBar setShowSearch={setShowSearch}/>*/}

                <Switch>
                    <Route exact path="/video/:room">
                        {loggedIn && <VideoRoom username={username} name={name} ID={ID} setID={setID} loggedIn={loggedIn}/>}
                        {!loggedIn && <Background/>}
                    </Route>
                    <Route exact path="/verify/:hash">
                        { (userStatus === 0 || userStatus === null) ?
                            <Verify loggedIn={loggedIn} userStatus={userStatus} setLogin={setLogin} setLoggedIn={setLoggedIn} setUsername={setUsername} setName={setName} setUserStatus={setUserStatus} setRegister={setRegister}/> :
                            <Redirect push to="/"/>}
                    </Route>
                    <Route exact path="/discover">
                        <Discover loggedIn={loggedIn}/>
                    </Route>
                    <Route exact path="/faq">
                        <FAQ/>
                    </Route>
                    <Route path="/">
                        <Home/>

                        {showVideo && <EnterVideo setShowVideo={setShowVideo} username={username}/>}
                    </Route>
                </Switch>
                <BottomBar/>
            </ThemeProvider>
        </Router>
    )
}