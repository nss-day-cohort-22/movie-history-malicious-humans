const $ = require("jquery")

const movieCard = (movie) => {
    let movieString = ""
    movieString += `
        <section class="movieCard">
            <div class="yourMovies" id="movie_${movie.movieId}">
                <h1>${movie.name}</h1>
                <img src="${movie.poster}" alt="${movie.name} poster">
                <h3>${movie.tagline}</h3>
                <p>Year released: ${movie.released}</p>
                // <p>Top Billed Actors: </p>
            </div>
        </section>
    `
    $("#searchYourMovies").append(movieString)
}

module.exports =  movieCard