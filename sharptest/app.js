const sharp = require("sharp");


var request = require('request');
var fs = require('fs');

var url = 'https://steemitimages.com/640x0/https://cdn.steemitimages.com/DQmdA56beW1LVbnL28qphDBLnSYTZmmcbt1wdmhX5RqQSnf/image.png';

request(
    {method: 'GET', url: url, encoding: null},
    function (error, response, body){
        if(!error && response.statusCode === 200){
            fs.writeFileSync('./images/a.png', body, 'binary');
        }
    }
);

const promise = sharp("./images/a.png");

promise.resize({
    width: 200,
    height: 100,
    fit: 'contain'
  })

  promise.toFile( "./aaa.png" , ( err , info ) =>{
    if( err ) { console.error(err) }
});