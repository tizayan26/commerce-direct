var user_id;
const shadowWrapper = document.createElement('div');
shadowWrapper.id = "shadow-wrapper";

document.body.appendChild(shadowWrapper);

const host = document.getElementById('shadow-wrapper');
const shadowRoot = host.attachShadow({ mode: 'open' });
window.onload = function(){
  appendStyleInline(shadowRoot);
  chrome.storage.local.get('fmsg', function(result){
    if(result.fmsg==true){
      dragElement(shadowRoot.getElementById("draggable_intro"));
      shadowRoot.getElementById("intro-close").addEventListener("click", function(){
      shadowRoot.getElementById("draggable_intro").style.display = 'none';
      chrome.storage.local.set({
        fmsg: false
      }, function() {
        console.log("first msg");
      });
      });
    };
  })
  
}
function firstMsg(user_id){
    shadowRoot.innerHTML = `
    <div id="draggable_intro" class="cd-login">
      <div class="header"> <span class="plus">+</span> Welcome ${user_id} ! be on the lookout for our notifications when you are shopping and be sure to click through to redeem future discounts on your purchases.</div>
      <div class="body" style="border-bottom:1px solid #ccc;padding:5px;"><img class="cd-logo1" src="${extension_icon}" alt="${extension_name}"><span style="padding: 0 38px"> <span id="pts">0</span> Current point balance</span></div>
      <div class="footer"></div>
      <div class="login-close" id="intro-close">&times;</div>
    </div>`;
   
    uid = getCookie('__opixsee_uid');
    vid = getCookie('__opixsee_vid');
    chrome.runtime.sendMessage(
      {contentScriptQuery: 'fetchUrl',url: cdirect_api_endpoint+'userpts?userid='+encodeURIComponent(user_id)+'&uid='+encodeURIComponent(uid)+'&vid='+encodeURIComponent(vid), method: 'GET'},
      function(result){
        result = JSON.parse(result);
        if(result.body.qualified == "Y"){
              shadowRoot.getElementById('pts').innerText = parseFloat(result.body.discount) * 100;
        }
      }
    );
}

