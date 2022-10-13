function log(msg) {
    console.log(new Date().toString() + ' - ' + msg);
}

function startProcess() {
    log('Hello!') ;
    setTimeout(startProcess, 10 * 1000);//ミリ秒
}

startProcess();

