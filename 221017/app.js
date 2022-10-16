const dsteem = require('dsteem');
const r = require('remarkable');

//connect to server which is connected to the network/production
const client = new dsteem.Client('https://api.steemit.com');

//get_content of the post
get_content = async (author, permlink) => {
    client.database.call('get_content', [author, permlink]).then(result => {
        const md = new r.Remarkable({ html: true, linkify: true });
        const body = md.render(result.body);
        //result.title
        //body
        console.log(`title=${result.title} author=${author} permlink=${permlink} body=${body}`);
    });
};

//fetch list of trending posts
async function main() {
    const query = {
        tag: 'japanese',
        limit: 1,
        truncate_body: 1,
    };
    client.database
        .getDiscussions('created', query)
        .then(result => {
            console.log(`${result}`);

            var posts = [];
            result.forEach(post => {
                //console.log(post);
                const json = JSON.parse(post.json_metadata);
                const image = json.image ? json.image[0] : '';
                const title = post.title;
                const author = post.author;
                const permlink = post.permlink;
                const created = new Date(post.created).toDateString();
                
                console.log(`${author},${permlink},${post.active_votes}`);

                //非同期であることに注意！
                get_content(author, permlink);
            });
        })
        .catch(err => {
            console.log(err);
        });
}
//catch error messages
main().catch(console.error);
