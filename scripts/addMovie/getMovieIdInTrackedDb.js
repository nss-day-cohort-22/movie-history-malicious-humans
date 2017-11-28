const $ = require("jquery")
const firebase = require("firebase")

const getMovieIdInTrackedDb = () => {
    return $.ajax({
        "url": `${firebaseURL}/.json`,
        "method": "GET"
    }).then(articles => {
        this.cache = Object.keys(articles)
            .map(key => {
                articles[key].id = key
                return articles[key]
            })

        return this.cache
    })
}

module.exports = getMovieIdInTrackedDb