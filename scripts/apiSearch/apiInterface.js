const $ = require("jquery")
const movieFactory = require("../movieSearch/movieFactory")
const addAddToWatchListListener = require("../addMovie/addAddToWatchListListener")
const user = require("../authorization/authorization")

const apiInterface = Object.create(null,{
    //cache to hold the data returned from the external API
    "cache":{
        value: null,
        writable: true
    },
    //method to display the search input field
    "displayInput": {
        value: function() {
            const searchInputEl = $("#findNewMovies")
            $("#content").html("")
            searchInputEl.html("")
            searchInputEl.append("<input id='userSearch' type='text' placeholder='Search'>")
            searchInputEl.append("<button id='searchApi'>Search</button>")
            $("#searchApi").on("click", apiInterface.search)
            $("#userSearch").on("keyup", function(e){
                if(e.keyCode === 13){
                    apiInterface.search()
                }
            })
        }
    },
    //method to query the API and store the returned array into the cache
    "search":{
        value: function() {
            //store the value of the user's search input
            const userSearchInput = $("#userSearch").val()
            function searchMovie(userSearch) {
                let condensedSearch = userSearch.split(" ").join("+")
                $.ajax({
                    "url": `https://api.themoviedb.org/3/search/movie?api_key=858deec9a8305f575390bb92f4c3eab8&query=${condensedSearch}
                `,
                    "method": "GET"
                })
                    .then(searchResult => {
                        console.log(searchResult)
                        apiInterface.cache = searchResult.results  
                        console.log(apiInterface.cache)
                        apiInterface.displayResults()
                    }).catch(function(error) {
                        alert("Please enter a valid movie title")
                    })
            }
            searchMovie(userSearchInput)
        }},
    "displayResults": {
        value: function() {
            movieFactory.userMovie().then(userMovie => {

                const movieOutputEl = $("#content")
                //store the value of the returned movies
                const returnedMovies = apiInterface.cache
                const userId= user.activeUser.uid
        
                let movieHTML = ""
                //iterate over the array and build a DOM string that will print the movie cards to the DOM
                returnedMovies.forEach(movie => {
                    const posterPath = movie.poster_path
                    const movieYear = movie.release_date.slice(0,4)
                    movieHTML += `
                <section class = "movieCard" id = "${movie.id}">
                    <img class = "moviePoster" src = "https://image.tmdb.org/t/p/w150${posterPath}">
                    <h2 class = "movieTitle">${movie.title}</h2>
                    <h3 class = "movieYear">${movieYear}</h3>
                    <button class= "addMovie" id = "add-${movie.id}">Add to Watch List</button>
                </section>
                `
                })
                //print the movie cards to the DOM
                movieOutputEl.html(movieHTML)
                //function that compares the search results with the userMovie relationships and hides he add to watch list button for movies alreayd on the watchlist.
                returnedMovies.forEach(movie => {
                    for(let key in userMovie){
                        if(userMovie[key].user_id == userId && userMovie[key].movie_id == movie.id) {
                            $(`#add-${movie.id}`).addClass("hidden")
                        }
                    }
                }
                )
                addAddToWatchListListener(this.cache)
            })}
    }
            
            
})
    

    


module.exports = apiInterface