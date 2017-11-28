const $ = require("jquery")
const apiInterface = require("./apiInterface")

function searchApi() {
    const movieOutputEl = $("#content")
    const userSearchInput = $("#searchApi").val()

    apiInterface.search(userSearchInput)

    const returnedMovies = apiInterface.cache.val()

    let movieHTML = ""

    returnedMovies.forEach(movie => {
        const posterPath = movie.poster_path
        const movieYear = movie.release_date.slice(0,5)
        movieHTML += `
        <section class = "movieCard" id = "${movie.id}">
            <img class = "moviePoster" src = "https://image.tmdb.org/t/p/w200${posterPath}">
            <h2 class = "movieTitle">${movie.title}</h2>
            <h3 class = "movieYear">${movieYear}</h3>
        </section>
        `
    })

    movieOutputEl.html(movieHTML)

} 

module.exports = searchApi