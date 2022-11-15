const dsteem = require('dsteem');

const client = new dsteem.Client('https://api.steemit.com');

function getDateString(date){
    return `${date.getMonth()+1}/${date.getDay()} ${date.getHours()}:${date.getMinutes()}`;
}
function log(msg) { 
    console.log(new Date().toString() + ' - ' + msg); 
}


//ミュートしたいアカウント（他人にアップボートしない人）
const muteList = [
    //"yasu.witness",//私
    // "yadamaniart",
    // "sawahbukit",
    // "royalsherris",
    // "bukitpinus",
];


module.exports.getPosts = async (tag, limit) => {
        
    console.log(`*** getPosts開始 ${tag} ${limit} ***`);

    let max = limit;
    limit =  parseInt(limit) + 10;//スキップされる記事がありため。
    if(limit > 100){
        limit = 100;
    }

    console.log(`limit=${limit}`);

    const urls = [];
    const filter = "created";
    const query = {
        tag: tag,
        limit: limit,
        //truncate_body: 1//本文を1文字だけ取得
        truncate_body: 0//すべて
    };

    const result = await client.database.getDiscussions(filter, query);

    console.log('length:', result.length);

    var today = new Date();
    console.log(today);
    var yesterday = new Date(today.setDate(today.getDate() - 1) );
    console.log(yesterday);

                
    let index = 0;
    result.forEach(  post => {
        const json = JSON.parse(post.json_metadata);
        const created = new Date(post.created + "z");


        if(urls.length >= max){
            console.log('skip ', 'urls.length > max');
            return; //continue
        }

        //24時間以上前
        if(yesterday.getTime() > created.getTime()){
            return; //continue
        }

        //アカウント対象外
        if(-1 < muteList.indexOf(post.author)){
            console.log('skip ', post.author);
            return; //continue
        }

        //urlを抽出すする
        console.log(json.image);
        if(json.image){
            urls.push(json.image[0]);
        }
        else{
            // //0: ![](http://aaa.bbb.png)
            // //1: http://aaa.bbb.png
            // let s = post.body.match(/!\[.*\]\((.*)\)/)
            // if(s){
            //     urls.push(s[1]);   
            // }else{
            //     //0: http://aaa.bbb.png
            //     //1: png
            //     s = post.body.match(/https:\/\/.*(jpg|gif)/);
            //     if(s){
            //         urls.push(s[0]);   
            //     }
            //     else{
            //         urls.push(`https://steemitimages.com/u/${post.author}/avatar/`);                     
            //     }
            // }

            //0: http://aaa.bbb.png
            //1: png
            s = post.body.match(/https:\/\/.*(jpg|gif)/);
            if(s){
                urls.push(s[0]);   
            }
            else{
                urls.push(`https://steemitimages.com/u/${post.author}/avatar/`);                     
            }        
        }                   
    });

    console.log('*** getPosts終了 ***');

    return urls;
};
