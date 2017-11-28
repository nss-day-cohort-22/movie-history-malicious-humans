
const $ = require("jquery")


const navBuilder = Object.create(null, {

    "links": {
        value: [
            {
                "display": "Find New Movies",
                "linkClass": "findMoviesLinkClass",
                "linkId": "findMoviesLink",
                "adminView": true
            },
            {
                "display": "Search Your Movies",
                "linkClass": "searchUserMoviesLinkClass",
                "linkId": "searchUserMoviesLink",
                "adminView": true
            },
            {
                "display": "Current User",
                "linkClass": "currentUserDisplayClass",
                "linkId": "currentUserDisplay",
                "adminView":true,
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

    "init": {
        value: function (booVal) {
            const apiInterface = require("../apiSearch/apiInterface")
            let auth = require("../authorization/authorization")
            let navList = document.createElement("ul")

            this.links.forEach( link => {
                let currentLink = ""
                if (link.linkId === "currentUserDisplay") {
                    let activeUserObj = auth.activeUser
                    
                    currentLink = document.createElement("h2")
                    currentLink.classList.add(`${link.linkClass}`)
                    currentLink.id = `${link.linkId}`
                    currentLink.appendChild(document.createTextNode(activeUserObj.email))
                    if (booVal !== link.adminView) {
                        currentLink.classList.add("hidden")
                    }

                } else {
                    currentLink = document.createElement("button")
                    currentLink.classList.add(`${link.linkClass}`)
                    currentLink.id = `${link.linkId}`
                    currentLink.appendChild(document.createTextNode(`${link.display}`))

                    if (booVal !== link.adminView) {
                        currentLink.classList.add("hidden")
                    } 
                
                }
                navList.appendChild(currentLink)
            })

            $("#header").html(navList)
            $("#welcomePage").html("<h1>Welcome, what would you like to do?</h1>")

            $("#findMoviesLink").on("click", function () {
                apiInterface.displayInput()
            })

            $("#signInLink").on("click", function () {

                let welcomeDiv = document.createElement("div")
                welcomeDiv.id = "welcomeDiv"
                let emailLabel = document.createElement("h2")
                emailLabel.appendChild(document.createTextNode("Enter Email"))
                let userEmailInput = document.createElement("input")
                userEmailInput.type = "email"
                userEmailInput.id = "userEmailInput"
                let passwordLabel = document.createElement("h2")
                passwordLabel.appendChild(document.createTextNode("Enter Password"))
                let passwordInput = document.createElement("input")
                passwordInput.type = "password"
                passwordInput.id = "passwordInput"
                let signInButton = document.createElement("button")
                signInButton.id = "signInButton"
                signInButton.appendChild(document.createTextNode("Sign In"))
                let signUpButton = document.createElement("button")
                signUpButton.id = "signUpButton"
                signUpButton.appendChild(document.createTextNode("Sign Up"))
                

                welcomeDiv.appendChild(emailLabel)
                welcomeDiv.appendChild(userEmailInput)
                welcomeDiv.appendChild(passwordLabel)
                welcomeDiv.appendChild(passwordInput)
                welcomeDiv.appendChild(signInButton)
                welcomeDiv.appendChild(signUpButton)
                $("#welcomePage").html(welcomeDiv)

                $("#signInButton").on("click", function () {
                    let auth = require("../authorization/authorization")
                    auth.signIn(
                        $("#userEmailInput").val(),
                        $("#passwordInput").val()
                    )
                })

                $("#signUpButton").on("click", function () {
                    let auth = require("../authorization/authorization")
                    auth.signUp(
                        $("#userEmailInput").val(),
                        $("#passwordInput").val()
                    )
                })
            })
            

        }
    }
})

module.exports = navBuilder