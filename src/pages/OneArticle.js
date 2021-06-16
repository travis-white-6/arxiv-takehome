import React, {useEffect, useState} from "react";
import BackButton from "../components/BackButton";
import Authors from "../components/Authors"

import {getOneArticleGivenId} from "../api/arxivApi"
import {getPrettyDate} from "../api/helpers";

export default function OneArticle() {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const articleId = urlParams.get('id')

    const [oneArticle, setOneArticle] = useState(null)

    useEffect(() => {
        getOneArticleGivenId(setOneArticle, articleId)
    }, [])

    // console.log('oneArticle', oneArticle)

    const articleDisplay = () => {
        if (oneArticle && oneArticle.length) {
            let title = oneArticle[0]?.title.length ? oneArticle[0]?.title[0] : ""
            let authors = oneArticle[0]?.author.length ? oneArticle[0]?.author : []
            let summary = oneArticle[0]?.summary.length ? oneArticle[0]?.summary : ""

            return (
                <>
                    <h2>{title}</h2>
                    <h3>Published on {getPrettyDate(oneArticle[0])}</h3>
                    <Authors authorList={authors}/>
                    <h4>Article Summary</h4>
                    <p>{summary}</p>
                </>
            )
        }
    }

    return (
        <div className="one-article-container app-padding">
            <BackButton />
            <h4>Viewing info for article ID: {articleId}</h4>
            <hr />
            {articleDisplay()}
        </div>
    )
}


