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


module.exports.getPosts = async (category) => {
        
    console.log(`*** getPosts開始 ${category} ***`);

    const urls = [];
    const filter = "created";
    const query = {
        //tag: 'japanese',
        tag: category,
        limit: 100,
        truncate_body: 1//本文を1文字だけ取得
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

        // if(urls.length >= max){
        //     console.log('skip ', 'urls.length > max');
        //     return; //continue
        // }

        //24時間以上前
        if(yesterday.getTime() > created.getTime()){
            return; //continue
        }

        //アカウント対象外
        if(-1 < muteList.indexOf(post.author)){
            console.log('skip ', post.author);
            return; //continue
        }

        console.log(json.image);
        if(json.image){
            urls.push(json.image[0]);
            }
            else{//画像がない場合は、プロフィール写真のURL
            urls.push(`https://steemitimages.com/u/${post.author}/avatar/`);                     
            }                    
    });

    console.log('*** getPosts終了 ***');

    return urls;
};
