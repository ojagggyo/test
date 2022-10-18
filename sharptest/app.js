// const sharp = require("sharp");


// const promise = sharp("https://steemitimages.com/640x0/https://cdn.steemitimages.com/DQmdA56beW1LVbnL28qphDBLnSYTZmmcbt1wdmhX5RqQSnf/image.png");


// promise.toFile( "./aaa.png" , ( err , info ) =>{
//     if( err ) { console.error(err) }
// });

require("https");


const download = (uri , filename ) => {
    return new Promise((resolve, reject) =>
      https
        .request(uri, (res) => {
          res
            .pipe(createWriteStream(filename))
            .on("close", resolve)
            .on("error", reject);
        })
        .end()
    );
  };
  
  download(
    "https://steemitimages.com/640x0/https://cdn.steemitimages.com/DQmdA56beW1LVbnL28qphDBLnSYTZmmcbt1wdmhX5RqQSnf/image.png",
    "Charizard-gmax.png"
  ).then(() => console.log("done"));