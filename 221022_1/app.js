const dsteem = require('dsteem');

//connect to server which is connected to the network/production
const client = new dsteem.Client('https://api.steemit.com');


//非同期
get_witnesses_by_vote = async () => { 
    var _info = await client.database.call('get_witnesses_by_vote',['yasu',180])
    console.log(_info)
};


// //コマンドパラメータ取得
// let accountName = "";//デフォルト
// if(process.argv.length > 2){
//     accountName = process.argv[2];
// }else{
//    console.log('node app.js accountName'); 
//    return;
// }

get_witnesses_by_vote();



