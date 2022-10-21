const dsteem = require('dsteem');

//connect to server which is connected to the network/production
const client = new dsteem.Client('https://api.steemit.com');


get_accounts = async (accountName) => {

    //get_content_replies of the selected post
    client.database
        .call('get_accounts', [[accountName]])
        .then(result => {
            if(result.length > 0){
                console.log(result[0]);
                console.log("");
            }
        });
};



let accountName = "yasu";//デフォルト
if(process.argv.length > 2){
    accountName = process.argv[2];
}

get_accounts(accountName);
