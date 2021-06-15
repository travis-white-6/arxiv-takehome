import {parseString} from "xml2js";
import {ERROR_CODES, KEYWORD_SEARCH} from "../Globals"

export function getArticleList(setListOfArticles, filters) {
    if (!filters) {
        setListOfArticles([])
        return
    }

    let formatFilterString = ''
    let prefix = ''
    console.log('filters', filters)
    filters.forEach(ele => {
        formatFilterString += `${prefix}all:${encodeURIComponent(KEYWORD_SEARCH[ele])}`
        prefix = "+AND+"
    })

    console.log('formatFilterString', formatFilterString)

    // function to fetch via GET a list of the articles to show on the frontend
    fetch(`http://export.arxiv.org/api/query?search_query=${formatFilterString}&start=0&max_results=10`, {
        method: 'GET',
    }).then(
        response => response.text()
    ).then(str => {
        parseString(str, (err, result) => {
            if (result && result.feed && result.feed.entry) {
                console.log('entries found ', result.feed.entry)
                setListOfArticles(result.feed.entry)
            }
        })
    }).catch(err => {
        setListOfArticles(ERROR_CODES.ERROR_GETTING_ARTICLES)
    })
}

