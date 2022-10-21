const dsteem = require('dsteem');

//connect to server which is connected to the network/production
const client = new dsteem.Client('https://api.steemit.com');



// get_accounts = (accountName) => Promise.all(
//     client.database
//         .call('get_accounts', [[accountName]])
//             .then(result => {
//                 console.log('get_accounts then');
//                 if(result.length > 0){
//                     console.log(result[0]);
//                     console.log("");
//                 }
//                 return 123;
//             })
//             .then(result => {
//                 console.log('get_accounts then 2');
//                 console.log(result);
//                 console.log("");
//             }
//             )
// )

get_accounts = async (accountName) => {
    console.log('get_accounts start');
    
    client.database
    .call('get_accounts', [[accountName]])
        .then(result => {
            console.log('get_accounts then ');
            if(result.length > 0){
                console.log(result[0]);
                console.log("");
            }
            return 123;
        }).then(result => {
            console.log('get_accounts then 2');
        });

    console.log('get_accounts end');
};


//コマンドパラメータ取得
let accountName = "yasu";//デフォルト
if(process.argv.length > 2){
    accountName = process.argv[2];
}else{
   console.log('node app.js accountName'); 
}

async function sub()
{
}

function main()
{
    console.log('main start');
    await get_accounts(accountName);
    console.log('main end');
    
}