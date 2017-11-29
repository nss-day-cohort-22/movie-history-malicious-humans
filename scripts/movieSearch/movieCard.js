//author: Kristen
//functionality: allows the movies from the database to be written to the DOM

const $ = require("jquery")

const movieCard = (movie) => {
    let movieString = ""
    movieString += `
        <section class="movieCard" id="movie_${movie.movieId}">
            <div class="yourMovies">
                <h1>${movie.name}</h1>
                <img src="${movie.poster}" alt="${movie.name} poster" width="300px" height="300px">
                <h3>${movie.tagline}</h3>
                <p>Year released: ${movie.released}</p>
                <p>Top Billed Actors: </p> //figure out how these will be stored in the database
            </div>
        </section>
    `
    $("#searchYourMovies").append(movieString)
}

module.exports =  movieCard