//author: Kristen
//functionality: gets the database from Firebase
const $ = require("jquery")


const mainDB = Object.create(null, {
    "trackedMovies": {
        value: function () {
            $.ajax({
                "url": "./scripts/movieSearch/testMovieDB.json",
                "method": "GET"
            })
        }
    },
    "userMovie": {
        value: function () {
            $.ajax({
                "url": "./scripts/movieSearch/testUserDB.json",
                "method": "GET"
            })
        }
    }
})

module.exports = mainDB

// https://movie-nutshell.firebaseio.com/trackedMovies.json
// https://movie-nutshell.firebaseio.com/userMovie.json