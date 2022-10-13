const dsteem = require('dsteem');

//connect to server which is connected to the network/production
const client = new dsteem.Client('https://api.steemit.com');

//filter change selection function
window.getPosts = async () => {

    //filter change selection function
    const filter = 'created';
    const query = {
            tag: 'japanese',
            limit: 10,
    };

    client.database
        .getDiscussions(filter, query)
        .then(result => {

             var posts = [];
             result.forEach(post => {
             const json = JSON.parse(post.json_metadata);
             //const image = json.image ? json.image[0] : '';
                
             const author = post.author;
             const title = post.title;
             //const body = post.body.substring( 0, 40 );
             const created = post.created;

             var body = post.body;
             body = body.replace(/!\[.*\]\(.*\)/g, '画像削除');//画像削除
             body = body.replace(/([^!])\[(.*)\]\(.*\)/g, /$1$2/);//リンク削除
               
             //log(author+" "+title+" "+created+" "+body+body.length) ; 

             const created = new Date(post.created).toDateString();
             posts.push(
                  `<div ><h4 >${title}</h4><p>by ${author}</p><center><img src="${image}" style="max-width: 450px"/></center><p>${created}</p></div>`

            });
                document.getElementById('postList').innerHTML = posts.join('');
            else {
                document.getElementById('postList').innerHTML = 'No result.';
            }
        })
        .catch(err => {
            console.log(err);
        });
};



function log(msg) { 
    console.log(new Date().toString() + ' - ' + msg); 
}

