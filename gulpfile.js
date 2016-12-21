var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var typescript = require('gulp-typescript');
var systemjsBuilder = require('systemjs-builder');

// Compile TypeScript app to JS
gulp.task('compile:ts', function () {
  return gulp
    .src([
        "app/**/*.ts",
        "typings/*.d.ts"
    ])
    .pipe(sourcemaps.init())
    .pipe(typescript({
        "module": "system",
        "moduleResolution": "node",
        "outDir": "app",
        "target": "ES5",
        "outFile": "bundle.js"
    }))
    /*.pipe(concat('app.js'))*/.pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('build'));
});

// Generate systemjs-based bundle (app/app.js)
gulp.task('bundle:app', function() {
  var builder = new systemjsBuilder('./', './systemjs.config.js');
  return builder.bundle('app/main', 'build/app.js').then(function(){
      
  }).catch(function(err){
      console.log(err);
  });
});

// Copy and bundle dependencies into one file (vendor/vendors.js)
// system.config.js can also bundled for convenience
gulp.task('bundle:vendor', function () {
    return gulp.src([
        'node_modules/zone.js/dist/zone.js',
        'node_modules/reflect-metadata/Reflect.js',
        'node_modules/systemjs/dist/system-polyfills.js',
        'node_modules/core-js/client/shim.min.js',
        'node_modules/systemjs/dist/system.src.js',
        'systemjs.config.js',
      ])
        .pipe(concat('vendors.js'))
        .pipe(gulp.dest('build/vendor'));
});

// Copy dependencies loaded through SystemJS into dir from node_modules
gulp.task('copy:vendor', function () {
    return gulp.src([
        'node_modules/rxjs/bundles/Rx.js',
        'node_modules/@angular/**/*'
    ])
    .pipe(gulp.dest('build/vendor'));
});

gulp.task('vendor', ['bundle:vendor', 'copy:vendor']);
gulp.task('app', ['compile:ts', 'bundle:app']);

// Bundle dependencies and app into one file (app.bundle.js)
gulp.task('bundle', ['vendor', 'app'], function () {
    return gulp.src([
        'build/app.js',
        'build/vendor/vendors.js'
        ])
    .pipe(concat('app.bundle.js'))
    //.pipe(uglify())
    .pipe(gulp.dest('./build/app'));
});

gulp.task('default', ['bundle']);