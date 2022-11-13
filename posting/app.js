const request = require('sync-request');//同期
const fs = require('fs')
const sharp = require('sharp')

const app = require('./app2.js')
const app_posting = require('./app_posting.js')

// いい感じにPromiseでラップする
const sleep = (m) => {
    return new Promise((resolve) => setTimeout(resolve, m));
  };
  
//
async function main(poster, key, tag, limit){

    //同期
    const result = await app.getPosts(tag, limit)//tagを指定する
    console.log(result);

    console.log("sub call 開始");
    await sub(tag, limit, result);
    console.log("sub call 終了");

    console.log("ほげほげ call 開始");
    app_posting.createPost(poster, key,);
    console.log("ほげほげ call 終了");
}

async function sub(tag, limit, urls){
  
    console.log("画像をダウンロードする。");
    for (let index = 0; index < urls.length; index++) {
        let url = urls[index]; 
        url = url.replace(/(＿)/g, '%EF%BC%BF');//%EF%BC%BF 対応
        //同期
        console.log(`url=${url}`);
        const res = request('GET', url, {});
        if(res.statusCode === 200){
            fs.writeFileSync(`./images/${index + 1}.png`, res.body, 'binary');
        }
    }
    console.log("画像をダウンロードする。完了");
   

    const n = urls.length;
    const image_width = 200;
    const image_height = 150;
    const x = parseInt(Math.sqrt(n - 1)) + 1;
    const y = parseInt((n - 1) / x) + 1;
    console.log(`n=${n}`);
    console.log(`x=${x},y=${y}`);
    
    //
    console.log("ダウンロードした画像をリサイズする。");
    const imgBufferList = []
    for (let index = 0; index < urls.length; index++) {

        //console.log("1");
        try {
            console.log(`./images/${index + 1}.png`);
            //console.log("2");
            imgBufferList.push(
                await sharp(`./images/${index + 1}.png`)
                .resize(
                    {
                        width: image_width, 
                        height: image_height, 
                    })
                .toBuffer()
            )
            //console.log("3");
            process.stdout.write(`${index + 1}.png `);
    
        } catch (error) {
            console.log("catch");
            console.log(error); 
        }finally{
        }
    }

    //
    console.log("composite用のデータを作成する。");
    let payload = []
    for (let index = 0; index < urls.length; index++) {
        const dx = index % x;
        const dy = parseInt(index / x);
        console.log(`dx=${dx},dy=${dy}`);
        a = {
            input: imgBufferList[index],
            top: dy * image_height, 
            left: dx * image_width,
        };
        payload.push(a);
    }

    console.log("sharp");
    sharp(
        {//背景
            create: {
                width: x * image_width,
                height: y * image_height,
                channels: 4,
                background: { r: 100, g: 255, b: 100, alpha: 0.1 }//色を指定する。
            }
        })
        .composite(payload)
        //.toFile(`./${tag}_${limit}.png`);
        .toFile(`./post.png`);
    console.log("完了");
}



console.log("ゴミ削除");
const { execSync } = require('child_process')
execSync('rm -f ./images/*.png')
execSync('rm -f ./resize/*.png')
execSync('rm -f ./*.png')


//コマンドパラメータ取得
let poster = "yasu.pal";//デフォルト
let key = "5..."
if(process.argv.length > 3){
    poster = process.argv[2];//poster
    key = process.argv[3];//private key
}else{
   console.log('node app.js accountName posting_key'); 
   return;
}

let tag = "hive-161179";//デフォルト
let limit = 100;//デフォルト

console.log("main call 開始");
main(poster, dsteem.PrivateKey.fromString(key), tag, limit);
console.log("main call 終了");
