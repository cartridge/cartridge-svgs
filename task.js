'use strict';
/* ============================================================ *\
	 MODULE NAME
\* ============================================================ */

// Gulp dependencies
var path = require('path');

// Module dependencies
var plumber = require('gulp-plumber');
var svgSprite = require('gulp-svg-sprite');

module.exports = function(gulp, projectConfig, tasks) {

	/* --------------------
	*	CONFIGURATION
	* ---------------------*/

	var TASK_NAME = 'svgs';

	// Task Config
	var taskConfig = require(path.resolve(process.cwd(), projectConfig.dirs.config, 'task.' + TASK_NAME + '.js'))(projectConfig);

	var svgSrc       = taskConfig.svgSrc;
	var outDir       = taskConfig.outDir;
	var config       = {
	    "dest": taskConfig.settings.dest,
	    "mode": {
	        "css": {
	        	"dest": taskConfig.settings.mode.css.dest,
	        	"sprite": taskConfig.settings.mode.css.sprite,
	            "render": {
	            	"scss": {
	            		'dest': taskConfig.settings.mode.css.render.scss.dest
	            	}
	            },
	           	"layout": taskConfig.settings.mode.layout,
	           	"prefix": taskConfig.settings.mode.prefix,
	           	"dimensions": taskConfig.settings.mode.dimensions,
	           	"bust": taskConfig.settings.mode.bust
	        }
	    }
	};


	/* --------------------
	*	MODULE TASKS
	* ---------------------*/

	gulp.task(TASK_NAME, function () {
		return gulp.src(taskConfig.svgSrc)
			.pipe(plumber())
			.pipe(svgSprite(taskConfig.settings)).on('error', function(error){ console.log(error); })
			.pipe(gulp.dest(taskConfig.outDir))
	});

	/* ----------------------------
	*	CARTRIDGE TASK MANAGEMENT
	* -----------------------------*/

	// Add the clean path for the generated styles
	projectConfig.cleanPaths.push(projectConfig.paths.dest[TASK_NAME]);
	// Add the task to the default list
	tasks.default.push(TASK_NAME);
}