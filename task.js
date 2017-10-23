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