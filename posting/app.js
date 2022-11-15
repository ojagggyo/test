const dsteem = require('dsteem')
const path = require('path')
const app = require('./app_getDiscussions.js')
const app_posting = require('./app_posting.js')
const app_sign = require('./app_sign.js')
const app_upload = require('./app_upload.js')
const app_downloadAndSave = require('./app_downloadAndSave.js')


async function main(username, key, tag, limit){

    const file_path = path.join(process.cwd(), "post.png");

    //記事の最初の画像のurlを取得
    const result = await app.getPosts(tag, limit)//tagを指定する
    console.log(result);

    //ダウンロードと画像の保存
    console.log("sub call 開始");
    await app_downloadAndSave.downloadAndSave(tag, limit, result, file_path);
    console.log("sub call 終了");

    //signature生成
    const signature = app_sign.sign(key, file_path);
    url = `https://steemitimages.com/${username}/${signature}`;
    
    //steemitに画像をアップロードする
    const ret = await app_upload.upload(url, file_path)
    console.log(ret);
    const imageurl = JSON.parse(ret).url;

    const title = `[今日も一日お疲れさまでした！] ${new Date().toLocaleDateString()}`;
    const body = `この記事は自動的に投稿されました。<br/><br/>今日一日に投稿された記事の最初の写真を集めました。写真がないときはプロフィール写真を代用しています。<br/><br/>![](${imageurl}) `
    app_posting.createPost(username, key, title, body, imageurl);
}


//コマンドパラメータ取得
const [username, posting_key] = process.argv.slice(2)
if (!username || !posting_key) {
    process.stderr.write(`Usage: ./app.js <username> <posting_key>\n`)
    process.exit(1)
}

let tag = "hive-161179";//デフォルト
let limit = 100;//デフォルト

console.log("main call 開始");
main(username, dsteem.PrivateKey.fromString(posting_key), tag, limit);
console.log("main call 終了");
