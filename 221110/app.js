
var { Client } = require('pg');

var client = new Client({
    user: 'yasu',
    host: '127.0.0.01',
    database: 'yasudb',
    password: 'yasuyasu',
    port: 5432
})
 
client.connect()

const query = {
    text: 'INSERT INTO users(name, email) VALUES($1, $2)',
    values: ['太郎', 'mytest@samplel.com'],
}

client.query(query)
  .then(res => {
        console.log(res.rows[0])
        console.log("succcess")
    })
    .catch(e => {
        console.error(e.stack)
        console.log("error")
    })

