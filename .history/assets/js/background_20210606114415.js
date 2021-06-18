chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  var str = tab.url;
  if (str !== undefined) {
      pattern = /(cart|bag|trolly|trolley|carriage|basket|weagon|order|mod|87|cgi-bin)|shoppingBag/g
      if (str !== undefined) {
          result = str.match(pattern);
          if (str.match(/(google.com)/g) || str.match(/(rewardlink.io)/g)) {
            chrome.storage.local.set({
                data: JSON.stringify({
                    cd: 0
                })
            }, function() {
                console.log("data stored");
            });
            chrome.storage.local.set({
                claimed: false,
                redeemed: false
            }, function() {
                console.log("reward cleared!");
            });
            chrome.storage.local.set({
                cart_data: null
            }, function() {
                console.log('Cart Data has been clear');
            }); 
        }
    }
  }
});
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {

      switch (request.contentScriptQuery) {
          case "fetchUrl":
              fetch(request.url, {
                      method: request.method,
                      headers: (request.headers === undefined) ? request.headers : null,
                      body: (request.data === undefined) ? request.data : null
                  })
                  .then(response => response.text())
                  .then(text => sendResponse(text))
                  .catch(error => console.log(error))
              return true;


          case "apiTango":
              fetch(request.url, {
                      method: request.method,
                      body: (request.data === undefined) ? request.data : null,

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

      switch (request.message) {
          case "openURL":
              return chrome.tabs.create({
                  url: request.url,
                  active: true,
                  windowId: sender.tab.windowId
              }), !0;
      }
  });
//Modal popup
// chrome.browserAction.onClicked.addListener(function(tab){
//     chrome.tabs.sendMessage(tab.id,"toggle");
// });


chrome.runtime.onInstalled.addListener(function(details){
    if(details.reason == "install"){
        console.log("This is a first install!");
        chrome.tabs.create({
            url: "https://login.commerce.direct/login?client_id=7hjuil2nuuf2h4m0epq740bjlk&response_type=token&scope=email+openid+phone&redirect_uri=https://login.commerce.direct/",
            active: true,
        });
    }
});

chrome.tabs.onActivated.addListener(function (info) {
    var icon_disable = 'assets/icons/cd-icon-128-disable.png';
    var icon_enable = 'assets/icons/cd-icon-128.png';
    chrome.storage.local.get('authenticated', function(result) {
        if (result.authenticated == true) {
            chrome.browserAction.setIcon({ path: icon_enable });
            //Modal popup
            chrome.browserAction.onClicked.addListener(function(tab){
                chrome.tabs.sendMessage(tab.id,"toggle");
            });
        } else {
            chrome.browserAction.setIcon({ path: icon_disable });
        }
    })
   
  });
  