function startProcess() {
    console.log(new Date().toString() + ' - ' + msg);
    setTimeout(startProcess, 10 * 1000);//ミリ秒
}

startProcess();
