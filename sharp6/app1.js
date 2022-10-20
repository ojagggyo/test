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
    "bukitcantik",
    "sawahbukit",
];


//filter change selection function
module.exports.getPosts = async (tag, limit) => {
return new Promise((resolve, reject) => {
        
    console.log(`*** getPosts開始 ${tag} ${limit} ***`);

    let max = limit;

    console.log(`max=${max}`);

    limit =  parseInt(limit) + 10;//スキップされる記事がありため。

    console.log(`limit1=${limit}`);

    if(max > 100){
        console.log(`limit2=${limit}`);
        limit = 100;
        console.log(`limit3=${limit}`);
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
                result.forEach(post => {
                    const json = JSON.parse(post.json_metadata);

                    if(urls.length > max){
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
