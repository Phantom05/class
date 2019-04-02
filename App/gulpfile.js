const gulp = require('gulp');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const watch = require('gulp-watch');
const htmlmin = require('gulp-htmlmin');
const imgmin = require('gulp-imagemin');
const concat = require('gulp-concat');
const uglifycss = require('gulp-uglifycss');
const sourcemaps = require('gulp-sourcemaps');
const jsminify = require('gulp-js-minify');
const mq4HoverShim= require('mq4-hover-shim');
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const plumber = require('gulp-plumber');

let SRC = {
  HTML:"./public/src/assets/**/*.{html,htm}",
  SCSS:"./public/src/assets/scss/*.scss",
  JS:"./public/src/assets/**/*.js",
  IMG:"./public/dist/assets/**/*.{jpg,png,gif,svg}"
};
let DIST ={
  HTML:"./public/dist/assets/",
  CSS:"./public/dist/assets/css/",
  JS:"./public/dist/assets/",
  IMG:"./public/dist/assets/"
};

gulp.task("sass", ()=>{
  return gulp.src(SRC.SCSS)
  .pipe(sass().on('error', sass.logError))
  .pipe(uglifycss())
  .pipe(gulp.dest(DIST.CSS))
});

var scssOptions = {
  errLogToConsole: true,
  outputStyle: 'compressed',
  includePaths: [SRC.SCSS]
};

gulp.task('compile-scss', function () {
  var processors = [
      mq4HoverShim.postprocessorFor({ hoverSelectorPrefix: '.is-true-hover ' }),
      autoprefixer({
          browsers: [
              "Chrome >= 45",
              "Firefox ESR",
              "Edge >= 12",
              "Explorer >= 9",
              "iOS >= 9",
              "Safari >= 9",
              "Android >= 4.4",
              "Opera >= 30"
          ]
      })
  ];
  return gulp.src(SRC.SCSS)
      .pipe(sourcemaps.init())
      .pipe(sass(scssOptions).on('error', sass.logError))
      .pipe(postcss(processors))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(DIST.CSS))
});

gulp.task("babel", () =>{
  return gulp.src(SRC.JS)
  .pipe(babel())
  .pipe(jsminify())
  // .pipe(obf({replaceMethod:obf.LOOK_OF_DISAPPROVAL}))
  .pipe(sourcemaps.init())
  .pipe(plumber())
  // .pipe(concat('bundle.js'))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(DIST.JS))
});

gulp.task("imgmin", ()=>{
  return gulp.src(SRC.IMG)
  .pipe(imgmin())
  .pipe(gulp.dest(DIST.IMG))
});

gulp.task("watch", ()=>{
  let watcher ={
    js:gulp.watch(SRC.JS,["babel"]),
    scss:gulp.watch(SRC.SCSS,["sass"]),
    img:gulp.watch(SRC.IMG,["imgmin"])
  }
});

// gulp.task("ejs", function () {
//   return  gulp.src("./assets/views/**/*.ejs")
//     .pipe(plumber())  
//     // .pipe(stripEJSComments())
//     .pipe(minifyEjs({}))
//     .pipe(gulp.dest("./public/views"))
//     // .pipe(browserSync.stream({ stream: true }));
// });


gulp.task("default", ["babel","compile-scss","imgmin","watch"], ()=>{
  console.log('Gulp is running!')
})

