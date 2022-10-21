const request = require('request')
const fs = require('fs')
const sharp = require('sharp')
const app = require('./app1.js')

// いい感じにPromiseでラップする
const sleep = (m) => {
    return new Promise((resolve) => setTimeout(resolve, m));
  };
  
//
async function main(){
    //コマンドマラメータ取得
    for(var i = 0;i < process.argv.length; i++){
        console.log("argv[" + i + "] = " + process.argv[i]);
      }

    let tag = "japanese";//デフォルト
    let limit = 4;//デフォルト
    if(process.argv.length > 2){
        tag = process.argv[2];
    }
    if(process.argv.length > 3){
        limit = process.argv[3];
    }

    await app.getPosts(tag, limit)//tagを指定する
        .then(result => {
            console.log(result);
            sub(tag, limit, result);
        });   
}

async function sub(tag, limit, urls){
//--------------------
//(async ()=>{//非同期開始
//--------------------



   
    console.log("画像をダウンロードする。");
    for (let index = 0; index < urls.length; index++) {
        const url = urls[index];

        //if(url != ''){
            request(
                {method: 'GET', url: url, encoding: null},
                function (error, response, body){
                    if(!error && response.statusCode === 200){
                        fs.writeFileSync(`./images/${index + 1}.png`, body, 'binary');
                    }
                }
            );
        //}
        console.log(`${urls[index]}`);
    }
   

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

        try {
            for (let retry = 0; retry < 3; retry++) {

                sharp(`./images/${index + 1}.png`)
                .png()
                .resize(
                    {
                        width: image_width, 
                        height: image_height, 
                        //fit: 'contain'
                    })
                .toFile(`./resize/${index + 1}.png`);
    
                //process.stdout.write(".");
                process.stdout.write(`${index + 1}.png `);
                
                break;
            }
    
        } catch (error) {
            console.log("catch");
            console.log(error);
            //console.log("0.2秒スリープ");
            await sleep(500); 
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
            input: `./resize/${index + 1}.png`, 
            top: dy * image_height, 
            left: dx * image_width,
        };
        payload.push(a);
    }

    //

for (let retry = 0; retry < 3; retry++) {
    try {
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
        console.log("合成する。開始");
        for (let index = 0; index < urls.length; index++) {
            await s.composite(payload)
        }
        console.log("合成する。出力");
        s.toFile(`./${tag}_${limit}.png`);
        
        break;
    
    } catch (error) {
        console.log("catch");
        console.log(error);
        //console.log("0.2秒スリープ");
        await sleep(500); 
    }
}    


}
//--------------------
//})();//非同期終了
//--------------------


main();