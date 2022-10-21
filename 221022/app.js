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
    console.log('main start');

    get_accounts("yasu");
    
    const result = await get_accounts_await("yasu.witness");
    if(result.length > 0){
        console.log(result[0]);
        console.log("");
    }
    
    console.log('main end');
}

main();