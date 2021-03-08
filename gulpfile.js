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

gulp.task('scripts', async () => build(false));
gulp.task('scripts:dev', async () => build(true));
gulp.task('sass', sass);
gulp.task('sass:dev', sassDev);
gulp.task('sass:watch', sassWatch);
gulp.task('serve', serve);
gulp.task('build', gulp.series('scripts', 'sass'));
gulp.task('default', gulp.series('scripts:dev', 'sass:dev', 'sass:watch', 'serve'));

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


async function sass() {
  gulp.src('styles/styles.css')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['> 5%'],
      cascade: false
    }))
    .pipe(rename('style.css'))
    .pipe(gulp.dest('public/build/'));
}

async function sassDev() {
  gulp.src('styles/styles.css')
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

async function sassWatch() {
  gulp.watch('styles/*.css', gulp.series('sass:dev'));
}

function serve() {
  nodemon({
    script: 'server.js',
    ext: 'js',
    watch: ['server.js']
  });
}
