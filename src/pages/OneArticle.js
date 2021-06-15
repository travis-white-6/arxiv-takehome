import React from "react";
import BackButton from "../components/BackButton";


export default function OneArticle() {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const articleId = urlParams.get('id')


    return (
        <div className="one-article-container app-padding">
            <BackButton />
            <h4>Viewing info for article ID: {articleId}</h4>
        </div>
    )
}


