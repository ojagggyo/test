const dsteem = require('dsteem');

//connect to server which is connected to the network/production
const client = new dsteem.Client('https://api.steemit.com');

//submitTab function from html input
const max = 10;

submitTag = async () => {
    const tagSearch = document.getElementById('tagName').value;

    //get list of tags from blockchain
    const _tags = await client.database.call('get_trending_tags', [
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