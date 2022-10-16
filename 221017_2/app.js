const dsteem = require('dsteem');

//connect to server which is connected to the network/production
const client = new dsteem.Client('https://api.steemit.com');


get_content_replies = async (author, permlink) => {

    console.log(" *** get_content_replies ***");
    console.log(author);
    console.log(permlink);

    //get_content_replies of the selected post
    client.database
        .call('get_content_replies', [author, permlink])
        .then(result => {
            const comments = [];
            for (var i = 0; i < result.length; i++) {
                console.log(result[i].author);
                console.log(result[i].created);
                console.log(result[i].body);
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
                console.log(post);
                const body = post.body + " " + new Date().getTime();
                const json = JSON.parse(post.json_metadata);
                console.log(json);
                tags = ('tags' in json) ? json.tags : [];
                console.log(tags);
                get_content_replies(post.author, post.permlink);
            });
        })
        .catch(err => {
            console.log(err);
        });
}

getLatestPost();
