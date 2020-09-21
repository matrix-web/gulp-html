import  { paths } from "../gulpfile.esm"
import webpack from "webpack"
import webpackStream from "webpack-stream"
import { src, dest } from "gulp"
import gulpif from "gulp-if"
import rename from "gulp-rename"
import browserSync from "browser-sync"
import plumber from "gulp-plumber"
import notify from "gulp-notify"
import yargs from "yargs"

const webpackconfig = require('../webpack.config')
const argv = yargs.argv,
    production = !!argv.production

webpackconfig.mode = production ? 'production' : 'development'
webpackconfig.devtool = production ? false : 'source-map'

function scripts() {
    return src(paths.scripts.src)
        .pipe(plumber({
            errorHandler: notify.onError(err => {
                return {
                    title: "scripts",
                    sound: false,
                    message: err.message
                }
            })
        }))
        .pipe(webpackStream(webpackconfig), webpack)
        .pipe(gulpif(production, rename({
            suffix: ".min"
        })))
        .pipe(dest(paths.scripts.dist))
        .on("end", browserSync.reload)
}

export default scripts