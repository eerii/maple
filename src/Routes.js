import React, {useState} from "react"
import { Route, Switch } from "react-router-dom"
import Home from "./components/Home"
import {ThemeProvider} from "styled-components"
import {mooseTheme, lightTheme, darkTheme} from "./components/Styles"

export default function Routes() {
    const [theme, setTheme] = useState('moose')

    return (
        <Switch>
            <ThemeProvider theme={theme === 'light' ? lightTheme : (theme === 'moose' ? mooseTheme : darkTheme)}>
                <Route exact path="/">
                    <Home theme={theme} setTheme={setTheme}/>
                </Route>
            </ThemeProvider>
        </Switch>
    )
}