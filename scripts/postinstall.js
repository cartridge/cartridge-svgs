'use strict';

// Package config
var packageConfig = require('../package.json');

// Node utils
var cartridgeUtil = require('cartridge-module-util')(packageConfig);
var path          = require('path');

var TASK_NAME = 'svgs';
var IMAGE_DIR;

// Transform function for adding paths
function projectConfigAddPaths(config) {
	if(!config.paths.src.hasOwnProperty(TASK_NAME)) {
		config.paths.src[TASK_NAME]  = config.dirs.src  + '/images/svgs/';
	}

	if(!config.paths.dest.hasOwnProperty(TASK_NAME)) {
		config.paths.dest[TASK_NAME]  = config.dirs.dest  + '/images/svgs/';
	}

	IMAGE_DIR = config.dirs.dest  + '/images';

	return config;
}

// Exit if NODE_ENV is development
cartridgeUtil.exitIfDevEnvironment();
// Make sure that the .cartridgerc file exists
cartridgeUtil.ensureCartridgeExists();
// Run through the project setup
cartridgeUtil.addToRc()
	.then(function() {
		return cartridgeUtil.modifyProjectConfig(projectConfigAddPaths);
	})
	.then(function(){
		return cartridgeUtil.addModuleConfig(path.resolve('_config', 'task.' + TASK_NAME + '.js'));
	})
	.then(function() {
		return cartridgeUtil.copyToProjectDir([{
			copyPath: 'svg-sprite-sass.tpl',
			destinationPath: IMAGE_DIR
		}])
	})
	.then(cartridgeUtil.finishInstall);
