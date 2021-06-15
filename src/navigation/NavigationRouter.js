import React from "react";
import {BrowserRouter, Route, Switch, Redirect,} from 'react-router-dom';

import AllArticles from "../pages/AllArticles";
import OneAuthor from "../pages/OneAuthor";
import OneArticle from "../pages/OneArticle"

export default function NavigationRouter() {

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/">
                    <AllArticles />
                </Route>
                <Route path="/author">
                    <OneAuthor />
                </Route>
                <Route path="/article">
                    <OneArticle />
                </Route>
            </Switch>
        </BrowserRouter>
    )
}




