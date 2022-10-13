const dsteem = require('dsteem');

//connect to server which is connected to the network/production
const client = new dsteem.Client('https://api.steemit.com');

//filter change selection function
getPosts = async () => {
    const query = {
        tag: 'Created',
        limit: 1,
    };

    console.log('Post assembled.\nFilter:', filter, '\nQuery:', query);

    client.database
        .getDiscussions(filter, query)
        .then(result => {
            console.log('Response received:', result);
            if (result) {
                var posts = [];
                result.forEach(post => {
                    //const json = JSON.parse(post.json_metadata);
                    //const image = json.image ? json.image[0] : '';
                    //const title = post.title;
                    //const author = post.author;
                    //const created = new Date(post.created).toDateString();
                    return post.author;
                });
            } else {
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


function startProcess() {  

  log(getPosts()) ;

}


setInterval(startProcess, 10 * 1000);//ミリ秒
