const $ = require("jquery")
const firebase = require("firebase")

const firebaseURL = "https://movie-nutshell.firebaseio.com/trackedMovies"

const moviesFactory = Object.create(null, {
    "cache": {
        value: null,
        writable: true
    },
    "all": {
        value: function () {
            return $.ajax({
                "url": `${firebaseURL}/.json`,
                "method": "GET"
            }).then(movies => {
                this.cache = Object.keys(movies)
                    .map(key => {
                        movies[key].id = key
                        return movies[key]
                    })

                return this.cache
            })
        }
    },
    "add": {
        value: function (movie) {
            return firebase.auth().currentUser.getToken(true)
                .then(idToken => {
                    return $.ajax({
                        "url": `${firebaseURL}/.json?auth=${idToken}`,
                        "method": "POST",
                        "data": JSON.stringify(movie)
                    })
                })
        }
    },
    "replace": {
        value: function (movie, id) {
            return firebase.auth().currentUser.getToken(true)
                .then(idToken => {
                    return $.ajax({
                        "url": `${firebaseURL}/${id}/.json`,
                        "method": "PUT",
                        "data": JSON.stringify(movie)
                    })
                })
        }
    }
})


module.exports = moviesFactory