import {parseString} from "xml2js";
import {ERROR_CODES, KEYWORD_SEARCH} from "../Globals"

const callArxivEndpoint = (url, setResults, errorCode) => {
    fetch(url, {
        method: 'GET',
    }).then(
        response => response.text()
    ).then(str => {
        parseString(str, (err, result) => {
            if (result && result.feed && result.feed.entry) {
                console.log('entries found ', result.feed.entry)
                setResults(result.feed.entry)
            }
        })
    }).catch(err => {
        setResults(errorCode)
    })
}

export function getArticleList(setListOfArticles, filters) {
    if (!filters) {
        setListOfArticles([])
        return
    }

    let formatFilterString = ''
    let prefix = ''
    // console.log('filters', filters)
    filters.forEach(ele => {
        formatFilterString += `${prefix}all:${encodeURIComponent(KEYWORD_SEARCH[ele])}`
        prefix = "+AND+"
    })

    let mostRecentOrdering = "&sortBy=submittedDate&sortOrder=descending"
    let offset = "&start=0&max_results=30"

    console.log('formatFilterString', formatFilterString)

    // function to fetch via GET a list of the articles to show on the frontend
    callArxivEndpoint(
        `https://export.arxiv.org/api/query?search_query=${formatFilterString}${mostRecentOrdering}${offset}`,
        setListOfArticles,
        ERROR_CODES.ERROR_GETTING_ARTICLES,
    )
}

export function getArticlesGivenAuthor(setListOfArticles, author) {
    if (!author) {
        setListOfArticles([])
        return
    }
    let authorQuery = `au:${encodeURIComponent(author)}`
    let mostRecentOrdering = "&sortBy=submittedDate&sortOrder=descending"
    let offset = "&start=0&max_results=30"

    // function to fetch via GET a list of the articles to show on the frontend
    callArxivEndpoint(
        `https://export.arxiv.org/api/query?search_query=${authorQuery}${mostRecentOrdering}${offset}`,
        setListOfArticles,
        ERROR_CODES.ERROR_GETTING_ARTICLES_GIVEN_AUTHOR,
    )
}

export function getOneArticleGivenId(setArticle, articleId) {
    if (!articleId) {
        setArticle([{}])
        return
    }

    // function to fetch via GET a list of the articles to show on the frontend
    callArxivEndpoint(
        `https://export.arxiv.org/api/query?id_list=${articleId}`,
        setArticle,
        ERROR_CODES.ERROR_GETTING_ARTICLE_BY_ID,
    )
}

export function getListOfAuthors(serAuthorList) {

    // function to fetch via GET a list of the articles to show on the frontend
    callArxivEndpoint(
        `https://export.arxiv.org/api/query?id_list=`,
        serAuthorList,
        ERROR_CODES.ERROR_GETTING_LIST_OF_AUTHORS,
    )
}




