const dsteem = require('dsteem');

//connect to server which is connected to the network/production
const client = new dsteem.Client('https://api.steemit.com');


//fetch list of comments for certain account
async function getLatestPost() {
    const query = {
        tag: 'yasu',
        limit: '2',
        truncate_body: 10
    };
    client.database
        .call('get_discussions_by_blog', [query])
        .then(result => {
        
            var posts = [];
            result.forEach(post => {
                console.log(post);
                //console.log(`${post.title} ${post.author} ${post.permlink} ${post.auther} ${post.parse}${post.body} ${JSON.parse(post.json_metadata).tags.join(' ')}`) ;
            });
        })
        .catch(err => {
            console.log(err);
        });
}


getLatestPost();
