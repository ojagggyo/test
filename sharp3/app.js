
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


const sharp = require('sharp')

//リサイズ
await sharp(`./images/1.png`)
  .resize(512, 200)
  .toFile('output1.jpg');


  //グレイスケール
  await sharp(`./images/1.png`)
  .grayscale()
  .toFile('output2.jpg');


//丸い形に切り取る
const width = 400;
const r = width / 2;
const circleShape = Buffer.from(`<svg><circle cx="${r}" cy="${r}" r="${r}" /></svg>`);

await sharp(`./images/1.png`)
    .resize(width, width)
    .composite([{
        input: circleShape,
        blend: 'dest-in'
    }])
    .png()
    .toFile('output3.png');



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


//--------------------
})();//非同期終了
//--------------------