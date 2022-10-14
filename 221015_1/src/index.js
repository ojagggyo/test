function log(msg) {
    const s = new Date().toString() + ' - ' + msg; 
    console.log(s); 
    //return s;
    Promise.resolve(s)
}

// window.hello = async () => {
//     document.getElementById('aaa').innerHTML = log('Hello!');  
// };

window.hello = async () => {
    document.getElementById('aaa').innerHTML = await log('Hello!');  
};