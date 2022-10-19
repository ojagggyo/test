// いい感じにPromiseでラップする
const sleepFunc = (m) => {
    return new Promise((resolve) => setTimeout(resolve, m));
  };
  

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


const n = urls.length;
const image_width = 200;
const image_height = 200;
const x = parseInt(Math.sqrt(n - 1)) + 1;
const y = parseInt((n - 1) / x) + 1;
console.log(`n=${n}`);
console.log(`x=${x},y=${y}`);

//リサイズ
await sharp(`./images/back.png`)
    .resize({
        width: x * image_width, 
        height: y * image_height, 
        fit: 'contain'})
    .toFile('back.png');

for (let index = 0; index < urls.length; index++) {
    await sharp(`./images/${index + 1}.png`)
        .resize({width: image_width, height: image_height, fit: 'contain'})
        .toFile(`./${index + 1}.png`);

    console.log("1秒スリープ");
    // こんな感じで使う
    await sleepFunc(1000);
    console.log("再開");
}


let payload = []
for (let index = 0; index < urls.length; index++) {
    let x = parseInt(Math.sqrt((index+1) - 1)) + 1 - 1;
    let y = parseInt(((index+1) - 1) / x) + 1 - 1;
    console.log(`x=${x},y=${y}`);
    a = {
        input: `./${index + 1}.png`, 
        top: y * image_height, 
        left: x * image_width,
    };
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