import React from "react"
import { Route, Switch } from "react-router-dom"
import Header from "./components/Header"

export default function Routes() {
    return (
        <Switch>
            <Route exact path="/">
                <Header />
            </Route>
        </Switch>
    );
}