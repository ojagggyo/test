const dsteem = require('dsteem');

//connect to server which is connected to the network/production
const client = new dsteem.Client('https://api.steemit.com');








const diff_match_patch = require('diff-match-patch');
const dmp = new diff_match_patch();

function createPatch(text, out) {
    if (!text && text === '') return undefined;
    const patch_make = dmp.patch_make(text, out);
    const patch = dmp.patch_toText(patch_make);
    return patch;
}




const fs = require("fs");
var config = JSON.parse(fs.readFileSync("config.json"));
const authorAcount = {
    acountName: config.acount_name,
    privateKey: dsteem.PrivateKey.fromString(config.posting_key),
    
};

const targetPost = {
    permlink: "srgovmdw7m",
    author: "yasu.pal"
};

//submit post function
edit_content = async (author, permlink, body, tags) => {
    //get private key
    const privateKey = authorAcount.privateKey;
    //get account name
    const account = authorAcount.acountName;
    //get title
    const title = "変更後titleの変更の変更";
    //get body
    const edited_body = "1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890A";

    //computes a list of patches to turn o_body to edited_body
    const patch = createPatch(body, edited_body);

    console.log(`patch=${patch}`);

    //check if patch size is smaller than edited content itself
    if (patch && patch.length < new Buffer(edited_body, 'utf-8').length) {
        body = patch;

        console.log(`*** patch ***`);
    } else {
        body = edited_body;

        console.log(`*** new body ***`);
    }

    //get tags and convert to array list
    const taglist = tags;
    //make simple json metadata including only tags
    const json_metadata = JSON.stringify({ tags: taglist });
    //generate random permanent link for post
    //const permlink = permlink;

    client.broadcast
        .comment(
            {
                author: account,
                body: body,
                json_metadata: json_metadata,
                parent_author: '',
                parent_permlink: taglist[0],
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




//fetch list of comments for certain account
async function getLatestPost() {
    const query = {
        tag: 'yasu.pal',
        limit: '1',
        truncate_body: 10
    };
    client.database
        .call('get_discussions_by_blog', [query])
        .then(result => {
            result.forEach(post => {
                console.log(post);
                const json = JSON.parse(post.json_metadata);
                
                console.log(json.tags);
                tags = ('tags' in user) ? json.tags : [];
                console.log(tags);
                //const tags = json.tags;//list

                console.log(`author=${post.author},permlink=${post.permlink},tags=${tags.join(".")}`);
                edit_content(post.author, post.permlink, post.body, tags);
            });
        })
        .catch(err => {
            console.log(err);
        });
}

getLatestPost();
