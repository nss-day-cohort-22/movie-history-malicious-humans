// const $ = require("jquery")
// const firebase = require("firebase")
const trackedMoviesFactory = require("./trackedMoviesFactory")

// returns boolean value
// const firebaseURL = "https://movie-nutshell.firebaseio.com/trackedMovies"

const movieInDb = (movieId) => {
    
    let inDb = false

    trackedMoviesFactory.all().then(movies => {
        movies.forEach(movie => {
            if(movie.id === movieId) {
                inDb = true
            }
        })
        return inDb
    })
    
    // let moviesArray

    // return $.ajax({
    //     "url": `${firebaseURL}/.json`,
    //     "method": "GET"
    // }).then(movies => {
    //     this.moviesArray = Object.keys(movies)
    //         .map(key => {
    //             movies[key].id = key
    //             return movies[key]
    //         })

    //     return this.moviesArray
    // })

    // moviesArray.forEach(movie => {
    //     if(movie.id === movieId) {
    //         inDb = true
    //     }
    // })        
    // return inDb

    // $.ajax({
    //     "url": `${firebaseURL}/.json`,
    //     "method": "GET"
    // }).then(movies => {
    //     movies.forEach(movie => {
    //         if(movie.id === movieId) {
    //             inDb = true
    //         }
    //     })        
    //     return inDb
    // })
    
}

module.exports = movieInDb