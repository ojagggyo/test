// const sharp = require("sharp");


// const promise = sharp("https://steemitimages.com/640x0/https://cdn.steemitimages.com/DQmdA56beW1LVbnL28qphDBLnSYTZmmcbt1wdmhX5RqQSnf/image.png");


// promise.toFile( "./aaa.png" , ( err , info ) =>{
//     if( err ) { console.error(err) }
// });



// const http = require('http');
// const https = require('https');
// const fs = require('fs');

// const file = fs.createWriteStream("file.jpg");
// const request = https.get("https://steemitimages.com/640x0/https://cdn.steemitimages.com/DQmdA56beW1LVbnL28qphDBLnSYTZmmcbt1wdmhX5RqQSnf/image.png", function(response) {
//   response.pipe(file);
// });




// const https = require('https');
// var fs = require('fs');
// url = "https://steemitimages.com/640x0/https://cdn.steemitimages.com/DQmdA56beW1LVbnL28qphDBLnSYTZmmcbt1wdmhX5RqQSnf/image.png";
// dest = "file.jpg";

// var download = function(url, dest, cb) {
//   var file = fs.createWriteStream(dest);
//   var request = https.get(url, function(response) {
//     response.pipe(file);
//     file.on('finish', function() {
//       file.close(cb);  // close() is async, call cb after close completes.
//     });
//   }).on('error', function(err) { // Handle errors
//     fs.unlink(dest); // Delete the file async. (But we don't check the result)
//     if (cb) cb(err.message);
//   });
// };

// download();



var request = require('request');
var fs = require('fs');

var url = 'https://steemitimages.com/640x0/https://cdn.steemitimages.com/DQmdA56beW1LVbnL28qphDBLnSYTZmmcbt1wdmhX5RqQSnf/image.png';

request(
    {method: 'GET', url: url, encoding: null},
    function (error, response, body){
        if(!error && response.statusCode === 200){
            fs.writeFileSync('a.png', body, 'binary');
        }
    }
);