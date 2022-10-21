const dsteem = require('dsteem');

//connect to server which is connected to the network/production
const client = new dsteem.Client('https://api.steemit.com');

get_accounts = async (accountName) => {
    console.log('get_accounts start');
    client.database
        .call('get_accounts', [[accountName]])
            .then(result => {
                if(result.length > 0){
                    console.log(result[0]);
                    console.log("");
                }
            });
    console.log('get_accounts end');
};

get_accounts_await = async (accountName) => {
    console.log('get_accounts_await start');
    const result = await client.database.call('get_accounts', [[accountName]]);
    console.log('get_accounts_await end');
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

    console.log('main start');

    get_accounts(accountName);
    
    const result = await get_accounts_await(accountName);
    if(result.length > 0){
        console.log(result[0]);
        console.log("");
    }
    
    console.log('main end');
}

main();