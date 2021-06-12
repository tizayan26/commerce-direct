$(document).ready(function(){
    chrome.storage.local.set({
        userid:   $.urlParam('id_token').substring(0,20),
        fmsg: true
    }, function() {
        console.log("user id stored");
    });
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
                window.location.replace("https://commercedirect.io/userlogin-success");
            });
        }
    });
});