function loadLoginShadowDOM(){
  shadowRoot.innerHTML = '<div class="cd-login" id="draggable_login">'+
  '<div class="header" id="draggable_loginheader"> <span class="plus">+</span> Create a username so that we can connect you with the best deals!</div>'+
  '<div class="body"><input type="text" class="input-txt" id="user_name"/><img id="submit" class="cd-logo" src="'+extension_icon+'" alt="'+extension_name+'"></div>'+
  '<div class="footer" id="msg"></div>'+
  '<div class="login-close" id="login_close">&times;</div></div>';


  const element = shadowRoot.getElementById("draggable_login");if(element != null)dragElement(element);
  const user_name_input = shadowRoot.getElementById("user_name");
  const msg = shadowRoot.getElementById("msg");

  user_name_input.addEventListener("mousedown", function(e) {
    e.stopPropagation();
  }, false);
  shadowRoot.getElementById("login_close").addEventListener("click", function(){
    element.style.display = 'none';
  });
  shadowRoot.getElementById('submit').addEventListener("click", function(){
    if(user_name_input.value == ""){
      msg.innerText = 'username is required!';
    }else{
      chrome.runtime.sendMessage(
        {contentScriptQuery: 'fetchUrl',url: cdirect_api_endpoint+'username?userid='+encodeURIComponent(user_name_input.value), method: 'GET'},
        function(result){
          var result = JSON.parse(result);
          var body = result["body"];
          if(body.qualified == 'Y'){
            chrome.storage.local.set({
              userid: user_name_input.value,
              fmsg: true
            }, function() {
              console.log("user id stored");
              msg.innerText = body.message;
              setTimeout(location.reload(),5000);
            })
          }else{
           msg.innerText = body.message;
          }
      });
    }
  });
}
function loadDirectPriceShadowDOM(obj){
  shadowRoot.innerHTML += '<div class="cd-content" id="draggable_popup"><img class="cd-logo" src="'+extension_icon+'" alt="'+extension_name+'">You Qualify for the Direct Price! Click <a href="'+obj.tracking_url+'" id="setCD">'+obj.domain.replace(/(^\w+:|^)\/\//, '')+'</a> and Shop Direct to unlock your savings!<div class="close" id="close">&times;</div></div>';
  const element = shadowRoot.getElementById("draggable_popup");if(element != null)dragElement(element);
  shadowRoot.getElementById("close").addEventListener("click", function(){
    element.style.display = 'none';
  });
  shadowRoot.getElementById("setCD").addEventListener("click", function(){
    StoreDataInStorage({cd:1,sale_commission:obj.Min_Percent_Sale_Commission});
    location.href = obj.tracking_url;
  });
 
}

function appendStyleInline(node){
  style = document.createElement('style');
  style.innerHTML = '*{font-family:arial,sans-serif;font-size:12px;}.cd-content{position:absolute;top:15px;z-index:9999;background:#fff;width:180px;left:861px;border-radius:30px;border:3px solid #ed2027;padding:20px;}.cd-content>a{overflow-wrap:break-word!important;word-break:break-word!important}.cd-logo{margin:-24px -24px 0 0;float:right;width:50px;height:50px}.login-close,.close{line-height:20px;box-shadow:1px 1px 6px #ccc;border-radius:50%!important;padding:0!important;background-color:#b9b9b9!important;width:20px;height:20px;font-size:14px;text-align:center;position:absolute;top:-12px;left:138px;cursor:pointer}.login-close:hover,.close:hover{background-color:transparent;border-color:#a8a8a8}.close{left:213px}.login-close{left:288px}.cd-login{position:absolute;top:50%;left:50%;z-index:9999;background:#fff;width:300px;border-radius:30px;box-shadow:0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0,0,0,0.19)}.cd-login>.header,.cd-login>.body{padding:20px}.cd-login>.header{border-bottom:1px solid #ccc;cursor:move}.cd-login>.body{padding-bottom:5px}.cd-login>.footer{padding:5px 20px 10px 20px;height:12px;font-size:12px}.cd-login span.plus{background:#ababab;border-radius:50%;padding:0 4px;font-weight:bold}.cd-login img.cd-logo{margin:0;float:right;width:50px;height:50px}.cd-login input[type=text]{width:175px;margin-top:4px;border-radius:30px!important;border:3px solid #ed2027!important;box-shadow:0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);padding:10px}@media only screen and (min-device-width: 375px) and (max-device-width: 812px) and (-webkit-min-device-pixel-ratio: 3){.cd-content{left:0}}@media only screen and (min-device-width: 375px) and (max-device-width: 812px) and (-webkit-min-device-pixel-ratio: 3) and (orientation: portrait){}@media only screen and (min-device-width: 375px) and (max-device-width: 812px) and (-webkit-min-device-pixel-ratio: 3) and (orientation: landscape){}img.cd-logo1{margin:0;width:50px;height:50px}';
  node.appendChild(style)
}

function appendStyleHref(root, href) {
  const style = document.createElement('link')
  style.setAttribute('rel', 'stylesheet');
  style.setAttribute('href', href);
  root.appendChild(style)
}
$(document).ready(function(){
  chrome.storage.local.get(['userid','fmsg'], function(result){
    if(result.userid===undefined){
      loadLoginShadowDOM();
      
    }else{
      user_id = result.userid;
      if(result.fmsg==true)
        firstMsg(user_id);
    }
  });
  var Config = {
    id: '',
    vid: '',
    version: 1
  };
  var isset = function isset(variable) {
    return typeof variable !== 'undefined' && variable !== null && variable !== '';
  };
  var guid = function guid() {
    return Config.version + '-xxxxxxxx-'.replace(/[x]/g, function(c) {
        var r = Math.random() * 36 | 0;
        var v = c === 'x' ? r : r & 0x3 | 0x8;
        return v.toString(36);
    }) + (1 * new Date()).toString(36);
};
var optionalData = function optionalData(data) {
  if (isset(data) === false) {
      return '';
  } else if (_typeof(data) === 'object') {
      return optionalData(JSON.stringify(data));
  } else if (typeof data === 'function') {
      return optionalData(data());
  } else {
      return String(data);
  }
};

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function _typeof(obj) {
          return typeof obj;
      };
  } else {
      _typeof = function _typeof(obj) {
          return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
  }
  return _typeof(obj);
}
var now = function now() {
  return 1 * new Date();
};
var pixelFuncName = "opixsee";
  var Cookie = {
    prefix: function prefix() {
        return '__' + pixelFuncName + '_';
    },
    set: function set(name, value, minutes) {
        var path = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '/';
        var expires = '';

        if (isset(minutes)) {
            var date = new Date();
            date.setTime(date.getTime() + minutes * 60 * 1000);
            expires = '; expires=' + date.toGMTString();
        }

        document.cookie = this.prefix() + name + '=' + value + expires + '; path=' + path;
    },
    get: function get(name) {
        name = this.prefix() + name + '=';
        var ca = document.cookie.split(';');

        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];

            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }

            if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
        }

        return;
    },
    "delete": function _delete(name) {
        this.set(name, '', - 100);
    },
    exists: function exists(name) {
        return isset(this.get(name));
    },
    saveCampaignParamsFromURL: function saveCampaignParamsFromURL(campaignURLParamsArray, expireMins) {
        var exists = false;
        for (var i = 0, l = campaignURLParamsArray.length; i < l; i++) {
            if (isset(Url.getParameterByName(campaignURLParamsArray[i]))) {
                exists = true;
                break;
            }
        }
        if (exists) {
            var val;
            var save = {};

            for (i = 0, l = campaignURLParamsArray.length; i < l; i++) {
                val = Url.getParameterByName(campaignURLParamsArray[i]);

                if (isset(val)) {
                    save[campaignURLParamsArray[i]] = val;
                }
            }

            this.set('campaign', JSON.stringify(save), expireMins);
        }
    },
    getCampaignParams: function getCampaignParams() {
        if (this.exists('campaign')) {
            var campaignParams = JSON.parse(this.get('campaign'));
            return campaignParams;
        }

        return {};
    },
    getCampaignParam: function getCampaignParam(name) {
        if (this.exists('campaign')) {
            var campaignParams = JSON.parse(this.get('campaign'));
            return name in campaignParams ? campaignParams[name] : '';
        }
    }
};
var Url = {
  getParameterByName: function getParameterByName(name, url) {
      if (!url) url = window.location.href;
      var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)', 'i');
      var results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return '';
      return decodeURIComponent(results[2].replace(/\+/g, ' '));
  },
  externalHost: function externalHost(link) {
      return link.hostname !== location.hostname && link.protocol.indexOf('http') === 0;
  }
};

