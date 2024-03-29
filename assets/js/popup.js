var shadowWrapper_popup = document.createElement('div');
shadowWrapper_popup.id = "shadow-wrapper-popup";
document.body.appendChild(shadowWrapper_popup);
var host_popup = document.getElementById('shadow-wrapper-popup');
var shadowRootPopup = host_popup.attachShadow({
    mode: 'open'
});


loadDirectPriceShadowDOMP();

function loadDirectPriceShadowDOMP() {
    shadowRootPopup.innerHTML = `
      <div class="modal-wrap" id="modal-balance-popup">
        <div class="modal-container">
          <button class="close" id="close-modal">&times;</button>
          <div class="modal-header">
            <img class="cd-logo-b" src="${extension_icon}" alt="${extension_name}"/>
            <h6 class="modal-title" id="exampleModalLabel"><span class="plus">+</span> Welcome <span id="user">User</span>! Thanks for saving with us.<br>We Save you Save!</h6>
          </div>
          <div class="modal-footer">
            <div class="row row-grey">
              <div class="col-md-2 col-sm-2 col-xs-2"><img src="${chrome.extension.getURL("assets/icons/cd-points.png")}" width="40" height="40"/></div><div class="col-md-2 col-sm-2 col-xs-2" id="sp"> 0</div><div class="col-md-4 col-sm-4 col-xs-4" id="pts_msg">Total Points Balance</div><div class="col-md-4 col-sm-4 col-xs-4" id="reward"></div>
            </div>
          </div>
        </div>
      </div>`;

    shadowRootPopup.innerHTML += `
    <div class="modal-wrap" id="modal-reward-amount">
      <div class="modal-container">
        <button class="close" id="close-rewardmodal-amount">&times;</button>
          <div class="modal-header">
          <img class="cd-logo-b" src="${extension_icon}" alt="${extension_name}"/>
            <h6 class="modal-title"><span class="plus">+</span> Welcome <span id="user1">User</span>! Thanks for saving with us.<br>We Save you Save!</h6>
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
    shadowRootPopup.innerHTML += `
    <div class="modal-wrap" id="modal-reward">
      <div class="modal-container">
        <button class="close" id="close-rewardmodal">&times;</button>
        <div class="modal-header">
          <img class="cd-logo-b" src="${extension_icon}" alt="${extension_name}"/>
          <h6 class="modal-title"><span class="plus">+</span> Welcome <span id="user2">User</span>!<br>Now for the fun part!</h6>
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
                <p style="padding:0 15px;color:#ed2027;text-align:justify;">Note that once clicked, that amount must be redeemed during that session as balance will be automatically deducted from your balance</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    `;
    appendPopupStyleInline(shadowRootPopup);
    chrome.storage.local.get('userid', function(result) {
        if (result.userid !== undefined) {
            user_id = result.userid;
            shadowRootPopup.getElementById("user").innerText = user_id;
            shadowRootPopup.getElementById("user1").innerText = user_id;
            shadowRootPopup.getElementById("user2").innerText = user_id;
        }
    });
    shadowRootPopup.getElementById('reward_amt').addEventListener("keyup", function() {
        shadowRootPopup.getElementById('est_usd').innerText = this.value / 100;
        shadowRootPopup.getElementById('est_pts').innerText = this.value;
    });

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
                        shadowRootPopup.getElementById('sp').innerText = parseFloat(discount).toFixed(2);
                        shadowRootPopup.getElementById('tpb').innerText = parseFloat(discount).toFixed(2);
                        shadowRootPopup.getElementById('pb').innerText = parseFloat(discount).toFixed(2);
                        shadowRootPopup.getElementById('reward').innerHTML = '<a href="#" id="rewardlink">Redeem Rewards!</a>';

                        chrome.runtime.sendMessage({
                                contentScriptQuery: 'apiTango',
                                url: tangocard_api_endpoint + 'catalogs',
                                token: tangocard_token,
                                method: 'GET'
                            },
                            function(result) {
                                var data = JSON.parse(result);
                                var frame = shadowRootPopup.getElementById('cards');

                                data.brands.forEach(function(brand, index) {
                                    if (brand.brandName.match(/(Commerce Direct)/g)) {
                                        frame.innerHTML = `<li class="card" utid="${brand.items[0].utid}"><img src="${brand.imageUrls["130w-326ppi"]}" title="Click to Redeem!"></li>`;
                                    }
                                })
                                var li = document.createElement("li");
                                li.setAttribute("id", "vcard");
                                li.classList.add('card');
                                li.classList.add('virtual-card');
                                li.innerHTML = amt;
                                frame.appendChild(li);
                                let listItems = shadowRootPopup.querySelectorAll('.card-container li');
                                listItems.forEach((item, index) => {
                                    item.addEventListener('click', (event) => {
                                        makeOrder(event.currentTarget.getAttribute('utid'));
                                    });

                                });
                            }
                        );


                        var openRewardModalAmt = shadowRootPopup.getElementById('rewardlink');
                        var rewardModalAmt = shadowRootPopup.getElementById('modal-reward-amount');
                        var closeRewardModalAmt = shadowRootPopup.getElementById('close-rewardmodal-amount');
                        var rewardModal = shadowRootPopup.getElementById('modal-reward');

                        openRewardModalAmt.addEventListener('click', function() {
                            rewardModalAmt.classList.toggle('visible');
                        });

                        closeRewardModalAmt.addEventListener('click', function() {
                            rewardModalAmt.classList.remove('visible');
                        });

                        var openRewardModal = shadowRootPopup.getElementById('next-modal');
                        var closeRewardModal = shadowRootPopup.getElementById('close-rewardmodal');

                        openRewardModal.addEventListener('click', function() {
                            var asked_amt = parseFloat(shadowRootPopup.getElementById("reward_amt").value).toFixed(2);
                            shadowRootPopup.getElementById('vcard').innerHTML = asked_amt;
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
                                        shadowRootPopup.getElementById("pts_validation_msg").innerText = '';
                                        rewardModal.classList.toggle('visible');
                                    } else {
                                        shadowRootPopup.getElementById("pts_validation_msg").innerText = result.body.message;
                                        setTimeout(function() {
                                            shadowRootPopup.getElementById("pts_validation_msg").innerText = '';
                                        }, 5000)

                                    }
                                }
                            );
                        });

                        closeRewardModal.addEventListener('click', function() {
                            rewardModal.classList.remove('visible');
                        });

                    } else {
                        shadowRootPopup.getElementById('sp').innerText = 0;
                    }
                    shadowRootPopup.getElementById('pts_msg').innerText = result.body.message;
                }
            );
        }
    });
    // Modal ID
    var modal = shadowRootPopup.getElementById('modal-balance-popup');
    // Close modal button
    var closeModal = shadowRootPopup.getElementById('close-modal');
    // Open modal event listener
    // Close modal event listener
    closeModal.addEventListener('click', function() {
        modal.classList.remove('visible');
    });
}

// Modal popup
chrome.runtime.onMessage.addListener(function(msg, sender) {
    if (msg == "toggle") {
        var modal_popup = shadowRootPopup.getElementById('modal-balance-popup');
        modal_popup.classList.toggle('visible');
    }
});