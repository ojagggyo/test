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

