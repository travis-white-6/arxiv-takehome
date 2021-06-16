import React from "react";
import "../App.css"
import {useHistory} from "react-router-dom";
import Authors from "./Authors"
import {getPrettyDate} from "../api/helpers"

export default function OneArticleCard({oneArticleItem}) {
    const history = useHistory()

    let thisArticleId = oneArticleItem?.id?.length? oneArticleItem.id[0] : ""
    let urlList = thisArticleId.split('/')

    return (
        <div className="one-article-card box-hover-shadow">
            <h4>
                <a href={`/article/?id=${urlList[urlList.length - 1]}`}>{oneArticleItem?.title?.length? oneArticleItem.title[0] : "No title Found"}</a>
            </h4>
            <div className="article-row hide-overflow-text">
                <h5 className="author-span">
                    Published: {getPrettyDate(oneArticleItem)}&nbsp;|&nbsp;
                    <Authors authorList={oneArticleItem?.author?.length ? oneArticleItem?.author : []} />
                </h5>
            </div>
            <p className="hide-overflow-text">{oneArticleItem?.summary?.length? oneArticleItem.summary[0] : ""}</p>
        </div>
    )
}

