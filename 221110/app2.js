
var { Client } = require('pg');

var client = new Client({
    user: 'yasu',
    host: '127.0.0.01',
    database: 'yasudb',
    password: 'yasuyasu',
    port: 5432
})

insert_test = async () => { 
    await client.connect()

    const query = {
        text: 'INSERT INTO users(name, email) VALUES($1, $2)',
        values: ['太郎', 'tarou@samplel.com'],
    }

    await client.connect("BEGIN")
    await client.query(query)
        .then(res => {
            console.log(res)
            console.log("succcess")
        })
        .catch(e => {
            console.error(e.stack)
            console.log("error")
        })
        
    await client.connect("COMMIT")
    client.end();
};
    
insert_test()