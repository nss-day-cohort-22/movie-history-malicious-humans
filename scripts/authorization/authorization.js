// Author: Garrett Ward
// Functionality: Create an object that will handle firebase initiliaztion,
// sign in, sign up, and log out. This object will also hold the current
// user object

// require the firebase node module so we may initialize the authentication
const firebase = require("firebase")
const observe = require("./observer")
const $ = require("jquery")

// include the configuration object provided by firebase and store it in a variable
// so it may be passed into the firebase app initialization

var config = {
    apiKey: "AIzaSyBMOCunHjlJOjKcSEWYhwXJhTWoQVLTOng",
    authDomain: "movie-nutshell.firebaseapp.com",
    databaseURL: "https://movie-nutshell.firebaseio.com",
    projectId: "movie-nutshell",
    storageBucket: "movie-nutshell.appspot.com",
    messagingSenderId: "348947725356"
}

// create a object that will hold functions and data pertaining to authentication

const auth = Object.create(null, {

// create a key so that we may store the active user's user object

    "activeUser": {

        value: null,
        writable: true
    },

    // create a key to hold the initialization function

    "init": {

        value: function () {

            //invoke the firebase initialization function and pass the 
            // configuration object in ass the arguement

            firebase.initializeApp(config)

            //attach event listeners to the sign in and sign up buttons
            //that will pass the the values of the userEmail and userPassword
            //inputs into the sign in and sign up functions

            $("#signInButton").on("click", function () {

                auth.signIn(

                    $("#userEmailInput").val(),
                    $("#passwordInput").val()
                )

                $("#userEmailInput").val(""),
                $("#passwordInput").val("")

            })
            

            $("#signUpButton").on("click", function () {

                auth.signUp(

                    $("#userEmailInput").val(),
                    $("#passwordInput").val()
                )

                $("#userEmailInput").val(""),
                $("#passwordInput").val("")
            })


            // invoke the observer initialization function from the observer object
            //  and pass the auth object in as the argument

            observe.init(this)
        }
    },

    // create a key to hold the sign in function

    "signUp": {

        //define the function to accept two parameters(email and password)
        //to pass on to the firebae function

        value: function (email, password) {

            // invoke the firebase authorization create user function

            firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .catch(function(error) {

                // Handle Errors here.
                    var errorCode = error.code
                    var errorMessage = error.message

                    alert(errorMessage)
                    alert(errorCode)
                // ...

                })
        }
    },

    // create a key to hold the sign in function

    "signIn": {

        //define the function to accept two parameters(email and password)
        //to pass on to the firebae function

        value: function (email, password) {

            // invoke the firebase authorization sign in user function

            firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
                .catch(function (error) {
                    const errorCode = error.code
                    const errorMessage = error.message

                    alert(errorMessage)
                    alert(errorCode)
                })
        }
    },

    // create a key to hold the log out function

    "logOut": {

        //define the function to accept two parameters(email and password)
        //to pass on to the firebae function

        value: function () {

            // invoke the firebase authorization log out user function

            firebase.auth().signOut().then(function() {
                $("#content").html("")
                $("#findNewMovies").html("")
                // Sign-out successful.
            }).catch(function(error) {
                // An error happened.
                alert(error)
            })
        }
    }
})

module.exports = auth