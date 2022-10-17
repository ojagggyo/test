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


edit_content = async (author, permlink, parent_permlink, tags, old_body, new_body) => {

    console.log(" *** edit_content ***");
    console.log(author);
    console.log(permlink);
    console.log(parent_permlink);
    console.log(tags);
    console.log(old_body);
    console.log(new_body);

    //get private key
    const privateKey = authorAcount.privateKey;
    //get account name
    const account = authorAcount.acountName;
    //get title
    const title = "変更後title " + new Date().getTime();//タイトルを編集する。

    //get tags and convert to array list
    const taglist = tags;
    //make simple json metadata including only tags
    const json_metadata = JSON.stringify({ tags: taglist });


    //computes a list of patches to turn o_body to edited_body
    const patch = createPatch(old_body, new_body);

    console.log(patch);

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
                json_metadata: json_metadata,
                parent_author: '',
                parent_permlink: parent_permlink,
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
                //console.log(post);
                const new_body = post.body + " " + new Date().getTime();//本文を編集する。
                const json = JSON.parse(post.json_metadata);
                //console.log(json);
                tags = ('tags' in json) ? json.tags : [];
                //console.log(tags);
                //console.log(`author=${post.author},permlink=${post.permlink},parent_permlink=${post.parent_permlink},tags=${tags.join(".")}`);
                edit_content(post.author, post.permlink, post.parent_permlink, tags, body, new_body);
            });
        })
        .catch(err => {
            console.log(err);
        });
}

getLatestPost();
