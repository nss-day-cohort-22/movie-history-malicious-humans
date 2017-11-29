//author Kristen Norris
//Functionality: gets the user's tracked movies and displays them on the DOM

const $ = require("jquery")
const movieCard = require("./movieCard") //builds the cards to display the movies
const mainDB = require("./movieFactory") //gets the database

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
                    
                    //iterate through userMovies and if the userId equals the current authorized user then iterate through the trackMovies database to build a string of movies to add to the DOM
                    userMoviesDB.forEach( yourMovie => {
                        const activeUserId = authorized.activeUser.uid
                        if(activeUserId === yourMovie.userId) { //the authorized user id is equal to the userId on the userMovie database
                            movieDB.forEach( currentMovie => { //iterate through the movies in the trackedMovies database

                                if(currentMovie.id === yourMovie.id) { //when the movie id in the trackedMovies database equals the id on the userMovie database
        
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
                                            <a href="#" id="movieWatched">Watched</a>
                                        </div>
                                        `)
                                    }
                                }
                                
                            })
                            
                        }
                        
                    })
                })
            })
        }
    },
    "watched": { 
        value: function () {
            const watchedMovie = $(".watched")
            const unwatchedMovie = $(".unwatched")

            // const movieCard = $(".movieName")
            // const movieName = movieCard.forEach(card => {
            //     return card.innerText
            // })
            
            // const movieArray = $.makeArray(movieName)
            // const movieNames = movieArray.forEach(movie => {
            //     console.log(movie)
            // })
            // debugger
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


