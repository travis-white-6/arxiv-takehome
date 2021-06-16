import React from "react";
import "../App.css"

export default function Authors({authorList}) {

    if (authorList) {
        let prefix = ""
        return (
            <>
                {authorList.map((ele, ind) => {
                    let spacer = ind < authorList.length - 1? <>,&nbsp;</> : null
                    let authorName = ele?.name?.length? ele.name[0] : ""
                    return (
                        <span key={`author_${authorName}_${ind}`}>
                            <a href={`/author/?name=${encodeURIComponent(authorName)}`}>{prefix + authorName}</a>
                            {spacer}
                        </span>
                    )
                })}
            </>
        )
    }
    return <></>
}

