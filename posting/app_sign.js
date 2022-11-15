//const dsteem = require('dsteem')
const crypto = require('crypto')
const fs = require('fs')

module.exports.sign = (key, file_path) => {

    const data = fs.readFileSync(file_path)
    //const key = dsteem.PrivateKey.fromString(posting_key)
    const imageHash = crypto.createHash('sha256')
        .update('ImageSigningChallenge')
        .update(data)
        .digest()

    return key.sign(imageHash).toString();
}
