var gulp = require('gulp');
var notify = require('gulp-notify');
var nodemon = require('gulp-nodemon');
var babelify = require('babelify');

var browserify = require('browserify');
var source = require('vinyl-source-stream');
var watchify = require('watchify');

var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('default', ['scripts:dev', 'sass:dev', 'sass:watch', 'serve']);
gulp.task('build', ['scripts', 'sass']);
gulp.task('scripts', () => build(false));
gulp.task('scripts:dev', () => build(true));
gulp.task('sass', sass);
gulp.task('sass:dev', sassDev);
gulp.task('sass:watch', sassWatch);
gulp.task('serve', serve);

function build(development) {
  var props = {
    entries: ['scripts/index.js'],
    extensions: ['.js'],
    transform: babelify.configure({ presets: ['react', 'es2015'] }),
    debug: development,
  };

  var bundler;
  if (development) {
    bundler = watchify(browserify(props));
  } else {
    bundler = browserify(props).transform({
      global: true
    }, 'uglifyify');
  }

  function rebundle() {
    bundler
      .bundle()
      .on('error', handleErrors)
      .pipe(source('main.js'))
      .pipe(gulp.dest('./'));
  }

  bundler.on('update', () => {
    var now = new Date;
    var updateStart = now.valueOf();
    var time = '\033[37m' + `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}` + '\033[0m';
    rebundle();
    console.log('[' + time + '] \033[32m[watchify] Updated!', (Date.now() - updateStart) + 'ms\033[0m');
  });

  return rebundle();
}

function handleErrors() {
  notify.onError({
    title: 'Compile Error',
    message: '<%= error.message %>',
  }).apply(this, arguments);
  this.emit('end');
}


function sass() {
  gulp.src('src/sass/main.scss')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['> 5%'],
      cascade: false
    }))
    .pipe(rename('style.css'))
    .pipe(gulp.dest('public/build/'));
}

function sassDev() {
  gulp.src('src/sass/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(rename('style.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./'));
}

function sassWatch() {
  gulp.watch('src/sass/*.scss', ['sass:dev']);
}

function serve() {
  nodemon({
    script: 'server.js',
    ext: 'js',
    watch: ['server.js']
  });
}


// var gulp = require('gulp');
// var source = require('vinyl-source-stream');
// var browserify = require('browserify');
// var watchify = require('watchify');
// var reactify = require('reactify');
// var nodemon = require('gulp-nodemon');
// var uglify = require('gulp-uglify');
// var babelify = require('babelify');
// var buffer = require('vinyl-buffer');

// gulp.task('browserify', scripts)
//     .task('serve', serve);

// function scripts() {
//   var bundler = browserify({
//     entries: ['./scripts/App.js'],
//     transform: babelify.configure({ presets: ['react', 'es2015'] }),
//     debug: false,
//     cache: {},
//     packageCache: {},
//     fullPaths: false
//   });
//   var watcher = watchify(bundler);

//   return watcher
//     .on('update', function() {
//       var updateStart = Date.now();
//       console.log('Updating!');
//       watcher.bundle()
//       .on('error', function(err) {
//         console.log('Error with compiling components', err.message);
//       })
//       .pipe(source('bundle.js'))
//       .pipe(buffer())
//       .pipe(uglify())
//       .pipe(gulp.dest('./build/'));
//       console.log('Updated!', (Date.now() - updateStart) + 'ms');
//     })
//     // Create the initial bundle when starting the task
//     .bundle()
//     .on('error', function(err) {
//       console.log('Error with compiling components', err.message);
//     })
//     .pipe(source('bundle.js'))
//     .pipe(buffer())
//     .pipe(uglify())
//     .pipe(gulp.dest('./build/'));
// }

// function serve() {
//   nodemon({
//     script: 'server.js',
//   });
// }


// gulp.task('default', ['browserify', 'serve']);

