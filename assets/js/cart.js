const shadowWrapper = document.createElement('div');
shadowWrapper.id = "shadow-wrapper";
script = document.createElement('script');
document.body.appendChild(shadowWrapper);
const host = document.getElementById('shadow-wrapper');
const shadowRoot = host.attachShadow({
    mode: 'closed'
});

function loadDirectPriceShadowDOM() {
    shadowRoot.innerHTML += `
      <div class="cd-content focus" id="draggable"><img class="cd-logo" src="${extension_icon}" alt="${extension_name}">
        <span id="open-modal" class="triger-modal" data-triger="modal-demo">Earn <span id="pts">0</span> Points when Purchased</span>
        <div class="close-sm" id="close">&times;</div>
      </div>
      <div class="modal-wrap" id="modal-main">
        <div class="modal-container">
          <button class="close" id="close-modal">&times;</button>
          <div class="modal-header">
            <h6 class="modal-title" id="exampleModalLabel"><span class="plus">+</span> Welcome <span id="user">User</span>! Thanks for saving with us. We Save you Save!</h6>
          </div>
          <div class="modal-content">
            <div class="row">
              <div class="col-md-4 col-sm-4 col-xs-4"><img class="cd-logo-b" src="${extension_icon}" alt="${extension_name}"></div><div class="col-md-8 col-sm-8 col-xs-8 modal-body-text" style="">You Qualify for the rewards earned from this purchase!</div>
            </div>
          </div>
          <div class="modal-footer">
            <div class="row row-grey">
              <div class="col-md-2 col-sm-2 col-xs-2"><img src="${chrome.extension.getURL("assets/icons/cd-tag.png")}" width="40" height="40"/></div><div class="col-md-2 col-sm-2 col-xs-2" id="dp"> 0</div><div class="col-md-8 col-sm-8 col-xs-8">Earn Points from this Purchase!</div>
            </div>
          </div>
          <div class="modal-footer">
            <div class="row row-grey">
              <div class="col-md-2 col-sm-2 col-xs-2"><img src="${chrome.extension.getURL("assets/icons/cd-points.png")}" width="40" height="40"/></div><div class="col-md-2 col-sm-2 col-xs-2" id="sp"> 0</div><div class="col-md-4 col-sm-4 col-xs-4" id="pts_msg">Total Points Balance</div><div class="col-md-4 col-sm-4 col-xs-4" id="reward"></div>
            </div>
          </div>
        </div>
      </div>`;

    shadowRoot.innerHTML += `
    <div class="modal-wrap" id="modal-reward-amount">
      <div class="modal-container">
        <button class="close" id="close-rewardmodal-amount">&times;</button>
          <div class="modal-header">
            <h6 class="modal-title" id="exampleModalLabel"><span class="plus">+</span> Welcome <span id="user1">User</span>! Thanks for saving with us. We Save you Save!</h6>
          </div>
          <div class="modal-content">
            <div class="row">
              <div class="col-md-4 col-sm-4 col-xs-4"><img class="cd-logo-b" src="${extension_icon}" alt="${extension_name}"></div>
              <div class="col-md-8 col-sm-8 col-xs-8 modal-body-text">You Qualify for the rewards earned from this purchase!</div>
            </div>
          </div>
          <div class="modal-footer">
            <div class="row row-grey">
              <div class="col-md-4 col-sm-4 col-xs-4"><input class="reward-amt" id="reward_amt" type="text" /></div>
              <div class="col-md-4 col-sm-4 col-xs-4"><span id="est_pts">100</span> Points = $<span id="est_usd">1</span><p  class="pts-validation-msg" id="pts_validation_msg"><p></div>
              <div class="col-md-4 col-sm-4 col-xs-4"><a href="#" id="next-modal">Redeem Rewards!</a></div>
            </div>
            <div class="row row-grey">
              <div class="col-md-2 col-sm-2 col-xs-2"><img src="${chrome.extension.getURL("assets/icons/cd-points.png")}" width="50" height="50"/></div>
              <div class="col-md-2 col-sm-2 col-xs-2" id="tpb"> 0</div>
              <div class="col-md-8 col-sm-8 col-xs-8" id="pts_msg">Total Points Balance</div>
            </div>
          </div>
      </div>
    </div>
    `;
    shadowRoot.innerHTML += `
    <div class="modal-wrap" id="modal-reward">
      <div class="modal-container">
        <button class="close" id="close-rewardmodal">&times;</button>
        <div class="modal-header">
          <h6 class="modal-title" id="exampleModalLabel"><span class="plus">+</span> Welcome <span id="user2">User</span>! Now for the fun part!</h6>
        </div>
        <div class="modal-content">
          <div class="row row-grey">
            <div class="col-md-2 col-sm-2 col-xs-2"><img src="${chrome.extension.getURL("assets/icons/cd-points.png")}" width="50" height="50"/></div>
            <div class="col-md-2 col-sm-2 col-xs-2" id="pb"> 0</div><div class="col-md-8" id="pts_msg">Total Points Balance</div>
          </div>
        </div>
        <div class="modal-footer">
          <div class="row">
            <div class="col-md-12 col-sm-12 col-xs-12">
            <div class="col-md-6 col-sm-6 col-xs-6" style="text-align:right;"><a href="https://commercedirect.io/rewards" target="_blank">Click to Browse</a></div>
            <div class="col-md-6 col-sm-6 col-xs-6" style="text-align:left;"><a id="redeem_link">Click to Redeem</a></div>
            <div class="col-md-12 col-sm-12 col-xs-12">
                <div class="card-container">
                  <ul class="cards" id="cards">
                  </ul>
                  <p style="color:#ed2027;text-align:justify;">Note that once the card above is clicked, the displayed point amount must be redeemed during the same session. This amount will be automatically deducted from your balance.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    `;
    chrome.storage.local.get('userid', function(result) {
        if (result.userid !== undefined) {
            // user_id = result.userid;
            user_id = "to Commerce Direct";
            shadowRoot.getElementById("user").innerText = user_id;
            shadowRoot.getElementById("user1").innerText = user_id;
            shadowRoot.getElementById("user2").innerText = user_id;
        }
    });
    shadowRoot.getElementById('reward_amt').addEventListener("keyup", function() {
        shadowRoot.getElementById('est_usd').innerText = this.value / 100;
        shadowRoot.getElementById('est_pts').innerText = this.value;
    });
    // setCartData();
    chrome.storage.local.get(['userid', 'redeemed', 'asked_amt'], function(result) {
        if (result.userid !== undefined) {
            user_id = result.userid;
            uid = getCookie('__opixsee_uid');
            vid = getCookie('__opixsee_vid');
            var amt = result.asked_amt;

            chrome.runtime.sendMessage({
                    contentScriptQuery: 'fetchUrl',
                    url: cdirect_api_endpoint + 'userpts?userid=' + encodeURIComponent(user_id) + '&uid=' + encodeURIComponent(uid) + '&vid=' + encodeURIComponent(vid),
                    method: 'GET'
                },
                function(result) {
                    result = JSON.parse(result);
                    if (result.body.qualified == "Y") {
                        const discount = result.body.discount;
                        shadowRoot.getElementById('sp').innerText = parseFloat(discount).toFixed(2);
                        shadowRoot.getElementById('tpb').innerText = parseFloat(discount).toFixed(2);
                        shadowRoot.getElementById('pb').innerText = parseFloat(discount).toFixed(2);
                        shadowRoot.getElementById('reward').innerHTML = '<a href="#" id="rewardlink">Redeem Rewards!</a>';

                        chrome.runtime.sendMessage({
                                contentScriptQuery: 'apiTango',
                                url: tangocard_api_endpoint + 'catalogs',
                                token: tangocard_token,
                                method: 'GET'
                            },
                            function(result) {
                                var data = JSON.parse(result);
                                var frame = shadowRoot.getElementById('cards');
                                var vli = document.createElement("li");
                                data.brands.forEach(function(brand, index) {
                                    if (brand.brandName.match(/(Commerce Direct)/g)) {
                                      li = document.createElement('li');
                                      li.className = 'card';
                                      li.setAttribute("utid",brand.items[0].utid);
                                      vli.setAttribute("utid",brand.items[0].utid);
                                      shadowRoot.getElementById('redeem_link').setAttribute("utid",brand.items[0].utid);
                                      img= document.createElement('img')
                                      img.src = brand.imageUrls["130w-326ppi"];
                                      li.appendChild(img);
                                      frame.appendChild(li);
                                      // frame.innerHTML = `<li class="card" utid="${brand.items[0].utid}"><img src="${brand.imageUrls["130w-326ppi"]}" title="Click to Redeem!"></li>`;
                                    }
                                })
                              
                                vli.setAttribute("id", "vcard");
                                vli.classList.add('card');
                                vli.classList.add('virtual-card');
                                vli.innerHTML = amt;
                                frame.appendChild(vli);
                                let listItems = shadowRoot.querySelectorAll('.card-container li');
                                listItems.forEach((item, index) => {
                                    item.addEventListener('click', (event) => {
                                        makeOrder(event.currentTarget.getAttribute('utid'));
                                    });

                                });
                            }
                        );


                        var openRewardModalAmt = shadowRoot.getElementById('rewardlink');
                        var rewardModalAmt = shadowRoot.getElementById('modal-reward-amount');
                        var closeRewardModalAmt = shadowRoot.getElementById('close-rewardmodal-amount');
                        var rewardModal = shadowRoot.getElementById('modal-reward');
                        var redeemLink = shadowRoot.getElementById('redeem_link');

                        openRewardModalAmt.addEventListener('click', function() {
                            rewardModalAmt.classList.toggle('visible');
                        });

                        closeRewardModalAmt.addEventListener('click', function() {
                            rewardModalAmt.classList.remove('visible');
                        });

                        var openRewardModal = shadowRoot.getElementById('next-modal');
                        var closeRewardModal = shadowRoot.getElementById('close-rewardmodal');

                        openRewardModal.addEventListener('click', function() {
                            var asked_amt = parseFloat(shadowRoot.getElementById("reward_amt").value).toFixed(2);
                            shadowRoot.getElementById('vcard').innerHTML = asked_amt + " Points"
                            chrome.runtime.sendMessage({
                                    contentScriptQuery: 'fetchUrl',
                                    url: cdirect_api_endpoint + 'userpts/ptsamt?userid=' + encodeURIComponent(user_id) + '&uid=' + encodeURIComponent(uid) + '&vid=' + encodeURIComponent(vid) + '&ptsamt=' + asked_amt,
                                    method: 'GET'
                                },
                                function(result) {
                                    result = JSON.parse(result);
                                    if (result.body.qualified == "Y") {
                                        chrome.storage.local.set({
                                            asked_amt: asked_amt
                                        }, function() {
                                            console.log('Amount Stored!' + asked_amt);
                                        });
                                        shadowRoot.getElementById("pts_validation_msg").innerText = '';
                                        rewardModal.classList.toggle('visible');
                                    } else {
                                        shadowRoot.getElementById("pts_validation_msg").innerText = result.body.message;
                                        setTimeout(function() {
                                            shadowRoot.getElementById("pts_validation_msg").innerText = '';
                                        }, 5000)

                                    }
                                }
                            );
                        });

                        closeRewardModal.addEventListener('click', function() {
                            rewardModal.classList.remove('visible');
                        });

                        redeemLink.addEventListener('click', function(e) {
                          e.preventDefault();
                          // alert(this.getAttribute('utid'));
                          makeOrder(this.getAttribute('utid'));
                        });

                    } else {
                        shadowRoot.getElementById('sp').innerText = 0;
                    }
                    shadowRoot.getElementById('pts_msg').innerText = result.body.message;
                }
            );

        }
    });
    appendStyleInline(shadowRoot);
    const element = shadowRoot.getElementById("draggable");
    if (element != null) dragElement(element);
    shadowRoot.getElementById("close").addEventListener("click", function() {
        element.style.display = 'none';
    });
    // Modal button
    var openModal = shadowRoot.getElementById('open-modal');
    // Modal ID
    var modal = shadowRoot.getElementById('modal-main');
    // Close modal button
    var closeModal = shadowRoot.getElementById('close-modal');
    // Open modal event listener
    openModal.addEventListener('click', function() {
        modal.classList.toggle('visible');
    });
    // Close modal event listener
    closeModal.addEventListener('click', function() {
        modal.classList.remove('visible');
    });
}
chrome.storage.local.get("data", function(results) {
    var cd_stat = JSON.parse(results.data);
    // console.log(cd_stat.tracking_url.replace(/^[^.]+\./g, "") + ' | ' + window.location.hostname + '/');
    if (cd_stat.cd == 1 && (cd_stat.tracking_url.indexOf(window.location.hostname + '/') > -1 || cd_stat.tracking_url.replace(/^[^.]+\./g, "").indexOf(window.location.hostname) > -1 || cd_stat.tracking_url.replace(/^[^.]+\./g, "").indexOf(window.location.hostname.replace(/^[^.]+\./g, "")) > -1)) {
        if (shadowRoot.getElementById("draggable_popup") == null) {
            loadDirectPriceShadowDOM();
        }
        dl = window.location.href;
        rl = 'https://www.google.com/';
        init(dl, rl);
        uid = getCookie('__opixsee_uid');
        vid = getCookie('__opixsee_vid');
        var opix_data = {
            uid: uid,
            vid: vid
        };
        chrome.storage.local.set({
            opix_data: JSON.stringify(opix_data)
        }, function() {
            console.log('Opixsee Data Saved', JSON.stringify(opix_data));
        });
        console.log(document.cookie);
    }
});
/*
function setCartData(){
    console.log('made it');
    chrome.storage.local.get('userid', function(result) {
        if (result.userid !== undefined) {
            var user_id = result.userid;
            chrome.runtime.sendMessage({
                    contentScriptQuery: 'fetchUrl',
                    url: cdirect_api_endpoint + 'cartprice/v2/orderamt?hostname=' + location.hostname + '&userid=' + user_id,
                    method: 'GET'
                },
                function(result) {
                    result = JSON.parse(result);
                    var data_cart_element = result[0].cart_element;
                    var point = result[0].point_calc;
                    var conv = result[0].point_convert;

                    chrome.storage.local.get(['data', 'cart_data'], function(result) {
                        // console.log(eval(data_cart_element));
                        // var car_stotalp = eval(data_cart_element);
                        var car_stotalp = window.subtotal-window.discount;
                            console.log(data_cart_element);
                            console.log(car_stotalp);
                            if(car_stotalp<=0 ){
                                console.log(eval(data_cart_element));
                                var car_stotalp = eval(data_cart_element);
                                console.log('universal scraping code is not working');
                            }else{
                                console.log('universal scraping code is working cart total is '+car_stotalp);
                            }
                        var z = JSON.parse(result.data);
                        var discount_amount = z.sale_commission;
                        var cart_data = JSON.parse(result.cart_data);
                        var direct_price = (parseFloat(discount_amount) * parseFloat(point) * parseFloat(car_stotalp).toFixed(2) * conv).toFixed(2);
                        cart_data = {
                            discount: discount_amount,
                            cart_total: parseFloat(car_stotalp).toFixed(2),
                            points: direct_price
                        }
                        chrome.storage.local.set({
                            cart_data: JSON.stringify(cart_data)
                        }, function() {
                            console.log('Cart Data Saved', JSON.stringify(cart_data));
                        });
                        shadowRoot.getElementById('dp').innerText = direct_price;
                        shadowRoot.getElementById('pts').innerText = direct_price;

                    })
                }
            );
        }
    })
}
*/
/// setTimeout(setCartData, 8000);

