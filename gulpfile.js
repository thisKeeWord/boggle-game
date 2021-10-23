const gulp = require('gulp')
const notify = require('gulp-notify')
const nodemon = require('gulp-nodemon')

const browserify = require('browserify')
const source = require('vinyl-source-stream')
const watchify = require('watchify')

const sass = require('gulp-sass')
const sourcemaps = require('gulp-sourcemaps')
const rename = require('gulp-rename')
const autoprefixer = require('gulp-autoprefixer')

gulp.task('default', ['scripts:dev', 'serve'])
gulp.task('default', ['scripts:dev', 'sass:dev', 'sass:watch', 'serve'])
gulp.task('build', ['scripts', 'sass'])
gulp.task('scripts', () => build(false))
gulp.task('scripts:dev', () => build(true))
gulp.task('sass:watch', sassWatch)
gulp.task('serve', serve)

function build(development) {
  const props = {
    entries: ['scripts/index.tsx'],
    extensions: ['.tsx'],
    transform: [
      ['babelify', { presets: ['react', 'es6'] }],
    ],
    debug: development,
  }

  let bundler
  if (development) {
    bundler = watchify(browserify(props))
  } else {
    bundler = browserify(props).transform({
      global: true,
    }, 'uglifyify')
  }

  function rebundle() {
    bundler
      .bundle()
      .on('error', handleErrors)
      .pipe(source('main.js'))
      .pipe(gulp.dest('./'))
  }

  bundler.on('update', () => {
    const now = new Date()
    const updateStart = now.valueOf()
    // eslint-disable-next-line no-octal-escape
    const time = '\033[37m' + `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}` + '\033[0m'
    rebundle()
    // eslint-disable-next-line prefer-template, no-octal-escape
    console.log('[' + time + '] \033[32m[watchify] Updated!', (Date.now() - updateStart) + 'ms\033[0m')
  })

  return rebundle()
}

function handleErrors() {
  notify.onError({
    title: 'Compile Error',
    message: '<%= error.message %>',
    // eslint-disable-next-line prefer-rest-params
  }).apply(this, arguments)
  this.emit('end')
}

// eslint-disable-next-line no-redeclare
function sass() {
  gulp.src('src/sass/main.scss')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['> 5%'],
      cascade: false,
    }))
    .pipe(rename('style.css'))
    .pipe(gulp.dest('public/build/'))
}

function sassDev() {
  gulp.src('src/sass/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false,
    }))
    .pipe(rename('style.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./'))
}

function sassWatch() {
  gulp.watch('src/sass/*.scss', ['sass:dev'])
}

function serve() {
  nodemon({
    script: 'server/server.ts',
    ext: 'ts',
    watch: ['server/server.ts'],
  })
}
