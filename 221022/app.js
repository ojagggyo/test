const dsteem = require('dsteem')

//connect to server which is connected to the network/production
const client = new dsteem.Client('https://api.steemit.com')

//非同期
get_accounts = async (accountName) => {
    console.log('get_accounts start')
    client.database
        .call('get_accounts', [[accountName]])
            .then(result => {
                console.log('get_accounts then')
                if(result.length > 0){
                    console.log(result[0])
                }
            })
    console.log('get_accounts end')
}

//同期
get_accounts_sync = async (accountName) => {
    console.log('get_accounts_sync start')
    const result = await client.database.call('get_accounts', [[accountName]])
    if(result.length > 0){
        console.log(result[0])
    }
    console.log('get_accounts_sync end')
    return result
}

async function main()
{
    console.log('main start')

    //非同期
    get_accounts("yasu")

    //同期
    //const result = await get_accounts_sync("yasu.witness")
    
    console.log('main end')
}

main()