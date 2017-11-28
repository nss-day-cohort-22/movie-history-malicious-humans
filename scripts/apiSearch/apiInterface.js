const $ = require("jquery")
const searchApi = require("./searchApi")

const apiInterface = Object.create(null,{
    "cache":{
        value: null,
        writable: true
    },
    "displayInput": {
        value: function() {
            const searchInputEl = $("#findNewMovies")
            searchInputEl.append("<input id='userSearch' type='text' placeholder='Search'>")
            searchInputEl.append("<button id='searchApi'>Search</button>")
            $("#searchApi").on("click", searchApi)
        }
    },
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