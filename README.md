# Cartridge SVGs 
[![Build Status][travis-image]][travis-url] [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

> SVG expansion pack for [Cartridge](https://github.com/cartridge/cartridge)

To use this module, you will need cartridge-cli installed and have a cartridge project setup.

## Installation
```sh
npm install cartridge-svgs --save-dev
```

```sh
npm uninstall cartridge-svgs --save-dev
```

## Dependencies

This module adds the following to a project:

* Prevent pipe breaking caused by errors from gulp plugins using [gulp-plumber](https://www.npmjs.com/package/gulp-plumber)
* Create SVG sprites using [gulp-svg-sprite](https://www.npmjs.com/package/gulp-svg-sprite)
* Allow node files to be prepended with [prepend-file](https://www.npmjs.com/package/prepend-file)

## Config

This module uses many of the same options that are available in the gulp-svg-sprite plugin. The [documentation](https://github.com/jkphl/gulp-svg-sprite) for this plugin may provide some useful information on the usage and configuration of this module. 

Once installed, the config file `task.svgs.js` is created and stored in the _config directory in the root of your cartridge project. Use this file to alter the config of the module.

### Default config options

```
	var taskConfig = {
		svgSrc: projectConfig.paths.src.svgs + '**/*.svg',	// Where to look for SVGs within the project
		outDir: '',											// Main output directory of all generated files unless otherwise specified by individual mode options (see mode details). The default of this is empty in favour of the individual mode output directory paths.

		settings: {
		    "dest": "", 												// Output directory of all generated files unless otherwise specified by individual mode options (see mode details). The default of this is empty in favour of the individual mode output directory paths. This can be relative to the path set in outDir.
		    "mode": {													// Options for individual mode types
		        "css": {												// Options for the CSS mode type
		        	"dest": projectConfig.paths.src.sass + "/_objects", // Where to output generated CSS file containing SVG values - defaults to project config (_config/project.json) SASS path
		        	"sprite": process.cwd() + '/' + projectConfig.paths.dest.svgs + '/svgsprite.svg', // Where to output generated SVG sprite file and what to name it - defaults to project config SVG destination and "svgsprite.svg"
		            "render": {											// Stylesheet render options
		            	"scss": { 										// Declare SASS rendering and options
		            		'dest': "_objects.svgsprite.scss" 			// SASS file destination relative to mode dest with default filename "_objects.svgsprite.scss"
		            	}
		            },
		           	"layout": "packed", 								// Layout of svg in the sprite
		           	"prefix": ".svgsprite--%s", 						// Prefix for svg classes
		           	"dimensions": "__dimensions", 						// Suffix for dimensions class e.g. .svgsprite--hamburger__dimensions
		           	"bust": true 										// Cache busting
		        }
	    	}
	    }
	}
```

### Mode settings

### Mode type

At the moment, cartridge-svgs only supports the `css` output mode. Support for `view`, `defs`, `symbol`, and `stack` is planned.

Default mode is `css`
```
css: {
```

#### Destination

Where to output generated files of the output type.

Default path is `projectConfig.paths.src.sass + "/_objects"`. This path is the project config (`_config/project.json`) SASS src path, appended with an "/_objects" folder.

```
dest: projectConfig.paths.src.sass + "/_objects"
```

#### Sprite

Where to output the generated sprite file.

Default path is `process.cwd() + '/' + projectConfig.paths.dest.svgs + '/svgsprite.svg'`. This path is the project config (`_config/project.json`) SVG destination path, appended with the filename `svgsprite.svg`. Note the `process.cwd()`, required to change the directory from that set in the mode `dest` option in order to save SASS files to source folders and sprite files to public/destination folders.

```
sprite: process.cwd() + '/' + projectConfig.paths.dest.svgs + '/svgsprite.svg'
```

#### Render

The render option allows you to specify how to render the CSS, for example, in SASS, LESS or Stylus. Currently cartridge-svgs only supports SASS.

The render scss dest option defines where to output and what to name the SCSS file. This defaults to the mode destionation folder and the filename `_objects.svgsprite.scss`

```
dest: "_objects.svgsprite.scss"
```

#### Layout @TODO
This is the layout of the items within the SVG file. However this option seems to have disappeared from svg-sprite.

#### Prefix

Prefix to give to the CSS class.

Default is `.svgsprite--` 

```
prefix": ".svgsprite--%s"
```

#### Dimensions

Suffix for the CSS dimensions class. Each SVG sprite element has width and height dimensions added to it in a CSS class. This option adds a suffix to this class.

Default is `__dimensions`. With the default prefix and an SVG source file named `hamburger` this would result in .svgsprite--hamburger__dimensions`

#### Bust

Boolean option to set cache busting on or off.

Defaults to true (cache busting on).

```
bust: true
```

### Commit message standards [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
Try and adhere as closely as possible to the [Angular commit messages guidelines](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md#-git-commit-guidelines).

[Commitizen](https://github.com/commitizen/cz-cli) is a command line tool which can help with this:
```sh
npm install -g commitizen
```
Now, simply use `git cz` instead of `git commit` when committing.


[travis-url]: https://travis-ci.org/cartridge/base-module
[travis-image]: https://travis-ci.org/cartridge/base-module.svg?branch=master
