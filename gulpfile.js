var gulp = require('gulp');

var um = require('./routes/users');

gulp.task('test', function(cb) {
  setTimeout(function() {
    um.login('test', 'test', function(err, result) {
      console.log(err, result);
      cb();
    });
  }, 500);
});
