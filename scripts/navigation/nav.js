
// Author: Garrett Ward
// Functionality: Builds navbar. Only displays log in/sign up if no user is logged in.
// If user is logged in displays buttons for site functionality as well as log out button.

const $ = require("jquery")

// Create an object that will hold the data needed for the links
// as well as the functionality to display the print the links to
// the DOM.

const navBuilder = Object.create(null, {

    // create a key thats value will be an array of objects. The objects contain
    // the required data to build each link

    "links": {

        value: [
            {
                // display will be text displayed on buttons
                "display": "Find New Movies",
                // name a class for the link
                "linkClass": "findMoviesLinkClass",
                // name an id for the link
                "linkId": "findMoviesLink",
                // admin view for true if user login is required to view

                "adminView": true,
                "gridSpacing": "left"
            },
            {
                "display": "Search Your Movies",
                "linkClass": "searchUserMoviesLinkClass",
                "linkId": "searchUserMoviesLink",
                "adminView": true,
                "gridSpacing": "left"
            },
            {
                "display": "Current User",
                "linkClass": "currentUserDisplayClass",
                "linkId": "currentUserDisplay",

                "adminView": true,

            },
            {
                "display": "Sign In / Register",
                "linkClass": "signInLinkClass",
                "linkId": "signInLink",
                "adminView": false,
            },
            {
                "display": "Log Out",
                "linkClass": "logOutLinkClass",
                "linkId": "logOutLink",
                "adminView": true
            }
        ]        
    },


    // create a key thats value will be a function. The function will accept a boolean 
    // value for the arguement. 

    "init": {
        value: function (booVal) {

            // require modules that will be needed within the scope of 
            // this function

            const apiInterface = require("../apiSearch/apiInterface")
            const userMovies = require("../movieSearch/displayYourMovies")
            let auth = require("../authorization/authorization")

            // create the ul element that the nav items will be appended to

            $("#navBarId").html("")
            
            let navListLeft = document.createElement("div")
            navListLeft.id = "navListLeft"
            $("#navBarId").append(navListLeft)

            // execute a for each method on the array of link objects
            let navListRight = document.createElement("div")
            navListRight.id = "navListRight"
            $("#navBarId").append(navListRight)


            navBuilder.links.forEach( link => {

                // create a an empty string to begin writing the current link

                let newLink = ""

                // use an if statement to see if the current link object
                // represents the current user display

                if (link.linkId === "currentUserDisplay") {
                    if (booVal === true) {
                    // if the the link object is the current user display link,
                    // capture the current user object from the authentication object
                    // and store it in a variable

                        let activeUserObj = auth.activeUser
                    
                        // create an h2 element to display the current user

                        newLink = document.createElement("h4")

                        // add the class

                        newLink.classList.add(`${link.linkClass}`)

                        // add the id

                        newLink.id = `${link.linkId}`

                        // add the users email in as the text for the h2 element

                        newLink.appendChild(document.createTextNode("logged in as: " + activeUserObj.email))

                        // check to see if the boolean passed in matches the boolean
                        // on the link object. If it does not match, hide the link
                    
                        if (booVal !== link.adminView) {
                            newLink.classList.add("hidden")
                        }
                    }



                // use an else statement to run seperate logic on links that
                // are not current user display

                } else {


                    // create a button for the current link object

                    newLink = document.createElement("button")

                    // add the class

                    newLink.classList.add(`${link.linkClass}`, "btn", "btn-danger")

                    // add the id
        
                    newLink.id = `${link.linkId}`

                    // add the display text to the button

                    newLink.appendChild(document.createTextNode(`${link.display}`))

                    // check to see if the boolean passed in matches the boolean
                    // on the link object. If it does not match, hide the link


                    if (booVal !== link.adminView) {
                        newLink.classList.add("hidden")
                    } 
                }

                if (link.gridSpacing === "left") {
                    $("#navListLeft").append(newLink)
                } else {
                    $("#navListRight").append(newLink)
                }
            })



            // inject welcome text to the dom via jquery .html method

            if (booVal === true) {
                $("#welcomePage").html("<div id='genericWelcomeWrapper'><div id='welcomeTextId'><h1>Welcome! Click one of the buttons above to get started tracking movies.</h1></div></div>")
            } else {
                $("#welcomePage").html("<div id='genericWelcomeWrapper'><div id='welcomeTextId'><h1>Welcome to Malicious Movie Tracker! Please Sign In or Sign Up.</h1></div></div>")
            }
            // attach event listener to Find Movies link via jquery .on method
            // this function will print the find new movies search bar to the DOM

            $("#logOutLink").on("click", function () {
                let auth = require("../authorization/authorization")

                auth.logOut()

            })

            

            $("#findMoviesLink").on("click", function () {
                apiInterface.displayInput()
                $("#welcomePage").html("")

            })
            $("#searchUserMoviesLink").on("click", function () {
                userMovies.init()

            })


            // attach an event listener to the sign in/sign up button.
            // this function will build the sign in/sign up form and
            // and attach event listeners to the buttons built

            $("#signInLink").on("click", function () {

                // create a div that will contain sign in/sign up form
                let welcomeSpacerDiv = document.createElement("div")
                welcomeSpacerDiv.id = "welcomeSpacerDivId"
                $("#welcomePage").html(welcomeSpacerDiv)

                let welcomeDiv = document.createElement("div")

                // give it an id

                welcomeDiv.id = "welcomeDiv"

                // create an h2 that will label the email input

                let emailLabel = document.createElement("h2")

                emailLabel.id = "emailLabelId"

                // enter the text for the h2

                emailLabel.appendChild(document.createTextNode("Enter Email"))

                // create the input element for the user email

                let userEmailInput = document.createElement("input")

                // define its type

                userEmailInput.type = "email"

                // give it an id

                userEmailInput.id = "userEmailInput"

                // create an h2 that will be a label for the password input

                let passwordLabel = document.createElement("h2")

                passwordLabel.id = "passwordLabelId"

                // enter the text for the password h2

                passwordLabel.appendChild(document.createTextNode("Enter Password"))

                // create input element for password

                let passwordInput = document.createElement("input")

                // define the input type

                passwordInput.type = "password"

                // give it an id

                passwordInput.id = "passwordInput"

                // create the sign in button

                let signInButton = document.createElement("button")

                // give it an id

                signInButton.id = "signInButton"

                signInButton.classList.add("btn", "btn-danger")

                // add text to the sign in button

                signInButton.appendChild(document.createTextNode("Sign In"))

                // create sign up button

                let signUpButton = document.createElement("button")

                // give it an id

                signUpButton.id = "signUpButton"

                signUpButton.classList.add("btn", "btn-danger")

                //  add text to the sign up button

                signUpButton.appendChild(document.createTextNode("Sign Up"))
                
                // append the newly created elements to the welcome div


                welcomeDiv.appendChild(emailLabel)
                welcomeDiv.appendChild(userEmailInput)
                welcomeDiv.appendChild(passwordLabel)
                welcomeDiv.appendChild(passwordInput)
                welcomeDiv.appendChild(signInButton)
                welcomeDiv.appendChild(signUpButton)


                // add the welcome div to the DOM via jquery .html method

                $("#welcomeSpacerDivId").append(welcomeDiv)


                // add an event listener to the sign In button

                $("#signInButton").on("click", function () {

                    // require the needed module within the scope of the function

                    let auth = require("../authorization/authorization")

                    // invoke the sign in function

                    auth.signIn(

                        // use jquery .val method to pas the values of the input into
                        // the parameters of the sign in function


                        $("#userEmailInput").val(),
                        $("#passwordInput").val()
                    )
                })


                // add an event listener to the sign Up button

                $("#signUpButton").on("click", function () {

                    // require the needed module within the scope of the function

                    let auth = require("../authorization/authorization")

                    // invoke the sign Up function

                    auth.signUp(

                        // use jquery .val method to pas the values of the input into
                        // the parameters of the sign Up function


                        $("#userEmailInput").val(),
                        $("#passwordInput").val()
                    )
                })
            })
            

        }
    }
})

module.exports = navBuilder