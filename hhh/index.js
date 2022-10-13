
function log(msg) { 
    console.log(new Date().toString() + ' - ' + msg); 
}


function startProcess() {  

  log('Hello!!!') 
  
  setTimeout(function() {
    if (prices.length == 0) {
      log("no prices found.");
      return;
    }   
  }, 30 * 1000);
}


startProcess();
