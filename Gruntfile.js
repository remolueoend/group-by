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

        },

        bump: {
            options: {
                files: ['package.json', 'bower.json'],
                updateConfigs: [],
                commit: true,
                commitMessage: 'Release v%VERSION%',
                commitFiles: ['package.json', 'bower.json'],
                createTag: true,
                tagName: 'v%VERSION%',
                tagMessage: 'Version %VERSION%',
                push: true,
                pushTo: 'origin',
                gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
                globalReplace: false,
                prereleaseName: false,
                regExp: false
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-bump');
};