import { paths } from "../gulpfile.esm"
import { src, dest } from "gulp"
import gulpif from "gulp-if"
import rename from "gulp-rename"
import sass from  "gulp-sass"
import mincss from "gulp-clean-css"
import groupMediaQueries from "gulp-group-css-media-queries"
import autoprefixer from "gulp-autoprefixer"
import sourcemaps from "gulp-sourcemaps"
import plumber from "gulp-plumber"
import notify from "gulp-notify"
import yargs from "yargs"
import browserSync from 'browser-sync'
import gulpIf from "gulp-if"
import { TRUE } from "node-sass"

const argv = yargs.argv,
    production = !!argv.production

function styles () {
    return src(paths.styles.src)
        .pipe(plumber({
            errorHandler: notify.onError(err => {
                return {
                    title: "Styles",
                    sound: false,
                    message: err.message
                }
            })
        }))
        .pipe(gulpif(!production, sourcemaps.init()))
        .pipe(sass())
        .pipe(groupMediaQueries())
        .pipe(gulpIf(production, autoprefixer({
            cascade: false
        })))
        .pipe(gulpIf(production, mincss({
            compatibility: "ie9",
            level: {
                1: {
                    specialComments: 0,
                    removeEmpty: true,
                    removeWhitespace: true
                },
                2: {
                    mergeMedia: true,
                    removeEmpty: true,
                    removeDuplicateFontRules: true,
                    removeDuplicateMediaBlocks: true,
                    removeDuplicateRules: true,
                    removeUnusedAtRules: true
                }
            }
        })))
        .pipe(gulpif(!production, sourcemaps.write("/maps/")))
        .pipe(dest(paths.styles.dist))
        .pipe(browserSync.stream())
}

export default styles