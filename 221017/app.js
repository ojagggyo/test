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
            console.log(`${result[0].title} ${result[0].body} ${JSON.parse(result[0].json_metadata).tags.join(' ')}`) ;
          

            //o_body = result[0].body;
            //o_permlink = result[0].permlink;
        })
        .catch(err => {
            console.log(err);
        });
}


getLatestPost();
