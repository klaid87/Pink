"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
sass.compiler = require('node-sass');
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var minify = require("gulp-csso");
var rename = require("gulp-rename");
var webp = require("gulp-webp");
var imagemin = require("gulp-imagemin");
var server = require("browser-sync").create();

gulp.task("style", function(done) {
  gulp.src("src/scss/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("src/css"))
    .pipe(minify())
    .pipe(rename("style-min.css"))
    .pipe(gulp.dest("src/css"))
    .pipe(server.stream());

  done();
});

gulp.task("images", function() {
  return gulp.src("src/images/**/*.{png,jpg,svg}")
  .pipe(imagemin([
    imagemin.optipng({optimizationLevel: 3}),
    imagemin.jpegtran({progresiv: true}),
    imagemin.svgo()
  ]))
  .pipe(gulp.dest("src/images"));
});

gulp.task("webp", function() {
  return gulp.src("src/images/**/*.{png,jpg}")
  .pipe(webp({quality: 90}))
  .pipe(gulp.dest("src/images"));
});

gulp.task("serve", function(done) {
  server.init({
    server: "src/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("src/scss/**/*.scss", gulp.series("style"));
  gulp.watch("src/*.html").on("change", server.reload);

  done();
});

gulp.task("default", gulp.series("style", "serve"));