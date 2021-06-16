import React, {useEffect, useState} from "react";

import BackButton from "../components/BackButton"

import {getArticlesGivenAuthor} from "../api/arxivApi"
import OneArticleCard from "../components/OneArticleCard";

export default function OneAuthor() {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const thisAuthor = urlParams.get('name')

    const [listOfArticles, setListOfArticles] = useState(null)

    useEffect(() => {
        if (listOfArticles == null) {
            getArticlesGivenAuthor(setListOfArticles, thisAuthor)
        }
    }, [listOfArticles])

    const listOfArticlesFound = () => {
        if (listOfArticles && listOfArticles.length) {
            return (
                <div className="list-of-found-articles">
                    {listOfArticles.map((ele, ind) => {
                        return <OneArticleCard oneArticleItem={ele} key={`article_item_${ind}`}/>
                    })}
                </div>
            )
        }
    }

    return (
        <div className="one-author-container app-padding">
            <BackButton />
            <h4>Author: {thisAuthor}</h4>
            <h5>A list of articles from this author</h5>
            {listOfArticlesFound()}
        </div>
    )
}