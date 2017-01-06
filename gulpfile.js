const gulp = require('gulp');
const css = require('./config/gulp/css');
const {SRC} = require('./config/build.config');
const path = require('path');


gulp.task('css', css);

gulp.task('watch', ['css'] , () => {

  const globs = [
    '**/*.scss'
  ].map(p => path.join(SRC, p));

  gulp.watch(globs, ['css']);
});
