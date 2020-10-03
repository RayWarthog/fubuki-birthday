const { src, dest, series } = require('gulp');
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');

const handlebars = require('gulp-compile-handlebars');
const csvparse = require('csv-parse/lib/sync');
const message_csv_file = 'src/messages.csv';
const fs = require('fs').promises;
const htmlmin = require('gulp-htmlmin');

const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

const imagemin = require('gulp-imagemin');

function minifycss() {
    return src('src/*.css')
        .pipe(cleanCSS({
            level: 2
        }))
        .pipe(dest('dist'));
}

async function build_html() {
    let message_data = []

    let content = await fs.readFile(message_csv_file);
    let records = csvparse(content, { from_line: 2 });

    records.map(
        record => {
            message_row = {
                targetid: record[0],
                name: record[1].trim(),
                msg: record[2].trim()
            };
            message_data.push(message_row);
        }
    );

    let template_data = {
        messages: message_data
    };
    let htmlminoptions = {
        minifyCSS: true,
        minifyJS: true,
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
        removeAttributeQuotes: true,
        removeComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
    }

    return src('src/index.handlebars')
        .pipe(handlebars(template_data))
        .pipe(htmlmin(htmlminoptions))
        .pipe(rename('index.html'))
        .pipe(dest('.'));
}

function minifyjs() {
    return src('src/*.js')
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(uglify())
        .pipe(dest('dist'))
}

function minifyimg() {
    return src('src/img/*')
        .pipe(imagemin())
        .pipe(dest('dist/img'))
}

exports.build_full = series(minifycss, build_html, minifyjs, minifyimg);
exports.build = series(minifycss, build_html, minifyjs);
