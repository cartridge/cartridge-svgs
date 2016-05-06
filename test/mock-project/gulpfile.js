/*jslint node: true */
'use strict';

// Gulp
var gulp   = require('gulp');
// var argv   = require('yargs').argv;

// Node
var path = require('path');
var fs   = require('fs');
var argv   = require('yargs').argv;

// Tasks
var tasks         = {};

tasks.default     = [];
tasks.watch       = [];

// Config
var config        = require('./_config/project.json');

config.cleanPaths = [];
config.creds      = require('./_config/creds.json');

config.isProd     = argv.prod || false;
config.isWatched  = false;

require(path.resolve('..', '..', 'task.js'))(gulp, config, tasks);