import React from "react";
import "../App.css"
import {useHistory} from "react-router-dom";

export default function OneArticleCard({oneArticleItem}) {
    const history = useHistory()

    const renderAuthors = () => {
        if (oneArticleItem?.author?.length) {
            let prefix = ""
            return (
                <>
                    {oneArticleItem.author.map((ele, ind) => {
                        let spacer = ind < oneArticleItem.author.length - 1? <>,&nbsp;</> : null
                        let authorName = ele?.name?.length? ele.name[0] : ""
                        return (
                            <>
                                <a href={`/author/?name=${encodeURIComponent(authorName)}`}>{prefix + authorName}</a>
                                {spacer}
                            </>
                        )
                    })}
                </>
            )
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
                <h5>Published: {getPrettyDate()} | {renderAuthors()}</h5>
            </div>
            <p className="hide-overflow-text">{oneArticleItem?.summary?.length? oneArticleItem.summary[0] : ""}</p>
        </div>
    )
}

