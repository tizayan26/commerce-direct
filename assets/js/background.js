chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) { 
    console.log(tab);
    var str = tab.url;
    if(str !== undefined){
      // var str = tab.url;
    pattern = /(cart|bag|trolly|trolley|carriage|basket|weagon|order)/g
    // pattern = /(thank you|thanks|success|complete|paid|done|)/g

    if(str!==undefined){
      result = str.match(pattern);
      if(str.match(/(google.com)/g)){
        chrome.storage.local.set({
          data: JSON.stringify({cd:0})
        }, function() {
          console.log("data stored");
        });
        chrome.storage.local.set({
          claimed:false,
          redeemed: false
        }, function() {
          console.log("reward cleared!");
        });
      }
    
     
    }
  }
});

chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {
  if(details.frameId === 0) {
      // Fires only when details.url === currentTab.url
      chrome.tabs.get(details.tabId, function(tab) {
          if(tab.url === details.url) {
            var str = tab.url;
            if(str.indexOf("rewardlink.io/r/1/complete/") === 16){
              chrome.storage.local.get(['userid','opix_data','asked_amt','redeemed'], function(result){
                // if(!result.redeemed || result.redeemed=== undefined){
                  alert('got it');
                  console.log(result);
                  if(result.userid!==undefined){
                      user_id = result.userid;
                      var opix_data = JSON.parse(result.opix_data); 
                      uid = opix_data.uid;
                      vid = opix_data.vid;
                      var amount = parseFloat(result.asked_amt).toFixed(2);
                    fetch('https://api.commerce.direct/'+'userpts/used?userid='+encodeURIComponent(user_id)+'&uid='+encodeURIComponent(uid)+'&vid='+encodeURIComponent(vid)+'&pts='+amount, {
                        method:"PUT",        
                    })
                    .then(response => response.text())
                    .then(text => {
                      console.log(text);
                      chrome.storage.local.set({
                        redeemed: true
                      }, function() {
                        console.log("reward redeemed!");
                      });
                    })
                    .catch(error => console.log(error))
                  }
                // }
               
              })
            }
          }
      });
  }
});
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {

      switch(request.contentScriptQuery){
        case "fetchUrl":
          fetch(request.url, {
              method:request.method,
              headers: (request.headers === undefined) ? request.headers : null, 
              body: (request.data === undefined) ? request.data : null        
          })
          .then(response => response.text())
          .then(text => sendResponse(text))
          .catch(error => console.log(error))
          return true;  
        

        case "apiTango":
          fetch(request.url, {
            method:request.method,
            body : (request.data === undefined) ? request.data : null,
          
            "headers": {
              'Accept': 'application/json',
              'Authorization': `Basic ${request.token}`,
              'Access-Control-Allow-Origin': '*', 
              'Access-Control-Allow-Headers': 'Content-Type',
              'Content-Type': 'application/json'
            }     
        })
        .then(response => response.text())
        .then(text => sendResponse(text))
        .catch(error => console.log(error))
        return true;   
      }

    switch(request.message){
      case "openURL":
        return chrome.tabs.create({
            url: request.url,
            active: true,
            windowId: sender.tab.windowId
        }), !0;
      }
});