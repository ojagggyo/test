const dsteem = require('dsteem');

//connect to server which is connected to the network/production
const client = new dsteem.Client('https://api.steemit.com');

function getDateString(date){
    return `${date.getMonth()+1}/${date.getDay()} ${date.getHours()}:${date.getMinutes()}`;
}
function log(msg) { 
    console.log(new Date().toString() + ' - ' + msg); 
}


//ミュートしたいアカウント
const muteList = ["yasu","yasu.witness"];
const muteList2 = ["bukit"];//前方一致指せるキーワード


//filter change selection function
//window.getPosts = async () => {
getPosts = async (voter) => {
    const filter = "created";
    const query = {
        tag: 'japanese',
        limit: 50,
    };

    client.database
        .getDiscussions(filter, query)
        .then(result => {
            console.log('Response received:', result);


            if (result) {
                //var posts = [];
                
                var today = new Date();
                console.log(today);
                var yesterday = new Date(today.setDate(today.getDate() - 1) );
                console.log(yesterday);

                //posts.push(`<table><tr><td>タイトル</td><td>著者2</td><td>作成日時</td><td>文の長さ</td><td>写真</td><td>yasu</td><td>yasu.witness</td></tr>`);

                result.forEach(post => {
                    const json = JSON.parse(post.json_metadata);
                    const image = json.image ? json.image[0] : '';
                    const title = post.title;
                    const author = post.author;
                    const created = new Date(post.created + "z");
                    const url = post.url;



                    //アカウント対象外（完全一致）
                    if(-1 < muteList.indexOf(author)){
                        return;
                    }

                    //アカウント対象外（前方一致）
                    let muteUser = false; 
                    muteList2.forEach(name => {
                        if(author.startsWith(name)){
                            muteUser = true;
                            return;
                        }
                    })
                    if(muteUser){
                        return;
                    }



                    //24時間以上前
                    if(yesterday.getTime() > created.getTime()){
                        return;
                    }

                    //自分voterがvote済みか確認する
                    const active_votes = post.active_votes;
                    var voter_voted = active_votes.some( function( value ) {
                        return value.voter ===  voter; 
                    });
                    if(voter_voted){
                        return;
                    }

                    //yasuがvote済みか確認する
                    var yasu_voted = active_votes.some( function( value ) {
                        return value.voter ===  'yasu'; 
                    });
                    //yasu.witnesがvote済みか確認する
                    var yasuwitness_voted = active_votes.some( function( value ) {
                        return value.voter ===  'yasu.witness'; 
                    });
                     
                    var body = post.body;
                    body = body.replace(/!\[.*\]\(.*\)/g, '画像削除');//画像削除
                    body = body.replace(/([^!])\[(.*)\]\(.*\)/g, /$1$2/);//リンク削除

//                     posts.push(
// `<tr><td><a href=https://steemit.com${url}>${title}</a></td>\
// <td>${author}</td>\
// <td>${getDateString(created)}</td>\
// <td>${body.length}(${post.body.length})</td>\
// <td>${image != ''?"〇":"✕"}</td>\
// <td>${yasu_voted ?"〇":"✕"}</td>\
// <td>${yasuwitness_voted ?"〇":"✕"}</td></tr>`  
//                     );


                    console.log(`${author} \t\t ${getDateString(created)} `);

                 });
                //posts.push(`</table>`);

                //document.getElementById('postList').innerHTML = posts.join('');
            } else {
                document.getElementById('postList').innerHTML = 'No result.';
            }
        })
        .catch(err => {
            console.log(err);
            alert(`Error:${err}, try again`);
        });
};


//コマンドパラメータ取得
let voter = "yasu.pal";//デフォルト
if(process.argv.length > 2){
    voter = process.argv[2];
}else{
   console.log('node app.js accountName'); 
   return;
}
getPosts(voter);