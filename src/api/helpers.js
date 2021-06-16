
export const getPrettyDate = (oneArticleItem) => {
    if (oneArticleItem?.published?.length) {
        let pubDate = new Date(oneArticleItem.published[0])
        return pubDate.toDateString()
    }
    return "No date found"
}
