#ウェブサーバーを起動して、ドキュメントを表示する。

javascript関数を使用


function log(msg) {
    const s = new Date().toString() + ' - ' + msg; 
    console.log(s); 
    return s;    
}
window.hello = async () => {
    document.getElementById('aaa').innerHTML = log('Hello!');  
};



function log2(msg) {
    const s = new Date().toString() + ' - ' + msg; 
    console.log(s); 
    return Promise.resolve(s)
}
window.hello = async () => {
    document.getElementById('aaa').innerHTML = await log('Hello!');
};
