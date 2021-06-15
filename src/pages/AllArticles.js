import React, {useState, useEffect} from "react";
import "../App.css"

import {getArticleList} from "../api/arxivApi"
import OneArticleCard from "../components/OneArticleCard";
import FilterContainer from "../components/FilterContainer"
import {KEYWORD_SEARCH} from "../Globals";

export default function AllArticles() {

    const [listOfArticles, setListOfArticles] = useState(null)
    const [filters, setFilters] = useState([Object.keys(KEYWORD_SEARCH)[0]])
    const [fetchNew, setFetchNew] = useState(false)

    useEffect(() => {
        if (listOfArticles == null || fetchNew) {
            setFetchNew(false)
            console.log('called func')
            getArticleList(setListOfArticles, filters)
        }

    }, [listOfArticles, filters, fetchNew])


    const listOfArticlesFound = () => {
        if (listOfArticles && listOfArticles.length) {
            return (
                <div className="list-of-found-articles border">
                    {listOfArticles.map((ele, ind) => {
                        return <OneArticleCard oneArticleItem={ele} key={`article_item_${ind}`}/>
                    })}
                </div>
            )
        }
    }

    return (
        <div className="all-article-container app-padding">
            <FilterContainer filters={filters} setFilters={setFilters} setFetchNew={setFetchNew}/>
            {listOfArticlesFound()}
        </div>
    )
}

