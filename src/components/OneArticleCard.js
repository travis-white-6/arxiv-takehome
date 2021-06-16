import React from "react";
import "../App.css"
import {useHistory} from "react-router-dom";
import Authors from "./Authors"
import {getPrettyDate} from "../api/helpers"

export default function OneArticleCard({oneArticleItem}) {
    const history = useHistory()

    return (
        <div
            onClick={() => {
                let thisArticleId = oneArticleItem?.id?.length? oneArticleItem.id[0] : null
                if (thisArticleId) {
                    let urlList = thisArticleId.split('/')
                    history.push(`/article/?id=${urlList[urlList.length - 1]}`)
                } else {
                    alert("No Article ID was found, cannot show full details")
                }

            }}
            className="one-article-card box-hover-shadow">
            <h4>{oneArticleItem?.title?.length? oneArticleItem.title[0] : "No title Found"}</h4>
            <div className="article-row hide-overflow-text">
                <h5>
                    Published: {getPrettyDate(oneArticleItem)}&nbsp;|&nbsp;
                    <Authors authorList={oneArticleItem?.author?.length ? oneArticleItem?.author : []} />
                </h5>
            </div>
            <p className="hide-overflow-text">{oneArticleItem?.summary?.length? oneArticleItem.summary[0] : ""}</p>
        </div>
    )
}

