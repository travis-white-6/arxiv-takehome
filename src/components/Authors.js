import React from "react";


export default function Authors({authorList}) {

    if (authorList) {
        let prefix = ""
        return (
            <>
                {authorList.map((ele, ind) => {
                    let spacer = ind < authorList.length - 1? <>,&nbsp;</> : null
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
    return <></>
}

