const $ = require("jquery")
const searchApi = require("./searchApi")

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
            searchInputEl.append("<input id='userSearch' type='text' placeholder='Search'>")
            searchInputEl.append("<button id='searchApi'>Search</button>")
            $("#searchApi").on("click", searchApi)
        }
    },
    //method to query the API and store the returned array into the cache
    "search":{
        value: function(userSearch) {
            let condensedSearch = userSearch.replace(" ", "+")
            $.ajax({
                "url": `https://api.themoviedb.org/3/search/movie?api_key=858deec9a8305f575390bb92f4c3eab8&query=${condensedSearch}
                `,
                "method": "GET"
            })
                .then(searchResult => {
                    apiInterface.cache = searchResult
                })
        }
    }

})

module.exports = apiInterface