// function injectScript(file_path, tag) {
//     var node = document.getElementsByTagName(tag)[0];
//     var script = document.createElement('script');
//     script.setAttribute('type', 'text/javascript');
//     script.setAttribute('src', file_path);
//     node.appendChild(script);
// }

// injectScript(chrome.extension.getURL('assets/js/inject.js'), 'body');

// window.addEventListener("message", function (event) {
//     // only accept messages from the current tab
//     if (event.source != window)
//         return;

//     if (event.data.type && (event.data.type == "FROM_PAGE") && typeof chrome.app.isInstalled !== 'undefined') {
//         chrome.runtime.sendMessage({ essential: event.data.essential });
//     }
// }, false);


    chrome.runtime.onMessage.addListener(function(msg, sender) {
        switch(msg){
            case "scrape":
                var tempsubtotal=window.subtotal;
                window.subtotal_updater('subtotal');
                if (tempsubtotal==window.subtotal)
                    window.subtotal_updater('total before tax');

                var tempdiscount=window.discount;
                window.discount_updater('discount');
                if (tempdiscount==window.discount)
                    window.discount_updater('savings');
            //    new code
            
            (function() {
            
                function bindResponse(request, response) {
                    request.__defineGetter__("responseText", function() {
                        console.warn('Something tried to get the responseText');
                        console.debug(response);
                        return response;
                    })
                }
            
                function processResponse(request,caller,method,path) {
                    bindResponse(request, request.responseText);
                }
            
                var proxied = window.XMLHttpRequest.prototype.open;
                window.XMLHttpRequest.prototype.open = function(method, path, async) {
                        var caller = arguments.callee.caller;
                        this.addEventListener('readystatechange', function() {
                            if (this.readyState === 4){
                                console.log("ajax call!");
                                window.subtotal_updater('subtotal');
                                setCartData();
                                processResponse(this,caller,method,path);
                            }
                        }, true);
                    return proxied.apply(this, [].slice.call(arguments));
                };
            })
            // chrome.devtools.network.getHAR(function(result) {
            //     var entries = result.entries;
            //     var xhrEntries = entries.filter(function(entry) {
            //         var headers = entry.request.headers;
            
            //         var xhrHeader = headers.filter(function(header) {
            //             return header.name.toLowerCase() === 'x-requested-with' 
            //                 && header.value === 'XMLHttpRequest';
            //         });
            
            //         return xhrHeader.length > 0;
            
            //     });
            
            //     console.log(xhrEntries);
            // });
           

            const targetNode = document.body;
            // const targetNode = document.querySelector('*:contains("$")');
            // const targetNode = document.querySelector('*:contains("$")');

            // Options for the observer (which mutations to observe)
            const config = { attributes: true, childList: true, subtree: true };

            // Callback function to execute when mutations are observed
            const callback = function(mutationsList, observer) {
                // Use traditional 'for loops' for IE 11
                console.log("test");
                for(const mutation of mutationsList) {
                    if (mutation.type === 'childList') {
                        console.log('A child node has been added or removed.');
                    }
                    else if (mutation.type === 'attributes') {
                        console.log('The ' + mutation.attributeName + ' attribute was modified.');
                    }
                }
            };

            // Create an observer instance linked to the callback function
            const observer = new MutationObserver(callback);

            // Start observing the target node for configured mutations
            observer.observe(targetNode, config);

            // Later, you can stop observing
            observer.disconnect();

            //    new code
            break;
        }
    })

    // (function() {
    //     var proxied = window.XMLHttpRequest.prototype.send;
    //     window.XMLHttpRequest.prototype.send = function() {
    //         console.log( arguments );
    //         //Here is where you can add any code to process the request. 
    //         //If you want to pass the Ajax request object, pass the 'pointer' below
    //         var pointer = this
    //         var intervalId = window.setInterval(function(){
    //                 if(pointer.readyState != 4){
    //                         return;
    //                 }
    //                 console.log( pointer.responseText );
    //                 //Here is where you can add any code to process the response.
    //                 //If you want to pass the Ajax request object, pass the 'pointer' below
                
    //                 if (window.watch_activated) {
    //                     window.subtotal_updater('subtotal');
    //                     if (window.subtotal==0)
    //                         window.subtotal_updater('total before tax');
    //                     window.watch_activated=false;
    //                 }
    //                 clearInterval(intervalId);
    
    //         }, 1);//I found a delay of 1 to be sufficient, modify it as you need.
    //         return proxied.apply(this, [].slice.call(arguments));
    //     };
    
    
    // })();

    // $(document).ajaxStop(function () {
    //     alert('test123');
    //   });


