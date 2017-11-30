const $ = require("jquery")
const watched = require("./movieWatched")
//function that allows the user to select a 1 to 5 star rating.
function rating(e) {
    let grandparentId = ""
    let starId = ""
    //checks to see if the event is a "click" if it is it gets the star id from the target.id of the click event.
    if(e.type==="click" && e.target.parentNode.parentNode.className === "movieRating"){
        grandparentId = e.target.parentNode.parentNode.id
        starId = parseInt(e.target.id.split("-")[1])
        //each time a star is clicked the stars need to initially revert back to being all empty.
        const initialHTML = `<span class="star"><i id="${grandparentId}-1" class="fa fa-star-o" aria-hidden="true"></i>
         </span>
         <span class="star"><i id="${grandparentId}-2" class="fa fa-star-o" aria-hidden="true"></i>
         </span>
         <span class="star" ><i id="${grandparentId}-3" class="fa fa-star-o" aria-hidden="true"></i>
         </span>
         <span class="star" ><i id="${grandparentId}-4" class="fa fa-star-o" aria-hidden="true"></i>
         </span>
         <span class="star" ><i id="${grandparentId}-5"class="fa fa-star-o" aria-hidden="true"></i>
         </span>`
        $(`#${grandparentId}`).html(initialHTML)

        //then it replaces the correct number of empty stars with filled stars based on the id of the star clicked.
        for (let i = 1; i <= starId; i++) {
            $(`#${grandparentId}-${i}`).replaceWith(`<i id= "${grandparentId}-${i}" class="fa fa-star" aria-hidden="true"></i>`)
             
        }
    } else{
        //if the paramets is not an event, it can also accept an object what will allow us to display the ratings once we pull the data from the database.
        starId = e.id
        grandparentId = e.gpId
        for (let x = 1; x <= starId; x++) {
            $(`#${grandparentId}-${x}`).replaceWith(`<i id= "${grandparentId}-${x}" class="fa fa-star" aria-hidden="true"></i>`)
            
        }
    }
    
    

}

module.exports = rating 
