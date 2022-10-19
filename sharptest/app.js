
// ダウンロード
var request = require('request');
var fs = require('fs');
var urls = [
    'https://steemitimages.com/640x0/https://cdn.steemitimages.com/DQmdA56beW1LVbnL28qphDBLnSYTZmmcbt1wdmhX5RqQSnf/image.png',
    'https://steemitimages.com/640x0/https://cdn.steemitimages.com/DQmW75RTjrArTdMMXBdr5eyrBhp7ZeFHgDYXpVKWb7NDojC/image.png'
];



for (let index = 0; index < array.length; index++) {
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


// 画像編集
const sharp = require("sharp");
const promise = sharp("./images/2.png");
// 画像サイズ変更
promise.resize({
    width: 200,
    height: 100,
    fit: 'contain'
  })

  promise.toFile( "./aaa.png" , ( err , info ) =>{
    if( err ) { console.error(err) }
});