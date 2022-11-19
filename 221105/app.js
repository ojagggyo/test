const dsteem = require('dsteem');

// const client = new dsteem.Client('https://steememory.com');
const client = new dsteem.Client('http://192.168.3.6:8080');


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
