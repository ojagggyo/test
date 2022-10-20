const dsteem = require('dsteem');
const fs = require('fs');
const request = require('request');

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
getPosts = async () => {
    const filter = "created";
    const query = {
        tag: 'japanese',
        limit: 5,
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
                        const url = "https://steemit.com/"+json.image[0];
                        request(
                            {method: 'GET', url: url, encoding: null},
                            function (error, response, body){
                                if(!error && response.statusCode === 200){
                                    fs.writeFileSync(`./images/${index + 1}.png`, body, 'binary');
                                    index++;
                                }
                            }
                        );
                    }

                });

                document.getElementById('postList').innerHTML = 'OK';
            } else {
                document.getElementById('postList').innerHTML = 'No result.';
            }
        })
        .catch(err => {
            console.log(err);
            alert(`Error:${err}, try again`);
        });
};


getPosts();