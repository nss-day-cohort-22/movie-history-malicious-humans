const $ = require("jquery")
const watched = require("./movieWatched")

function rating(e) {
    let grandparentId = ""
    let starId = ""
    if(e.type==="click" && e.target.parentNode.parentNode.className === "movieRating"){
        grandparentId = e.target.parentNode.parentNode.id
        starId = parseInt(e.target.id.split("-")[1])
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
        for (let i = 1; i <= starId; i++) {
            $(`#${grandparentId}-${i}`).replaceWith(`<i id= "${grandparentId}-${i}" class="fa fa-star" aria-hidden="true"></i>`)
             
        }
    } else{
        starId = e.id
        grandparentId = e.gpId
        for (let x = 1; x <= starId; x++) {
            $(`#${grandparentId}-${x}`).replaceWith(`<i id= "${grandparentId}-${x}" class="fa fa-star" aria-hidden="true"></i>`)
            
        }
    }
    
    

}

module.exports = rating 
// rating({"id":3,
//     "gpId":"rating1"})

// $("#rating1").on("click", rating)
// $("body").on("click", function(event){
//     if(event.target.parentNode.parentNode.id.startsWith("rating")){
//         rating(event)
//         watched(event)
//     }
// })


// function starHover(e) {
//     const hoveredStar = parseInt(e.target.id)
//     for (let i = 1; i <= hoveredStar; i++) {
//         $(`#${i}`).replaceWith("<span><i class=\"fa fa-star\" aria-hidden=\"true\"></i></span>"
//         )
        
//     }
// }