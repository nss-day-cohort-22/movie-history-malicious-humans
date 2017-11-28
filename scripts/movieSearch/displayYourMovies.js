//author Kristen Norris
//Functionality: gets the user's tracked movies and displays them on the DOM

const $ = require("jquery")
const movieCard = require("./movieCard")
// const mainDB = require("./movieFactory")


const displayYourMovies = Object.create(null, {
    "init": {
        value: function () {
            $.ajax({
                "url": "./scripts/movieSearch/testMovieDB.json",
                "method": "GET"
            }).then( movieDB => {
                const authorized = require("../authorization/authorization")                
                $.ajax({
                    "url": "./scripts/movieSearch/testUserDB.json",
                    "method": "GET"
                }).then( userMovies => {
                    //iterate through userMovies and if the userId equals the current authorized user then iterate through the trackMovies database to build a string of movies to add to the DOM
                    debugger
                    userMovies.forEach( yourMovie => {
                        return authorized.auth().activeUser.getToken(true).then( //gets token of current authorized user
                            userToken => {
                                if(userToken === yourMovie.userId) { //the authorized user token is equal to the userId on the userMovie database
                                    movieDB.forEach( currentMovie => { //iterate through the movies in the trackedMovies database
        
                                        if(currentMovie.movieId === yourMovie.movieId) { //when the movie id in the trackedMovies database equals the movieId on the userMovie database
        
                                            //use the imported movieCard function to create a movie card and append it to the searchYourMovies section of the DOM
                                            movieCard(currentMovie)
                                            
                                            //if the movie has been watched add the rating. If not, add a link to allow users to mark when they've watched it
                                            if(yourMovie.watched === true) {
                                                //adds movie rating and adds the class of "watched" to the movie card 
                                                $(".movieCard").addClass("watched").append(`
                                                    <div>
                                                        <p id="movie_rating">Rating: ${yourMovie.rating}</p> //change to display stars
                                                    </div>
                                                `)
                                            } else {
                                                //adds link to mark when user watches the movie and adds the class of "unwatched" to the movie card
                                                $(".movieCard").addClass("unwatched").append(`
                                                    <div>
                                                        <a href="#" id="movie_watched">Watched</a>
                                                    </div>
                                                `)
                                            }
                
                                        }
                                    })
                                } 
                            }
                        )
                    })
                })
            })
        }
    },
    "watched": { //if watched value is true then display movie
        value: ""
    },
    "unwatched": { //if watched value is false then display movie
        value: ""
    }
})


module.exports = displayYourMovies