//author: Kristen
//functionality: does an ajax call to get the database from Firebase
const $ = require("jquery")


const mainDB = Object.create(null, {
    "trackedMovies": {
        value: function () {
            return $.ajax({
                "url": "https://movie-nutshell.firebaseio.com/trackedMovies.json",
                "method": "GET"
            })
        }
    },
    "userMovie": {
        value: function () {
            return $.ajax({
                "url": "https://movie-nutshell.firebaseio.com/userMovie.json",
                "method": "GET"
            })
        }
    }
})

module.exports = mainDB
