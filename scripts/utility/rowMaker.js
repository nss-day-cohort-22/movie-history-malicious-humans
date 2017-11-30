const $ = require("jquery")



const rowMaker = Object.create(null, {

    "movieCardCache": {
        value: null,
        writable: true
    },

    "displaySearchedMovies": {
        value: function (resultsArray) {

            let numberOfRows = Math.ceil(resultsArray.length / 3)
            
            let j = 0 

            for (let i = 0; i < numberOfRows; i++) {

                let currentRowContents = resultsArray.slice(j, (j + 3))
                let currentRowWrapper = document.createElement("div")
                currentRowWrapper.classList.add("rowWrapper")

                currentRowContents.forEach(function (movie) {

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
                    addMovieButton.classList.add("addMovie",  "btn", "btn-danger")
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
    },
    "displaySavedMovies": {
        value: function () {

            let numberOfRows = Math.ceil(rowMaker.movieCardCache.length / 3)
                
            let j = 0 
                
            for (let i = 0; i < numberOfRows; i++) {
                    
                let currentRowContents = rowMaker.movieCardCache.slice(j, (j + 3))
                let currentRowWrapper = document.createElement("div")
                currentRowWrapper.classList.add("rowWrapper")
                    
                currentRowContents.forEach( currentCard => {
                    currentRowWrapper.appendChild(currentCard)
                })
                    
                $("#content").append(currentRowWrapper)
                j += 3
            }
                
        } 
    },
    "cardArrayBuilder": {
        value: function (resultsArray, callback) {

            let builtCardArray = []

            resultsArray.forEach(movie => {
                const posterPath = movie.poster_path //movie poster image path
                const movieYear = movie.release_date.slice(0,4) //slices the release date to just get the year
                const movieId = movie.id
                $.ajax({
                    "url": `http://api.themoviedb.org/3/movie/${movieId}/casts?api_key=858deec9a8305f575390bb92f4c3eab8`,
                    "method": "GET"
                }).then(movieCast => {
                    let movieString = ""
                    const castArray = movieCast.cast //gets array of cast members

                    let currentMovie = document.createElement("div")
                    currentMovie.classList.add("movieCard")
                    currentMovie.id = `${movie.id}`

                    let spanEl = document.createElement("span")
                    spanEl.id = `delete_${movie.id}`
                    spanEl.classList.add("delete")

                    let yourMovieDiv = document.createElement("div")
                    yourMovieDiv.classList.add("yourMovies")

                    let moviePoster = document.createElement("img")
                    moviePoster.src = `https://image.tmdb.org/t/p/w150${posterPath}`
                    moviePoster.classList.add("moviePoster")

                    let movieTitle = document.createElement("h2")
                    movieTitle.classList.add(`${movie.title}`)
                    movieTitle.appendChild(document.createTextNode(`${movie.title}`))

                    let movieYearEl = document.createElement("h3")
                    movieYearEl.classList.add("movieYear")
                    movieYearEl.appendChild(document.createTextNode(`${movieYear}`))

                    let movieCastUl = document.createElement("ul")
                    movieCastUl.classList.add("movieCast")

                    let liHeader = document.createElement("LH")
                    liHeader.classList.add("movieCastHeader")
                    liHeader.appendChild(document.createTextNode("<b>Top Billed Actors:</b>"))

                    movieCast.appendChild(liHeader)

                    
                    castArray.forEach( topCast => {
                        if(topCast.order < 5) {
                            
                            let castListItem = document.createElement("li")
                            castListItem.classList.add("actor")
                            castListItem.appendChild(document.createTextNode(`${topCast.name}`))
                            
                            let iEl = document.createElement("i")
                            iEl.appendChild(document.createTextNode(`as ${topCast.character}`))
                            
                            castListItem.appendChild(iEl)
                            liHeader.appendChild(castListItem)
                            
                        } 
                
                    })

                    currentMovie.appendChild(spanEl)
                    currentMovie.appendChild(yourMovieDiv)
                    currentMovie.appendChild(moviePoster)
                    movieTitle.appendChild(movieYearEl)
                    movieTitle.appendChild(liHeader)
                    currentMovie.appendChild(movieTitle)

                    builtCardArray.push(currentMovie)
                    callback()

                })
            })
        }
    }

})


module.exports = rowMaker