import React, {useEffect, useState} from "react";

import BackButton from "../components/BackButton"
import {getArticlesGivenAuthor} from "../api/arxivApi"
import OneArticleCard from "../components/OneArticleCard";
import InfiniteScroll from "react-infinite-scroll-component";

export default function OneAuthor() {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const thisAuthor = urlParams.get('name') ?? ""

    const [listOfArticles, setListOfArticles] = useState(null)
    const [offsetScroll, setOffsetScroll] = useState(0)

    useEffect(() => {
        if (listOfArticles == null) {
            // only needed for initial load
            let thisList = listOfArticles? listOfArticles : []
            getArticlesGivenAuthor(setListOfArticles, thisAuthor, thisList, offsetScroll, setOffsetScroll)
        }
    }, [listOfArticles])

    const fetchMoreData = () => {
        getArticlesGivenAuthor(setListOfArticles, thisAuthor, listOfArticles, offsetScroll, setOffsetScroll)
    }


    const listOfArticlesFound = () => {
        if (listOfArticles && listOfArticles.length) {
            return (
                <div className="list-of-found-articles">
                    <InfiniteScroll
                        height={'70vh'}
                        dataLength={listOfArticles.length} //This is important field to render the next data
                        next={fetchMoreData}
                        hasMore={true}
                        endMessage={
                            <p style={{ textAlign: 'center' }}>
                                <b>No more articles to show</b>
                            </p>
                        }>
                        {listOfArticles.map((ele, ind) => {
                            return <OneArticleCard oneArticleItem={ele} key={`article_item_${ind}`}/>
                        })}
                    </InfiniteScroll>
                </div>
            )
        }
    }

    return (
        <div className="one-author-container app-padding">
            <BackButton />
            <h4>Author: {thisAuthor}</h4>
            <h5>A list of articles found that include {thisAuthor} as an author</h5>
            {listOfArticlesFound()}
        </div>
    )
}