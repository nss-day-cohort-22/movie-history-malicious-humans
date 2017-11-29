//author: Kristen
//functionality: allows the movies from the database to be written to the DOM

const $ = require("jquery")

const movieCard = (movie) => {

    $.ajax({
        "url": `http://api.themoviedb.org/3/movie/${movie.id}/casts?api_key=858deec9a8305f575390bb92f4c3eab8`,
        "method": "GET"
    }).then(cast => {
        debugger
        return cast
    })  

    const posterPath = movie.poster_path
    const movieYear = movie.release_date.slice(0,4)
    let movieString = ""
    movieString += `
            <section class="movieCard" id="movie_${movie.id}">
                <span id="delete_${movie.id}">&#10006;</span>
                <div class="yourMovies">
                    <h1 class="movieName">${movie.title}</h1>
                    <img src="https://image.tmdb.org/t/p/w150${posterPath}" alt="${movie.title} poster" class="moviePoster">
                    <p class="movieRelease">Year released: ${movieYear}</p>
                    <p class="movieActors">Top Billed Actors: </p> //figure out how these will be stored in the database
                </div>
            </section> 
        `
    $("#content").append(movieString)

}

module.exports =  movieCard
