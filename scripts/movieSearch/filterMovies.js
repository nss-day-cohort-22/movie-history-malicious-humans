//author: Kristen
//functionality: allows user to filter through their movies to find a specific movie

const $ = require("jquery")

const filterPage = (movieArray) => {
    const searchEl = $("#findNewMovies")
    const contentEl = $("#content")
    //create search input
    const searchBar = "<p>Find Your Movie: <input type=\"text\" name=\"movieFilter\" placeholder=\"search movie titles\"></p>"

    searchEl.html(searchBar) //adds search bar to DOM
        
    //targets input to add an eventListener
    const pageSearch = $("input[name='movieFilter']")[0]

    const searchMovies = function (event) {
        if(event.target.value.length >= 3) {
            //convert what is being filtered to lowercase
            const userFilterString = event.target.value.toLowerCase()

            let filteredList = movieArray.filter(filteredItem => { 
                const movieTitle = filteredItem.title //gets the title of the current movie
                
                const containsString = movieTitle.toLowerCase().includes(userFilterString) //determines if the movieTitle contains what was searched for (returns true or false)
                const filteredMovie = $(`#movie_${filteredItem.id}`) //gets the corresponding movieCard
                
                if(containsString === false) {
                    filteredMovie.addClass("hidden") //if the title is not what is searched for add a class of hiddne
                } else {
                    if(filteredMovie.hasClass("hidden")) { //if the title is what was searched for but has a class of hidden, remove the class
                        filteredMovie.removeClass("hidden")
                    }
                }
                
            })


        } else {
            movieArray.filter(filteredItem => { //if the length of the search is less than 3 remove the class of hidden from all movieCards
                const movie = $(`#movie_${filteredItem.id}`)
                
                if(movie.hasClass("hidden")) {
                    movie.removeClass("hidden")
                }
                
            })
        }
    }
            
        
    pageSearch.addEventListener("keyup", searchMovies)

    // unwatchedMovie.addClass("hidden") //hide unwatched movies
                    
    // if(watchedMovie.hasClass("hidden") === true){ //if the watched movies have a class of hidden, remove that class
    //     watchedMovie.removeClass("hidden")
    // }
                
    //     //output.content.html(pageLoad) repopulates the content area when user types in search bar
    //     if(pageFilter.length === 0) {
    //         pageLoad = "<h3>Search Results Not Found</h3>"
    //         contentEl.html(pageLoad) 
    //     } else {
    //         pageFilter.forEach(movie =>
    //             func(movie)
    //         )
    //     }
    // } else {
    //     movieArray.forEach(movie =>
    //         func(movie)
    //     )
    // }

        

}

module.exports =  filterPage