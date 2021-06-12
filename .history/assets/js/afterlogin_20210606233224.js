$(document).ready(function(){
    $.urlParam('access_token')
    chrome.runtime.sendMessage({
        contentScriptQuery: 'fetchUrl',
        url: `https://pixel.commerce.direct/?access_token=${$.urlParam('access_token')}`,
        method: 'GET'
    },
    function(result) {
        if(result){
            chrome.storage.local.set({
                authenticated: true
            }, function() {
                
                console.log("authentication completed!");
            });
        }
    });
});