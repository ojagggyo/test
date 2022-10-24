const dsteem = require('dsteem');
const fs = require("fs");

var config = JSON.parse(fs.readFileSync("config.json"));

//connect to server which is connected to the network/production
const client = new dsteem.Client('https://api.steemit.com');

const authorAcount = {
    acountName: config.acount_name,
    privateKey: dsteem.PrivateKey.fromString(config.posting_key)
};

// const permlink = Math.random()
//     .toString(36)
//     .substring(2);

    const permlink = "z9a8y3to4t";

createPost = async () => {
    //get private key
    const privateKey = authorAcount.privateKey;
    //get account name
    const account = authorAcount.acountName;
    //for content
    const time = new Date().getTime();
    //get title
    const title = `テスト ${time}`;
    //get body
    const body = `本文 ${time}`;
    //get tags and convert to array list
    const tags = 'yasupal';
    const taglist = tags.split(' ');
    //make simple json metadata including only tags
    const json_metadata = JSON.stringify({ tags: taglist });
    //generate random permanent link for post
    // const permlink = Math.random()
    //     .toString(36)
    //     .substring(2);

    client.broadcast
        .comment(
            {
                author: account,
                body: body,
                json_metadata: json_metadata,
                parent_author: '',
                parent_permlink: tags,
                permlink: permlink,
                title: title,
            },
            privateKey
        )
        .then(
            function(result) {
                console.log(result);
            },
            function(error) {
                console.error(error);
            }
        );
};



comment = async () => {
    //get private key
    const privateKey = authorAcount.privateKey;
    //get account name
    const account = authorAcount.acountName;



    client.broadcast.comment_options (
            {
                "author": account,
                "permlink": permlink,
                "max_accepted_payout":"1000000.000 SBD",
                "percent_steem_dollars":0,
                "allow_votes":true,
                "allow_curation_rewards":true,
                "extensions":[]
            },
            privateKey
        )
        .then(
            function(result) {
                console.log(result);
            },
            function(error) {
                console.error(error);
            }
        );
};

//createPost();
comment();