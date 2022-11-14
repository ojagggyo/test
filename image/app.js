const app_sign = require('./app_sign.js')
const app_upload = require('./app_upload.js')

const [username, wif, file_path] = process.argv.slice(2)
if (!username || !wif || !file_path) {
    process.stderr.write(`Usage: ./app.js <username> <posting_wif> <file>\n`)
    process.exit(1)
}
const signature = app_sign.sign(wif, file_path)
url = `https://steemitimages.com/${username}/${signature}`;

async function main () {
    const ret = await app_upload.upload(url, file_path)
    console.log(ret);
}

main();