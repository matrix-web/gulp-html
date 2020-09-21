import { paths } from "../gulpfile.esm"
import { src, dest } from "gulp"
import browserSync from "browser-sync"
import gulpif from "gulp-if"
import imagemin from "gulp-imagemin"
import imageGiflossy from "imagemin-giflossy"
import imageminZopfli from "imagemin-zopfli"
import imageminMozJpeg from "imagemin-mozjpeg"
import yargs from "yargs"

const argv = yargs.argv,
    production = !!argv.production

function images () {
    return src(paths.image.src)
        .pipe(gulpif(production, imagemin([
            imageGiflossy({
                optimizationLevel: 3,
                optimize: 3,
                lossy: 5,
            }),
            imageminZopfli({
                more: true
            }),
            imageminMozJpeg({
                quality: 95,
                progressive: true
            }),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: false},
                    {removeUnusedNS: false},
                    {removeUselessStrokeAndFill: false},
                    {cleanupIDs: false},
                    {removeComments: true},
                    {removeEmptyAttrs: true},
                    {removeEmptyText: true},
                    {collapseGroups: true}
                ]
            })
        ])))
    .pipe(dest(paths.image.dist))
    .on('end', browserSync.reload)
}

export default images