
var { Client } = require('pg');

var client = new Client({
    user: 'yasu',
    host: '157.7.64.95',
    database: 'yasudb',
    password: 'yasuyasu',
    port: 5432
})
 
client.connect()

