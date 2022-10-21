const dsteem = require('dsteem');

//connect to server which is connected to the network/production
const client = new dsteem.Client('https://api.steemit.com');


get_accounts_async = async (accountName) => {
    await client.database
        .call('get_accounts', [[accountName]])
            .then(result => {
                if(result.length > 0){
                    console.log(result[0]);
                    console.log("");
                }
            });
};

get_accounts = async (accountName) => {
    console.log('get_accounts start');
    const result = await client.database.call('get_accounts', [[accountName]]);
    console.log('get_accounts end');
    return result;
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

    // console.log('main start');
    // const result = await get_accounts(accountName);
    // console.log(result);
    // console.log('main end');


    console.log('main start');
    await get_accounts_async(accountName);
    console.log('main end');


}

main();