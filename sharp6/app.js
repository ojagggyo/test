//const request = require('request')//非同期
const request = require('sync-request');//同期
const fs = require('fs')
const sharp = require('sharp')

const app = require('./app2.js')

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

    //非同期
    // await app.getPosts(tag, limit)//tagを指定する
    //     .then(result => {
    //         console.log(result);
    //         sub(tag, limit, result);
    //     });   

    //同期
    const result = await app.getPosts(tag, limit)//tagを指定する
    console.log(result);

    sub(tag, limit, result);

}

async function sub(tag, limit, urls){
//--------------------
//(async ()=>{//非同期開始
//--------------------




   
    console.log("画像をダウンロードする。");
    for (let index = 0; index < urls.length; index++) {
        let url = urls[index];
   


        url = url.replace(/(＿)/g, '%EF%BC%BF');//%EF%BC%BF 対応



        //console.log(`url=${url}`);
        //url = encodeURI( url);

        //非同期
        // request(
        //     {method: 'GET', url: url, encoding: null},
        //     function (error, response, body){
        //         if(!error && response.statusCode === 200){
        //             fs.writeFileSync(`./images/${index + 1}.png`, body, 'binary');
        //         }
        //     }
        // );
        // console.log(`${urls[index]}`);
    
        //同期
        console.log(`url=${url}`);
        const res = request('GET', url, {});
        if(res.statusCode === 200){
            fs.writeFileSync(`./images/${index + 1}.png`, res.body, 'binary');
        }
        
        
    
    
    }
   
    //await sleep(2000); 


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

            sharp(`./images/${index + 1}.png`)
            .resize(
                {
                    width: image_width, 
                    height: image_height, 
                    //fit: 'contain'
                })
            .toFile(`./resize/${index + 1}.png`);

            process.stdout.write(`${index + 1}.png `);
    
        } catch (error) {
            console.log("catch");
            console.log(error);
            //console.log("0.2秒スリープ");
            await sleep(500); 
        }finally{
        }
    }


    //await sleep(2000); 

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

    //await sleep(2000); 


    console.log("sharp");
    const s = sharp(
        {//背景
            create: {
                width: x * image_width,
                height: y * image_height,
                channels: 4,
                background: { r: 255, g: 100, b: 100, alpha: 0.1 }//色を指定する。
            }
        });
    await sleep(1000); 

    console.log("composite");
    s.composite(payload)

    //await sleep(1000); 

    console.log("toFile");
    s.toFile(`./${tag}_${limit}.png`);
    console.log("完了");


}
//--------------------
//})();//非同期終了
//--------------------


console.log("ゴミ削除");
const { execSync } = require('child_process')
execSync('rm -f ./images/*.png')
execSync('rm -f ./resize/*.png')
execSync('rm -f ./*.png')

main();