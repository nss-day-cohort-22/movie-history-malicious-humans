//author: Kristen
//functionality: allows the movies from the database to be written to the DOM

const $ = require("jquery")
const removeMovieFromWatchList = require("../removeMovieFromWatchList/removeMovie")
const rating = require("./starRating")

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
                <span id="delete_${movie.id}" class="delete">&#10006;</span>
                <div class="yourMovies">
                <img src="https://image.tmdb.org/t/p/w150${posterPath}" alt="${movie.title} poster" class="moviePoster">
                <h2 class="movieTitle">${movie.title}</h2>
                    <h3 class="movieYear">${movieYear}</h3>
                    <ul class="movieCast">
                        <LH class="movieCastHeader"><b>Top Billed Actors:</b></LH>
                        
        `
        //iterates through the cast array and if they are one of the top five ranked cast members then add to the string
        castArray.forEach( topCast => {
            if(topCast.order < 5) {
                movieString += `
                    <li class="actor">${topCast.name} <i>as ${topCast.character}</i></li>
                `
            }
        })

        //closing tags for string
        movieString += `
                </ul>        
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
        <div id="rating${movie.id}">
        <span class="star"><i id="rating${movie.id}-1" class="fa fa-star-o" aria-hidden="true"></i>
        </span>
        <span class="star"><i id="rating${movie.id}-2" class="fa fa-star-o" aria-hidden="true"></i>
        </span>
        <span class="star" ><i id="rating${movie.id}-3" class="fa fa-star-o" aria-hidden="true"></i>
        </span>
        <span class="star" ><i id="rating${movie.id}-4" class="fa fa-star-o" aria-hidden="true"></i>
        </span>
        <span class="star" ><i id="rating${movie.id}-5"class="fa fa-star-o" aria-hidden="true"></i>
        </span>
        </div>
        `)
            rating({
                "id":user.rating,
                "gpId": `rating${movie.id}`
            })
        } else {
            //adds link to mark when user watches the movie and adds the class of "unwatched" to the movie card
            movieEl.addClass("unwatched").append(`
        <div>
            <a href="#" id="movieWatched_${movie.id}" class="watchLink" data-toggle="modal" data-target="#myModal">I watched this movie</a>
        </div>
        `)
        }

        removeMovieFromWatchList(movie.id)
    }) 

    // test
    // $(`#delete_${movie.id}`).on("click", () => {
    //     console.log("delete button clicked")
    // })
}

module.exports =  movieCard
