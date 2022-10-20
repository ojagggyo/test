const dsteem = require('dsteem');
//const fs = require('fs');
//const request = require('request');

//connect to server which is connected to the network/production
const client = new dsteem.Client('https://api.steemit.com');

function getDateString(date){
    return `${date.getMonth()+1}/${date.getDay()} ${date.getHours()}:${date.getMinutes()}`;
}
function log(msg) { 
    console.log(new Date().toString() + ' - ' + msg); 
}


//ミュートしたいアカウント
const muteList = ["bukitcantik"];


//filter change selection function
module.exports.getPosts = async (tag) => {
return new Promise((resolve, reject) => {
        
    console.log('*** getPosts開始 ***');

    let urls = [];
    const filter = "created";
    const query = {
        //tag: 'japanese',
        tag: tag,
        limit: 40,
        truncate_body: 1//本文を1文字だけ取得
    };

    client.database
        .getDiscussions(filter, query)
        .then(result => {
            console.log('Response received:', result);

            if (result) {
                
                let index = 0;
                result.forEach(post => {
                    const json = JSON.parse(post.json_metadata);
                    //const image = json.image ? json.image[0] : '';

                    if(json.image){
                        
                        console.log("urls.push(json.image[0]);");

                        urls.push(json.image[0]);
                    }

                });

                return resolve(urls);
            } else {
                return resolve(urls);
            }
      

        })
        .catch(err => {
            console.log(err);
            //alert(`Error:${err}, try again`);
            return reject(urls);
        });


    console.log('*** getPosts終了 ***');

});
};
