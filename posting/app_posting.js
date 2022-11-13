const dsteem = require('dsteem');
const client = new dsteem.Client('https://api.steemit.com');

createPost = async (poster, posting_key) => {
    
    //for content
    const time = new Date().getTime();

    const tags = 'yasupal';
    const taglist = tags.split(' ');
    const json_metadata = JSON.stringify({ tags: taglist });

    const post = {
        author: poster,
        body: `本文 ${time}`,
        json_metadata: json_metadata,
        parent_author: '',
        parent_permlink: tags,
        permlink: Math.random().toString(36).substring(2),
        title: `テスト ${time}`,
    };

    client.broadcast
        .comment(post, posting_key)
        .then(
            function(result) {
                console.log(result);
            },
            function(error) {
                console.error(error);
            }
        );
};

module.exports.createPost();