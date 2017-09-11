var gulp =require("gulp"),
    sass = require("gulp-sass"),
    jade = require("gulp-jade"),
    uglify = require("gulp-uglify");

gulp.task("sass",function(){
  return gulp.src("src/sass/*.sass")
             .pipe(sass())
             .pipe(gulp.dest("bundle/css/"));
});

gulp.task("jade",function(){
  return gulp.src("src/jade/*.jade")
             .pipe(jade())
             .pipe(gulp.dest("bundle/html/"));
});

gulp.task("jsmin",function(){
  return gulp.src("src/js/*.js")
             .pipe(uglify())
             .pipe(gulp.dest("bundle/js/"));
});

gulp.task("watch",function(){
  gulp.watch("src/sass/*.sass",["sass"]);
  gulp.watch("src/jade/*.jade",["jade"]);
  gulp.watch("src/js/*.js",["minjs"]);
});

gulp.task("all",["sass","jade","jsmin"]);
