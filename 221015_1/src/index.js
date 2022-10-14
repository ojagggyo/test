function log(msg) {
    const s = new Date().toString() + ' - ' + msg; 
    console.log(s); 
    return s;    
}

window.hello = () => {
    document.getElementById('aaa').innerHTML = log('Hello!');  
};
