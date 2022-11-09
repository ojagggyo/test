
var { Client } = require('pg');

var client = new Client({
    user: 'yasu',
    host: '127.0.0.01',
    database: 'yasudb',
    password: 'yasuyasu',
    port: 5432
})

insert_test = async () => { 

    const insertdata =[
        ['太郎', 'tarou@samplel.com'],
        ['花子', 'hanako@samplel.com'],
        ['三郎', 'saburou@samplel.com'],
    ] 

    let values_list =[]
    let values =[]

    insertdata.forEach(
        function(element,index){
            console.log(`${index}`)
            values_list.push(`($${index*2+1}, $${index*2+2})`)
            values.push(element[0]);
            values.push(element[1]);
          }     
    );
    
    console.log(`${values_list.join(",")}`)
    console.log(`${values}`)

    const query = {
        text: `INSERT INTO users(name, email) VALUES ${values_list.join(",")}`,
        values: values
    }

    client.connect()
        .then(() => console.log("Connected successfuly"))
        .then(() => client.query(query))
        .then(results => {console.log("succcess")})
        .catch((e => {console.error(e.stack)}))
        .finally((() => client.end()))
};
    
insert_test()