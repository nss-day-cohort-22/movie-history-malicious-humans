const trackedMoviesFactory = require("../addMovie/trackedMoviesFactory")
const movieInUserMovies = (movieId) => {
    trackedMoviesFactory.all().then(trackedMovies => {
        return trackedMovies.find(movie => {
            return movie.id == movieId
        })
    })
}

module.exports = movieInUserMovies