"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
sass.compiler = require('node-sass');
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();

gulp.task("style", function(done) {
  gulp.src("src/scss/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("src/css"))
    .pipe(server.stream());

  done();
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