const firebase = require("firebase")
const $ = require("jquery")

const observer = Object.create(null, {
    "init": {
        value: function (auth) {
            firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                    auth.activeUser = user
                    $(".headerClass").text("Welcome" + auth.activeUser)
                    $("#welcomeDiv").toggleClass("hidden")
                    let welcomeText = "<h1>What would you like to do?</h1>"
                    $("#welcomePage").html(welcomeText)
                } else {
                    auth.activeUser = null
                }
            })
        }
    }
})

module.exports = observer