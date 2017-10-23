'use strict';

var path = require('path');

function getTaskConfig(projectConfig) {
	var taskConfig = {
		svgSrc: projectConfig.paths.src.svgs + '**/*.svg',
		spriteOutputDir: projectConfig.dirs.dest,
		settings: {
		    dest: '', // If using modes, leave this empty and configure on a mode level - determines where to put the SVG symbol/css sprite/def
		    mode: {
				css: {
					dest: projectConfig.paths.src.sass + '/_tools', // where it specifically puts the css file (not where it'd put the def / symbol etc)
					sprite: path.join(process.cwd(), projectConfig.paths.dest.images, '/sprite.svg'), // where it puts the svg file and what it names it
					layout: 'packed', // default - layout of svg in the sprite
					prefix: '.svgsprite--%s', // custom - prefix for svg classes
					dimensions: '__dimensions', // custom - suffix for dimensions class e.g. .svg--hamburger__dimensions
					bust: false, // default - cache busting,
					render: {
						scss: { // make it render scss and not css
							dest: '_tools.svg-sprite.scss', // scss file name
							template: path.join(process.cwd(), projectConfig.dirs.src, '/svg-sprite-sass.tpl')
						}
					}
				}
	    	},
			shape: {
				spacing: { // Spacing related options
					padding: 4, // Padding around all shapes
					box: 'content' // Padding strategy (similar to CSS `box-sizing`)
				}
			}
	    }

	}

	return taskConfig;
}

module.exports = getTaskConfig;