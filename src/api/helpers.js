
export const getPrettyDate = (oneArticleItem) => {
    // used to print out data for human readability
    if (oneArticleItem?.published?.length) {
        let pubDate = new Date(oneArticleItem.published[0])
        return pubDate.toDateString()
    }
    return "No date found"
}
