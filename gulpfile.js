var gulp = require('gulp');
var jsdoc = require('gulp-jsdoc3');
var async = require('async');


gulp.task('test', function(cb) {
  var um = require('./routes/users.js');
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
      },
      function(callback) {
        um.db.close(callback);
      }
    ], cb);
  }, 100);
});

gulp.task('docs', function(cb) {
  var config = require('./jsdoc.json');
  gulp.src(['README.md', 'package.json', './routes/*.js'], {read: false})
    .pipe(jsdoc(config, cb));
});
