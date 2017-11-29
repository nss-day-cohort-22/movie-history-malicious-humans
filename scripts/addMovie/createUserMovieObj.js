const userId = require("../authorization/authorization")

const createUserMovieObj = (movieId) => {
    return {
        user_id: userId.activeUser.uid,
        movie_id: movieId,
        watched: false,
        rating: 0
    }
}

module.exports = createUserMovieObj