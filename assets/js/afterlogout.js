$(document).ready(function(){
    chrome.storage.local.set({
        authenticated: false
    }, function() {
        console.log("session out!");
    });
 
  
});