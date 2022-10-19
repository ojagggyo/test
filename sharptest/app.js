
// ダウンロード
var request = require('request');
var fs = require('fs');
var urls = [
    'https://steemitimages.com/640x0/https://cdn.steemitimages.com/DQmdA56beW1LVbnL28qphDBLnSYTZmmcbt1wdmhX5RqQSnf/image.png',
    'https://steemitimages.com/640x0/https://cdn.steemitimages.com/DQmW75RTjrArTdMMXBdr5eyrBhp7ZeFHgDYXpVKWb7NDojC/image.png'
];

(async ()=>{//非同期開始

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

console.log("画像編集");

// 画像編集
const sharp = require("sharp");
for (let index = 0; index < urls.length; index++) {

    console.log(`./images/${index + 1}.png 開始`);

    const promise = sharp(`./images/${index + 1}.png`);
    // 画像サイズ変更
    await promise.resize({
        width: 200,
        height: 200,
        fit: 'contain'
    })
    // 画像出力
    .toFile(`./out/${index + 1}.png` , ( err , info ) =>{
        if( err ) { console.error(err) }
    });

    console.log(`終了`);
}

// const promise2 = sharp(`./images/back.png`);

// for (let index = 0; index < urls.length; index++) {

//     console.log(`./${index + 1}.png 開始`);

//     await promise2.composite([ 
//         {
//              input: `./${index + 1}.png`,
//              top: 0,
//              left: index * 200,
//          }
//     ] );

//     console.log(`終了`);
// }

// //画像出力
// await promise2.toFormat("png").toFile(`out.png` , ( err , info ) =>{
//     if( err ) { console.error(err) }
// });

let promise2 = sharp(`./images/back.png`)
.composite([ 
        {
             input: "`./out/1.png",
             top: 0,
             left: 0,
         },
         {
            input: "`./out/2.png",
            top: 0,
            left: 200,
        }
    ] )
    .toFile(`./out.png` , ( err , info ) =>{
        if( err ) { console.error(err) }
    });


})();//非同期終了