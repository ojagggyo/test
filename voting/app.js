const dsteem = require('dsteem');
const client = new dsteem.Client('https://api.steemit.com');


submitVote = async (voter, privateKey , author, permlink, weight) => {

    //create vote object
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
    console.log(new Date().toString() + ' - ' + msg); 
}


//ミュートしたいアカウント
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

getPosts = async (voter, posting_key) => {
    const filter = "created";
    const query = {
        tag: 'japanese',
        limit: 50,
    };

    //同期
    const result = await client.database.getDiscussions(filter, query);

    if (result.length > 0) {

        var today = new Date();
        console.log("Today=%s",getDateString(today));
        var yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1)
        console.log("Yesterday=%s",getDateString(yesterday));    

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
                console.log(`${author.padEnd(20, '_')} 古い ${getDateString(created)}`)
                continue;
            } 

            //5分以内
            if(today.getTime() - created.getTime() < 5 * 1000 * 60){
                console.log(`${author.padEnd(20, '_')} 5分未満 ${getDateString(created)}`)
                continue;
            } 

            //アカウント対象外（完全一致）
            if(-1 < muteList.indexOf(author)){
                console.log(`${author.padEnd(20, '_')} ミュート`)
                continue;
            }

            //自分voterがvote済みか確認する
            const active_votes = post.active_votes;
            var voter_voted = active_votes.some( function( value ) {
                return value.voter ===  voter; 
            });
            if(voter_voted){
                console.log(`${author.padEnd(20, '_')} upvote済み`)
                continue;
            }

            let whiteList_umu = false;
            //アカウント対象外（完全一致）
            if(-1 < whiteList.indexOf(author)){
                whiteList_umu = true;
            }
            if(!whiteList_umu){
                console.log(`${author.padEnd(20, '_')} ホワイトリストにない`)
                continue;
            }

               
            var body = post.body;
            body = body.replace(/!\[.*\]\(.*\)/g, '画像削除');//画像削除
            body = body.replace(/([^!])\[(.*)\]\(.*\)/g, /$1$2/);//リンク削除


            console.log(`${author.padEnd(20, '_')} ${getDateString(created)} ${body.length}` );

            if(whiteList_umu){
                console.log("アップボートする %s", author);
                let res = await submitVote(voter, posting_key , author, permlink, 10*100);
                console.log(res);
            }
             
        }
    }
};


//コマンドパラメータ取得
const [username, postingkey] = process.argv.slice(2)
if (!username || !postingkey) {
    process.stderr.write(`Usage: ./app.js <username> <postingkey>\n`)
    process.exit(1)
}

getPosts(username, dsteem.PrivateKey.fromString(postingkey));
