const dsteem = require('dsteem');

//connect to server which is connected to the network/production
const client = new dsteem.Client('https://api.steemit.com');


//非同期
get_witnesses_by_vote = async () => { 
    var _info = await client.database.call('get_witnesses_by_vote',['',100])
    //console.log(_info)

    for (var i = 0; i < _info.length; i++) {
        console.log(`${i} ${_info[i].owner} ${_info[i].running_version}`);
    }
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



