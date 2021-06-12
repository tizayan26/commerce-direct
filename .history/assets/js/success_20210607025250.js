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
        <span id="open-modal" class="triger-modal" data-triger="modal-demo">You earned <span id="pts">0</span> Points!</span>
        <div class="close-sm" id="close">&times;</div>
      </div>
      <div class="modal-wrap" id="modal-main">
        <div class="modal-container">
          <button class="close" id="close-modal">&times;</button>
          <div class="modal-header">
            <h6 class="modal-title" id="exampleModalLabel"><span class="plus">+</span> Welcome <span id="user">User</span>! Thanks for earning eGift Card Rewards with us.</h6>
          </div>
          <div class="modal-content">
            <div class="row">
              <div class="col-md-4 col-sm-4 col-xs-4"><img class="cd-logo-b" src="${extension_icon}" alt="${extension_name}"></div><div class="col-md-8 col-sm-8 col-xs-8 modal-body-text" style="">Congrats on the Purchase!</div>
            </div>
          </div>
          <div class="modal-footer">
            <div class="row row-grey">
              <div class="col-md-2 col-sm-2 col-xs-2"><img src="${chrome.extension.getURL("assets/icons/cd-tag.png")}" width="40" height="40"/></div><div class="col-md-2 col-sm-2 col-xs-2" id="dp"> 0</div><div class="col-md-8 col-sm-8 col-xs-8">You Earned Points from this Purchase!</div>
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
            <h6 class="modal-title" id="exampleModalLabel"><span class="plus">+</span> Welcome <span id="user1">User</span>! Thanks for earning eGift Card Rewards with us.</h6>
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
              <div class="col-md-4 col-sm-4 col-xs-4"><span id="est_pts">100</span>Points = $<span id="est_usd">1</span><p  class="pts-validation-msg" id="pts_validation_msg"><p></div>
              <div class="col-md-4 col-sm-4 col-xs-4"><a href="#" id="next-modal">Redeem Reward!</a></div>
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
          <h6 class="modal-title" id="exampleModalLabel"><span class="plus">+</span> Welcome <span id="user2">User</span>! Thanks for Redeeming Rewards with us! Now for the fun part!</h6>
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
                <p style="color:#ed2027;text-align:justify;">Note that once clicked to redeem, that amount must be redeemed during that session as the selected point amount will be automatically deducted from your balance</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    `;
    shadowRoot.getElementById('reward_amt').addEventListener("keyup", function() {
        shadowRoot.getElementById('est_usd').innerText = this.value / 100;
        shadowRoot.getElementById('est_pts').innerText = this.value;
    });
    chrome.storage.local.get('userid', function(result) {
        if (result.userid !== undefined) {
            user_id = result.userid;
            shadowRoot.getElementById("user").innerText = user_id;
            shadowRoot.getElementById("user1").innerText = user_id;
            shadowRoot.getElementById("user2").innerText = user_id;
        }
    });
    chrome.runtime.sendMessage({
            contentScriptQuery: 'fetchUrl',
            url: cdirect_api_endpoint + 'cartprice/v2/pricehook?cartid=' + encodeURIComponent(cartid),
            method: 'GET'
        },
        function(result) {
            result = JSON.parse(result);
            if (result.body.qualified == "Y") {
                chrome.storage.local.get('cart_data', function(result) {
                    var data = JSON.parse(result.cart_data);
                    var direct_price = parseFloat(data.points).toFixed(2);
                    shadowRoot.getElementById('dp').innerText = direct_price;
                    shadowRoot.getElementById('pts').innerText = direct_price;
                });
            }
        }
    );

    chrome.storage.local.get(['userid', 'opix_data'], function(result) {
        if (result.userid !== undefined) {
            user_id = result.userid;
            var opix_data = JSON.parse(result.opix_data);
            uid = opix_data.uid;
            vid = opix_data.vid;
            chrome.runtime.sendMessage({
                    contentScriptQuery: 'fetchUrl',
                    url: cdirect_api_endpoint + 'userpts?userid=' + encodeURIComponent(user_id) + '&uid=' + encodeURIComponent(uid) + '&vid=' + encodeURIComponent(vid),
                    method: 'GET'
                },
                function(result) {
                    result = JSON.parse(result);
                    if (result.body.qualified == "Y") {
                        shadowRoot.getElementById('sp').innerText = parseFloat(result.body.discount).toFixed(2);
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
        chrome.storage.local.get(['userid', 'opix_data'], function(result) {
            if (result.userid !== undefined) {
                // user_id = result.userid;
                user_id = "to Commerce Direct";
                var opix_data = JSON.parse(result.opix_data);
                uid = opix_data.uid;
                vid = opix_data.vid;

                chrome.runtime.sendMessage({
                        contentScriptQuery: 'fetchUrl',
                        url: cdirect_api_endpoint + 'userpts?userid=' + encodeURIComponent(user_id) + '&uid=' + encodeURIComponent(uid) + '&vid=' + encodeURIComponent(vid),
                        method: 'GET'
                    },
                    function(result) {
                        result = JSON.parse(result);
                        if (result.body.qualified == "Y") {
                            shadowRoot.getElementById('sp').innerText = parseFloat(result.body.discount).toFixed(2);
                            shadowRoot.getElementById('tpb').innerText = parseFloat(result.body.discount).toFixed(2);
                            shadowRoot.getElementById('pb').innerText = parseFloat(result.body.discount).toFixed(2);
                            shadowRoot.getElementById('reward').innerHTML = '<a href="#" id="rewardlink">Redeem Rewards!</a>';

                            var openRewardModalAmt = shadowRoot.getElementById('rewardlink');
                            var rewardModalAmt = shadowRoot.getElementById('modal-reward-amount');
                            var closeRewardModalAmt = shadowRoot.getElementById('close-rewardmodal-amount');
                            openRewardModalAmt.addEventListener('click', function() {
                                rewardModalAmt.classList.toggle('visible');
                            });
                            closeRewardModalAmt.addEventListener('click', function() {
                                rewardModalAmt.classList.remove('visible');
                            });
                        } else {
                            shadowRoot.getElementById('sp').innerText = 0;
                            shadowRoot.getElementById('pts_msg').innerText = result.body.message;

                        }
                    }
                );

            }
        });
    });
    // Close modal event listener
    closeModal.addEventListener('click', function() {
        modal.classList.remove('visible');
    });
    var openRewardModal = shadowRoot.getElementById('next-modal');
    var rewardModal = shadowRoot.getElementById('modal-reward');
    openRewardModal.addEventListener('click', function() {
        var asked_amt = parseFloat(shadowRoot.getElementById("reward_amt").value).toFixed(2);

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

                    });
                    shadowRoot.getElementById("pts_validation_msg").innerText = '';
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
                                if (brand.brandName.match(/(Commerce Direct)/g)) {
                                    var cardimage = document.createElement('img');
                                    cardimage.src = brand.imageUrls["130w-326ppi"];
                                    cardimage.title = "Click to Redeem!"
                                    frame.innerHTML = `<li class="card" utid="${brand.items[0].utid}"><img src="${brand.imageUrls["130w-326ppi"]}" title="Click to Redeem!"></li>`;
                                }
                            })
                            var li = document.createElement("li");
                            li.setAttribute("id", "vcard");
                            li.classList.add('card');
                            li.classList.add('virtual-card');
                            li.innerHTML = amt;
                            frame.appendChild(li);
                            let listItems = shadowRoot.querySelectorAll('.card-container li');
                            chrome.storage.local.get('claimed', function(result) {

                            })
                            listItems.forEach((item, index) => {
                                item.addEventListener('click', (event) => {
                                    alert(`${event.currentTarget.getAttribute('utid')} item was click`);
                                    makeOrder(event.currentTarget.getAttribute('utid'));
                                });
                            });
                            shadowRoot.getElementById('vcard').innerHTML = asked_amt;
                        }
                    );
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
    var closeRewardModal = shadowRoot.getElementById('close-rewardmodal');
    closeRewardModal.addEventListener('click', function() {
        rewardModal.classList.remove('visible');
    });
}

chrome.storage.local.get("data", function(results) {
    var cd_stat = JSON.parse(results.data);
    if (cd_stat.cd == 1 && (cd_stat.tracking_url.indexOf(window.location.hostname + '/') > -1 || cd_stat.tracking_url.replace(/^[^.]+\./g, "").indexOf(window.location.hostname) > -1 || cd_stat.tracking_url.replace(/^[^.]+\./g, "").indexOf(window.location.hostname.replace(/^[^.]+\./g, "")) > -1)) {

        if (shadowRoot.getElementById("draggable_popup") == null) {
            loadDirectPriceShadowDOM();
            chrome.storage.local.get(['cart_data', 'userid', 'opix_data'], function(result) {
                var opix_data = JSON.parse(result.opix_data);
                uid = opix_data.uid;
                vid = opix_data.vid;
                var user_id = result.userid;
                var data = JSON.parse(result.cart_data);
                var pts = ((parseFloat(data.discount) * parseFloat(.75)) * parseFloat(data.cart_total)).toFixed(2);

                shadowRoot.getElementById('dp').innerText = data.points;
                shadowRoot.getElementById('pts').innerText = data.points;
                chrome.runtime.sendMessage({
                        contentScriptQuery: 'fetchUrl',
                        hearders: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'

                        },
                        url: cdirect_api_endpoint + 'userpts/earned?ov=' + encodeURIComponent(data.cart_total) + '&pts=' + encodeURIComponent(data.points) + '&uid=' + encodeURIComponent(uid) + '&userid=' + encodeURIComponent(user_id) + '&vid=' + encodeURIComponent(vid),
                        method: 'PUT'
                    },
                    function(result) {
                        result = JSON.parse(result);
                    }
                );
            });
        }
    }
});