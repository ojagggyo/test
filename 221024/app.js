const dsteem = require('dsteem');
const fs = require("fs");
const config = JSON.parse(fs.readFileSync("config.json"));
const client = new dsteem.Client('https://api.steemit.com');

const authorAcount = {
    acountName: config.acount_name,
    privateKey: dsteem.PrivateKey.fromString(config.posting_key)
};

commentWithOptions = async () => {
    const privateKey = authorAcount.privateKey;
    const account = authorAcount.acountName;
    const time = new Date().getTime();
    const title = `テスト ${time}`;
    const body = `本文 ${time}`;
    const tags = 'yasupal';
    const taglist = tags.split(' ');
    const json_metadata = JSON.stringify({ tags: taglist });
    const permlink = Math.random().toString(36).substring(2);

    client.broadcast
        .commentWithOptions(
            {
                author: account,
                body: body,
                json_metadata: json_metadata,
                parent_author: '',
                parent_permlink: tags,
                permlink: permlink,
                title: title,
            },
            {
                author: account,
                permlink: permlink,
                max_accepted_payout: "1000000.000 SBD",
                percent_steem_dollars: 0,
                allow_votes: true,
                allow_curation_rewards: true,
                extensions: []
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

commentWithOptions();
