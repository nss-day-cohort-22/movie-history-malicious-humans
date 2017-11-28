// trackedMoviesDb: [trackedMovieObj, ..]

// trackedMovieObj: {
//   movieId: response.id,
//   name: response.title,
//   year_released: response.release_date,
//   movie_poster: response.poster_path,
//   top_five_actors major actors and 
//   tagline: response.tagline
// }

// userMovie: {
//   userId: user_id,
//   movieId: movie_id,
//   rating: 0,
//   watched: false
// }

// array of objects
// searchResultsCache: [{id: 1, ..}]

// add movie link clicked

// const apiInterface = require("../apiSearch/apiInterface.js")
const getMovieObj = require("./getMovieObj")
const trackMovie = require("./trackMovie")
const movieInDb = require("./movieInDb")
const addMovieToWatchList = require("./addMovieToWatchList")
const getMovieIdInTrackedDb = require("./getMovieIdInTrackedDb")
// const trackedMoviesFactory = require("./trackedMoviesFactory")

const addMovie = (event) => {
  
    // movieId is the movies id from themoviedb api
    const movieId = event.target.parentNode.id

    const movieObj = getMovieObj(movieId) 
    
    // if movie is in the tracked movies db
    if(movieInDb(movieId)) {
        const id = getMovieIdInTrackedDb(movieId)
        addMovieToWatchList(movieObj, id) // need to get the movies id in our db
    } else {
        // trackMovie adds new move obj to trackedMovies in firebase
        trackMovie(movieObj)
        const id = getMovieIdInTrackedDb(movieId)
        addMovieToWatchList(movieObj, id)
    }

}

module.exports = addMovie