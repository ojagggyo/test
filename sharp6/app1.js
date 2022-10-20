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
    "yasu.witness",//私
    "yadamaniart",
    "sawahbukit",
    "royalsherris",
    "bukitpinus",
];


//new Date(result[0].last_vote_time+"z")
async function get_accounts(name)  {
return new Promise(async (resolve, reject) => {
    await client.database
        .call('get_accounts', [[name]])
        .then(result => {
            if(result.length == 0){
                return reject(null);
            }
            return resolve(result[0]);
        });
});
}


//filter change selection function
//module.exports.getPosts = async (tag, limit) => {
module.exports.getPosts = function getPosts(tag, limit) {
return new Promise((resolve, reject) => {
        
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
        //tag: 'japanese',
        tag: tag,
        limit: limit,
        truncate_body: 1//本文を1文字だけ取得
    };

    client.database
        .getDiscussions(filter, query)
        .then(result => {
            //console.log('Response received:', result);
            console.log('length:', result.length);

            if (result) {
                
                let index = 0;
                result.forEach(async post => {
                    const json = JSON.parse(post.json_metadata);

                    let a = await get_accounts(post.author);
                    console.log(new Date(a.last_vote_time+"z"));

                    if(urls.length >= max){
                        console.log('skip ', 'urls.length > max');
                        return;
                    }

                    //アカウント対象外
                    if(-1 < muteList.indexOf(post.author)){
                        console.log('skip ', post.author);
                        return;
                    }

                    if(!json.image){
                        console.log('skip ','no image');
                        return;
                     }
 
                     urls.push(json.image[0]);
                });

                return resolve(urls);
            } else {
                return resolve(urls);
            }
      

        })
        .catch(err => {
            console.log(err);
            //alert(`Error:${err}, try again`);
            return reject(urls);
        });


    console.log('*** getPosts終了 ***');

});
};
