import { series, parallel } from 'gulp'
import cleanDist from './tasks/clean'
import processHTML from "./tasks/processingHTML"
import styles from "./tasks/styles"
import scripts from "./tasks/scripts"
import sprites from "./tasks/svgsprite"
import fonts from "./tasks/fonts"
import server from "./tasks/server"
import images from "./tasks/image"
import favicons from "./tasks/favicons"

const paths = {
    html: {
        src: ["./src/**/*.html", "!./src/html/sections/**/*.html"],
        watch: ["./src/**/*.html", 
            "./src/html/**/*.html"],
        dist: './dist'
    },
    styles: {
        src: "./src/styles/main.{scss,sass}",
        watch: "./src/styles/**/*.{scss,sass}",
        dist: "./dist/css"
    },
    scripts: {
        src: "./src/js/**/index.js",
        watch: "./src/js/**/*.js",
        dist: "./dist/js"
    },
    fonts: {
        src: "./src/fonts/**/*.{woff,woff2}",
        dist: "./dist/fonts/",
        watch: "./src/fonts/**/*.{woff,woff2}"
    },
    image: {
        src: [
            "./src/img/**/*.{jpg,jpeg,png,gif,tiff,svg}",
            "!./src/img/favicons/**/*.{jpg,jpeg,png,gif,tiff,svg}"
        ],
        watch: "./src/img/**/*.{jpg,jpeg,png,gif,tiff,svg}",
        dist: "./dist/img"
    },
    sprites: {
        src: "./src/img/svg/*.svg",
        dist: "./dist/img/sprites/",
        watch: "./src/img/svg/*.svg"
    },
    favicons: {
        src: "./src/img/favicon/*.{jpg,jpeg,png,gif}",
        dist: "./dist/img/favicons/",
    }
}

export { paths }

export const development = series(cleanDist,
    parallel([processHTML, styles, scripts, images, sprites, fonts, favicons]),
    parallel(server)
)

export const production = series(cleanDist,
    parallel([processHTML, styles, scripts, images, sprites, fonts, favicons])
)

export default development