// Author: Garrett Ward
// Functionality: create an object that will hold the function to 
// observe for user state changes and invoke functions accordingly

//require the firebase node module so the state change observer may be invoked

const firebase = require("firebase")
const navBuilder = require("../navigation/nav")

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
                    navBuilder.init(true)
                // if the user is not logged in, do nothing
                
                } else {
                    auth.activeUser = null
                    navBuilder.init(false)
                }
            })
        }
    }
})

module.exports = observer