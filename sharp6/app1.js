const app = require('./app.js');

// いい感じにPromiseでラップする
const sleep = (m) => {
    return new Promise((resolve) => setTimeout(resolve, m));
  };
  

// ダウンロード
var request = require('request');
var fs = require('fs');


//
async function main(){
    await app.getPosts()
        .then(result => {
            console.log(result);
            sub(result);
        });   
    console.log(urls);
}


async function sub(urls){
//--------------------
//(async ()=>{//非同期開始
//--------------------
   
    console.log("画像をダウンロードする。");
    for (let index = 0; index < urls.length; index++) {
        const url = urls[index];
        request(
            {method: 'GET', url: url, encoding: null},
            function (error, response, body){
                if(!error && response.statusCode === 200){
                    fs.writeFileSync(`./images/${index + 1}.png`, body, 'binary');
                }
            }
        );
    }

    const sharp = require('sharp')

    const n = urls.length;
    const image_width = 200;
    const image_height = 150;
    const x = parseInt(Math.sqrt(n - 1)) + 1;
    const y = parseInt((n - 1) / x) + 1;
    console.log(`n=${n}`);
    console.log(`x=${x},y=${y}`);

    //
    console.log("ダウンロードした画像をリサイズする。");
    for (let index = 0; index < urls.length; index++) {
        await sharp(`./images/${index + 1}.png`)
            .resize(
                {
                    width: image_width, 
                    height: image_height, 
                    //fit: 'contain'
                })
            .toFile(`./resize/${index + 1}.png`);

        console.log("0.5秒スリープ");
        await sleep(500);
    }

    //
    console.log("composite用のデータを作成する。");
    let payload = []
    for (let index = 0; index < urls.length; index++) {
        const dx = index % x;
        const dy = parseInt(index / x);
        console.log(`dx=${dx},dy=${dy}`);
        a = {
            input: `./resize/${index + 1}.png`, 
            top: dy * image_height, 
            left: dx * image_width,
        };
        payload.push(a);
    }

    //
    console.log("合成する。");
    const s = await sharp(
        {//背景
            create: {
                width: x * image_width,
                height: y * image_height,
                channels: 4,
                background: { r: 255, g: 100, b: 100, alpha: 0.1 }//色を指定する。
            }
        });
    for (let index = 0; index < urls.length; index++) {
        await s.composite(payload)
    }
    await s.toFile(`./out.png`);

}
//--------------------
//})();//非同期終了
//--------------------


main();