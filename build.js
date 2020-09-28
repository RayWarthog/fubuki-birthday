const template_file = 'index.handlebars';
const output_html_file = "index.html";

const minify = require('html-minifier').minify;
const handlebars = require('handlebars');
const fs = require('fs').promises;

const css_file = "index.css";
const output_css_file = "index.min.css";
const CleanCSS = require('clean-css');


(async function () {
    const css_source = await (await fs.readFile(css_file)).toString();
    let options = {
        level: 2
    };
    let output_css = new CleanCSS(options).minify(css_source);
    await fs.writeFile(output_css_file, output_css.styles, function (err) {
        console.log(err)
    })

    const template_source = await (await fs.readFile(template_file)).toString();
    template_data = {

    };

    var template = handlebars.compile(template_source);

    let output_html = minify(
        template(template_data),
        {
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
    );
    await fs.writeFile(output_html_file, output_html, function (err) {
        console.log(err)
    })
})()
