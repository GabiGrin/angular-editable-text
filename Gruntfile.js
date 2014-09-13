// Generated on 2014-06-13 using generator-angular 0.8.0
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    grunt.loadNpmTasks('grunt-karma-coveralls');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        yeoman: {
            // configurable paths
            app: require('./bower.json').appPath || 'app',
            dist: 'dist'
        },

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            bower: {
                files: ['bower.json'],
                tasks: ['bowerInstall']
            },
            js: {
                files: ['<%= yeoman.app %>/scripts/{,*/}*.js'],
                tasks: ['newer:jshint:all'],
                options: {
                    livereload: true
                }
            },
            module:{
                files:['src/*.js'],
                tasks:'build',
                options:{
                    livereload:true
                }
            },
            jsTest: {
                files: ['test/spec/{,*/}*.js','src/*.js','karma.conf.js'],
                tasks: ['test']
            },
            styles: {
                files: ['src/*.css'],
                tasks: ['concat:copyhack2','concat:copyhack3','cssmin']
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= yeoman.app %>/{,*/}*.html',
                    '.tmp/styles/{,*/}*.css',
                    '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },

        // The actual grunt server settings
        connect: {
            options: {
                port: 9000,
                // Change this to '0.0.0.0' to access the server from outside.
                hostname: 'localhost',
                livereload: 35729
            },
            livereload: {
                options: {
                    open: true,
                    base: [
                        '.tmp',
                        '<%= yeoman.app %>'
                    ]
                }
            },
            test: {
                options: {
                    port: 9001,
                    base: [
                        '.tmp',
                        'test',
                        '<%= yeoman.app %>'
                    ]
                }
            },
            dist: {
                options: {
                    base: '<%= yeoman.dist %>'
                }
            }
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                '<%= yeoman.app %>/scripts/{,*/}*.js'
            ],
            test: {
                options: {
                    jshintrc: 'test/.jshintrc'
                },
                src: ['test/spec/{,*/}*.js']
            }
        },

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [
                    {
                        dot: true,
                        src: [
                            '.tmp',
                            '<%= yeoman.dist %>/*',
                            '!<%= yeoman.dist %>/.git*'
                        ]
                    }
                ]
            },
            server: '.tmp'
        },

        cssmin: {
            my_target: {
                files: [{
                    expand: true,
                    cwd: 'dist/',
                    src: ['*.css', '!*.min.css'],
                    dest: 'dist/',
                    ext: '.min.css'
                }]
            }
        },


        // Automatically inject Bower components into the app
        bowerInstall: {
            app: {
                src: ['<%= yeoman.app %>/index.html'],
                ignorePath: '<%= yeoman.app %>/'
            }
        },

        // ngmin tries to make the code safe for minification automatically by
        // using the Angular long form for dependency injection. It doesn't work on
        // things like resolve or inject so those have to be done manually.
        ngmin: {
            dist: {
                files: [
                    {
                        expand: true,
                        src: 'dist/*.js',
                        dest: '.tmp'
                    }
                ]
            }
        },

        concat: {
            dist: {
                src: ['src/module.js', 'src/*.js','!src/*old*.js'],
                dest: 'dist/angular-editable-text.js'
            },
            copyhack: {
                src: ['dist/angular-editable-text.js'],
                dest: 'demo/angular-editable-text.js'
            },
            copyhack2:{
                src:'src/style.css',
                dest:'demo/style.css'
            },
            copyhack3:{
                src:'src/style.css',
                dest:'dist/angular-editable-text.css'
            }
        },
        uglify: {
            dist: {
                src: '.tmp/dist/*.js',
                dest: 'dist/angular-editable-text.min.js'
            }
        },
        coveralls: {
            options: {
                debug: true,
                coverage_dir: 'coverage',
                dryRun: true,
                force: true,
                recursive: true
            }
        },
        // Test settings
        karma: {
            unit: {
                configFile: 'karma.conf.js',
                singleRun: true
            }
        }
    });


    grunt.registerTask('serve', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);

        }

        grunt.task.run([
            'clean:server',
          //  'bowerInstall',
            'connect:livereload',
            'watch'

        ]);
    });

    grunt.registerTask('test', [
        'clean:server',
        'connect:test',
        'karma'
    ]);


    grunt.registerTask('build', [
        'clean:dist',
        'concat',
        'ngmin',
        'uglify',
        'cssmin'
       // 'test',
       // 'coveralls'
    ]);

    grunt.registerTask('default', [
        //'newer:jshint',
        'test',
        'build',
        'serve'
    ]);
};
