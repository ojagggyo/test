const dsteem = require('dsteem');

//connect to server which is connected to the network/production
const client = new dsteem.Client('https://api.steemit.com');

function getDateString(date){
    return `${date.getMonth()+1}/${date.getDay()} ${"00",date.getHours()}:${"00",date.getMinutes()}`;
}

//ミュートしたいアカウント
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
                var yesterday = new Date(today.setDate(today.getDate() - 1) );
                console.log(yesterday);





                posts.push(`<table><tr><td>タイトル</td><td>著者2</td><td>作成日時</td><td>文の長さ</td><td>写真</td><td>yasu</td><td>yasu.witness</td></tr>`);

                result.forEach(post => {
                    const json = JSON.parse(post.json_metadata);
                    const image = json.image ? json.image[0] : '';
                    const title = post.title;
                    const author = post.author;
                    const created = new Date(post.created + "z");
                    const url = post.url;

                    //アカウント対象外
                    if(-1 < muteList.indexOf(author)){
                        return;
                    }

                    //24時間以上前
                    if(yesterday.getTime() > created.getTime()){
                        return;
                    }


                    const active_votes = post.active_votes;

                    var yasu_voted = active_votes.some( function( value ) {
                        return value.voter ===  'yasu'; 
                    });

                    var yasuwitness_voted = active_votes.some( function( value ) {
                        return value.voter ===  'yasu.witness'; 
                    });
 

                     
                    var body = post.body;
                    body = body.replace(/!\[.*\]\(.*\)/g, '画像削除');//画像削除
                    body = body.replace(/([^!])\[(.*)\]\(.*\)/g, /$1$2/);//リンク削除


                    posts.push(
//`<div><h4>${title}</h4><p>by ${author}</p><center><img src="${image}" style="max-width: 200px"/></center><p>${created}</p></div>`
`<tr><td><a href=https://steemit.com${url}>${title}</a></td>\
<td>${author}</td>\
<td>${getDateString(created)}</td>\
<td>${body.length}(${post.body.length})</td>\
<td>${image != ''?"〇":"✕"}</td>\
<td>${yasu_voted ?"〇":"✕"}</td>\
<td>${yasuwitness_voted ?"〇":"✕"}</td></tr>`  
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

