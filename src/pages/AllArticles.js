import React, {useState, useEffect} from "react";
import "../App.css"

import {getArticleList} from "../api/arxivApi"
import OneArticleCard from "../components/OneArticleCard";
import FilterContainer from "../components/FilterContainer"
import {KEYWORD_SEARCH} from "../Globals";
import InfiniteScroll from 'react-infinite-scroll-component';

export default function AllArticles() {

    const [listOfArticles, setListOfArticles] = useState(null)
    const [filters, setFilters] = useState([Object.keys(KEYWORD_SEARCH)[0]])
    const [fetchNew, setFetchNew] = useState(false)

    const [offsetScroll, setOffsetScroll] = useState(0)

    useEffect(() => {
        if (listOfArticles == null || fetchNew) {
            setFetchNew(false)
            // only needed for initial load
            let thisList = listOfArticles? listOfArticles : []
            getArticleList(thisList, setListOfArticles, filters, offsetScroll, setOffsetScroll)
        }

    }, [listOfArticles, filters, fetchNew])

    const fetchMoreData = () => {
        setFetchNew(true)
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
        <div className="all-article-container app-padding">
            <FilterContainer
                setOffsetScroll={setOffsetScroll}
                setListOfArticles={setListOfArticles}
                filters={filters}
                setFilters={setFilters}
                setFetchNew={setFetchNew}/>
            {listOfArticlesFound()}
        </div>
    )
}

