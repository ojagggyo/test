
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

console.log("画像編集");

// 画像編集
const sharp = require("sharp");
for (let index = 0; index < urls.length; index++) {
    const promise = sharp(`./images/${index + 1}.png`);
    // 画像サイズ変更
    promise.resize({
        width: 200,
        height: 200,
        fit: 'contain'
    })
    // 画像出力
    .toFile(`./${index + 1}.png` , ( err , info ) =>{
        if( err ) { console.error(err) }
    });
}

const promise2 = sharp(`./images/back.png`);

for (let index = 0; index < urls.length; index++) {
    promise2.composite( 
        {
             input: `./${index + 1}.png`,
             top: 0,
             left: index * 200,
         }
     )
}

// 画像出力
promise2.toFile(`./out.png` , ( err , info ) =>{
    if( err ) { console.error(err) }
});

