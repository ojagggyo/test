// Uncaught (in promise) ReferenceError: regeneratorRuntime is not defined
require("regenerator-runtime/runtime");

const dsteem = require('dsteem');

//connect to server which is connected to the network/production
const client = new dsteem.Client('https://api.steemit.com');

function getDateString(date){
    return `${date.getMonth()+1}/${date.getDay()} ${date.getHours()}:${date.getMinutes()}`;
}

//filter change selection function
window.hello = async () => {

    const filter = "created";
    const query = {
        tag: 'japanese',
        limit: 5,
    };

    client.database
        .getDiscussions(filter, query)
        .then(result => {
            console.log('Response received:', result);

            var posts = [];

            result.forEach(post => {
                const json = JSON.parse(post.json_metadata);
                const image = json.image ? "https://steemitimages.com/200x0/"+json.image[0] : '';
                const title = post.title;
                const author = post.author;
                const created = new Date(post.created + "z");
                const url = post.url;

                var body = post.body;
                body = body.replace(/!\[.*\]\(.*\)/g, '');//画像削除
                body = body.replace(/!\[.*\]\[.*\]/g, '');//画像削除2
                body = body.replace(/([^!])\[(.*)\]\(.*\)/g, /$1$2/);//リンク削除

                posts.push(
`<h2><a href=https://steemit.com${url}>${title}</a></h2>\
<b>${author}${getDateString(created)}</b>\
<img src="${image}" align="right" />\
<br />${body}<hr/>`);
            });
            posts.push(`</table>`);


            document.getElementById('aaa').innerHTML = posts.join('');
        })
        .catch(err => {
            console.log(err);
            document.getElementById('aaa').innerHTML = 'NG';
        });
};
