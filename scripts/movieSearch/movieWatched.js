const $ = require("jquery")
const trackedMoviesFactory = require("../addMovie/trackedMoviesFactory")

const user = require("../authorization/authorization")
const firebase = require("firebase")
const modalOutputEl = $("#myModal .modal-body")
const modalOutputElTitle = $("#myModal .modal-title")
const displayYourMovies = $("displayYourMovies")

let movieWatched = null
function watchedModal(e){
    modalOutputEl.html("")
    let modalString = ""
    trackedMoviesFactory.all().then(movieArray => {
        movieWatched = movieArray.find(movie => {
            return movie.id === parseInt(e.target.id.split("_")[1])
            
        })
        // adjusting title
        modalOutputElTitle.addClass("reviewTitle")
        modalOutputElTitle.html(`How did you like ${movieWatched.title}?`)
        modalString =
        `
        
        <div id="rating${movieWatched.id}">
            <span class="star" data-dismiss="modal"><i id="rating${movieWatched.id}-1" class="fa fa-star-o" aria-hidden="true"></i>
            </span>
            <span class="star" data-dismiss="modal"><i id="rating${movieWatched.id}-2" class="fa fa-star-o" aria-hidden="true"></i>
            </span>
            <span class="star" data-dismiss="modal"><i id="rating${movieWatched.id}-3" class="fa fa-star-o" aria-hidden="true"></i>
            </span>
            <span class="star" data-dismiss="modal"><i id="rating${movieWatched.id}-4" class="fa fa-star-o" aria-hidden="true"></i>
            </span>
            <span class="star" data-dismiss="modal"><i id="rating${movieWatched.id}-5"class="fa fa-star-o" aria-hidden="true"></i>
            </span>
        </div>
        `
        modalOutputEl.html(modalString)
    })
    
}

function watched(event){
    const rating = require("./starRating")
    rating(event)
    const userId= user.activeUser.uid
    const movieId = movieWatched.id 
    $(`#movie_${movieId}`).hide("slow").removeClass("unwatched").addClass("watched")


    let updateUserMovie = null
    $.ajax({
        "url": "https://movie-nutshell.firebaseio.com/userMovie/.json",
        "method": "GET"
    }).then(userMovies => {
        console.log(userMovies)
        for( const key in userMovies){
            if(userMovies[key].movie_id==movieId && userMovies[key].user_id == userId){
                updateUserMovie = [key, userMovies[key]]
                console.log("Test 2")
            }
        }
        return updateUserMovie
    })
        .then( updateUserMovie => {
            console.log(updateUserMovie)
            updateUserMovie[1].watched = true
            updateUserMovie[1].rating = parseInt(event.target.id.split("-")[1])
            firebase.auth().currentUser.getToken(true)
                .then(idToken => {
                    return $.ajax({
                        "url": `https://movie-nutshell.firebaseio.com/userMovie/${updateUserMovie[0]}/.json?auth=${idToken}`,
                        "method": "PUT",
                        "data": JSON.stringify(updateUserMovie[1])
                    })
                })
                .then(
                    r => {
                        modalOutputEl.html("")
                    }
                )
        })
}


$("body").on("click", function(event){
    if(event.target.id.startsWith("movieWatched_")){
        watchedModal(event)
    }else {
        if(event.target.parentNode.parentNode.id.startsWith("rating")){
            watched(event)

        }} 
})



module.exports = watched
