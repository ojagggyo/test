const dsteem = require('dsteem');

//connect to server which is connected to the network/production
const client = new dsteem.Client('https://api.steemit.com');


get_content_replies = async (author, permlink) => {

    //get_content_replies of the selected post
    client.database
        .call('get_accounts ', [['yasu']])
        .then(result => {
            for (var i = 0; i < result.length; i++) {
                console.log(result[i]);
                console.log("");
            }
        });
};

get_content_replies();
