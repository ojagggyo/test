function log(msg) {
    const s = new Date().toString() + ' - ' + msg; 
    console.log(s); 
    //return s;
    Promise.resolve(s)
}

async function loglog(msg){
    return await log(msg).
}

window.hello = async () => {
    document.getElementById('aaa').innerHTML = loglog('Hello!');  
};

// window.hello = () => {
//     document.getElementById('aaa').innerHTML = loglog('Hello!');  
// };