function setCartData() {
    var cartid = '12345gh';
    chrome.storage.local.get('userid', function(result) {
        if (result.userid !== undefined) {
            var user_id = result.userid;
            chrome.runtime.sendMessage({
                    contentScriptQuery: 'fetchUrl',
                    url: cdirect_api_endpoint + 'cartprice/v2/orderamt?hostname=' + location.hostname + '&userid=' + user_id,
                    method: 'GET'
                },
                function(result) {
                    result = JSON.parse(result);
                    console.log(result)
                    var data_checkout_element = result[0].cart_element;
                    var data_cart_discount_element = result[0].cart_discount; 
                    console.log(data_cart_discount_element)
                    var point = result[0].point_calc;
                    console.log(parseFloat(point));
                    var conv = result[0].point_convert;
                    console.log(conv);
                    var checkout_total = window.subtotal-window.discount;
                    console.log(checkout_total);
                    console.log(data_checkout_element);

                    if(checkout_total===0 || checkout_total < 0){
                        var checkout_total_new= eval(data_checkout_element);
                        var discount = eval(data_cart_discount_element);
                        console.log(eval(data_cart_discount_element));
                        console.log(checkout_total_new);
                        var checkout_total_parsed = Number(checkout_total_new) - Number(discount);
                        console.log(checkout_total_parsed);
                        console.log(eval(data_checkout_element));
                        console.log('universal scraping code is not working');
                    }else{
                        console.log('universal scraping code is working cart total is '+checkout_total);
                        var checkout_total_parsed = checkout_total;
                    }
                    chrome.storage.local.get(['data', 'cart_data'], function(result) {
                        var z = JSON.parse(result.data);
                        var cart_data = JSON.parse(result.cart_data);
                        console.log(cart_data);
                        var discount_amount = z.sale_commission;
                        console.log(discount_amount);

                        // if (cart_data === null || (cart_data.cart_total == 0 || cart_data.points == 0) || (isNaN(cart_data.cart_total) || isNaN(cart_data.points))) {
                            var direct_price = (parseFloat(discount_amount) * parseFloat(point) * parseFloat(checkout_total_parsed) * conv).toFixed(2);
                            console.log(direct_price);
                            cart_data = {
                                discount: discount_amount,
                                cart_total: isNaN(checkout_total) ? 0 : checkout_total,
                                points: direct_price
                            }
                            chrome.storage.local.set({
                                cart_data: JSON.stringify(cart_data)
                            }, function() {
                                console.log('Cart Data Saved', JSON.stringify(cart_data));
                            });
                        // } else {
                        //     console.log('Cart Points:', cart_data.points);
                        //     var direct_price = cart_data.points;
                        // }
                        shadowRoot.getElementById('dp').innerText = direct_price;
                        shadowRoot.getElementById('pts').innerText = direct_price;
                    })
                });
        }
    });
}

