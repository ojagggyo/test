const dsteem = require('dsteem');

//connect to server which is connected to the network/production
const client = new dsteem.Client('https://api.steemit.com');


const fs = require("fs");
var config = JSON.parse(fs.readFileSync("config.json"));
const authorAcount = {
    acountName: config.acount_name,
    privateKey: dsteem.PrivateKey.fromString(config.posting_key),
    
};


submitComment = async (parent_author, parent_permlink) => {

    const body = "コメント " + new Date().getTime();

    //generate random permanent link for post
    const permlink = Math.random()
        .toString(36)
        .substring(2);

    const payload = {
        author: authorAcount.acountName,
        title: '',
        body: body,
        parent_author: parent_author,
        parent_permlink: parent_permlink,
        permlink: permlink,
        json_metadata: '',
    };

    console.log('client.broadcast.comment payload:', payload);
    client.broadcast.comment(payload, authorAcount.privateKey).then(
        function(result) {
            console.log('client.broadcast.comment response', result);
            console.log(`${result.block_num} ${parent_author}/${parent_permlink}`);
        },
        function(error) {
            console.error(error);
        }
    );

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
                submitComment(post.author, post.permlink);
            });
        })
        .catch(err => {
            console.log(err);
        });
}

getLatestPost();
