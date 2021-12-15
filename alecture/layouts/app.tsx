import React from "react"
import { Redirect, Switch, Route } from "react-router-dom";
import loadable from '@loadable/component';
const Login = loadable(() => import( '@pages/Login'));
const SignUp = loadable(() => import('@pages/SignUp'));

const App = () => {
    return (
        <Switch>
            <Redirect exact path = '/' to = "/login"/>
            <Route path="/login" children={Login} />
            <Route path="/signup" children={SignUp} />
        </Switch>
    )
}

export default App; 