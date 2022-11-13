const dsteem = require('dsteem');
const client = new dsteem.Client('https://api.steemit.com');

const fs = require("fs");
var config = JSON.parse(fs.readFileSync("config.json"));
// const authorAcount = {
//     acountName: config.acount_name,
//     privateKey: dsteem.PrivateKey.fromString(config.posting_key),
    
// };
const voterAcount = {
    acountName: config.acount_name,
    privateKey: dsteem.PrivateKey.fromString(config.posting_key)
};

const sleep = (m) => {
    return new Promise((resolve) => setTimeout(resolve, m));
  };



  


submitVote = async (voter, privateKey , author, permlink, weight) => {

    //create vote object
    const vote = {
        voter,
        author,
        permlink,
        weight, //needs to be an integer for the vote function
    };


    //非同期
    // //broadcast the vote
    // client.broadcast.vote(vote, privateKey).then(
    //     function(result) {
    //         console.log('success:', result);
    //     },
    //     function(error) {
    //         console.log('error:', error);
    //     }
    // );

    //同期
    const result = await client.broadcast.vote(vote, privateKey)
    console.log("result 1")
    console.log(result)
    return result;

};











function getDateString(date){
    return `${date.getMonth()+1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
}
function log(msg) { 
    console.log(new Date().toString() + ' - ' + msg); 
}


//ミュートしたいアカウント
const muteList = ["yasu","yasu.witness"];
//const bkackList = ["bukit"];//前方一致指せるキーワード
const whiteList = [
    "neko9",
    "tamurt",
    "sakura-sakura",
    "tomoyan",
    "kyoto-toda",
    "o5otaesik",
    "jimae",
    "yeyakang",
    "bigbear34",
    "poohoo11",
    "smallcub50",
    "junichi",
    "itemere",
    "jobreyes24",
    "stikg",
    "kan6034",
    "tama.arin",
    "nell5630",
    "eunjjjjjjjj",
    "ggagu",
    "stikg",

 

];

//filter change selection function
//window.getPosts = async () => {
getPosts = async (voter) => {
    const filter = "created";
    const query = {
        tag: 'japanese',
        limit: 50,
    };

    //同期
    const result = await client.database.getDiscussions(filter, query);
    //console.log(result);

    if (result.length > 0) {
        //var posts = [];
        
        var today = new Date();
        console.log(today);
        var yesterday = new Date(today.setDate(today.getDate() - 1) );
        console.log(yesterday);

        //posts.push(`<table><tr><td>タイトル</td><td>著者2</td><td>作成日時</td><td>文の長さ</td><td>写真</td><td>yasu</td><td>yasu.witness</td></tr>`);

        for(i = 0; i < result.length; i++){

            let post = result[i];
        
            const json = JSON.parse(post.json_metadata);
            const image = json.image ? json.image[0] : '';
            const title = post.title;
            const author = post.author;
            const created = new Date(post.created + "z");
            const url = post.url;
            const permlink = post.permlink;

            //24時間以上前
            if(yesterday.getTime() > created.getTime()){
                continue;
            } 

            //アカウント対象外（完全一致）
            if(-1 < muteList.indexOf(author)){
                continue;
            }

            //自分voterがvote済みか確認する
            const active_votes = post.active_votes;
            var voter_voted = active_votes.some( function( value ) {
                return value.voter ===  voter; 
            });
            if(voter_voted){
                continue;
            }

            let whiteList_umu = false;
            //アカウント対象外（完全一致）
            if(-1 < whiteList.indexOf(author)){
                whiteList_umu = true;
            }


            // //yasuがvote済みか確認する
            // var yasu_voted = active_votes.some( function( value ) {
            //     return value.voter ===  'yasu'; 
            // });
            // //yasu.witnesがvote済みか確認する
            // var yasuwitness_voted = active_votes.some( function( value ) {
            //     return value.voter ===  'yasu.witness'; 
            // });
                
            var body = post.body;
            body = body.replace(/!\[.*\]\(.*\)/g, '画像削除');//画像削除
            body = body.replace(/([^!])\[(.*)\]\(.*\)/g, /$1$2/);//リンク削除

//                     posts.push(
// `<tr><td><a href=https://steemit.com${url}>${title}</a></td>\
// <td>${author}</td>\
// <td>${getDateString(created)}</td>\
// <td>${body.length}(${post.body.length})</td>\
// <td>${image != ''?"〇":"✕"}</td>\
// <td>${yasu_voted ?"〇":"✕"}</td>\
// <td>${yasuwitness_voted ?"〇":"✕"}</td></tr>`  
//                     );


            console.log(`${getDateString(created)} ${author.padEnd(20, '_')} ${body.length} ${permlink} ${whiteList_umu}` );

            if(whiteList_umu){
               
                //console.log(`vote process start`);
                //let ret = await submitVote(voterAcount.acountName, voterAcount.privateKey , author, permlink, 10*100);
                //console.log("result 2")
                //console.log(ret);
                //console.log(`vote process end`)
            }
             
        }
    }
};


//コマンドパラメータ取得
let voter = "yasu.pal";//デフォルト
// if(process.argv.length > 2){
//     voter = process.argv[2];
// }else{
//    console.log('node app.js accountName'); 
//    return;
// }
getPosts(voter);