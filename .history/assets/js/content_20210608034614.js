alert('content.js is invoking');
var user_id;
var shadowWrapper = document.createElement('div');
shadowWrapper.id = "shadow-wrapper";
document.body.appendChild(shadowWrapper);
var host = document.getElementById('shadow-wrapper');
var shadowRoot = host.attachShadow({
    mode: 'open'
});
window.onload = function() {
    appendStyleInline(shadowRoot);
    chrome.storage.local.get(['fmsg','authenticated'], function(result) {
        if (result.fmsg == true && result.authenticated == true) {
            dragElement(shadowRoot.getElementById("draggable_intro"));
            shadowRoot.getElementById("intro-close").addEventListener("click", function() {
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
      <div class="header"> <span class="plus">+</span> Welcome ${user_id}! Be on the lookout for plugin notifications while you are shopping on Google Search & Shopping tabs. Click through the plugin link to shop with the relevant featured brand to earn points and redeem instant eGift cards on your purchases. Learn more about how to earn and redeem here: <a href="https://www.commercedirect.io">commercedirect.io</a></div>
      <div class="body" style="border-bottom:1px solid #ccc;padding:5px;"><img class="cd-logo1" src="${extension_icon}" alt="${extension_name}"><span style="position: absolute;top: 177px;right: 20px;"> <span id="pts">0</span> Current point balance</span></div>
      <div class="footer"></div>
      <div class="login-close" id="intro-close">&times;</div>
    </div>`;

    uid = getCookie('__opixsee_uid');
    vid = getCookie('__opixsee_vid');
    chrome.runtime.sendMessage({
            contentScriptQuery: 'fetchUrl',
            url: cdirect_api_endpoint + 'userpts?userid=' + encodeURIComponent(user_id) + '&uid=' + encodeURIComponent(uid) + '&vid=' + encodeURIComponent(vid),
            method: 'GET'
        },
        function(result) {
            result = JSON.parse(result);
            if (result.body.qualified == "Y") {
                shadowRoot.getElementById('pts').innerText = parseFloat(result.body.discount) * 100;
            }
        }
    );
}

function loadLoginShadowDOM() {
  shadowRoot.innerHTML = '<div class="cd-login" id="draggable_login">'+
  '<div class="body"><img class="cd-logo" src="'+extension_icon+'" alt="'+extension_name+'"><a class="init-link" href="https://login.commercedirect.io/login?client_id=5gq5qkkuht3kbh0hqb0avluc7o&response_type=token&scope=email+openid&redirect_uri=https://login.commercedirect.io/">Click here to login</a></div>'+
  '<div class="login-close" id="login_close">&times;</div></div>';
  
//   shadowRoot.innerHTML = '<div class="cd-login" id="draggable_login">'+
//   '<div class="header" id="draggable_loginheader"> <span class="plus">+</span> Create a username so that you can start earning points and redeeming eGift Cards during your shopping experience!</div>'+
//   '<div class="body"><input type="text" class="input-txt" id="user_name"/><img id="submit" class="cd-logo" src="'+extension_icon+'" alt="'+extension_name+'"></div>'+
//   '<div class="footer" id="msg"></div>'+
//   '<div class="login-close" id="login_close">&times;</div></div>';


    const element = shadowRoot.getElementById("draggable_login");
    if (element != null) dragElement(element);
    const user_name_input = shadowRoot.getElementById("user_name");
    const msg = shadowRoot.getElementById("msg");

    // user_name_input.addEventListener("mousedown", function(e) {
    //     e.stopPropagation();
    // }, false);
    shadowRoot.getElementById("login_close").addEventListener("click", function() {
        element.style.display = 'none';
    });
    // shadowRoot.getElementById('submit').addEventListener("click", function() {
    //     if (user_name_input.value == "") {
    //         msg.innerText = 'username is required!';
    //     } else {
    //         chrome.runtime.sendMessage({
    //                 contentScriptQuery: 'fetchUrl',
    //                 url: cdirect_api_endpoint + 'username?userid=' + encodeURIComponent(user_name_input.value),
    //                 method: 'GET'
    //             },
    //             function(result) {
    //                 var result = JSON.parse(result);
    //                 var body = result["body"];
    //                 if (body.qualified == 'Y') {
    //                     chrome.storage.local.set({
    //                         userid: user_name_input.value,
    //                         fmsg: true
    //                     }, function() {
    //                         console.log("user id stored");
    //                         msg.innerText = body.message;
    //                         setTimeout(location.reload(), 5000);
    //                     })
    //                 } else {
    //                     msg.innerText = body.message;
    //                 }
    //             });
    //     }
    // });
}

function loadDirectPriceShadowDOM(obj) {
    shadowRoot.innerHTML += '<div class="cd-content" id="draggable_popup"><img class="cd-logo" src="' + extension_icon + '" alt="' + extension_name + '">You Qualify for Rewards! Click <a href="' + obj.tracking_url + '" id="setCD">' + obj.domain.replace(/(^\w+:|^)\/\//, '') + '</a> and Shop Direct to Earn and Redeem!<div class="close" id="close">&times;</div></div>';
    const element = shadowRoot.getElementById("draggable_popup");
    if (element != null) dragElement(element);
    shadowRoot.getElementById("close").addEventListener("click", function() {
        element.style.display = 'none';
    });
    shadowRoot.getElementById("setCD").addEventListener("click", function() {
        StoreDataInStorage({
            cd: 1,
            sale_commission: obj.Min_Percent_Sale_Commission,
            tracking_url: obj.domain.replace(/(^\w+:|^)\/\//, '')
        });
        location.href = obj.tracking_url;
    });

}

function appendStyleInline(node) {
    style = document.createElement('style');
    style.innerHTML = '*{font-family:arial,sans-serif;font-size:12px;}.cd-content{position:absolute;top:15px;z-index:9999;background:#fff;width:180px;left:861px;border-radius:30px;border:3px solid #ed2027;padding:20px;}.cd-content>a{overflow-wrap:break-word!important;word-break:break-word!important}.cd-logo{margin:-24px -24px 0 0;float:right;width:50px;height:50px}.login-close,.close{line-height:20px;box-shadow:1px 1px 6px #ccc;border-radius:50%!important;padding:0!important;background-color:#b9b9b9!important;width:20px;height:20px;font-size:14px;text-align:center;position:absolute;top:-12px;left:138px;cursor:pointer}.login-close:hover,.close:hover{background-color:transparent;border-color:#a8a8a8}.close{left:213px}.login-close{left:288px}.cd-login{position:absolute;top:50%;left:50%;z-index:9999;background:#fff;width:300px;border-radius:30px;box-shadow:0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0,0,0,0.19)}.cd-login>.header,.cd-login>.body{padding:20px}.cd-login>.header{border-bottom:1px solid #ccc;cursor:move}.cd-login>.footer{padding:5px 20px 10px 20px;height:12px;font-size:12px}.cd-login span.plus{background:#ababab;border-radius:50%;padding:0 4px;font-weight:bold}.cd-login img.cd-logo{margin:0;float:unset;width:50px;height:50px}.cd-login input[type=text]{width:175px;margin-top:4px;border-radius:30px!important;border:3px solid #ed2027!important;box-shadow:0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);padding:10px}@media only screen and (min-device-width: 375px) and (max-device-width: 812px) and (-webkit-min-device-pixel-ratio: 3){.cd-content{left:0}}@media only screen and (min-device-width: 375px) and (max-device-width: 812px) and (-webkit-min-device-pixel-ratio: 3) and (orientation: portrait){}@media only screen and (min-device-width: 375px) and (max-device-width: 812px) and (-webkit-min-device-pixel-ratio: 3) and (orientation: landscape){}img.cd-logo1{margin:0 0 0 10px;width:50px;height:50px}.cd-login>.header a,.cd-login>.body a{color:#337ab7;text-decoration:none;font-weight:bold;}.cd-login>.header a:hover,.cd-login>.body a:hover{color:#EA242A;text-decoration:underline;}.cd-login>.header a.init-link,.cd-login>.body a.init-link{position:absolute;top:40px;right: 20px;}';
    node.appendChild(style)
}

function appendStyleHref(root, href) {
    const style = document.createElement('link')
    style.setAttribute('rel', 'stylesheet');
    style.setAttribute('href', href);
    root.appendChild(style)
}
$(document).ready(function() {
    dl = window.location.href;
    rl = undefined
    init(dl, rl);
    uid = getCookie('__opixsee_uid');
    vid = getCookie('__opixsee_vid');
    chrome.storage.local.get('userid', function(result) {
        if (result.userid !== undefined) {
            pricePredict(uid, vid, user_id);
        }
    });



    function pricePredict(uid, vid, userid) {
        chrome.runtime.sendMessage({
                contentScriptQuery: 'fetchUrl',
                url: cdirect_api_endpoint + 'cartprice/v2/pricepredict2?uid=' + encodeURIComponent(uid) + '&vid=' + encodeURIComponent(vid) + '&userid=' + userid,
                method: 'GET'
            },
            function(result) {
                result = JSON.parse(result);
                var array = result.map(function(data) {
                    return data.domain;
                });
                console.log(array);
                var poped = 0;
                //option 1
                if ($('a[rel="noopener"]').text() == '') {
                    if ($('span.a').text() != '') {
                        $('.uEierd').filter(function(i, data2) {
                            if ($(data2).children('div').children('div').children('div').children('a').find('.p8AiDd').text() == 'Ad·') {
                                var url = $(data2).children('div').children('div').children('div').children('a').find('.p8AiDd').siblings().first().text();
                                url = url.trim().replace(" ", "").toLowerCase();
                                url = getHostName(url);
                                alert("1"+url);
                                if (url) {
                                    $.each(array, function(index, word) {
                                        if (word !== undefined || word !== "" || word !== "undefined" || word !== null)
                                            // if (word.split('.').length <= 3)
                                            if (word !== undefined)
                                            word = getHostName(word);
                                            if (array[index] !== undefined) {
                                                if (word.indexOf(url) > -1) {
                                                console.log('option1',url + ':' + word + ':' + word.indexOf(url));
                                                console.log('option1: ',index,'url',array[index]);
                                                poped = 1;
                                                if (shadowRoot.getElementById("draggable_popup") == null) {
                                                    loadDirectPriceShadowDOM(result[index]);
                                                }
                                                return false;
                                            }

                                            return false;
                                        }
                                    });
                                    return false;
                                }
                            } else {
                                //option 2
                                if ($(data2).children('div').children('div').children('div').children('a').find('.p8AiDd').text() == 'Ad·') {
                                    var url = $(data2).children('div').children('div').children('div').children('a').find('.p8AiDd').siblings().first().text();
                                    url = url.trim().replace(" ", "").toLowerCase();
                                    url = getHostName(url);
                                    alert("2"+url);
                                    if (url) {
                                        $.each(array, function(index, word) {
                                            if (word !== undefined || word !== "" || word !== "undefined" || word !== null)
                                                // if (word.split('.').length <= 3)
                                                if (word !== undefined)
                                                word = getHostName(word);
                                                if (array[index] !== undefined) {
                                                    if (word.indexOf(url) > -1) {
                                                    console.log('option2',url + ':' + word + ':' + word.indexOf(url));
                                                    console.log('option2: ',index,'url',array[index]);
                                                    poped = 1;
                                                    if (shadowRoot.getElementById("draggable_popup") == null) {
                                                        loadDirectPriceShadowDOM(result[index]);
                                                    }
                                                    return false;
                                                }

                                                return false;
                                            }
                                        });
                                        return false;
                                    }
                                }
                            }
                        });
                        if (poped == 0) {
                            //option 3
                            $('span.a').filter(function(i, data1) {
                                var url = $(data1).text().trim().replace(" ", "").replace("'", "").toLowerCase();
                                if (url && i < 20) {
                                    $.each(array, function(index, word) {
                                        if (word !== undefined || word !== "" || word !== "undefined" || word !== null)
                                        
                                        if (word !== undefined)
                                        
                                        if (array[index] !== undefined) {
                                            if (word.indexOf(url) > -1) {
                                                        console.log('option 3',url + ':' + word + ':' + word.indexOf(url));
                                                        console.log('option3: ',index,'url',array[index]);
                                                        if (shadowRoot.getElementById("draggable_popup") == null) {
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
                    } else {
                        //option 4
                        $('.pla-unit').filter(function(i, data) {
                            var search = $(data).find('.pla-unit-container').children().eq(2).children().children().eq(2).text().trim().replace("'", "");
                            $.each(array, function(index, word) {
                                if (word !== undefined)
                                    word = getHostName(word);
                                if (word !== undefined && word !== null) {
                                    word = word.split('.');
                                    if (array[index] !== undefined) {
                                        if (word.indexOf(search) > -1) {
                                            console.log('option 4',search + ':' + word + ':' + word.indexOf(search));
                                            console.log('option4: ',index,'url',array[index]);
                                            if (shadowRoot.getElementById("draggable_popup") == null) {
                                                poped = 1;
                                                loadDirectPriceShadowDOM(result[index]);
                                                return false;
                                            }
                                            return false;
                                        }
                                    }
                                }
                            });
                        });
                        if (poped == 0) {
                            //option 5
                            $('.uEierd').filter(function(i, data2) {
                                if ($(data2).children('div').children('div').children('div').children('a').find('.p8AiDd').text() == 'Ad·') {
                                    var url = $(data2).children('div').children('div').children('div').children('a').find('.p8AiDd').siblings().first().text();
                                    if (url !== undefined && url !== null) {
                                        // url = getHostName(url.trim().replace(" ", "").toLowerCase());
                                        url = url.trim().replace(" ", "").toLowerCase();
                                        alert("5"+url);
                                        var url_array = url.split('.');
                                        if (url_array.length <= 3 || url_array.length > 3) {
                                            if (url_array[1] == 'com' || url_array[1] == 'net' || url_array[1] == 'co' || url_array[1] == 'us' || url_array[1] == 'uk' || url_array[1] == 'gov' || url_array[1] == 'uk' || url_array[1] == 'de' || url_array[1] == 'org') {
                                                var url_s = url_array[0];
                                            } else {
                                                var url_s = url_array[1];
                                            }
                                        }
                                        if (url_array.length <= 2)
                                            var url_s = url_array[0];
                                    }
                                    if (url_s) {
                                        $.each(array, function(index, word) {
                                            console.log(word);
                                            if (word !== undefined)
                                                word = getHostName(word);
                                            if (word !== undefined && word !== null) {
                                                word = word.split('.');
                                                if (array[index] !== undefined) {
                                                    if (word.indexOf(url_s) > -1) {
                                                        console.log('option 5',url_s + ':' + word + ':' + word.indexOf(url_s));
                                                        console.log('option5: ',index,'url',array[index]);
                                                        if (shadowRoot.getElementById("draggable_popup") == null) {
                                                            poped = 1;
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
                                }
                            });
                        }
                        if (poped == 0) {
                            //option 6
                            $('.g').filter(function(i, data2) {
                                if ($(data2).children('div').children('div').children('div').children('a').find('.p8AiDd').text() == 'Ad·') {
                                    var url = $(data2).find('a').attr('href');
                                    if (url !== undefined && url !== null) {
                                        url = getHostName(url.trim().replace(" ", "").toLowerCase());
                                        var url_array = url.split('.');
                                        console.log(url_array);
                                        if (url_array.length <= 3 || url_array.length > 3) {
                                            if (url_array[1] == 'com' || url_array[1] == 'net' || url_array[1] == 'co' || url_array[1] == 'us' || url_array[1] == 'uk' || url_array[1] == 'gov' || url_array[1] == 'uk' || url_array[1] == 'de' || url_array[1] == 'org') {
                                                var url_s = url_array[0];
                                            } else {
                                                var url_s = url_array[1];
                                            }
                                        }
                                        if (url_array.length <= 2)
                                            var url_s = url_array[0];
                                    }
                                    if (url_s) {
                                        $.each(array, function(index, word) {
                                            console.log(word);
                                            if (word !== undefined)
                                                word = getHostName(word);
                                            if (word !== undefined && word !== null) {
                                                word = word.split('.');
                                                if (array[index] !== undefined) {
                                                    if (word.indexOf(url_s) > -1) {
                                                        // console.log(url_s);
                                                        // console.log(word.indexOf(url_s));
                                                        // console.log(index);
                                                        console.log('option 6',url_s + ':' + word + ':' + word.indexOf(url_s));
                                                        console.log('option6: ',index,'url',array[index]);
                                                        if (shadowRoot.getElementById("draggable_popup") == null) {
                                                            poped = 1;
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
                                }
                            });
                        }
                    }
                } else {
                    //option 7
                    $('a[rel="noopener"]').filter(function(i, data) {
                        var url = $(data).children('div').eq(2).children('div').children('div').eq(2).text().replace(/["']/g, "").replace(" ", "").replace("'", "").trim().toLowerCase();
                        if (url === '' || url === undefined)
                            var url = $(data).children('div').eq(3).children('div').children('div').eq(2).text().replace(/["']/g, "").replace(" ", "").replace("'", "").trim().toLowerCase();
                        if (url === '' || url === undefined)
                            url = $(data).text().replace(/["']/g, "").replace(" ", "").replace("'", "").trim().toLowerCase();
                        if (url !== null) {
                            $.each(array, function(index, word) {
                                if (word !== undefined || word !== "" || word !== "undefined" || word !== null) {
                                    word = getHostName(word);
                                    word = word.split('.')[0];
                                    if (array[index] !== undefined) {
                                        // console.log(url+':'+word);
                                        
                                        // var regex = new RegExp(`\B${word}\B`, 'g');
                                        var regex = new RegExp(word, 'g');
                                        // var regex = new RegExp(`/(?:\W|^)(\Q$${word}\E)(?:\W|$)/i`,'g');
                                        // /(?:\W|^)(\Q$word\E)(?:\W|$)/i
                                        // var regex1 = new RegExp(url, 'g');
                                        // var regex1 = new RegExp(`/(?:\W|^)(\Q$${url}\E)(?:\W|$)/i`,'g');
                                        
                                        if (url.match(regex) != null) {//|| word.match(regex1) != null
                                            // console.log(index);
                                            console.log(data);
                                            console.log('option 7',url + ':' + word + ':' + word.indexOf(url));
                                            console.log('option7: ',index,'url',array[index]);
                                            if (shadowRoot.getElementById("draggable_popup") == null) {
                                                loadDirectPriceShadowDOM(result[index]);
                                                return false;
                                            }
                                            if (index != null) {
                                                console.log(url.match(regex));
                                                return false;
                                            }
                                            return false;
                                        }
                                    }
                                }
                            });
                        }
                    });
                }
            }
        );
    }
});