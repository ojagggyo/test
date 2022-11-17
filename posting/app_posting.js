const dsteem = require('dsteem');
const client = new dsteem.Client('https://api.steemit.com');

module.exports.createPost = async (username, key, category, title, body, imageurl) => {

    console.log(`*** createPost ${username} 非表示 ${category} ${title} ${body} ***`);

    parent_permlink = category;
    const taglist = `${category}`.split(' ');
    const json_metadata = JSON.stringify(
        { 
            tags: taglist ,
            image: [imageurl] 
        }
        );

    const permlink = Math.random().toString(36).substring(2)

    const post = {
        author: username,
        body: body,
        json_metadata: json_metadata,
        parent_author: '',
        parent_permlink: parent_permlink,
        permlink: permlink,
        title: title,
    };
    
    const option = {
        author: username,
        permlink: permlink,
        max_accepted_payout: "1000000.000 SBD",
        percent_steem_dollars: 0,
        allow_votes: true,
        allow_curation_rewards: true,
        extensions: []
    };

    client.broadcast
        //.comment(post, key)
        .commentWithOptions(post, option, key)
        .then(
            function(result) {
                console.log(result);
            },
            function(error) {
                console.error(error);
            }
        );


    console.log('*** createPost終了 ***');
};
