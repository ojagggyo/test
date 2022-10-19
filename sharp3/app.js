
// ダウンロード
var request = require('request');
var fs = require('fs');
var urls = [
    'https://steemitimages.com/640x0/https://cdn.steemitimages.com/DQmdA56beW1LVbnL28qphDBLnSYTZmmcbt1wdmhX5RqQSnf/image.png',
    'https://steemitimages.com/640x0/https://cdn.steemitimages.com/DQmW75RTjrArTdMMXBdr5eyrBhp7ZeFHgDYXpVKWb7NDojC/image.png'
];

console.log("スタート");

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


//--------------------
(async ()=>{//非同期開始
//--------------------


/*
const sharp = require("sharp");
for (let index = 0; index < urls.length; index++) {

    console.log(`./images/${index + 1}.png 開始`);

    const promise = await sharp(`./images/${index + 1}.png`);
    // 画像サイズ変更
    await promise.resize({
        w 200,
        height: 200,
        fit: 'contain'
    })
    // 画像出力
    .toFile(`./${index + 1}.png` , ( err , info ) =>{
        if( err ) { console.error(err) }
    });

    console.log(`終了`);
}
*/



const sharp = require('sharp')



//リサイズ
await sharp(`./images/back.png`)
.resize({width: 600, height: 400, fit: 'contain'})
.toFile('back.png');

for (let index = 0; index < urls.length; index++) {

    await sharp(`./images/${index + 1}.png`)
    .resize({width: 200, height: 200, fit: 'contain'})
    .toFile(`./${index + 1}.png`);
}



for (let index = 0; index < urls.length; index++) {
    
    await sharp(`./images/back.png`)
        .composite([{
            input: `./${index + 1}.png`, 
            top: 0, 
            left: 200
        }])
        .toFile(`./out${index + 1}.png`);
    }


/*
//const width = 400;
//const r = width / 2;
//const circleShape = ;
// アイコン画像を丸い形で加工
const iconBuffer = await sharp(`./images/1.png`)
    .png() // ※元画像がjpgの場合は、pngにして透過できるようにする
    .resize(100, 100)
    // .composite([{
    //     input: Buffer.from(`<svg><circle cx="${r}" cy="${r}" r="${r}" /></svg>`),
    //     blend: 'dest-in'
    // }])
    .toBuffer();

// 加工したicon画像を背景画像の中心に合成
await sharp(`./images/back.png`)
    .composite([{
        input: iconBuffer, gravity: "center", blend: "hard-light"
    }])
    .png()
    .toFile('output4.png');
*/

//--------------------
})();//非同期終了
//--------------------