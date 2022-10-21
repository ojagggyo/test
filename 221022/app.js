const dsteem = require('dsteem');

//connect to server which is connected to the network/production
const client = new dsteem.Client('https://api.steemit.com');






// 
// get_accounts = async (accountName) => {
//     console.log('get_accounts start');
    
//     client.database
//     .call('get_accounts', [[accountName]])
//         .then(result => {
//             console.log('get_accounts then ');
//             if(result.length > 0){
//                 console.log(result[0]);
//                 console.log("");
//             }
//             return 123;
//         }).then(result => {
//             console.log('get_accounts then 2');
//         });

//     console.log('get_accounts end');
// };

get_accounts = async (accountName) => {
    console.log('get_accounts start');
    
    const resultPromise = await client.database.call('get_accounts', [[accountName]]);
    resultPromise
      .then(result => {
        console.log(result)
      })
      .catch(error => {
        console.log(error)
      })
    
    console.log('get_accounts end');
};



async function main()
{
    //コマンドパラメータ取得
    let accountName = "yasu";//デフォルト
    if(process.argv.length > 2){
        accountName = process.argv[2];
    }else{
    console.log('node app.js accountName'); 
    }

    console.log('main start');
    get_accounts(accountName);
    console.log('main end');
}

main();