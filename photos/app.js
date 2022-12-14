const request = require('request')//非同期
//const request = require('sync-request');//同期

const fs = require('fs')
const sharp = require('sharp')

const app = require('./app_getPosts.js')

// いい感じにPromiseでラップする
const sleep = (m) => {
    return new Promise((resolve) => setTimeout(resolve, m));
  };
  
//

async function get(index, url){
    return new Promise((resolve, reject) => {
        console.log(`url=${url}`);
        request(
            {method: 'GET', url: url, encoding: null},
            function (error, response, body){
                if(!error && response.statusCode === 200){
                    fs.writeFileSync(`./images/${index + 1}.png`, body, 'binary');
                    resolve("Finish!!!");
                }
                else{
                    console.log(error);
                    reject("Eerror!!!");
                }
            }
        )
    })
}

async function sub(tag, urls){
  
    console.log("画像をダウンロードする。");
    for (let index = 0; index < urls.length; index++) {
        let url = urls[index]; 
        url = url.replace(/(＿)/g, '%EF%BC%BF');//%EF%BC%BF 対応
    //     //同期
    //     console.log(`url=${url}`);
    //     const res = request('GET', url, {});
    //     if(res.statusCode === 200){
    //         fs.writeFileSync(`./images/${index + 1}.png`, res.body, 'binary');
    //     }
        await get(index, url);
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
        .toFile(`./${tag}.png`);
    console.log("完了");
}




//コマンドパラメータ取得
let [category, voting_weight] = process.argv.slice(2)
if (!category) {
    // try {
    // } catch (error) {
        process.stderr.write(`Usage: ./app.js <category>\n`)
        process.exit(1)
    // }
}

async function main(){

    //同期
    const urls = await app.getPosts(category)
    console.log(urls);

    if(urls.length == 0){
        console.log("投稿=0件");
        process.exit(100)
    }

    sub(category, urls);

}

// console.log("ゴミ削除");
// const { execSync } = require('child_process')
// execSync('rm -f ./images/*.png')
// execSync('rm -f ./resize/*.png')
// execSync('rm -f ./*.png')

main();
