const $ = require("jquery")
const firebase = require("firebase")

const firebaseURL = "https://movie-nutshell.firebaseio.com/userMovie"

const userMoviesFactory = Object.create(null, {
    "cache": {
        value: null,
        writable: true
    },
    // haven't tested "all"
    "all": {
        value: function () {
            return $.ajax({
                "url": `${firebaseURL}/.json`,
                "method": "GET"
            }).then(userMovies => {
                
                const array = $.map(userMovies, function(value, index) {
                    return [value]
                })
                this.cache = array

                return this.cache
            })
        }
    },
    "add": {
        value: function (userMovieObj) {
            return firebase.auth().currentUser.getToken(true)
                .then(idToken => {
                    return $.ajax({
                        "url": `${firebaseURL}/.json?auth=${idToken}`,
                        "method": "POST",
                        "data": JSON.stringify(userMovieObj)
                    })
                })
        }
    },
    // "replace": {
    //     value: function (movie, id) {
    //         return firebase.auth().currentUser.getToken(true)
    //             .then(idToken => {
    //                 return $.ajax({
    //                     "url": `${firebaseURL}/${id}/.json`,
    //                     "method": "PUT",
    //                     "data": JSON.stringify(movie)
    //                 })
    //             })
    //     }
    // }
})


module.exports = userMoviesFactory