setTimeout(setCartData, 10000);

window.Subtotal_price='';
window.subtotal=0;

window.Discount_price='';
window.discount=0;

window.watch_activated=true;
window.trimChar= function(r,t){for(;r.charAt(0)==t;)r=r.substring(1);for(;r.charAt(r.length-1)==t;)r=r.substring(0,r.length-1);return r}
window.clear_text = function (text){
                var clean_text= text.replace(/[^0-9\.]+/g,"");
                return clean_text;
            }
window.subtotal_updater = function (findtext){


    jQuery('div:contains("Sub Total")').find('*:contains("Sub Total"):visible').each(function(i,e){
        if(jQuery(e).contents().filter(function(){return this.nodeType == 3;}).first().text().toLowerCase().includes("Sub Total".toLowerCase())){
                jQuery(e).text('subtotal');
        }
    });

    jQuery('div:contains("'+findtext+'")').find('*:contains("'+findtext+'"):visible').each(function(i,e){
        if(jQuery(e).contents().filter(function(){return this.nodeType == 3;}).first().text().toLowerCase().includes(findtext.toLowerCase())){
            var relative_parent=jQuery(e).closest('*:contains("$")').first();
            //console.log(relative_parent)
            if(relative_parent.length ){
                var target_text_els=relative_parent.find('*:contains("$")');
                if(target_text_els.length)
                    var target_text=target_text_els.first().text().trim();
                else
                    var target_text=relative_parent.text().trim();

                target_text=trimChar(target_text,'$');
                if(target_text.includes('$'))
                    {Subtotal_price= target_text.slice(0, target_text.indexOf('$'));}
                else
                    {Subtotal_price=target_text;}
                Subtotal_price=jQuery.trim(Subtotal_price);
            }
            if(Subtotal_price != ''){
                Subtotal_price=Subtotal_price.replace('USD','');
            }
            Subtotal_price = jQuery.trim(Subtotal_price);

            var char_reg = /[a-zA-Z]/g;                    
            if(!char_reg.test(Subtotal_price) && Subtotal_price != ''){
                window.subtotal = Subtotal_price.replace(/[^0-9\.]+/g,"");
            }
            console.log(window.subtotal+','+window.discount);
            return false;
        }
    });
}
window.discount_updater = function (findtext){

    jQuery('div:contains("'+findtext+'")').find('*:contains("'+findtext+'"):visible').each(function(i,e){
        if(jQuery(e).contents().filter(function(){return this.nodeType == 3;}).first().text().toLowerCase().includes(findtext.toLowerCase())){
            var relative_parent_dis=jQuery(e).next('*:contains("$")').first();

            if(relative_parent_dis.length ){

                var target_text_dis_els=relative_parent_dis.find('*:contains("$")');
                if(target_text_dis_els.length)
                    var target_text_dis=target_text_dis_els.first().text().trim();
                else
                    var target_text_dis=relative_parent_dis.text().trim();

                target_text_dis=jQuery.trim(target_text_dis);
                target_text_dis=trimChar(target_text_dis,'-');
                target_text_dis=jQuery.trim(target_text_dis);
                target_text_dis=trimChar(target_text_dis,'$');
                target_text_dis=jQuery.trim(target_text_dis);
                target_text_dis=trimChar(target_text_dis,'-');
                target_text_dis=jQuery.trim(target_text_dis);
                target_text_dis=trimChar(target_text_dis,'$');
                target_text_dis=jQuery.trim(target_text_dis);
                target_text_dis=trimChar(target_text_dis,'-');
                
                if(target_text_dis.includes('$'))
                    {Discount_price= target_text_dis.slice(0, target_text_dis.indexOf('$'));}
                else
                    {Discount_price=target_text_dis;}
                Discount_price=jQuery.trim(Discount_price);
            }
            if(Discount_price != ''){
                Discount_price=Discount_price.replace('USD','');
            }
            Discount_price = jQuery.trim(Discount_price);

            var char_reg = /[a-zA-Z]/g;                    
            if(!char_reg.test(Discount_price) && Discount_price != ''){
                window.discount = Discount_price.replace(/[^0-9\.]+/g,"");
            }
        }
    });
}

