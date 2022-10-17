const dsteem = require('dsteem');

//connect to server which is connected to the network/production
const client = new dsteem.Client('https://api.steemit.com');

const fs = require("fs");
var config = JSON.parse(fs.readFileSync("config.json"));
const authorAcount = {
    acountName: config.acount_name,
    privateKey: dsteem.PrivateKey.fromString(config.posting_key),
    
};


// 差分を作成する。
const diff_match_patch = require('diff-match-patch');
const dmp = new diff_match_patch();

function createPatch(oldText, newText) {
    if (!oldText && oldText === '') return undefined;
    const patch_make = dmp.patch_make(oldText, newText);
    const patch = dmp.patch_toText(patch_make);
    return patch;
}


edit_content = async (author, permlink, parent_permlink, json_metadata, new_title, old_body, new_body) => {

    console.log(" *** edit_content ***");
    console.log(author);
    console.log(permlink);
    console.log(parent_permlink);
    console.log(json_metadata);
    console.log(new_title);
    console.log(old_body);
    console.log(new_body);

    //get private key
    const privateKey = authorAcount.privateKey;
    //get account name
    const account = authorAcount.acountName;

    //computes a list of patches to turn o_body to edited_body
    const patch = createPatch(old_body, new_body);

    //check if patch size is smaller than edited content itself
    if (patch && patch.length < new Buffer(new_body, 'utf-8').length) {
        body = patch;//差分
    } else {
        body = new_body;
    }

    client.broadcast
        .comment(
            {
                author: author,
                body: body,
                json_metadata: json_metadata,//必須
                parent_author: '',
                parent_permlink: parent_permlink,
                permlink: permlink,
                title: new_title,//必須
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


// 最新の記事を取得する。
async function getLatestPost() {
    
    const query = {
        tag: 'yasu.pal',
        limit: '1',
        truncate_body: 0//本文をすべて取得
    };

    client.database
        .call('get_discussions_by_blog', [query])
        .then(result => {
            result.forEach(post => {
                console.log("post=",post);

                const new_title = "タイトル修正"; //タイトルを編集する。
                const new_body = post.body + " " + new Date().getTime();//本文を編集する。
                edit_content(post.author, post.permlink, post.parent_permlink, post.json_metadata, new_title, post.body, new_body);
            });
        })
        .catch(err => {
            console.log(err);
        });
}

getLatestPost();
