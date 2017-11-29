//author: Kristen
//functionality: allows the movies from the database to be written to the DOM

const $ = require("jquery")

const movieCard = (currentMovie) => {

    $.ajax({
        "url": `http://api.themoviedb.org/3/movie/${currentMovie.id}/casts?api_key=858deec9a8305f575390bb92f4c3eab8`,
        "method": "GET"
    }).then(movie => {

        currentMovie.cast
        debugger
        const posterPath = movie.poster_path
        const movieYear = movie.release_date.slice(0,4)
        let movieString = ""
        movieString += `
            <section class="movieCard" id="movie_${movie.id}">
                <span id="delete_${movie.id}">&#10006;</span>
                <div class="yourMovies">
                    <h1 class="movieName">${movie.title}</h1>
                    <img src="${movie.posterPath}" alt="${movie.title} poster" width="150px" class="moviePoster">
                    <p class="movieRelease">Year released: ${movie.movieYear}</p>
                    <p class="movieActors">Top Billed Actors: </p> //figure out how these will be stored in the database
                </div>
            </section>
        `
        $("#content").append(movieString)

    })

}

module.exports =  movieCard
