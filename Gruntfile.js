module.exports = function(grunt) {

    require("load-grunt-tasks")(grunt);

    grunt.initConfig({
        "babel": {
            options: {
                sourceMap: true,
                presets: ['babel-preset-es2015']
            },
            dist: {
                files: [{
                    "dist/index.js": "./index.js"
                }, {
                    expand: true,
                    src: ['./src/*.js'],
                    dest: './dist',
                    ext: '.js'
                }]
            }
        }
    });

    grunt.registerTask("default", ["babel"]);
}
