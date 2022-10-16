const Remarkable = require('remarkable');

//get_content of the post
get_content = async (author, permlink) => {
    client.database.call('get_content', [author, permlink]).then(result => {
        const md = new Remarkable({ html: true, linkify: true });
        const body = md.render(result.body);
        //result.title
        //body
        console(`body=${result}`);
    });
};