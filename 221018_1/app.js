const dsteem = require('dsteem');

//connect to server which is connected to the network/production
const client = new dsteem.Client('https://api.steemit.com');


get_content_replies = async (author, permlink) => {

    //get_content_replies of the selected post
    client.database
        .call('get_content_replies', [author, permlink])
        .then(result => {
            for (var i = 0; i < result.length; i++) {
                console.log(result[i]);
                console.log("");
            }
        });
};


// 最新の記事を取得する。
async function getLatestPost() {
    
    const query = {
        tag: 'yasu.pal',
        limit: '1',
        truncate_body: 1//本文を1文字だけ取得
    };

    client.database
        .call('get_discussions_by_blog', [query])
        .then(result => {
            result.forEach(post => {
                //console.log(post);
                get_content_replies(post.author, post.permlink);
            });
        })
        .catch(err => {
            console.log(err);
        });
}

if(process.argv.length > 2){
    getLatestPost(process.argv[2]);
}
else{
    getLatestPost();
}


