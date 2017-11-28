const $ = require("jquery")
const apiInterface = require("./apiInterface")

function searchApi() {
    const movieOutputEl = $("#content")
    //store the value of the user's search input
    const userSearchInput = $("#searchApi").val()
    //invoke the method to query the external API
    apiInterface.search(userSearchInput)

    //store the value of the returned movies
    const returnedMovies = apiInterface.cache.val()

    let movieHTML = ""
    //iterate over the array and build a DOM string that will print the movie cards to the DOM
    returnedMovies.forEach(movie => {
        const posterPath = movie.poster_path
        const movieYear = movie.release_date.slice(0,5)
        movieHTML += `
        <section class = "movieCard" id = "${movie.id}">
            <img class = "moviePoster" src = "https://image.tmdb.org/t/p/w200${posterPath}">
            <h2 class = "movieTitle">${movie.title}</h2>
            <h3 class = "movieYear">${movieYear}</h3>
            <button class= "addMovie">Add to Watch List</button>
        </section>
        `
    })
    //print the movie cards to the DOM
    movieOutputEl.html(movieHTML)

} 

module.exports = searchApi