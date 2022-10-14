function log(msg) {
    const s = new Date().toString() + ' - ' + msg; 
    console.log(s); 
    //return s;
    Promise.resolve(s)
}

function loglog(msg){
    log(msg).then(function (value) {
        return value;
    }).catch(function (error) {
        return error;
    });
}

// window.hello = async () => {
//     document.getElementById('aaa').innerHTML = loglog('Hello!');  
// };

window.hello = () => {
    document.getElementById('aaa').innerHTML = loglog('Hello!');  
};