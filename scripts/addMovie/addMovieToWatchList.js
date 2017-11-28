const $ = require("jquery")
const firebase = require("firebase")

const firebaseURL = "https://movie-nutshell.firebaseio.com/userMovie"

const addMovieToWatchList = (movieObj, id) => {

    return firebase.auth().currentUser.getToken(true)
        .then(idToken => {
            return $.ajax({
                "url": `${firebaseURL}/${id}/.json`,
                "method": "PUT",
                "data": JSON.stringify(movieObj)
            })
        })

}

module.exports = addMovieToWatchList