import React from "react";
import {BrowserRouter, Route, Switch, Redirect,} from 'react-router-dom';

import AllArticles from "../pages/AllArticles";
import OneAuthor from "../pages/OneAuthor";
import OneArticle from "../pages/OneArticle"
import AllAuthors from "../pages/AllAuthors"
import Header from "../components/Header";

export default function NavigationRouter() {

    return (
        <BrowserRouter>
            <Header />
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
                <Route path="/author_list">
                    <AllAuthors />
                </Route>
            </Switch>
        </BrowserRouter>
    )
}




