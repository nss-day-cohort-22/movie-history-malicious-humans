const $ = require("jquery")
const addAddToWatchListListener = require("../addMovie/addAddToWatchListListener")
const rowMaker = require("../utility/rowMaker")

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
            
            const returnedMovies = apiInterface.cache
            
            rowMaker.displaySearchedMovies(returnedMovies)
          
            addAddToWatchListListener(this.cache)
        }
    }

    
})

module.exports = apiInterface