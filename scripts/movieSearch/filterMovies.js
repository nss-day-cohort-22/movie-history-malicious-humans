//author: Kristen
//functionality: allows user to filter through 

const $ = require("jquery")

const filterPage = (func) => {
    const searchEl = $("#searchYourMovies")
    const contentEl = $("#content")
    const movieCard = $(".movieCard")
    
    const movieArray = $.makeArray(movieCard)
    const movieName = $.movieArray.children()
    debugger
    let pageLoad = ""
    
    if (movieArray.length > 0) {
        //create search input
        const searchBar = "<p>Search: <input type=\"text\" name=\"movieFilter\" placeholder=\"search all\"></p>"

        searchEl.html(searchBar)
        
        //targets input to add an eventListener
        const pageSearch = $("input[name='movieFilter']")[0]
            
        pageLoad = func(movieArray) //initial page load of items
        
        // pageSearch.addEventListener(
        //     "keyup",
        //     event => {
        //         if(event.target.value.length >= 3) {
        //             //convert what is being filtered to lowercase
        //             const userFilterString = event.target.value.toLowerCase()

        //             let pageFilter = dbArray.filter(filteredItem => {
        //                 for(key in filteredItem) {
        //                     const item = filteredItem[key]

        //                     if(item.toLowerCase().includes(userFilterString)) {
        //                         return item
        //                     }
        //                 }
        //             })

                
        //             //output.content.html(pageLoad) repopulates the content area when user types in search bar
        //             if(pageFilter.length === 0) {
        //                 pageLoad = "<h3>Search Results Not Found</h3>"
        //                 contentEl.html(pageLoad) 
        //             } else {
        //                 pageLoad = func(pageFilter) //displays filtered items
        //                 contentEl.html(pageLoad)
        //             }
        //         } else {
        //             pageLoad= func(dbArray) //displays initial page load if selector has less than three characters
        //             contentEl.html(pageLoad)
        //         }
        //     }
        // )
        
    }
    return pageLoad
}

module.exports =  filterPage