const firebase = require("firebase")
const observe = require("./observer")
const $ = require("jquery")

var config = {
    apiKey: "AIzaSyBMOCunHjlJOjKcSEWYhwXJhTWoQVLTOng",
    authDomain: "movie-nutshell.firebaseapp.com",
    databaseURL: "https://movie-nutshell.firebaseio.com",
    projectId: "movie-nutshell",
    storageBucket: "movie-nutshell.appspot.com",
    messagingSenderId: "348947725356"
}

const auth = Object.create(null, {

    "activeUser": {

        value: null,
        writable: true

    },
    "init": {
        value: function () {

            firebase.initializeApp(config)

            $("#signInButton").on("click", function () {

                auth.signIn(

                    $("#userNameInput").val(),
                    $("#passwordInput").val()
                )

                $("#userNameInput").val(""),
                $("#passwordInput").val("")

            })
            

            $("#signUpButton").on("click", function () {

                auth.signUp(
                    $("#userNameInput").val(),
                    $("#passwordInput").val()
                )

                $("#userNameInput").val(""),
                $("#passwordInput").val("")
            })


            // Set up authentication observer
            observe.init(this)
        }
    },
    "signUp": {
        value: function (email, password) {
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
    "signIn": {
        value: function (email, password) {
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
    "logOut": {
        value: function () {
            firebase.auth().signOut().then(function() {
                // Sign-out successful.
            }).catch(function(error) {
                // An error happened.
                alert(error)
            })
        }
    }
})

module.exports = auth