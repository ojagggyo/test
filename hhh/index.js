
function log(msg) { 
    console.log(new Date().toString() + ' - ' + msg); 
}


function startProcess() {  

  log('Hello!!!') 
  
  setTimeout(startProcess, 30 * 1000);
}


startProcess();
