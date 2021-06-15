import React from "react";
import "../App.css"

export default function OneArticleCard({oneArticleItem}) {

    const renderAuthors = () => {
        if (oneArticleItem?.author?.length) {
            let authors = ""
            let prefix = ""
            oneArticleItem.author.map((ele) => {
                authors += prefix + ele?.name?.length? ele.name[0] : ""
                prefix = ", "
            })
            return authors
        }
        return ""
    }

    const getPrettyDate = () => {
        if (oneArticleItem?.published?.length) {
            let pubDate = new Date(oneArticleItem.published[0])
            return pubDate.toDateString()
        }
        return "No date found"
    }


    return (
        <div className="one-article-card box-hover-shadow">
            <h4>{oneArticleItem?.title?.length? oneArticleItem.title[0] : "No title Found"}</h4>
            <div className="article-row hide-overflow-text">
                <h5>Published: {getPrettyDate()} | {renderAuthors()}</h5>
            </div>
            <p className="hide-overflow-text">{oneArticleItem?.summary?.length? oneArticleItem.summary[0] : ""}</p>
        </div>
    )
}

