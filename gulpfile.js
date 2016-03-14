var gulp = require('gulp');
var jsdoc = require('gulp-jsdoc');
var async = require('async');

var um = require('./routes/users.js');

gulp.task('test', function(cb) {
  setTimeout(function() {
    async.waterfall([
      function(callback) {
        um.register('test', 'test', function(err, result) {
          console.log(err, result);
          callback(err);
        });
      },
      function(callback) {
        um.login('test', 'test', function(err, result) {
          console.log(err, result);
          callback(err);
        });
      },
      function(callback) {
        um.delete('test', 'test', function(err, result) {
          console.log(err, result);
          callback(err);
        });
      }
    ], cb);
  }, 100);
});

gulp.task('docs', function() {
  gulp.src('./routes/*.js')
    .pipe(jsdoc('./documentation'));
});
