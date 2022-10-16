const dsteem = require('dsteem');
const dsteem = require('./app1.js');
// const fs = require("fs");

// var config = JSON.parse(fs.readFileSync("config.json"));

//connect to server which is connected to the network/production
const client = new dsteem.Client('https://api.steemit.com');

// const authorAcount = {
//     acountName: config.acount_name,
//     privateKey: dsteem.PrivateKey.fromString(config.posting_key)
// };

//fetch list of trending posts
async function main() {
    const query = {
        tag: 'japanese',
        limit: 5,
        truncate_body: 1,
    };
    client.database
        .getDiscussions('created', query)
        .then(result => {
            var posts = [];
            result.forEach(post => {
                //console.log(post);
                const json = JSON.parse(post.json_metadata);
                const image = json.image ? json.image[0] : '';
                const title = post.title;
                const author = post.author;
                const permlink = post.permlink;
                const created = new Date(post.created).toDateString();

                console.log(`*****`);
                console.log(`${author},${permlink}`);
                console.log(get_content(author, permlink));
                console.log(`*****`);
            });
        })
        .catch(err => {
            console.log(err);
            // alert('Error occured, please reload the page');
        });
}
//catch error messages
main().catch(console.error);