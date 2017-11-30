const userMoviesFactory = require("../addMovie/userMoviesFactory")
const $ = require("jquery")
const userId = require("../authorization/authorization")
const trackedMoviesFactory = require("../addMovie/trackedMoviesFactory")
const movieInUserMovies = require("./movieInUserMovies")

const removeMovieFromWatchList = (movieId) => {
    
    $(`#delete_${movieId}`).on("click", () => {

        userMoviesFactory.allWithFireBaseKey().then((movies) => {
        
            for(let key in movies) {
                console.log(key)
                const user_id = userId.activeUser.uid
                const movie = movies[key]
                if (movie.user_id == user_id && movie.movie_id == movieId) {
                    console.log("object to be deleted:")
                    console.log(movie)
                    console.log(`object to be deleted key: ${key}`)
                    userMoviesFactory.remove(key)
                    
                    $(`#movie_${movieId}`).hide("slow", function(){ $(`#movie_${movieId}`).remove() })

                }
            }
        })
    })
}

module.exports = removeMovieFromWatchList