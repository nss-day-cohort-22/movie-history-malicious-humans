//author Kristen Norris
//Functionality: gets the user's tracked movies and displays them on the DOM

const firebase = require("firebase")
const $ = require("jquery")

const displayYourMovies = () => {
    const outputEl = $("page") //change to actual id
    $.ajax({
        url: "https://movie-nutshell.firebaseio.com/trackedMovies",
        method: "GET"
    }).then( movieDB => {
        $.ajax({
            url: "https://movie-nutshell.firebaseio.com/userMovie",
            method: "GET"
        }).then( yourMovie => {
            return firebase.auth().currentUser.getToken(true).then(
                authUserId => {
                    if(authUserId === yourMovie.userId) {
                        let movieString = `
                            <section class="movieCard" id="movie_${movieDB.movieId}">
                                <div class="yourMovies">
                                    <h1>${movieDB.name}</h1>
                                    <img src="${movieDB.poster}" alt="${movieDB.name} poster">
                                    <h3>${movieDB.tagline}</h3>
                                    <p>Year released: ${movieDB.released}</p>
                                    // <p>Top Billed Actors: </p>
                                </div>
                        `
                        if(yourMovie.watched === true) {
                            movieString += `
                                <div>
                                    <p>Rating: ${yourMovie.rating}</p> //change to display stars
                                </div>
                            `
                        } else {
                            movieString += `
                                <div>
                                    <a href="#">Add to Watchlist</a>
                                </div>
                            `
                        }

                        movieString += "</section>"

                        outputEl.html(movieString)
                    } 

                }
            )

        })
        
    }
    )
}

module.exports = displayYourMovies