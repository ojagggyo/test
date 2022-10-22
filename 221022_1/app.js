const dsteem = require('dsteem');

//connect to server which is connected to the network/production
const client = new dsteem.Client('https://api.steemit.com');


//非同期
get_active_witnesses = async () => { 
    client.database
    //.call('list_witnesses', {"start": null, "limit": 0, "order": "by_name"})
    .call('list_witnesses', [ "",  0, "by_name"])
        .then(result => {
            console.log(result);
        })
};


// //コマンドパラメータ取得
// let accountName = "";//デフォルト
// if(process.argv.length > 2){
//     accountName = process.argv[2];
// }else{
//    console.log('node app.js accountName'); 
//    return;
// }

get_active_witnesses();
