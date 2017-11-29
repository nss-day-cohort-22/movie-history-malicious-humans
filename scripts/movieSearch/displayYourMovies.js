//author Kristen Norris
//Functionality: gets the user's tracked movies and displays them on the DOM

const $ = require("jquery")
const movieCard = require("./movieCard") //builds the cards to display the movies
const mainDB = require("./movieFactory") //gets the database
const movieWatched = require("./movieWatched")

const displayYourMovies = Object.create(null, {
    "init": {
        value: function () {
            mainDB.trackedMovies().then( movieDB => {
                const authorized = require("../authorization/authorization")                
                
                $("#content").html("") //resets area to not duplicate content
                $("#findNewMovies").html("") //resets findNewMovies search bar if it's present
                
                mainDB.userMovie().then( userMoviesDB => {
                    const searchButtons = `
                        <button id="unwatchedMovies">Show Unwatched</button> 
                        <button id="watchedMovies">Show Watched</button>
                    `
                    $("#content").append(searchButtons) //adds buttons to filter through Watched or Unwatched Movies
                    $("#watchedMovies").on("click", this.watched) //add function to button
                    $("#unwatchedMovies").on("click", this.unwatched) //add function to button
                    
                    
                    for(let key in userMoviesDB) { //iterate through user/movie relationships
                        let yourMovie = userMoviesDB[key]
                        const activeUserId = authorized.activeUser.uid

                        if(activeUserId === yourMovie.user_id) { //the authorized user id is equal to the userId on the userMovie database
                            
                            for(let mov in movieDB) { //iterate through the movies in the trackedMovies database
                                let currentMovie = movieDB[mov]
                                const yourMovieId = parseInt(yourMovie.movie_id) //changes string into an integer
                            
                                if(currentMovie.id === yourMovieId) { //when the movie id in the trackedMovies database equals the id on the userMovie database
            
                                    //use the imported movieCard function to create a movie card and append it to the content section of the DOM
                                    movieCard(currentMovie)
                    
                                    //if the movie has been watched add the rating. If not, add a link to allow users to mark when they've watched it
                                    if(yourMovie.watched === true) {
                                        //adds movie rating and adds the class of "watched" to the movie card 
                                        $(`#movie_${currentMovie.id}`).addClass("watched").append(`
                                            <div>
                                                <p id="movieRating">Rating: ${yourMovie.rating}</p> //change to display stars
                                            </div>
                                            `)
                                    } else {
                                        //adds link to mark when user watches the movie and adds the class of "unwatched" to the movie card
                                        $(`#movie_${currentMovie.id}`).addClass("unwatched").append(`
                                            <div>
                                                <a href="#" id="movieWatched_${currentMovie.id}">Watched</a>
                                            </div>
                                            `)
                                    }
                                } //end of if currentMovie.id === yourMovie.id
                                    
                            } //end of for/in movieDB
                                
                        } //end of if activeUserId === yourMovie.userId
                            
                    } //end of for/in userMoviesDB

                })//end of user ajax
            })//end of movie ajax
        }
    },
    "watched": { 
        value: function () {
            const watchedMovie = $(".watched")
            const unwatchedMovie = $(".unwatched")

            unwatchedMovie.addClass("hidden") //hide unwatched movies
            
            if(watchedMovie.hasClass("hidden") === true){ //if the watched movies have a class of hidden, remove that class
                watchedMovie.removeClass("hidden")
            }
        }
    },
    "unwatched": { //if watched value is false then display movie
        value: function () {
            const watchedMovie = $(".watched")
            const unwatchedMovie = $(".unwatched")

            watchedMovie.addClass("hidden") //hide watched movies
            
            if(unwatchedMovie.hasClass("hidden") === true){ //if the unwatched movies have a class of hidden, remove that class
                unwatchedMovie.removeClass("hidden")
            }
        }
    }
})


module.exports = displayYourMovies


