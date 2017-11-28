const apiInterface = require("../apiSearch/apiInterface.js")

const getMovieObj = (movieId) => {
    
    let movieObj = null

    apiInterface.cache.forEach(movie => {
        if(movie.id === movieId) {
            movieObj = movie
        }
    })

    return movieObj
}

module.exports = getMovieObj