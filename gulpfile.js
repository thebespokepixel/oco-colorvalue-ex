/*
 * Client Gulp Template Tasks
 * (Work in progress)
 */
 /* eslint import/no-extraneous-dependencies: 0 */

const gulp = require('gulp')
const cordial = require('@thebespokepixel/cordial')()

// clean using trash
gulp.task('clean', cordial.shell({
	source: ['./scripts', './templates']
}).trash())

gulp.task('bundle', cordial.macro({
	source: 'src/index.es6'
}).basic())

gulp.task('master', cordial.macro({
	master: true,
	source: 'src/lib/index.es6'
}).basic())

// Binary output
gulp.task('bin', gulp.series(
	cordial.transpile({
		source: 'src/bin/palette2oco.es6'
	}).rollup.babel({
		banner: '#! /usr/bin/env node',
		dest: 'bin/palette2oco.js'
	}),
	cordial.shell().permissions({
		mode: '755',
		dest: 'bin/palette2oco.js'
	})
))

// Tests
gulp.task('ava', cordial.test().ava(['test/*.js']))
gulp.task('xo', cordial.test().xo(['src/*.es6']))
gulp.task('test', gulp.parallel('xo', 'ava'))

// Filesystem
gulp.task('permissions', cordial.shell().permissions({
	mode: '755',
	dest: 'scripts/install.js'
}))

// Hooks
gulp.task('start-release', gulp.series('reset', 'master'))
gulp.task('test-release', gulp.series('test'))
gulp.task('finish-release', gulp.series('push-force', 'push-tags'))

// Default
gulp.task('default', gulp.series('bundle'))

/*
 * Default tasks
 */

// gulp.task('reset', api.build().reset())
// gulp.task('bump', api.build().inc())

// gulp.task('commit', api.git({all: true}).commit())

// gulp.task('push', gulp.parallel(
// 	api.git({branch: 'master'}).push(),
// 	api.git({branch: 'develop'}).push()
// ))

// gulp.task('push-force', gulp.parallel(
// 	api.git({branch: 'master'}).push({force: true}),
// 	api.git({branch: 'develop'}).push({force: true})
// ))

// gulp.task('push-tags', gulp.parallel(
// 	api.git({branch: 'master'}).push({tags: true}),
// 	api.git({branch: 'develop'}).push({tags: true})
// ))

// gulp.task('backup', gulp.series(
// 	'push',
// 	api.git({remote: 'backup'}).push({all: true})
// ))

// gulp.task('short-circuit', api.test().shortCircuit())
// gulp.task('test', gulp.series('short-circuit'))

// gulp.task('publish', api.npm().publish())

// gulp.task('version-release', api.flow.release().versioning())

// gulp.task('start-release', gulp.series('reset'))
// gulp.task('test-release', gulp.series('test'))
// gulp.task('finish-release', gulp.series('push-force', 'push-tags'))

// gulp.task('post-flow-release-start', gulp.series('start-release', 'version-release'))
// gulp.task('post-flow-release-finish', gulp.series('test-release', 'publish', 'finish-release'))

// gulp.task('filter-flow-release-start-version', api.flow.release().filter.version)
// gulp.task('filter-flow-release-finish-tag-message', api.flow.release().filter.tag)
