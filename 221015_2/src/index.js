const dsteem = require('dsteem');

//connect to server which is connected to the network/production
const client = new dsteem.Client('https://api.steemit.com');

//filter change selection function
window.getPosts = async () => {
    const filter = "created";
    const query = {
        tag: 'japanese',
        limit: 1,
    };

    client.database
        .getDiscussions(filter, query)
        .then(result => {
            console.log('Response received:', result);

            if (result) {
                var posts = [];
                result.forEach(post => {
                    const json = JSON.parse(post.json_metadata);
                    const image = json.image ? json.image[0] : '';
                    const title = post.title;
                    const author = post.author;
                    const created = new Date(post.created + "z");
                    const url = post.url;
                    });
            } else {
            }
        })
        .catch(err => {
            console.log(err);
        });
};
