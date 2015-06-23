module.exports = function(grunt){

    grunt.initConfig({
        uglify: {
            options: {
                sourceMap: true,
                mangle: false
            },
            groupBy: {
                files: {
                    'dist/group-by.min.js': [
                        'src/group-by.js'
                    ]
                }
            }
        },

        watch: {
            js: {
                files: ['src/**/*.js'],
                tasks: ['uglify:groupBy']
            }

        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
};