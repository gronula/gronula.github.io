"use strict";

var gulp = require("gulp"),
    $ = require("gulp-load-plugins")(),
    del = require("del"),
    autoprefixer = require("autoprefixer"),
    server = require("browser-sync").create(),
    pump = require('pump');

gulp.task("clean", function () {
  return del(["build/**","!build","!build/img/**"]);
});

gulp.task("copy", function () {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/css/normalize.css"
  ], {base: "source"})
  .pipe(gulp.dest("build"));
});

gulp.task("css", function () {
  return gulp.src("source/less/style.less")
    .pipe($.plumber())
    .pipe($.less())
    .pipe($.postcss([
      autoprefixer()
    ]))
    .pipe($.csscomb())
    .pipe(gulp.dest("build/css"))
    .pipe($.csso())
    .pipe($.rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("sprite", function () {
  return gulp.src([
    "source/img/htmlacademy.svg",
    "source/img/icon-fb.svg",
    "source/img/icon-insta.svg",
    "source/img/icon-mail.svg",
    "source/img/icon-phone.svg",
    "source/img/icon-vk.svg"
  ])
    .pipe($.svgstore({
      inlineSvg: true
    }))
    .pipe($.rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
});

gulp.task("html", function () {
  return gulp.src("source/*.html")
    .pipe(gulp.dest("build"));
});

gulp.task("js", function (done) {
  pump([
    gulp.src("source/js/**/*.js")
    .pipe($.rename({suffix: ".min"})),
    $.uglify(),
    gulp.dest("build/js")
  ]);
  gulp.src("source/js/**/*.js")
  .pipe(gulp.dest("build/js"));
  done();
});

gulp.task("imagemin", function () {
  return gulp.src("source/img/**/*.{png,jpg,svg}")
    .pipe($.cache($.imagemin([
      $.imagemin.optipng({optimizationLevel: 3}),
      $.imagemin.jpegtran({progressive: true}),
      $.imagemin.svgo({
        plugins: [
          {inlineStyles: {onlyMatchedOnce: false}},
          {cleanupListOfValues: {floatPrecision: 1}}
        ]
      })
    ])))
    .pipe(gulp.dest("build/img"));
});

gulp.task("webp", function() {
  return gulp.src("build/img/**/{image,product}*.jpg")
    .pipe($.webp({quality: 90}))
    .pipe(gulp.dest("build/img"));
});

gulp.task("refresh", function (done) {
  server.reload();
  done();
});

gulp.task("server", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });
  gulp.watch("source/less/**/*.less", gulp.series("css"));
  gulp.watch('source/js/**/*.js', gulp.series('js', 'refresh'));
  gulp.watch("source/*.html", gulp.series("html", "refresh"));
});

gulp.task("clear", function (done) {
  $.cache.clearAll();
  done();
});

gulp.task("csscomb", function () {
  return gulp.src("source/less/**/*.less")
  .pipe($.csscomb())
  .pipe(gulp.dest("source/less"));
});

gulp.task("images", gulp.series("imagemin", "webp"));
gulp.task("build", gulp.series("clean", "copy", "css", "js", "html"));
gulp.task("start", gulp.series("build", "server"));
