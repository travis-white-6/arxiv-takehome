import {parseString} from "xml2js";
import {ERROR_CODES, KEYWORD_SEARCH} from "../Globals"

/*
 * API doc here https://arxiv.org/help/api/user-manual
 */

const callArxivEndpoint = (url, setResults, errorCode, resultsToAddTo, offsetScroll, setOffsetScroll) => {
    // the function call to fetch data from arVix API source
    fetch(url, {
        method: 'GET',
    }).then(
        response => response.text()
    ).then(str => {
        // parse string from XML to JS lib
        parseString(str, (err, result) => {
            if (result && result.feed && result.feed.entry) {
                // if we are adding to one of the infinite scrolls, logic to add is append to end of list els set list
                if (!!resultsToAddTo) {
                    setResults([...resultsToAddTo, ...result.feed.entry])
                } else {
                    setResults(result.feed.entry)
                }
                // update offset for scrolls if needed
                if (setOffsetScroll) { setOffsetScroll(offsetScroll + 30) }
            }
        })
    }).catch(err => {
        setResults(errorCode)
    })
}

export function getArticleList(listOfArticles, setListOfArticles, filters, offsetScroll, setOffsetScroll) {
    if (!filters) {
        setListOfArticles([])
        return
    }

    let formatFilterString = ''
    let prefix = ''
    // based on filters change the query
    filters.forEach(ele => {
        formatFilterString += `${prefix}all:${encodeURIComponent(KEYWORD_SEARCH[ele])}`
        prefix = "+AND+"
    })

    let mostRecentOrdering = "&sortBy=submittedDate&sortOrder=descending"
    let offset = `&start=${offsetScroll}&max_results=30`

    // function to fetch via GET a list of the articles to show on the frontend
    callArxivEndpoint(
        `https://export.arxiv.org/api/query?search_query=${formatFilterString}${mostRecentOrdering}${offset}`,
        setListOfArticles,
        ERROR_CODES.ERROR_GETTING_ARTICLES,
        listOfArticles,
        offsetScroll,
        setOffsetScroll
    )
}

export function getArticlesGivenAuthor(setListOfArticles, author, listOfArticles, offsetScroll, setOffsetScroll) {
    if (!author) {
        setListOfArticles([])
        return
    }

    // one query for the artist name
    let authorQuery = `au:"${encodeURIComponent(author)}"`
    let mostRecentOrdering = "&sortBy=submittedDate&sortOrder=descending"
    let offset = `&start=${offsetScroll}&max_results=30`

    // function to fetch via GET a list of the articles given input of an author to show on the frontend
    callArxivEndpoint(
        `https://export.arxiv.org/api/query?search_query=${authorQuery}${mostRecentOrdering}${offset}`,
        setListOfArticles,
        ERROR_CODES.ERROR_GETTING_ARTICLES_GIVEN_AUTHOR,
        listOfArticles,
        offsetScroll,
        setOffsetScroll
    )
}

export function getOneArticleGivenId(setArticle, articleId) {
    if (!articleId) {
        setArticle([{}])
        return null
    }

    // function to fetch via GET a list of one article to show on the frontend
    callArxivEndpoint(
        `https://export.arxiv.org/api/query?id_list=${articleId}`,
        setArticle,
        ERROR_CODES.ERROR_GETTING_ARTICLE_BY_ID,
    )
}

export function getListOfAuthors(serAuthorList) {

    // ** could never figure out how to query the export.arxiv.org endpoint to get artists information

    // function to fetch via GET a list of the author list to show on the frontend
    callArxivEndpoint(
        `https://export.arxiv.org/api/query?authors=`,
        serAuthorList,
        ERROR_CODES.ERROR_GETTING_LIST_OF_AUTHORS,
    )
}




