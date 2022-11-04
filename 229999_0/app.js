const dsteem = require('dsteem');

//connect to server which is connected to the network/production
const client = new dsteem.Client('https://home.steememory.com');


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
            });
        })
        .catch(err => {
            console.log(err);
        });
}

getLatestPost();
