function startProcess() {  
    console.log(new Date().toString() + ' - ' + msg); 
}

setInterval(startProcess, 10 * 1000);//ミリ秒
