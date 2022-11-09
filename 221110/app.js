
var { Client } = require('pg');

var client = new Client({
    user: 'yasu',
    host: '127.0.0.01',
    database: 'yasudb',
    password: 'yasuyasu',
    port: 5432
})

insert_test = async () => { 
    console.log("insert_test start")
    client.connect()

    const query = {
        text: 'INSERT INTO users(name, email) VALUES($1, $2)',
        values: ['太郎', 'mytest@samplel.com'],
    }

    await client.query(query)
        .then(res => {
            console.log(res)
            console.log("succcess")
        })
        .catch(e => {
            console.error(e.stack)
            console.log("error")
        })
        
    client.end();
    console.log("insert_test end")
};
    
console.log("start")
insert_test()
console.log("end")

