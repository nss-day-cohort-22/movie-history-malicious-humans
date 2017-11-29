//author: Kristen
//functionality: allows the movies from the database to be written to the DOM

const $ = require("jquery")

const movieCard = (movie, user) => {
    const movieId = movie.id
    
    $.ajax({
        "url": `http://api.themoviedb.org/3/movie/${movieId}/casts?api_key=858deec9a8305f575390bb92f4c3eab8`,
        "method": "GET"
    }).then(movieCast => {
        let movieString = ""
        const castArray = movieCast.cast //gets array of cast members
        const posterPath = movie.poster_path //movie poster image path
        const movieYear = movie.release_date.slice(0,4) //slices the release date to just get the year
        
        //builds string to display the movie
        movieString += `
            <section class="movieCard" id="movie_${movie.id}">
                <span id="delete_${movie.id}">&#10006;</span>
                <div class="yourMovies">
                    <h1 class="movieName">${movie.title}</h1>
                    <img src="https://image.tmdb.org/t/p/w150${posterPath}" alt="${movie.title} poster" class="moviePoster">
                    <p class="movieRelease">Year released: ${movieYear}</p>
                    <p>Top Billed Actors: 
                        <ul class="movieCast">
                        
        `
        //iterates through the cast array and if they are one of the top five ranked cast members then add to the string
        castArray.forEach( topCast => {
            if(topCast.order < 5) {
                movieString += `
                    <li class="actor">${topCast.name}</li>
                `
            }
        })

        //closing tags for string
        movieString += `
                    </ul>        
                </p>
            </div>
        </section> 
        `
        //append movieString to the DOM
        $("#content").append(movieString)

        //if the movie has been watched add the rating. If not, add a link to allow users to mark when they've watched it
        const movieEl = $(`#movie_${movie.id}`)
        if(user.watched === true) {
            //adds movie rating and adds the class of "watched" to the movie card 
            movieEl.addClass("watched").append(`
        <div>
            <p id="movieRating">Rating: ${user.rating}</p> //change to display stars
        </div>
        `)
        } else {
            //adds link to mark when user watches the movie and adds the class of "unwatched" to the movie card
            movieEl.addClass("unwatched").append(`
        <div>
            <a href="#" id="movieWatched_${movie.id}">Watched</a>
        </div>
        `)
        }

    }) 

}

module.exports =  movieCard
