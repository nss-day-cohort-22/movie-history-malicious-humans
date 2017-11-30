const $ = require("jquery")


const rowMaker = Object.create(null, {
    "displaySearchedMovies": {
        value: function (resultsArray) {

            let numberOfRows = Math.ceil(resultsArray.length / 3)
            
            let j = 0 

            for (let i = 0; i < numberOfRows; i++) {

                let currentRowContents = resultsArray.slice(j, (j + 3))
                let currentRowWrapper = document.createElement("div")
                currentRowWrapper.classList.add("rowWrapper")

                currentRowContents.forEach(movie => {

                    const posterPath = movie.poster_path
                    const movieYear = movie.release_date.slice(0,4)

                    let currentMovie = document.createElement("div")
                    currentMovie.classList.add("movieCard")
                    currentMovie.id = `${movie.id}`

                    let moviePoster = document.createElement("img")
                    moviePoster.classList.add("moviePoster")
                    moviePoster.src = `https://image.tmdb.org/t/p/w150${posterPath}`

                    let movieTitle = document.createElement("h2")
                    movieTitle.classList.add("movieTitle")
                    movieTitle.appendChild(document.createTextNode(`${movie.title}`))

                    let movieYearEl = document.createElement("h3")
                    movieYearEl.classList.add("movieYear")
                    movieYearEl.appendChild(document.createTextNode(`${movieYear}`))

                    let addMovieButton = document.createElement("button")
                    addMovieButton.classList.add("movieYear")
                    addMovieButton.appendChild(document.createTextNode("Add to Watch List"))

                    currentMovie.appendChild(moviePoster)
                    currentMovie.appendChild(movieTitle)
                    currentMovie.appendChild(movieYearEl)
                    currentMovie.appendChild(addMovieButton)
                    currentRowWrapper.appendChild(currentMovie)
                    
                })
                $("#content").append(currentRowWrapper)
                j += 3
            }

        
        }
    }
}) 

module.exports = rowMaker