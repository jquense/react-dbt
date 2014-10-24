var gulp = require('gulp')
  , plumber = require('gulp-plumber')
  , bootstrap = require('./bootstrap/build')
  , fs = require('fs')
  , dev  = require('./tasks/development');

gulp.task('dev-server',   dev.devServer)
//gulp.task('bootstrap', bootstrap);


// gulp.task('less', function(){
//     gulp.src('./styles/site.less')
//         .pipe(plumber())
//         .pipe(less())
//         .pipe(gulp.dest('./public/css'));
// });


// gulp.task('libs', function () {
//     var bundle = browserify();

//     bundle.require('react')
//     bundle.require('react-bootstrap')
//     bundle.require('lodash')
//     bundle.require('when')

//     bundle.bundle({ debug: true })
//         .on("error", handleError)
//         .pipe(source('lib.js'))
//         .pipe(plumber())
//         .pipe(gulp.dest('./public/js'))

// });

// gulp.task('app', function(){
//     var bundle = browserify();

//     bundle.add('./src/app.jsx')
//     bundle.transform({ es6: true },'reactify')
//     bundle.external('react')
//     bundle.external('react-bootstrap')
//     bundle.external('lodash')
//     bundle.external('when')

//     bundle.bundle({ debug: true })
//         .on("error", handleError)
//         .pipe(source('./app.js'))
//         .pipe(plumber())
//         .pipe(gulp.dest('./public/js'))

// });

// gulp.task('watch', function() {
//     gulp.watch('./bootstrap/**/*', ['bootstrap']);
//     gulp.watch('./styles/**/*.less', ['less']);
//     gulp.watch(['app.jsx', './src/**/*.js', './src/**/*.jsx'], ['browserify']);
// });

// Default Task
gulp.task('browserify', ['libs', 'app']);
gulp.task('default', ['browserify', 'less', 'bootstrap']);

function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}