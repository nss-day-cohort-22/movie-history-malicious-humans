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
    // following datastructure is an object of properties that consist of keys and arrays as the values of each property 
    "allWithFireBaseKey": {
        value: function () {
            return $.ajax({
                "url": `${firebaseURL}/.json`,
                "method": "GET"
            }).then(userMovies => {
                // this.cache = Object.keys(movies)
                //     .map(key => {
                //         movies[key].id = key
                //         return movies[key]
                //     })
                // const array = $.map(userMovies, function(value, index) {
                //     return [value]
                return userMovies
            })
            // this.cache = array

            // return this.cache
            // })
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
    "remove": {
        value: function (userMovieKey) {
            return $.ajax({
                "url": `${firebaseURL}/${userMovieKey}/.json`,
                "method": "DELETE"
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