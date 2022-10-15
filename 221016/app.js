const dsteem = require('dsteem');

//connect to server which is connected to the network/production
const client = new dsteem.Client('https://api.steemit.com');

//filter change selection function
const filter = 'created';
const query = {
        tag: 'japanese',
        limit: 1,
};

console.log('Post assembled.\nFilter:', filter, '\nQuery:', query);

client.database
    .getDiscussions(filter, query)
    .then(result => {
        console.log('Response received:', result);
    })
    .catch(err => {
        console.log(err);
    });


//
// const acountName = function() {
//     return Promise.resolve("yasu.pal")
// };
// const privateKey = function() {
//     return Promise.resolve("5JokxJUr1iG4tXQASbLdaV251WqhWpKmK2cFPyLFzmTqyQ2qKAL")
// };
const authorAcount = {
    acountName:　"yasu.pal",
    privateKey: "5JokxJUr1iG4tXQASbLdaV251WqhWpKmK2cFPyLFzmTqyQ2qKAL"
};

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
        const permlink = Math.random()
            .toString(36)
            .substring(2);
    
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
                    
                    console.log(result.block_num);                  
               },
                function(error) {
                    console.error(error);
                }
            );
};



createPost();