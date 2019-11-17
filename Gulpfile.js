const gulp = require('gulp'); // https://github.com/gulpjs/gulp
const sass = require('gulp-sass'); // https://github.com/dlmanning/gulp-sass
const concat = require('gulp-concat'); // https://github.com/contra/gulp-concat can be used with any filetype
const rename = require('gulp-rename'); // https://github.com/hparra/gulp-rename
const postcss = require('gulp-postcss'); // https://github.com/postcss/postcss
const uncss = require('postcss-uncss'); // https://github.com/ben-eb/gulp-uncss
const cssnano = require('cssnano'); // minifier https://github.com/postcss/postcss

// checkCss to Task
  gulp.task('checkCss', () => {
    const plugins = [
      uncss({
        html: ['./public/*.html']
      }),
    ];
    return gulp.src('./public/css/*.css')
      .pipe(postcss(plugins))
      .pipe(rename('stylesInUse.css'))
      .pipe(gulp.dest('./public/css/'));
  });

// minifyCss Task
  gulp.task('minifyCss', () => {
    const processors = [
      cssnano
    ];
    return gulp.src('./public/css/style.css')
      .pipe(postcss(processors)) //all of the items in the processors array will be applied to the src css files
      .pipe(gulp.dest('./public/css/'));
  });

// pipeAllFiles task
  gulp.task('pipeAllFiles', () => {  // to ensure that all files have been transferred to public Folder
    const html = './src/*.html';
    const scripts = './src/scripts/*.js';
    const css = './src/css/*.css';

    gulp.src(html)
      .pipe(gulp.dest('./public/pipedfiles'));

    // gulp.src(scripts)
    //   .pipe(gulp.dest('./public/scripts/'));

    // gulp.src(css) //commented out since using postcss
    // .pipe(gulp.dest('./public/css/'));
  });

// concatcss Tasks
  gulp.task('concatcss', () => {
    return gulp.src('./src/sass/baseUtilities/*.scss') //returns all of the .scss files from currentDir/src/sass/baseUtilities/AnyFilesThatEndIn.scss
      .pipe(concat('all.scss')) //concats all of the found files into one file named here
      .pipe(gulp.dest('./public/ConcatenatedFiles')); //spits it out in this directory  cwd/dist/
  });

  gulp.task('concatMultiFolders', () => {
      return gulp.src(['./src/sass/baseUtilities/*.scss', './src/sass/pages/*.scss', './src/sass/bulmaOverWrites/*.scss'])  //the files will be concatted in the order they are specified here
        .pipe(concat('all.scss'))
        .pipe(gulp.dest('./public/ConcatenatedFiles')); //spits it out in this directory  cwd/dist/
    });



gulp.task('test', ['checkCss']) //to test against bulma files in use

gulp.task('default', ['sassStyles','sass']);



// sassStyles task 
  gulp.task('sassStyles', () => {
    gulp.src('src/sass/*.scss') //relative to Gulpfile.js 
      .pipe(sass().on('error', sass.logError)) //compiles the sass and if there is an error it explains where
      .pipe(gulp.dest('./public/css/'));  //outputs compiled sass here 
  });

  gulp.task('default', () => {
    gulp.watch('src/sass/**/*.scss', ['sassStyles']); //path to the files to watch, pass in an array with the tasks that we want to run when the files are changed
  });

// ______________________________________________MERGE BELOW
  gulp.task('sass', () => {
    let path1 = 'src/sass/**/*.scss';
    let path2 = 'src/sass/**/**/*.scss';
    gulp.watch([path1, path2], ['sassStyles']); //path to the files to watch, pass in an array with the tasks that we want to run when the files are changed
  });

  
  