import React, {useState} from "react"
import { Route, Switch } from "react-router-dom"

import Home from "./home/Home"
import Login from "./auth/Login"

import { ThemeProvider } from "styled-components"
import GlobalStyle from "./config/GlobalStyles"
import { mooseTheme, lightTheme, darkTheme } from "./config/Styles"

export default function App() {
    const [theme, setTheme] = useState('moose')

    return (
        <Switch>
            <ThemeProvider theme={theme === 'light' ? lightTheme : (theme === 'moose' ? mooseTheme : darkTheme)}>
                <GlobalStyle/>
                <Route exact path="/">
                    <Home theme={theme} setTheme={setTheme}/>
                </Route>
                <Route exact path="/login">
                    <Login/>
                </Route>
            </ThemeProvider>
        </Switch>
    )
}