if("undefined" == typeof jQuery)
{
    var jq = document.createElement("script");jq.src = "https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js?fdfg=sd", document.getElementsByTagName("head")[0].appendChild(jq);
}
var jqryinvl = setInterval(function() { if("undefined" != typeof jQuery) { clearInterval(jqryinvl);

    jQuery.expr[':'].contains = function(a, i, m) { 
      return jQuery(a).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0; 
    };


    (function() {
        var origOpen = XMLHttpRequest.prototype.open;
        XMLHttpRequest.prototype.open = function() {
            this.addEventListener('load', function() {
                window.watch_activated=true;
            });
            origOpen.apply(this, arguments);
        };
    })();


    setInterval(function(){
        if (window.watch_activated) {
            var tempsubtotal=window.subtotal;
            window.subtotal_updater('subtotal');
            if (tempsubtotal==window.subtotal)
                window.subtotal_updater('total before tax');

            var tempdiscount=window.discount;
            window.discount_updater('discount');
            if (tempdiscount==window.discount)
                window.discount_updater('savings');

            window.watch_activated=false;

            // if (window.location.href.indexOf("officedepot") > -1) {

            //     var sub_selector = jQuery('[class="orderSummary_subtotal"]').text();
            //     // var dis_selector = jQuery('[class="orderSummary_subtotal"]').text();
            //     window.subtotal=clear_text(sub_selector);
            //     // window.discount=clear_text(dis_selector);
            //     console.log(window.subtotal+','+window.discount);
            // }
            setCartData();

            console.log(window.subtotal+','+window.discount);
        }    

    },3000);

}},200);