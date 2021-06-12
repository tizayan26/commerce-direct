$(document).ready(function(){
    var user_id = $.urlParam('id_token').substring(0,20);
    chrome.runtime.sendMessage({
        contentScriptQuery: 'fetchUrl',
        url: `${cdirect_api_endpoint}username?userid=${user_id}`,
        method: 'GET'
    },
    function(result) {
        var result = JSON.parse(result);
        var body = result["body"];
        if (body.qualified == 'Y') {
            chrome.storage.local.set({
                userid: user_id,
                fmsg: true
            }, function() {
                console.log("user id stored");
            });
        } else {
            console.log(body.message);
        }
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
                // window.location.replace("https://commercedirect.io/userlogin-success");
            });
        }
    });
});