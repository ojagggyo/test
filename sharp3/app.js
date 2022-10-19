
// ダウンロード
var request = require('request');
var fs = require('fs');
var urls = [
    'https://steemitimages.com/640x0/https://cdn.steemitimages.com/DQmdA56beW1LVbnL28qphDBLnSYTZmmcbt1wdmhX5RqQSnf/image.png',
    'https://steemitimages.com/640x0/https://cdn.steemitimages.com/DQmW75RTjrArTdMMXBdr5eyrBhp7ZeFHgDYXpVKWb7NDojC/image.png',
    'https://steemitimages.com/640x0/https://cdn.steemitimages.com/DQmczvYkSKu5U1L1go8UEFy5Y2H3CNADpqpVyKnStrgBUey/image.png'
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
await sharp(`./images/back.png`)
.resize({width: 600, height: 400, fit: 'contain'})
.toFile('back.png');

for (let index = 0; index < urls.length; index++) {

    await sharp(`./images/${index + 1}.png`)
    .resize({width: 200, height: 200, fit: 'contain'})
    .toFile(`./${index + 1}.png`);
}

let payload = []
for (let index = 0; index < urls.length; index++) {
    a = {input: `./${index + 1}.png`, top: 0, left: index*200};
    payload.push(a);
}

const s = await sharp(`./back.png`)
for (let index = 0; index < urls.length; index++) {
    await s.composite(payload)
}
await s.toFile(`./outout.png`);


//--------------------
})();//非同期終了
//--------------------