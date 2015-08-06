var gulp = require('gulp');
var del = require('del');
var typescript = require('gulp-typescript');

var PATHS = {
    src: {
        js: 'src/**/*.ts',
        html: 'src/**/*.html'
    },
    lib: [
        'node_modules/angular2/node_modules/traceur/bin/traceur-runtime.js',
        'node_modules/systemjs/dist/system-csp-production.src.js'
    ]
};

gulp.task('clean', function (done) {
    del(['dist'], done);
});

gulp.task('ng2', function () {
    var download = require('gulp-download');
    var ng2Version = require('./package.json').dependencies.angular2;
    return download('https://code.angularjs.org/' + ng2Version + '/angular2.js').pipe(gulp.dest('dist/lib'));
});

gulp.task('js', function () {
    var tsResult = gulp.src(PATHS.src.js)
        .pipe(typescript({
            noImplicitAny: true,
            module: 'system',
            target: 'ES5',
            experimentalDecorators: true
        }));

    return tsResult.js.pipe(gulp.dest('dist'));
});

gulp.task('html', function () {
    return gulp.src(PATHS.src.html).pipe(gulp.dest('dist'));
});

gulp.task('libs', ['ng2'], function () {
    return gulp.src(PATHS.lib).pipe(gulp.dest('dist/lib'));
});

gulp.task('play', ['libs', 'html', 'js'], function () {
    var http = require('http');
    var connect = require('connect');
    var serveStatic = require('serve-static');
    var open = require('open');

    var port = 9000, app;

    gulp.watch(PATHS.src.html, ['html']);
    gulp.watch(PATHS.src.js, ['js']);

    app = connect().use(serveStatic(__dirname + '/dist'));  // serve everything that is static
    http.createServer(app).listen(port, function () {
        open('http://localhost:' + port);
    });
});

