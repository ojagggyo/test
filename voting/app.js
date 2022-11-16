const dsteem = require('dsteem');
const fs = require('fs');
const app_isVotingPowerEnough = require('./app_isVotingPowerEnough.js')
const client = new dsteem.Client('https://api.steemit.com');


submitVote = async (voter, privateKey , author, permlink, voting_weight) => {

    weight = Number.parseInt(voting_weight) * 100
    const vote = {
        voter,
        author,
        permlink,
        weight, //needs to be an integer for the vote function
    };
    
    //同期
    const result = await client.broadcast.vote(vote, privateKey)
    return result;
};


function getDateString(date){
    return `${date.getMonth()+1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
}
function log(msg) { 
    console.log(new Date().toLocaleString() + ' - ' + msg); 
}

let multipleList =[];
const muteList = ["yasu","yasu.witness","tomoyan","tomoyan.witness"];
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
    "maxinpower",
    "youngdeuk",
    "lyh5926",

];

getPosts = async (category, voting_weight, voter, posting_key ) => {
    const filter = "created";
    const query = {
        tag: category,
        limit: 100,
    };

    //同期
    const result = await client.database.getDiscussions(filter, query);

    if (result.length > 0) {

        var today = new Date();
        log("Today=%s",getDateString(today));
        var yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1)
        log("Yesterday=%s",getDateString(yesterday));    

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
                log(`${author.padEnd(20, '_')} 古い ${getDateString(created)}`)
                continue;
            } 

            //5分以内
            if(today.getTime() - created.getTime() < 5 * 1000 * 60){
                log(`${author.padEnd(20, '_')} 5分未満 ${getDateString(created)}`)
                continue;
            } 

            //２回目以降の投稿
            if(-1 < multipleList.indexOf(author)){
                log(`${author.padEnd(20, '_')} ２回目以降`)
                continue;
            }

            //アカウント対象外（完全一致）
            if(-1 < muteList.indexOf(author)){
                log(`${author.padEnd(20, '_')} ミュート`)
                continue;
            }

            let whiteList_umu = false;
            //アカウント対象外（完全一致）
            if(-1 < whiteList.indexOf(author)){
                whiteList_umu = true;
            }
            if(!whiteList_umu){
                log(`${author.padEnd(20, '_')} ホワイトリストにない`)
                continue;
            }

            //自分voterがvote済みか確認する
            const active_votes = post.active_votes;
            var voter_voted = active_votes.some( function( value ) {
                return value.voter ===  voter; 
            });
            if(voter_voted){
                log(`${author.padEnd(20, '_')} upvote済み`)
                multipleList.push(author);
                continue;
            }



               
            var body = post.body;
            body = body.replace(/!\[.*\]\(.*\)/g, '画像削除');//画像削除
            body = body.replace(/([^!])\[(.*)\]\(.*\)/g, /$1$2/);//リンク削除


            console.log(`${author.padEnd(20, '_')} ${getDateString(created)} ${body.length}` );

            if(whiteList_umu){
                log("アップボートする %s", author);
                let res = await submitVote(voter, posting_key , author, permlink, voting_weight);
                log(res);
                multipleList.push(author);
            }
             
        }
    }
};


//コマンドパラメータ取得
let [category, voting_weight, limit, acount_name, posting_key] = process.argv.slice(2)
if (!category || !voting_weight || !limit || !acount_name || !posting_key) {
    try {
        const config = JSON.parse(fs.readFileSync("config.json"));    
        category = config.category;
        voting_weight = config.voting_weight;
        limit = config.limit;
        acount_name = config.acount_name;
        posting_key = config.posting_key;
    } catch (error) {
        process.stderr.write(`Usage: ./app.js <category> <voting_weight> <limit> <acount_name> <posting_key>\n`)
        process.exit(1)
    }
}

async function main(){
    const isEnough = await app_isVotingPowerEnough.isVotingPowerEnough(acount_name, Number.parseInt(limit))
    if(isEnough){
        getPosts(category, voting_weight, acount_name, dsteem.PrivateKey.fromString(posting_key));
    }
}


log(`category=${category}`);
log(`voting_weight=${voting_weight}`);
log(`acount_name=${acount_name}`);
log(`posting_key=非表示`);

//main();

setInterval(
    function(){
        main();
    }, 
    //24 * 60 * 60 * 1000
    10 * 60 * 1000
    );

