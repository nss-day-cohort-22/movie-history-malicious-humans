//author Kristen Norris
//Functionality: gets the user's tracked movies and displays them on the DOM

const firebase = require("firebase")
const $ = require("jquery")

const displayYourMovies = Object.create(null, {
    "init": {
        value: function () {
            $.ajax({
                url: "https://movie-nutshell.firebaseio.com/trackedMovies", //gets all tracked movies in database
                method: "GET"
            }).then( movieDB => {
                $.ajax({
                    url: "https://movie-nutshell.firebaseio.com/userMovie", //gets the relationship between the users and the tracked movies
                    method: "GET"
                }).then( userMovies => {
                    //iterate through userMovies and if the userId equals the current authorized user then iterate through the trackMovies database to build a string of movies to add to the DOM
                    userMovies.forEach( yourMovie => {
                        return firebase.auth().currentUser.getToken(true).then( //gets token of current authorized user
                            userToken => {
                                const outputEl = $("#searchYourMovies") //section to write to on DOM
                                if(userToken === yourMovie.userId) { //the authorized user token is equal to the userId on the userMovie database
                                    movieDB.forEach( movie => { //iterate through the movies in the trackedMovies database
                                        let movieString = ""
        
                                        if(movie.movieId === yourMovie.movieId) { //when the movie id in the trackedMovies database equals the movieId on the userMovie database
        
                                            movieString += `
                                            <section class="movieCard" id="movie_${movie.movieId}">
                                                <div class="yourMovies">
                                                    <h1>${movie.name}</h1>
                                                    <img src="${movie.poster}" alt="${movie.name} poster">
                                                    <h3>${movie.tagline}</h3>
                                                    <p>Year released: ${movie.released}</p>
                                                    // <p>Top Billed Actors: </p>
                                                </div>
                                        `
                                            if(yourMovie.watched === true) { //if the movie has been watched add the rating
                                                movieString += `
                                                <div>
                                                    <p id="movie_rating">Rating: ${yourMovie.rating}</p> //change to display stars
                                                </div>
                                            `
                                            } else { //if not, give the user the ability to mark the movie as "watched"
                                                movieString += `
                                                <div>
                                                    <a href="#" id="movie_watched">Watched</a>
                                                </div>
                                            `
                                            }
                
                                            movieString += "</section>"
                                        }
                                    
                                        outputEl.html(movieString) //add movies that the user has tracked to DOM
                                    })
                                } 
                            }
                        )
                    })
                })
            })
        }
    },
    "watched": {
        value: ""
    },
    "unwatched": {
        value: ""
    }
})


module.exports = displayYourMovies