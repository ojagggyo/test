const dsteem = require('dsteem');

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
        .catch(err => {
            console.log(err);
        });        
};

get_accounts("steemit");
