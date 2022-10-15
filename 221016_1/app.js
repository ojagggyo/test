const dsteem = require('dsteem');
const fs = require("fs");

var config = JSON.parse(fs.readFileSync("config.json"));

//connect to server which is connected to the network/production
const client = new dsteem.Client('https://api.steemit.com');

const authorAcount = {
    acountName: config.acount_name,
    privateKey: dsteem.PrivateKey.fromString(config.posting_key),
    
};
const voterAcount = {
    acountName: config.acount_name,
    privateKey: dsteem.PrivateKey.fromString(config.posting_key)
};

const targetPost = {
    permlink: "4mgktspmmns",
    author: "yasu.pal"
};


submitVote = async () => {
    
    //get all values from the UI//
    //get account name of voter
    const voter = voterAcount.acountName;
    //get private posting key
    const privateKey = voterAcount.privateKey;
    //get author of post/comment to vote
    const author = targetPost.author;
    //get post permalink to vote
    const permlink = targetPost.permlink;
    //get weight of vote
    const weight = parseInt("100",10);//100%=10000

    //create vote object
    const vote = {
        voter,
        author,
        permlink,
        weight, //needs to be an integer for the vote function
    };

    //broadcast the vote
    client.broadcast.vote(vote, privateKey).then(
        function(result) {
            console.log('success:', result);
        },
        function(error) {
            console.log('error:', error);
        }
    );
};


submitVote();
