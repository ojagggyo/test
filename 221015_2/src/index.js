import 'regenerator-runtime/runtime'

import { Client } from 'dsteem'


//connect to server which is connected to the network/production
const client = new Client('https://api.steemit.com');

//filter change selection function
window.hello = async () => {

    const filter = "created";
    const query = {
        tag: 'japanese',
        limit: 1,
    };

    client.database
        .getDiscussions(filter, query)
        .then(result => {
            console.log('Response received:', result);
            document.getElementById('aaa').innerHTML = 'OK';
        })
        .catch(err => {
            console.log(err);
            document.getElementById('aaa').innerHTML = 'NG';
        });
};
