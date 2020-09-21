import { paths } from '../gulpfile.esm'
import { src, dest } from 'gulp'
import fileinclude from 'gulp-file-include'
import gulpif from 'gulp-if'
import replace from 'gulp-replace'
import browserSync from 'browser-sync'
import htmlclean from 'gulp-htmlclean'
import formatHTML from 'gulp-format-html'
import htmlValidator from 'gulp-w3c-html-validator'
import yargs from 'yargs'

const argv = yargs.argv,
    production = !!argv.production

function processingView () {
    return src(paths.html.src)
        .pipe(fileinclude({
            prefix: "@@",
            basepath: "@file"
        }))
        .pipe(formatHTML({
            verbose: true
        }))
        .pipe(htmlValidator())
        .pipe(gulpif(production, htmlclean()))
        .pipe(gulpif(production, replace(".css", ".min.css")))
        .pipe(gulpif(production, replace(".js", ".min.js")))
        .pipe(dest(paths.html.dist))
        .pipe(browserSync.stream())
}

export default processingView