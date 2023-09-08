const gulp = require('gulp');
const clean = require('gulp-clean');
const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json');

function cleanTask() {
    return gulp.src('dist', { allowEmpty: true, read: false })
        .pipe(clean());
}

function staticTask() {
    return gulp.src(['src/**/*.json'])
        .pipe(gulp.dest('dist'));
}

function scriptsTask() {
    const tsResult = tsProject.src()
        .pipe(tsProject());
    return tsResult.js
        .pipe(gulp.dest('dist'));
}

gulp.task('clean', cleanTask);
gulp.task('static', gulp.series('clean', staticTask));
gulp.task('scripts', gulp.series('static', scriptsTask));
gulp.task('build', gulp.series('scripts'));

gulp.task('default', gulp.series('build'));

gulp.task('watch', gulp.series('default', function watch() {
    gulp.watch(['src/**/*.ts', 'src/**/*.json'], gulp.series('default'));
}));

gulp.task('default', gulp.series('watch'));
