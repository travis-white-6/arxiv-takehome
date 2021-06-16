import React from "react";
import "../App.css"
import {KEYWORD_SEARCH} from "../Globals"

import Button from '@material-ui/core/Button';

export default function FilterContainer({setFilters, filters, setFetchNew, setListOfArticles, setOffsetScroll}) {

    return (
        <div>
            <p>Pick from selected filters to see up to date articles</p>
            <div className="article-filter-button-container">
                {Object.keys(KEYWORD_SEARCH).map((ele, ind) => {
                    return (
                        <Button
                            key={`filter_button_${ind}`}
                            onClick={() => {
                                setOffsetScroll(0)
                                setListOfArticles([])
                                let tempFilters = [...filters]
                                if (tempFilters.includes(ele)) {
                                    tempFilters.splice(tempFilters.indexOf(ele), 1)
                                } else {
                                    tempFilters.push(ele)
                                }
                                setFilters(tempFilters)
                                setFetchNew(true)
                            }}
                            style={{marginRight: '1rem'}}
                            color="primary"
                            variant={filters.includes(ele) ? "contained" : "text"}>
                            {KEYWORD_SEARCH[ele]}
                        </Button>
                    )
                })}
            </div>
        </div>
    )
}


