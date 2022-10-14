function log(msg) {
    const s = new Date().toString() + ' - ' + msg; 
    console.log(s); 
    return s;    
}


//
// Hello関数
//
window.hello = () => {
    document.getElementById('aaa').innerHTML = log('Hello!');  
};
