const dsteem = require('dsteem');

//connect to server which is connected to the network/production
const client = new dsteem.Client('https://api.steemit.com');

const muteList = ["bukitcantik"];


//filter change selection function
window.getPosts = async () => {
    const filter = "created";
    const query = {
        tag: 'japanese',
        limit: 20,
    };

    console.log('Post assembled.\nFilter:', filter, '\nQuery:', query);

    client.database
        .getDiscussions(filter, query)
        .then(result => {
            console.log('Response received:', result);


            if (result) {
                var posts = [];
                const today = new Date();
                const yesterday = new Date(today.setDate(today.getDate() - 1));

                posts.push(`<table><tr><td>1</td><td>2</td><td>3</td><td>4</td></tr>`);

                result.forEach(post => {
                    const json = JSON.parse(post.json_metadata);
                    const image = json.image ? json.image[0] : '';
                    const title = post.title;
                    const author = post.author;
                    const created = new Date(post.created)

                    //アカウント対象外
                    if(-1 < muteList.indexOf(author)){
                        return;
                    }

                    //24時間以上前
                    if(yesterday.getTime() > created.getTime()){
                        return;
                    }


                     
                    var body = post.body;
                    body = body.replace(/!\[.*\]\(.*\)/g, '画像削除');//画像削除
                    body = body.replace(/([^!])\[(.*)\]\(.*\)/g, /$1$2/);//リンク削除

                    posts.push(
//`<div><h4>${title}</h4><p>by ${author}</p><center><img src="${image}" style="max-width: 200px"/></center><p>${created}</p></div>`
`<tr><td>${title}</td><td>${author}</td><td>${created.ToString("MM/dd HH:mm")}</td><td>${body.length}(${post.body.length})</td></tr>`
  
                    );
                });
                posts.push(`</table>`);

                document.getElementById('postList').innerHTML = posts.join('');
            } else {
                document.getElementById('postList').innerHTML = 'No result.';
            }
        })
        .catch(err => {
            console.log(err);
            alert(`Error:${err}, try again`);
        });
};





/*
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
            if (result) {
                var posts = [];
                result.forEach(post => {
                    const json = JSON.parse(post.json_metadata);
                    //const image = json.image ? json.image[0] : '';
                        
                    const author = post.author;
                    const title = post.title;
                    //const body = post.body.substring( 0, 40 );
                    //const created = post.created;

                    var body = post.body;
                    body = body.replace(/!\[.*\]\(.*\)/g, '画像削除');//画像削除
                    body = body.replace(/([^!])\[(.*)\]\(.*\)/g, /$1$2/);//リンク削除
                    
                    //log(author+" "+title+" "+created+" "+body+body.length) ; 

                    const created = new Date(post.created).toDateString();
                    posts.push(
                        `<div ><h4 >${title}</h4><p>by ${author}</p><center><img src="${image}" style="max-width: 450px"/></center><p>${created}</p></div>`
                    );
                    document.getElementById('postList').innerHTML = posts.join('');
            }
                else {
                document.getElementById('postList').innerHTML = 'No result.';
            }
        })
        .catch(err => {
            console.log(err);
        });
};
*/


function log(msg) { 
    console.log(new Date().toString() + ' - ' + msg); 
}

