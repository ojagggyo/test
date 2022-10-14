function log(msg) { 
    console.log(new Date().toString() + ' - ' + msg); 
}

window.hello = async () => {
    document.getElementById('aaa').innerHTML = log('Hello!');  
};

// window.hello = () => {
//     document.getElementById('aaa').innerHTML = log('Hello!');  
// };