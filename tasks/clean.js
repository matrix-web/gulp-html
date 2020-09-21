import clean from 'del'

async function cleanDist () {
    await clean(['./dist'])
}

export default cleanDist