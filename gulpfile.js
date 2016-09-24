/*
 * Gulp User Tasks
 */

const gulp = require('gulp')
const cordial = require('@thebespokepixel/cordial')()

// transpilation/formatting
gulp.task('bundle', cordial.macro({
	source: 'src/index.js'
}).basic())

gulp.task('master', cordial.macro({
	master: true,
	source: 'src/index.js'
}).basic())

// Hooks
gulp.task('start-release', gulp.series('reset', 'master'))

// Clean
gulp.task('clean', cordial.shell({
	source: ['npm-debug.log', './nyc_output', './test/coverage']
}).trash())

// Tests
gulp.task('ava', cordial.test().ava(['test/*.js']))
gulp.task('xo', cordial.test().xo(['src/lib/*.js']))
gulp.task('test', gulp.parallel('xo', 'ava'))

// Default
gulp.task('default', gulp.series('bump', 'bundle'))
