var { Client } = require('pg');

var client = new Client({
    user: 'yasu',
    host: '157.7.64.95',
    database: 'yasudb',
    password: 'yasuyasu',
    port: 5432
})

insert_test = async () => { 
    
    const query = {
        text: 'INSERT INTO users(name, email) VALUES($1, $2)',
        values: ['花子', 'hanako@samplel.com'],
    }

    client.connect()
        .then(() => console.log("Connected successfuly"))
        .then(() => client.query(query))
        .then(results => {console.log("succcess")})
        .catch((e => {console.error(e.stack)}))
        .finally((() => client.end()))
};
    
insert_test()
