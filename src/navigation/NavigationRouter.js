import React from "react";
import {BrowserRouter, Route, Switch, Redirect,} from 'react-router-dom';

import AllArticles from "../pages/AllArticles";


export default function NavigationRouter() {

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/">
                    <AllArticles />
                </Route>
            </Switch>
        </BrowserRouter>
    )
}




