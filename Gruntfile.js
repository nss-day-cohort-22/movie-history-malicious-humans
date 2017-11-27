module.exports = function(grunt) {
    
// Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        watch: {
            scripts: {
                files: ["**/scripts/**/*.js", "!node_modules/**/*.js", ],
                tasks: ["eslint", "browserify", "uglify"],
                options: {
                    spawn: false,
                },
            }
        },
        browserify: {
            options: {
                browserifyOptions: {
                    debug: true
                }
            },
            dist: {
                files: {
                    "build/bundle.js": ["scripts/main/main.js"],
                    
                },
            },
        },
        eslint: {
            all: ["**/scripts/**/*.js", "!node_modules/**/*.js", "!build/*.js"]
        }, 
        uglify: {
            options: {
                banner: "/*! <%= pkg.name %> <%= grunt.template.today(\"yyyy-mm-dd\") %> */\n"
            },
            build: {
                files: [{
                    expand: true,
                    cwd: "build",
                    src: "bundle.js",
                    dest: "build",
                    ext: ".min.js"
                }]
            }
        }
    })

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks("grunt-contrib-uglify")
    grunt.loadNpmTasks("grunt-contrib-watch")
    grunt.loadNpmTasks("grunt-browserify")

    //Load esLint task
    grunt.loadNpmTasks("grunt-eslint")
    

    // Default task(s).
    grunt.registerTask("default", ["browserify", "uglify", "eslint", "watch"])


}