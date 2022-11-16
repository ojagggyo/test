const request = require('sync-request')//同期
const fs = require('fs')
const sharp = require('sharp')
const path = require('path')


module.exports.downloadAndSave = async (urls, out_path) => {
  
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
    await sharp(
        {//背景
            create: {
                width: x * image_width,
                height: y * image_height,
                channels: 4,
                background: { r: 100, g: 255, b: 100, alpha: 0.1 }//色を指定する。
            }
        })
        .composite(payload)
        //.toFile(`./${tag}_${png`);
        //.toFile(`./post.png`);
        .toFile(out_path);
        
    console.log("完了");
}
