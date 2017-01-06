const gulp = require('gulp');
const sass = require('gulp-sass');
const cache = require('gulp-cached');
const progeny = require('gulp-progeny');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const path = require('path');

const {
  SRC,
  CSS_BUILD,
  ENV_IS_DEVELOPMENT,
  ENV_IS_PRODUCTION,
  MAIN_ENTRY_FILENAME,
  ROOT
} = require('../build.config');


let globs = [
  `${MAIN_ENTRY_FILENAME}.scss`,
  'LayoutAssembler/**/!(_)*.scss',
  'Routes/**/!(_)*.scss',
  'Components/**/!(_)*.scss'
].map(i => path.join(SRC, i));

const dest = path.relative(ROOT, CSS_BUILD);

function cssGulpTask() {
  const options = {
    base: SRC
  };

  const postcssOptions = {};
  const sassOptions = {
    outputStyle: 'nested'
  };

  const processors = [
    autoprefixer({browsers: ['last 2 version']}),
  ];

  let task = gulp.src(globs, options);

  if(ENV_IS_DEVELOPMENT) {
    task = task
      .pipe(sourcemaps.init())
      .pipe(cache('style'))
      .pipe(progeny())
      .pipe(postcss([
        require('stylelint')
      ], {
        syntax: require('postcss-scss')
      }))
    ;
  }

  if(ENV_IS_PRODUCTION) {
    processors.push(
      require('cssnano')
    )
  }

  task = task
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(postcss(processors, postcssOptions))
  ;

  if(ENV_IS_DEVELOPMENT) {
    task = task
      .pipe(sourcemaps.write('./'))
    ;
  }


  return task.pipe(gulp.dest(dest))
}

module.exports = cssGulpTask;
