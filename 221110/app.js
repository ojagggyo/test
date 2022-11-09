
var { Client } = require('pg');

var client = new Client({
    user: 'yasu',
    host: '127.0.0.01',
    database: 'yasudb',
    password: 'yasuyasu',
    port: 5432
})
 
client.connect()

