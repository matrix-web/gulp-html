import { paths } from '../gulpfile.esm'
import {parallel, watch} from 'gulp'
import browserSync from 'browser-sync'
import processView from "./processingHTML"
import styles from "./styles"
import scripts from "./scripts"
import sprites from "./svgsprite"
import images from "./image"
import fonts from "./fonts"

function server () {
    browserSync.init({
        server: {
            baseDir: './dist',
            index: 'index.html',
            open: true,
            cors: true
        },
        ui: {
            port: 9090
        }
    })

    watch(paths.html.watch, parallel(processView))
    watch(paths.styles.watch, parallel(styles))
    watch(paths.scripts.watch, parallel(scripts))
    watch(paths.sprites.watch, parallel(sprites))
    watch(paths.image.watch, parallel(images))
    watch(paths.fonts.watch, parallel(fonts))
}

export default server