var shadowWrapper_popup = document.createElement("div");
shadowWrapper_popup.id = "shadow-wrapper-popup", document.body.appendChild(shadowWrapper_popup);
var host_popup = document.getElementById("shadow-wrapper-popup"),
    shadowRootPopup = host_popup.attachShadow({
        mode: "open"
    });

function loadDirectPriceShadowDOMP() {
    shadowRootPopup.innerHTML = `\n      <div class="modal-wrap" id="modal-balance-popup">\n        <div class="modal-container">\n          <button class="close" id="close-modal">&times;</button>\n          <div class="modal-header">\n            <img class="cd-logo-b" src="${extension_icon}" alt="${extension_name}"/>\n            <div class="modal-title" id="exampleModalLabel"><span class="plus">+</span> Welcome <span id="user">User</span>!<br>Thanks for earning eGift Card Rewards with us. Remember to be on the lookout for plugin notifications while you are shopping on Google Search & Shopping tabs. Learn more about how to earn and redeem here: <a href="https://www.commercedirect.io">commercedirect.io</a></div>\n          </div>\n          <div class="modal-body"><a href="https://login.commercedirect.io/logout" style="float: right;">Logout</a></div>\n          <div class="modal-footer">\n            <div class="row row-grey">\n              <div class="col-md-2 col-sm-2 col-xs-2"><img src="${chrome.extension.getURL("assets/icons/cd-points.png")}" width="40" height="40"/></div><div class="col-md-2 col-sm-2 col-xs-2" id="sp"> 0</div><div class="col-md-4 col-sm-4 col-xs-4" id="pts_msg">Total Points Balance</div><div class="col-md-4 col-sm-4 col-xs-4" id="reward"></div>\n            </div>\n          </div>\n        </div>\n      </div>`, shadowRootPopup.innerHTML += `\n    <div class="modal-wrap" id="modal-reward-amount">\n      <div class="modal-container">\n        <button class="close" id="close-rewardmodal-amount">&times;</button>\n          <div class="modal-header">\n          <img class="cd-logo-b" src="${extension_icon}" alt="${extension_name}"/>\n            <div class="modal-title"><span class="plus">+</span> Enter the point amount below you’d like to redeem in eGift Card Rewards.</div>\n          </div>\n          <div class="modal-footer">\n            <div class="row row-grey">\n              <div class="col-md-4 col-sm-4 col-xs-4"><input class="reward-amt" id="reward_amt_popup" type="text" /></div>\n              <div class="col-md-4 col-sm-4 col-xs-4"><span id="est_pts">100</span> Points = $<span id="est_usd">1</span><p  class="pts-validation-msg" id="pts_validation_msg"><p></div>\n              <div class="col-md-4 col-sm-4 col-xs-4"><a href="#" id="next-modal">Redeem Rewards!</a></div>\n            </div>\n            <div class="row row-grey">\n              <div class="col-md-2 col-sm-2 col-xs-2"><img src="${chrome.extension.getURL("assets/icons/cd-points.png")}" width="50" height="50"/></div>\n              <div class="col-md-2 col-sm-2 col-xs-2" id="tpb"> 0</div>\n              <div class="col-md-8 col-sm-8 col-xs-8" id="pts_msg">Total Points Balance</div>\n            </div>\n          </div>\n      </div>\n    </div>\n    `, shadowRootPopup.innerHTML += `\n    <div class="modal-wrap" id="modal-reward">\n      <div class="modal-container">\n        <button class="close" id="close-rewardmodal">&times;</button>\n        <div class="modal-header">\n          <img class="cd-logo-b" src="${extension_icon}" alt="${extension_name}"/>\n          <h6 class="modal-title"><span class="plus">+</span> Thanks for Redeeming Rewards with us! Now for the fun part!</h6>\n        </div>\n        <div class="modal-content">\n          <div class="row row-grey">\n            <div class="col-md-2 col-sm-2 col-xs-2"><img src="${chrome.extension.getURL("assets/icons/cd-points.png")}" width="50" height="50"/></div>\n            <div class="col-md-2 col-sm-2 col-xs-2" id="pb"> 0</div><div class="col-md-8" id="pts_msg">Total Points Balance</div>\n          </div>\n        </div>\n        <div class="modal-footer">\n          <div class="row">\n            <div class="col-md-12 col-sm-12 col-xs-12">\n              <div class="col-md-6 col-sm-6 col-xs-6" style="text-align:right;"><a href="https://commercedirect.io/rewards" target="_blank">Click to Browse</a></div>\n              <div class="col-md-6 col-sm-6 col-xs-6" style="text-align:left;"><a id="redeem_link">Click to Redeem</a></div>\n              <div class="col-md-12 col-sm-12 col-xs-12">\n                <div class="card-container">\n                  <ul class="cards" id="cards">\n                  </ul>\n                  <p style="padding:0 15px;color:#ed2027;text-align:justify;">Note that once Click to Redeem is selected, that amount must be redeemed during that session as the selected point amount will be automatically deducted from your balance. You can select Click to Browse if you’d like view your eGift Card Reward options first. **Please note that any returned items will not be eligible for redeemable points from purchases as they will be clawed back. Failure to comply may result in account suspension, removal and/or other legal action. Please reach out to info@commercedirect.io for other inquiries on our policies.</p>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n    `, appendPopupStyleInline(shadowRootPopup), chrome.storage.local.get("userid", (function(e) {
        void 0 !== e.userid && (user_id = "to Commerce Direct", shadowRootPopup.getElementById("user").innerText = user_id)
    })), shadowRootPopup.getElementById("reward_amt_popup").addEventListener("keyup", (function() {
        shadowRootPopup.getElementById("est_usd").innerText = this.value / 100, shadowRootPopup.getElementById("est_pts").innerText = this.value
    })), chrome.storage.local.get(["userid", "redeemed", "asked_amt"], (function(e) {
        if (void 0 !== e.userid) {
            user_id = e.userid, uid = getCookie("__opixsee_uid"), vid = getCookie("__opixsee_vid");
            var o = e.asked_amt;
            chrome.runtime.sendMessage({
                contentScriptQuery: "fetchUrl",
                url: cdirect_api_endpoint + "userpts?userid=" + encodeURIComponent(user_id) + "&uid=" + encodeURIComponent(uid) + "&vid=" + encodeURIComponent(vid),
                method: "GET"
            }, (function(e) {
                if ("Y" == (e = JSON.parse(e)).body.qualified) {
                    const c = e.body.discount;
                    shadowRootPopup.getElementById("sp").innerText = parseFloat(c).toFixed(2), shadowRootPopup.getElementById("tpb").innerText = parseFloat(c).toFixed(2), shadowRootPopup.getElementById("pb").innerText = parseFloat(c).toFixed(2), shadowRootPopup.getElementById("reward").innerHTML = '<a href="#" id="rewardlink">Redeem Rewards!</a>', chrome.runtime.sendMessage({
                        contentScriptQuery: "apiTango",
                        url: tangocard_api_endpoint + "catalogs",
                        token: tangocard_token,
                        method: "GET"
                    }, (function(e) {
                        var t = JSON.parse(e),
                            s = shadowRootPopup.getElementById("cards"),
                            d = document.createElement("li");
                        t.brands.forEach((function(e, o) {
                            e.brandName.match(/(Commerce Direct)/g) && (li = document.createElement("li"), li.className = "card", shadowRootPopup.getElementById("redeem_link").setAttribute("utid", e.items[0].utid), img = document.createElement("img"), img.src = e.imageUrls["130w-326ppi"], li.appendChild(img), s.appendChild(li))
                        })), d.setAttribute("id", "vcard"), d.classList.add("card"), d.classList.add("virtual-card"), d.innerHTML = o, s.appendChild(d)
                    }));
                    var t = shadowRootPopup.getElementById("rewardlink"),
                        s = shadowRootPopup.getElementById("modal-reward-amount"),
                        d = shadowRootPopup.getElementById("close-rewardmodal-amount"),
                        i = shadowRootPopup.getElementById("modal-reward"),
                        a = shadowRootPopup.getElementById("redeem_link");
                    t.addEventListener("click", (function() {
                        s.classList.toggle("visible")
                    })), d.addEventListener("click", (function() {
                        s.classList.remove("visible")
                    }));
                    var n = shadowRootPopup.getElementById("next-modal"),
                        l = shadowRootPopup.getElementById("close-rewardmodal");
                    n.addEventListener("click", (function() {
                        var e = parseFloat(shadowRootPopup.getElementById("reward_amt_popup").value).toFixed(2);
                        shadowRootPopup.getElementById("vcard").innerHTML = e + " Points", chrome.runtime.sendMessage({
                            contentScriptQuery: "fetchUrl",
                            url: cdirect_api_endpoint + "userpts/ptsamt?userid=" + encodeURIComponent(user_id) + "&uid=" + encodeURIComponent(uid) + "&vid=" + encodeURIComponent(vid) + "&ptsamt=" + e,
                            method: "GET"
                        }, (function(o) {
                            "Y" == (o = JSON.parse(o)).body.qualified ? (chrome.storage.local.set({
                                asked_amt: e
                            }, (function() {})), shadowRootPopup.getElementById("pts_validation_msg").innerText = "", i.classList.toggle("visible")) : (shadowRootPopup.getElementById("pts_validation_msg").innerText = o.body.message, setTimeout((function() {
                                shadowRootPopup.getElementById("pts_validation_msg").innerText = ""
                            }), 5e3))
                        }))
                    })), a.addEventListener("click", (function(e) {
                        e.preventDefault(), makeOrder(this.getAttribute("utid"))
                    })), l.addEventListener("click", (function() {
                        i.classList.remove("visible")
                    }))
                } else shadowRootPopup.getElementById("sp").innerText = 0;
                shadowRootPopup.getElementById("pts_msg").innerText = e.body.message
            }))
        }
    }));
    var e = shadowRootPopup.getElementById("modal-balance-popup");
    shadowRootPopup.getElementById("close-modal").addEventListener("click", (function() {
        e.classList.remove("visible")
    }))
}
loadDirectPriceShadowDOMP(), chrome.runtime.onMessage.addListener((function(e, o) {
    "toggle" == e && shadowRootPopup.getElementById("modal-balance-popup").classList.toggle("visible")
}));