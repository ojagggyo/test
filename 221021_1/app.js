const dsteem = require('dsteem');

//connect to server which is connected to the network/production
const client = new dsteem.Client('https://api.steemit.com');

get_accounts = async (accountName) => { 
    client.database
    .call('get_accounts', [[accountName]])
        .then(result => {
            console.log('get_accounts then ');
            if(result.length > 0){
                console.log(result[0]);
                console.log("");
            }
        })
};

//コマンドパラメータ取得
let accountName = "";//デフォルト
if(process.argv.length > 2){
    accountName = process.argv[2];
}else{
   console.log('node app.js accountName'); 
   return;
}

get_accounts(accountName);