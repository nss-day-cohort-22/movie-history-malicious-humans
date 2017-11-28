// Author: Garrett Ward
// Functionality: create an object that will hold the function to 
// observe for user state changes and invoke functions accordingly

//require the firebase node module so the state change observer may be invoked

const firebase = require("firebase")
const $ = require("jquery")

// create an observer object to hold the data pertaining to user state change
// observation

const observer = Object.create(null, {

    // create a key to hold the state change observation function

    "init": {

        //define the funciton to accept a parameter. Since the function will require
        //the auth object , the paramter will be called auth

        value: function (auth) {
            firebase.auth().onAuthStateChanged(function(user) {

                // if the user is logged in, clear log in and display welcome text

                if (user) {
                    auth.activeUser = user
                    $(".headerClass").text("Welcome" + auth.activeUser)
                    $("#welcomeDiv").toggleClass("hidden")
                    let welcomeText = "<h1>What would you like to do?</h1>"
                    $("#welcomePage").html(welcomeText)

                // if the user is not logged in, do nothing
                
                } else {
                    auth.activeUser = null
                }
            })
        }
    }
})

module.exports = observer