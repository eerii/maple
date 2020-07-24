import React, {useState} from "react"
import { Route, Switch } from "react-router-dom"
import Home from "./components/Home"
import {ThemeProvider} from "styled-components"
import {darkTheme, lightTheme} from "./components/Styles"

export default function Routes() {
    const [theme, setTheme] = useState('dark')

    return (
        <Switch>
            <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
                <Route exact path="/">
                    <Home theme={theme} setTheme={setTheme}/>
                </Route>
            </ThemeProvider>
        </Switch>
    );
}