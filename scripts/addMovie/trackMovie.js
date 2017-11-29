// const $ = require("jquery")
// const firebase = require("firebase")

// const firebaseURL = "https://movie-nutshell.firebaseio.com/trackedMovies"

// const trackMovie = (movieObj) => {
//     return firebase.auth().currentUser.getToken(true)
//         .then(idToken => {
//             return $.ajax({
//                 "url": `${firebaseURL}/.json?auth=${idToken}`,
//                 "method": "POST",
//                 "data": JSON.stringify(movieObj)
//             })
//         })
// }

// module.exports = trackMovie