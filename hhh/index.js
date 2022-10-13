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

    //console.log('Post assembled.\nFilter:', filter, '\nQuery:', query);

    client.database
        .getDiscussions(filter, query)
        .then(result => {
            //console.log('Response received:', result);

            var authorList = [];
            result.forEach(post => {
                const json = JSON.parse(post.json_metadata);
                //const image = json.image ? json.image[0] : '';
                //const title = post.title;
                const author = post.author;
                //authorList.push(author);
                //return authorList.join(",");


                //log(json) ; 
            });
            log(result) ; 
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
