module.exports = function (grunt) {

	'use strict';

	var files = [
			'bower_components/jquery/jquery.js',
			'bower_components/angularjs/angular.js',
			'js/**/*Module.js',
			'js/**/*.js'
		];

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		fileExists: {
			scripts: files
		},
		ngtemplates: {
			ngSlidesApp: {
				src: 'templates/**/*.html',
				dest: 'build/templates.js',
				options: {
					prefix: '/'
				}
			}
		},
		concat: {
			options: {
				separator: ';\n',
				banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
					'<%= grunt.template.today("yyyy-mm-dd") %> */\n',
				process: function(src, filepath) {
					return '//#### source: ' + filepath + ' ####\n' + src;
				}
			},
			dist: {
				src: files,
				dest: 'build/ngSlides.js'
			}
		},
		ngAnnotate: {
			default: {
				files: [
					{
						'build/ngSlides.annotated.js': ['build/ngSlides.js']
					}
				]
			}
		},
		uglify: {
			dist: {
				src: [
					'build/ngSlides.annotated.js'
				],
				dest: 'build/ngSlides.min.js'
			}
		},
		jshint: {
			options: {
				'curly': true,
				'eqeqeq': true,
				'immed': true,
				'latedef': true,
				'newcap': true,
				'noarg': true,
				'sub': true,
				'undef': true,
				'unused': true,
				'boss': true,
				'eqnull': true,
				'browser': true,
				'smarttabs': true,
				'quotmark': true,
				'notypeof': true,
				'globals': {
					'angular': true,
					'jQuery': true,
					'Modernizr': true,
					'module': true,
					'console': true
				}
			},
			gruntfile: {
				src: 'Gruntfile.js'
			},
			lib_test: {
				src: 'js/**/*.js'
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-file-exists');
	grunt.loadNpmTasks('grunt-ng-annotate');
	grunt.loadNpmTasks('grunt-angular-templates');

	grunt.registerTask('default', ['ngtemplates', 'jshint', 'fileExists', 'concat', 'ngAnnotate', 'uglify']);
	grunt.registerTask('dev', ['ngtemplates', 'jshint', 'fileExists', 'concat']);
};
