const dsteem = require('dsteem');

//connect to server which is connected to the network/production
const client = new dsteem.Client('https://api.steemit.com');



function getDateString(date){
    return `${date.getMonth()+1}/${date.getDay()} ${"00",date.getHours()}:${"00",date.getMinutes()}`;
}
 



const muteList = ["bukitcantik"];


//filter change selection function
window.getPosts = async () => {
    const filter = "created";
    const query = {
        tag: 'japanese',
        limit: 30,
    };

    console.log('Post assembled.\nFilter:', filter, '\nQuery:', query);

    client.database
        .getDiscussions(filter, query)
        .then(result => {
            console.log('Response received:', result);


            if (result) {
                var posts = [];
                
                var today = new Date();
                console.log(today);
                today = new Date(today.toISOString()  + "z")
                console.log(today);
                
                var yesterday = new Date(today.setDate(today.getDate() - 1) );
                console.log(yesterday);
                yesterday = new Date(yesterday.toISOString()  + "z")
                console.log(yesterday);
        

                posts.push(`<table><tr><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td></tr>`);

                result.forEach(post => {
                    const json = JSON.parse(post.json_metadata);
                    const image = json.image ? json.image[0] : '';
                    const title = post.title;
                    const author = post.author;
                    const created = new Date(post.created + "z")

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
`<tr><td>${title}</td>\
<td>${author}</td>\
<td>${getDateString(created)}</td>\
<td>${body.length}(${post.body.length})</td>\
<td>${image != ''?"〇":"✕"}</td></tr>`
  
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



function log(msg) { 
    console.log(new Date().toString() + ' - ' + msg); 
}

