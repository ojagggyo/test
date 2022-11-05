const dsteem = require('dsteem');

//connect to server which is connected to the network/production
const client = new dsteem.Client('http://127.0.0.1:8090');

get_accounts = async (accountName) => { 

    client.database
    .call('get_accounts', [[accountName]])
        .then(result => {
            if(result.length > 0){
                console.log(result[0]);
                console.log("");
            }
        })

};

get_accounts("steemit");
