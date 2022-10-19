
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

// for (let index = 0; index < urls.length; index++) { 
//     await sharp(`./images/back.png`)
//         .composite([{
//             input: `./${index + 1}.png`, 
//             top: 0, 
//             left: index * 200
//         }])
//         .toFile(`./out${index + 1}.png`);
//     }


const s = await sharp(`./back.png`)
for (let index = 0; index < urls.length-1; index++) {
    let left = index * 200;
    await s.composite([{
            input: `./${index + 1}.png`, 
            top: 0, 
            left: left
    }]);
}
await s.toFile(`./outout.png`);


//--------------------
})();//非同期終了
//--------------------