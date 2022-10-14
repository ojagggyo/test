function log(msg) {
    const s = new Date().toString() + ' - ' + msg; 
    console.log(s); 
    //return s;
    return Promise.resolve(s)
}

function loglog(msg){
    console.log('loglog '); 
    log(msg).then(function (value) {
        console.log('then ' + s); 
        return value;
    }).catch(function (error) {
        console.log('catch ' + s); 
        return error;
    });
}

window.hello = async () => {
    document.getElementById('aaa').innerHTML = loglog('Hello!');  
};

// window.hello = () => {
//     document.getElementById('aaa').innerHTML = loglog('Hello!');  
// };