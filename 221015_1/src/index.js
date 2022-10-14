function log(msg) { 
    console.log(new Date().toString() + ' - ' + msg); 
}

// window.getPosts = async () => {
//     document.getElementById('aaa').innerHTML = log('Hello!');  
// };

window.hello = () => {
    document.getElementById('aaa').innerHTML = log('Hello!');  
};