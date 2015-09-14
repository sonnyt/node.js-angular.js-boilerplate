node.js-angular.js-boilerplate
==============================

Simple boilerplate for Node.js and Angular.js

## Tech Stack

Single page web application is built using:
- Node.js
- Angular.js
- SASS
- Gulp.js

## Installation
Make sure you have the latest Node.js installed and run the command `npm run setup` which will:

1. Install NPM packages
2. Install Bower packages
3. Build the applicaiton

After successfully finishing the build process. Gulp creates and stores all of the compiled and uglified and compiled files inside of a newly created "public" directory. 

## Development
To have both node.js and gulp watch instance running, just run the gulp default task. `gulp`. Also, `gulp build` task is available to build the project without running any watch tasks or the node.js server.

## Notes
To run the application locally on your machine, call `node api/app`. Also, while developing it's recommended to run `gulp watch` to autocompile your assets while you make changes.