uid = getCookie('__opixsee_uid');
vid = getCookie('__opixsee_vid');
var opix_data = {uid: uid, vid: vid};
chrome.storage.local.set({opix_data:JSON.stringify(opix_data)},function(){
  console.log('Opixsee Data Saved',JSON.stringify(opix_data));
});
chrome.storage.local.get('userid', function(result){
  if(result.userid!==undefined){
    pricePredict(uid,vid,user_id);
  }
});

var NEW_VISIT_AFTER_INACTIVITY_MINS = 30;
var UID_COOKIES_EXPIRE_MINS = 5 * 365 * 24 * 60; 
var CAMPAIGN_URL_PARAMS_COOKIES_EXPIRE_MINS = 5 * 365 * 24 * 60; 
Cookie.exists('uid') ? Cookie.set('uid', Cookie.get('uid'), UID_COOKIES_EXPIRE_MINS) : Cookie.set('uid', guid(), UID_COOKIES_EXPIRE_MINS); // process the queue and future incoming commands
opixsee("init", getClientID(), {
  campaignURLParams: ['gcid', 'keyword', 'creative', 'utm_kxconfid', 'utm_campaign', 'ap', 'ploc', 'iloc', 'kwt', 'mt', 'kw', 'ds_rl', 'gclid', 'gclsrc']
}), 
chrome.storage.local.get('userid', function(result){
  if(result.userid !== undefined){
    opixsee("event", "userid", result.userid);
  }
});   
function opixsee(method, value, optional) {
if (method === 'init') {
    Config.id = value;

    var vid;
    Cookie.exists('vid') ? vid = Cookie.get('vid') : vid = guid();
    Cookie.set('vid', vid, NEW_VISIT_AFTER_INACTIVITY_MINS);
    Config.vid = vid; 

    if (optional && optional.campaignURLParams && _typeof(optional.campaignURLParams) === _typeof([])) {
        Cookie.saveCampaignParamsFromURL(optional.campaignURLParams, CAMPAIGN_URL_PARAMS_COOKIES_EXPIRE_MINS);
    }
} else if (method === 'event') {
    if (value === 'pageload' && !Config.pageLoadOnce) {
        Config.pageLoadOnce = true; 
    } else if (value !== 'pageload' && value !== 'pageclose') {
        Cookie.set('vid', Config.vid, NEW_VISIT_AFTER_INACTIVITY_MINS);
    }
    
  }
  // uid = getCookie('__opixsee_uid');
  vid = getCookie('__opixsee_vid');
  pixelFunc(uid,vid,value,optional);
};  
function getClientID(){
  if(window.location.hostname == "www.google.com"){
    const queryString = window.location.search;
    const queryArray = queryString.trim().split('&');
    const matches = queryArray.filter(s => s.includes('q='));
    const client_id = (matches[0]=== undefined || matches[0] === null) ? [null,'google.com'] : matches[0].trim().split('=');
    return client_id[1];
  }else{
    var url = window.location.href;
    var regex = new RegExp("[?&]clientId(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }
}

function pixelFunc(uid,vid,ev=null,ed=null){
  const id = 'cd-extension';
  const dl = $('a.ellip').attr('href');
  const rl = window.location.href;
  const ts = Date.now();
  const de = document.inputEncoding;
  const sr = getScreenResolution();
  const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
  const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
  const vp = vw +"x"+ vh;
  const cd = window.screen.colorDepth;
  const dt = 'Commerce Direct Chrome extension';
  const bn = 'Chrome 85';
  const md = false;
  const dvt = 'desktop';
  const ua = navigator.userAgent;
  var ndate = new Date();
  const tz =  ndate.getTimezoneOffset(); 
  chrome.runtime.sendMessage(   
    {contentScriptQuery: 'fetchUrl',url: cdirect_api_endpoint+'track/pixel/pixel.gif?id='+encodeURIComponent(id)+'&uid='+encodeURIComponent(uid)+'&vid=' + encodeURIComponent(vid)+'&ev='+encodeURIComponent(ev)+'&ed='+encodeURIComponent(ed)+'&v=1&dl='+encodeURIComponent(dl)+'&rl='+encodeURIComponent(rl)+'&ts='+encodeURIComponent(ts)+'&de='+encodeURIComponent(de)+'&sr='+encodeURIComponent(sr)+'&vp='+encodeURIComponent(vp)+'&cd='+encodeURIComponent(cd)+'&dt='+encodeURIComponent(dt)+'&bn='+encodeURIComponent(bn)+'&md='+encodeURIComponent(md)+'&dvt='+encodeURIComponent(dvt)+'&ua='+encodeURIComponent(ua)+'&tz='+encodeURIComponent(tz), method: 'POST'},
    function(result){
      result = JSON.parse(result);
      log(result);
    }
  );
}

function getHostName(url) {
    var match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
    if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
    return match[2];
    }
    else {
        return null;
    }
}


function pricePredict(uid,vid,userid){
  chrome.runtime.sendMessage(
    {contentScriptQuery: 'fetchUrl',
    // url: 'https://api.commerce.direct/cartprice/v2/pricepredict?uid='+encodeURIComponent(uid)+'&vid=' + encodeURIComponent(vid),
    url: cdirect_api_endpoint+'cartprice/v2/pricepredict2?uid='+encodeURIComponent(uid)+'&vid=' + encodeURIComponent(vid)+'&userid=' + userid,
    method: 'GET'},
    function(result){
      result = JSON.parse(result);
      // var array = result.body.client_url.filter(function(data){
      //   return data != "undefined";
      // })
      var array = result.map(function(data){
        return data.domain;
      });
      console.log(array);
      // if(result.body.qualified == "Y"){
        var poped = 0;
        if($('a[rel="noopener"]').text()== ''){
          if($('span.a').text()!= ''){
          $('.uEierd').filter(function(i,data2){
            // if($(data2).children('div').children('div').children('div').children('a').find('.p8AiDd').text() == 'Ad·'){
              var url = $(data2).children('div').children('div').children('div').children('a').find('.p8AiDd').siblings().first().text();
              url = url.trim().replace(" ","").toLowerCase();
              url = getHostName(url);
              // alert(url);
              if(url){
                $.each(array,function(index,word){
                  if(word !== undefined || word!== "" || word !== "undefined" || word !== null)

                  if(word.split('.').length <= 3)
                  console.log(url+':'+word+':'+word.indexOf(url));
                  if(word !== undefined)
                  word = getHostName(word);
                  console.log(word.indexOf(url));
                  if(array[index]!==undefined){ 
                    if(word.indexOf(url) > -1 ){
                      poped = 1;
                   
                      console.log(index);
                     
                      if(shadowRoot.getElementById("draggable_popup") == null){
                        loadDirectPriceShadowDOM(result[index]);
                      }
                      return false;
                    }
               
                    return false;
                  }
                });
                return false;
              }
            // }

          });
          if(poped == 0){
          
          $('span.a').filter(function(i,data1){
            var url = $(data1).text().trim().replace(" ","").replace("'","").toLowerCase();
           
            if(url && i<20){
                $.each(array,function(index,word){
                  console.log(url+':'+word+':'+word.indexOf(url));
                  if(word !== undefined || word!== "" || word !== "undefined" || word !== null)
                 
                  if(word !== undefined)
                
                  if(array[index]!==undefined){ 
                    if(word.indexOf(url) > -1){
                    
                    console.log(index)
                    if(shadowRoot.getElementById("draggable_popup") == null){
                      loadDirectPriceShadowDOM(result[index])
                    return false;
                    }
                  }
                }
              });
              return false;
            }

          });
          }
        
        }else{
          // alert($('.uEierd').text());
          // $('.uEierd').filter(function(i,data2){
          $('.g').filter(function(i,data2){
            
            // if($(data2).children('div').children('div').children('div').children('a').find('.p8AiDd').text() == 'Ad·'){
              // var url = $(data2).children('div').children('div').children('div').children('a').find('.p8AiDd').siblings().first().text();
              var url = $(data2).find('a').attr('href');
            if(url!==undefined && url !== null){
              url = getHostName(url.trim().replace(" ","").toLowerCase());
              var url_array = url.split('.');
              console.log(url_array);
              if(url_array.length <= 3)
              url = url_array[1];
              if(url_array.length <= 2)
              url = url_array[0];
            }
            // url = getHostName(url);
            console.log(url);
            if(url){
              $.each(array,function(index,word){
                if(word !== undefined)
                  word = getHostName(word);
                if(word !== undefined && word !== null){
                  word = word.split('.');
                  console.log(word);
                  console.log(word.indexOf(url));
                  if(array[index]!==undefined){ 
                    if(word.indexOf(url) > -1 ){
                      console.log(index);
                      if(shadowRoot.getElementById("draggable_popup") == null){
                        loadDirectPriceShadowDOM(result[index]);
                        return false;
                      }
                      return false;
                    }
                  }
                }
              });
              return false;
            }
            // }

          });
        }
        }else{
       
              $.each($('a[rel="noopener"]'),function(i,data){ 
                // console.log(data);
            
                var url = $(data).children('div').eq(2).children('div').children('div').eq(2).text().replace(/["']/g, "").replace(" ","").replace("'","").trim().toLowerCase();
                if(url==='' || url === undefined)
                var url = $(data).children('div').eq(3).children('div').children('div').eq(2).text().replace(/["']/g, "").replace(" ","").replace("'","").trim().toLowerCase();
                if(url==='' || url === undefined)
                url = $(data).text().replace(/["']/g, "").replace(" ","").replace("'","").trim().toLowerCase();
                // var url = $(data).children('div').eq(1).text().replace(/["']/g, "").replace(" ","").replace("'","").trim().toLowerCase();
                
        
                if(url!== null){
                    $.each(array,function(index,word){
                      if(word !== undefined || word!== "" || word !== "undefined" || word !== null){
                       word = getHostName(word);
                       word = word.split('.')[0];
                        if(array[index]!==undefined){
                          console.log(url+':'+word);
                          // if(word.indexOf(url) > -1 ){
                            var regex = new RegExp(word, 'g');
                            console.log(url.match(regex));
                          if(url.match(regex) != null ){
                            console.log(index);
                            if(shadowRoot.getElementById("draggable_popup") == null){
                              loadDirectPriceShadowDOM(result[index]);
                              return false;
                            }
                          }
                        }
                      }
                  });
                }
              // }    
            });
            
        }
      // }
    }
  );
}
});