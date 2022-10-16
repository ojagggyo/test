const dsteem = require('dsteem');

//connect to server which is connected to the network/production
const client = new dsteem.Client('https://api.steemit.com');




const fs = require("fs");
var config = JSON.parse(fs.readFileSync("config.json"));
const authorAcount = {
    acountName: config.acount_name,
    privateKey: dsteem.PrivateKey.fromString(config.posting_key),
    
};

const targetPost = {
    permlink: "bn5uqie0rej",
    author: "yasu.pal"
};

//submit post function
edit_content = async (author, permlink, body, tags) => {

    console.log(" *** edit_content ***");
    console.log(author);
    console.log(permlink);
    console.log(body);
    console.log(tags);


    //get private key
    const privateKey = authorAcount.privateKey;
    //get account name
    const account = authorAcount.acountName;
    //get title
    const title = "変更後title";

    //get tags and convert to array list
    const taglist = tags;
    //make simple json metadata including only tags
    const json_metadata = JSON.stringify({ tags: taglist });

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
               
                console.log(json);

                tags = ('tags' in json) ? json.tags : [];
                console.log(tags);

                const body = post.body + " " + new Date().getTime();

                console.log(`author=${post.author},permlink=${post.permlink},tags=${tags.join(".")}`);
                edit_content(post.author, post.permlink, post.body, tags);
            });
        })
        .catch(err => {
            console.log(err);
        });
}

getLatestPost();
