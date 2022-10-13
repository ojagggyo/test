const dsteem = require('dsteem');

//connect to server which is connected to the network/production
const client = new dsteem.Client('https://api.steemit.com');

//filter change selection function
getPosts = async () => {

    //filter change selection function
    const filter = 'created';
    const query = {
            tag: 'japanese',
            limit: 1,
    };

    client.database
        .getDiscussions(filter, query)
        .then(result => {
            //console.log('******************');
            //console.log('Response received:', result);
            //console.log('******************');


            var authorList = [];
            result.forEach(post => {
                const json = JSON.parse(post.json_metadata);
                //const image = json.image ? json.image[0] : '';
                
                const author = post.author;
                const title = post.title;
                //const body = post.body.substring( 0, 40 );
                const body = post.body;
                const created = post.created;

                //authorList.push(author);
                //return authorList.join(",");

                body = "![ED907F9F-90FF-440A-9AED-65BEC853F756.jpeg](https://cdn.steemitimages.com/DQmeAXmt5ceLXjHHXHweDQsDPggkofskai3Uoy1oa4XuiWq/ED907F9F-90FF-440A-9AED-65BEC853F756.jpeg)\nこんにちはゆんです。"
                body = body.replace(/!\[.*\]\(.*\)/g, 'XXXXXXXX');

                log("start");
                log(author+" "+title+" "+created+" "+body+body.length) ; 
                log("end");
            });

            //return Promise.resolve(authorList.join(","));
        })
        .catch(err => {
            //console.log(err);
            //return err;
            //reject(err);
        });
};



function log(msg) { 
    console.log(new Date().toString() + ' - ' + msg); 
}


function startProcess() {  

    getPosts();
    /*
    getPosts();
    getPosts().then(
        //value => console.log(1 + value)
        log(value)
    ) 
*/
}

getPosts();
setInterval(startProcess, 10 * 1000);//ミリ秒
