const dsteem = require('dsteem');
const client = new dsteem.Client('https://api.steemit.com');

module.exports.createPost = async (username, key, title, body, imageurl) => {

    console.log(`*** createPost ${username} ${key} ${title} ${body} ***`);

    parent_permlink = 'yasupal';
    const taglist = 'yasupal yasupal2 yasupal3'.split(' ');
    const json_metadata = JSON.stringify(
        { 
            tags: taglist ,
            image: [imageurl] 
        }
        );

    const post = {
        author: username,
        body: body,
        json_metadata: json_metadata,
        parent_author: '',
        parent_permlink: parent_permlink,
        permlink: Math.random().toString(36).substring(2),
        title: title,
    };

    client.broadcast
        .comment(post, key)
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
