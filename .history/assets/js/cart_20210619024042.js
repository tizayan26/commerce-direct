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
              <div class="col-md-2 col-sm-2 col-xs-2"><img src="${chrome.extension.getURL("assets/icons/cd-points.png")}" width="50" height="50"/></div>
              <div class="col-md-2 col-sm-2 col-xs-2" id="tpb"> 0</div>
              <div class="col-md-8 col-sm-8 col-xs-8" id="pts_msg">Total Points Balance</div>
            </div>
            <div class="row row-grey">
              <div class="col-md-6 col-sm-6 col-xs-6"><a href="https://commercedirect.io/rewards" target="_blank" style="float:right;">Click to Browse</a><img class="cards" style="float:right;" src="${chrome.extension.getURL("assets/icons/cd_card.png")}" id="openCards"/></div>
              <div class="col-md-6 col-sm-6 col-xs-6"><a id="next-modal">Click to Redeem</a><img class="cards" src="${chrome.extension.getURL("assets/icons/point_card.png")}"/></div>
            </div>
            
          </div>
      </div>
    </div>
    `;
  //   <div class="row row-grey">
  //   <div class="col-md-4 col-sm-4 col-xs-4"><input class="reward-amt" id="reward_amt" type="text" /></div>
  //   <div class="col-md-4 col-sm-4 col-xs-4"><span id="est_pts">100</span> Points = $<span id="est_usd">1</span><p  class="pts-validation-msg" id="pts_validation_msg"><p></div>
  //   <div class="col-md-4 col-sm-4 col-xs-4"><a href="#" id="next-modal">Redeem Rewards!</a></div>
  // </div>
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
              <div class="card-container">
                <ul class="cards" id="cards">
                </ul>
                <p style="color:#ed2027;text-align:justify;">Note that once clicked, that amount must be redeemed during that session as balance will be automatically deducted from your balance</p>
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
    // shadowRoot.getElementById('reward_amt').addEventListener("keyup", function() {
    //     shadowRoot.getElementById('est_usd').innerText = this.value / 100;
    //     shadowRoot.getElementById('est_pts').innerText = this.value;
    // });
    setCartData();
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

                                data.brands.forEach(function(brand, index) {
                                    
                                    if (!brand.brandName.match(/(Commerce Direct)/g)) {
                                        li = document.createElement('li');
                                        li.className = 'card';
                                        img= document.createElement('img')
                                        img.src = brand.imageUrls["130w-326ppi"];
                                        li.appendChild(img);
                                        frame.appendChild(li);
                                        frame.innerHTML = `<li class="card"><img src="${brand.imageUrls["130w-326ppi"]}"></li>`;
                                    }
                                })
                                var li = document.createElement("li");
                                li.setAttribute("id", "vcard");
                                li.classList.add('card');
                                li.classList.add('virtual-card');
                                li.innerHTML = amt;
                                frame.appendChild(li);
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

                        openRewardModalAmt.addEventListener('click', function() {
                            rewardModalAmt.classList.toggle('visible');
                        });
                        var openCardsModal = shadowRoot.getElementById('openCards');
                        var modalCards = shadowRoot.getElementById('modal-reward');
                        var closeCardModal = shadowRoot.getElementById('close-rewardmodal');

                        openCardsModal.addEventListener('click', function() {
                          modalCards.classList.toggle('visible');
                        });
                        
                        closeCardModal.addEventListener('click', function() {
                          modalCards.classList.remove('visible');
                        });
                        var openRewardModal = shadowRoot.getElementById('next-modal');
                        // closeRewardModalAmt.addEventListener('click', function() {
                        //   rewardModalAmt.classList.remove('visible');
                        // });
                        // var closeRewardModal = shadowRoot.getElementById('close-rewardmodal');

                        openRewardModal.addEventListener('click', function(e) {
                            e.preventDefault();
                            // var asked_amt = parseFloat(shadowRoot.getElementById("reward_amt").value).toFixed(2);
                            var asked_amt = parseFloat(1).toFixed(2);
                            shadowRoot.getElementById('vcard').innerHTML = asked_amt;
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
                                        // shadowRoot.getElementById("pts_validation_msg").innerText = '';
                                        rewardModal.classList.toggle('visible');
                                    } else {
                                        // shadowRoot.getElementById("pts_validation_msg").innerText = result.body.message;
                                        // setTimeout(function() {
                                        //     shadowRoot.getElementById("pts_validation_msg").innerText = '';
                                        // }, 5000)

                                    }
                                }
                            );
                        });

                        closeRewardModal.addEventListener('click', function() {
                            rewardModal.classList.remove('visible');
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
    console.log(cd_stat.tracking_url.replace(/^[^.]+\./g, "") + ' | ' + window.location.hostname + '/');
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



function setCartData() {
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
                        console.log(eval(data_cart_element));
                        var car_stotalp = eval(data_cart_element);
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
setTimeout(setCartData, 8000);