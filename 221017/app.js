const dsteem = require('dsteem');

//connect to server which is connected to the network/production
const client = new dsteem.Client('https://api.steemit.com');

//submitTab function from html input
const max = 100;
const tagSearch = "japanese";

submitTag = async () => {

    console.log('tagSearch: ', tagSearch);

    //get list of tags from blockchain
    //const _tags = await client.database.call('get_trending_tags', [
    const _tags = await client.database.call('get_created_tags', [
        tagSearch,
        max,
    ]);

    console.log('tags: ', _tags);
    var posts = [];
    _tags.forEach(post => {

        console.log(`${post.name}`);
        
    });
    //disply list of tags with line breaks
};

submitTag();