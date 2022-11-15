const dsteem = require('dsteem')
const path = require('path')
const fs = require('fs');
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
    const body = `この記事は自動的に投稿されました。<br/><br/>今日一日に投稿された記事の最初の写真を集めました。写真がないときはプロフィール写真を代用しています。<br/><br/>![](${imageurl}) <br/><br/>https://steemit.com/created/${tag}`
    app_posting.createPost(username, key, title, body, imageurl);
}


//コマンドパラメータ取得
let [category, username, posting_key] = process.argv.slice(2)
if (!category|| !username || !posting_key) {
    try {
        const config = JSON.parse(fs.readFileSync("config.json"));    
        category = config.category;
        username = config.username;
        posting_key = config.posting_key;
    } catch (error) {
        process.stderr.write(`Usage: ./app.js <category> <username> <posting_key>\n`)
        process.exit(1)
    }    
}


let limit = 100;//デフォルト

console.log(`category=${category}`);
console.log(`username=${username}`);
console.log(`posting_key=非表示`);
console.log(`tag=${category}`);
console.log(`limit=${limit}`);


main(username, dsteem.PrivateKey.fromString(posting_key), category, limit)

setInterval(
    function(){
        main(username, dsteem.PrivateKey.fromString(posting_key), category, limit)
    }, 
    24 * 60 * 60 * 1000
    );
