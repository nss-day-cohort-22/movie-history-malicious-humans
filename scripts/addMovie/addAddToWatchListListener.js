const $ = require("jquery")
const trackedMoviesFactory = require("./trackedMoviesFactory")
const userMoviesFactory = require("./userMoviesFactory")
const createUserMovieObj = require("./createUserMovieObj")

const addAddToWatchListListener = (cache) => {
    
    $(".addMovie").on("click", (e) => {
        const movieId = e.target.parentNode.id
        
        const movieObj = cache.find((movie) => {
            return movie.id == movieId
        })

        trackedMoviesFactory.all().then(movies => {
            const movieInDb = movies.find((movie) => {
                return movie.id == movieId
            })
    
            if(movieInDb) {
                // assign movieId to user in userMovie db in firebase
                userMoviesFactory.add(createUserMovieObj(movieId))
                console.log(`movie with id: ${movieId} is already in db`)
            } else {
                // add movie to trackedMovies
                trackedMoviesFactory.add(movieObj)
                console.log(`movie with id: ${movieId} has been added to the db`)
                // assign movieId to user in userMovie db in firebase
                userMoviesFactory.add(createUserMovieObj(movieId))
            }
        })
        
    })
}

module.exports = addAddToWatchListListener