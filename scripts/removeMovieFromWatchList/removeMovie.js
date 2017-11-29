const userMoviesFactory = require("../addMovie/userMoviesFactory")
const $ = require("jquery")
const userId = require("../authorization/authorization")
const trackedMoviesFactory = require("../addMovie/trackedMoviesFactory")
const movieInUserMovies = require("./movieInUserMovies")

const removeMovieFromWatchList = (movieId) => {
    // console.log("hello")
    $(`#delete_${movieId}`).on("click", () => {
        // console.log("delete button clicked")
        userMoviesFactory.allWithFireBaseKey().then((movies) => {
            // const movieObj = movies.find((movie) => {
            //     return movie.movie_id == movieId
            // })
            // console.log(movieObj)
            for(let key in movies) {
                console.log(key)
                const user_id = userId.activeUser.uid
                const movie = movies[key]
                if (movie.user_id == user_id && movie.movie_id == movieId) {
                    console.log("object to be deleted:")
                    console.log(movie)
                    console.log(`object to be deleted key: ${key}`)
                    userMoviesFactory.remove(key)
                    // userMoviesFactory.remove(key).then(() => {
                    //     userMoviesFactory.allWithFireBaseKey().then(latestMovies => {
                    //         const movieInUserMoviesDb = movieInUserMovies(movieId)
                    //         if(movieInUserMoviesDb == null) {
                    //             for(let trackedMovieKey in latestMovies) {
                    //                 const trackedMovie = latestMovies[trackedMovieKey] 
                    //                 if(trackedMovie.id == movieId) {
                    //                     trackedMoviesFactory.remove(trackedMovieKey)
                    //                 }
        
                    //             }
                    //         }

                    //     })
                    // })
                    $(`#movie_${movieId}`).remove()

                }
            }
            // console.log(movies)
        })
    })
    // userMoviesFactory.all().then(userMovies => {
    //     console.log(userMovies)
    // })
}

module.exports = removeMovieFromWatchList