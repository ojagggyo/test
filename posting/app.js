const dsteem = require('dsteem')
const path = require('path')
const fs = require('fs');
const app = require('./app_getDiscussions.js')
const app_posting = require('./app_posting.js')
const app_sign = require('./app_sign.js')
const app_upload = require('./app_upload.js')
const app_downloadAndSave = require('./app_downloadAndSave.js')


async function main(username, key, category){

    const file_path = path.join(process.cwd(), "post.png");

    //記事の最初の画像のurlを取得
    const result = await app.getPosts(category)//tagを指定する
    console.log(result);

    //ダウンロードと画像の保存
    console.log("sub call 開始");
    await app_downloadAndSave.downloadAndSave(result, file_path);
    console.log("sub call 終了");

    //signature生成
    const signature = app_sign.sign(key, file_path);
    url = `https://steemitimages.com/${username}/${signature}`;
    
    //steemitに画像をアップロードする
    const ret = await app_upload.upload(url, file_path)
    console.log(ret);
    const imageurl = JSON.parse(ret).url;

    const title = `[今日も一日お疲れさまでした！] ${new Date().toLocaleDateString()}`;
    const body = `あなたの写真は見つかりましたか？<br/><br/>今日一日に投稿された記事の最初の写真を集めました。写真がないときはプロフィール写真を代用しています。<br/><br/>![](${imageurl}) <br/><br/>https://steemit.com/created/${category}`
    app_posting.createPost(username, key, category, title, body, imageurl);
}


//コマンドパラメータ取得
let [category, acount_name, posting_key] = process.argv.slice(2)
if (!category|| !acount_name || !posting_key) {
    try {
        const config = JSON.parse(fs.readFileSync("config.json"));    
        category = config.category;
        acount_name = config.username;
        posting_key = config.posting_key;
    } catch (error) {
        process.stderr.write(`Usage: ./app.js <category> <acount_name> <posting_key>\n`)
        process.exit(1)
    }    
}


console.log(`category=${category}`);
console.log(`acount_name=${acount_name}`);
console.log(`posting_key=非表示`);

main(acount_name, dsteem.PrivateKey.fromString(posting_key), category)

setInterval(
    function(){
        main(acount_name, dsteem.PrivateKey.fromString(posting_key), category)
    }, 
    24 * 60 * 60 * 1000
);
