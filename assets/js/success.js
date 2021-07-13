const shadowWrapper = document.createElement("div");
shadowWrapper.id = "shadow-wrapper", script = document.createElement("script"), document.body.appendChild(shadowWrapper);
const host = document.getElementById("shadow-wrapper"),
	shadowRoot = host.attachShadow({
		mode: "closed"
	});

function loadDirectPriceShadowDOM() {
	shadowRoot.innerHTML += `
    <div class="cd-content focus" id="draggable"><img class="cd-logo" src="${extension_icon}" alt="${extension_name}"> <span id="open-modal" class="triger-modal" data-triger="modal-demo">You earned <span id="pts">0</span> Points!</span>
    <div class="close-sm" id="close">&times;</div>
</div>
<div class="modal-wrap" id="modal-main">
    <div class="modal-container"> <button class="close" id="close-modal">&times;</button>
        <div class="modal-header">
            <h6 class="modal-title" id="exampleModalLabel"><span class="plus">+</span> Thanks for earning eGift Card Rewards with us! Your new points will be added to your balance the next time you refresh the page.</h6>
        </div>
        <div class="modal-content">
            <div class="row">
                <div class="col-md-4 col-sm-4 col-xs-4"><img class="cd-logo-b" src="${extension_icon}" alt="${extension_name}"></div>
                <div class="col-md-8 col-sm-8 col-xs-8 modal-body-text" style="">Congrats on the Purchase!</div>
            </div>
        </div>
        <div class="modal-footer">
            <div class="row row-grey">
                <div class="col-md-2 col-sm-2 col-xs-2"><img src="${chrome.extension.getURL(" assets/icons/cd-tag.png")}" width="40" height="40" /></div>
                <div class="col-md-2 col-sm-2 col-xs-2" id="dp"> 0</div>
                <div class="col-md-8 col-sm-8 col-xs-8">You Earned Points from this Purchase!</div>
            </div>
        </div>
        <div class="modal-footer">
            <div class="row row-grey">
                <div class="col-md-2 col-sm-2 col-xs-2"><img src="${chrome.extension.getURL(" assets/icons/cd-points.png")}" width="40" height="40" /></div>
                <div class="col-md-2 col-sm-2 col-xs-2" id="sp"> 0</div>
                <div class="col-md-4 col-sm-4 col-xs-4" id="pts_msg">Total Points Balance</div>
                <div class="col-md-4 col-sm-4 col-xs-4" id="reward"></div>
            </div>
        </div>
    </div>
</div>`, shadowRoot.innerHTML += ` <div class="modal-wrap" id="modal-reward-amount">
    <div class="modal-container"> <button class="close" id="close-rewardmodal-amount">&times;</button>
        <div class="modal-header">
            <h6 class="modal-title" id="exampleModalLabel"><span class="plus">+</span> Enter the point amount below you’d like to redeem in eGift Card Rewards.</h6>
        </div>
        <div class="modal-content">
            <div class="row">
                <div class="col-md-4 col-sm-4 col-xs-4"><img class="cd-logo-b" src="${extension_icon}" alt="${extension_name}"></div>
                <div class="col-md-8 col-sm-8 col-xs-8 modal-body-text">You Qualify for rewards earned from this purchase!</div>
            </div>
        </div>
        <div class="modal-footer">
            <div class="row row-grey">
                <div class="col-md-4 col-sm-4 col-xs-4"><input class="reward-amt" id="reward_amt" type="text" /></div>
                <div class="col-md-4 col-sm-4 col-xs-4"><span id="est_pts">100</span>Points = $<span id="est_usd">1</span>
                    <p class="pts-validation-msg" id="pts_validation_msg">
                    <p>
                </div>
                <div class="col-md-4 col-sm-4 col-xs-4"><a href="#" id="next-modal">Redeem Reward!</a></div>
            </div>
            <div class="row row-grey">
                <div class="col-md-2 col-sm-2 col-xs-2"><img src="${chrome.extension.getURL(" assets/icons/cd-points.png")}" width="50" height="50" /></div>
                <div class="col-md-2 col-sm-2 col-xs-2" id="tpb"> 0</div>
                <div class="col-md-8 col-sm-8 col-xs-8" id="pts_msg">Total Points Balance</div>
            </div>
        </div>
    </div>
</div> `, shadowRoot.innerHTML += ` <div class="modal-wrap" id="modal-reward">
    <div class="modal-container"> <button class="close" id="close-rewardmodal">&times;</button>
        <div class="modal-header">
            <h6 class="modal-title" id="exampleModalLabel"><span class="plus">+</span>Thanks for Redeeming Rewards with us! Now for the fun part!</h6>
        </div>
        <div class="modal-content">
            <div class="row row-grey">
                <div class="col-md-2 col-sm-2 col-xs-2"><img src="${chrome.extension.getURL(" assets/icons/cd-points.png")}" width="50" height="50" /></div>
                <div class="col-md-2 col-sm-2 col-xs-2" id="pb"> 0</div>
                <div class="col-md-8" id="pts_msg">Total Points Balance</div>
            </div>
        </div>
        <div class="modal-footer">
            <div class="row">
                <div class="col-md-12 col-sm-12 col-xs-12">
                    <div class="col-md-6 col-sm-6 col-xs-6" style="text-align:right;"><a href="https://commercedirect.io/rewards" target="_blank">Click to Browse</a></div>
                    <div class="col-md-6 col-sm-6 col-xs-6" style="text-align:left;"><a id="redeem_link">Click to Redeem</a></div>
                    <div class="col-md-12 col-sm-12 col-xs-12">
                        <div class="card-container">
                            <ul class="cards" id="cards"> </ul>
                            <p style="color:#ed2027;text-align:justify;">Note that once click to redeem is selected, that amount must be redeemed during that session as the selected point amount will be automatically deducted from your balance. You can select click to browse if you’d like view your eGift Card Reward options first.**Please note that any returned items will not be eligible for redeemable points from purchases as they will be clawed back. Failure to comply may result in account suspension, removal and/or other legal action. Please reach out to info@commercedirect.io for other inquiries on our policies.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
    `, shadowRoot.getElementById("reward_amt").addEventListener("keyup", function() {
		shadowRoot.getElementById("est_usd").innerText = this.value / 100, shadowRoot.getElementById("est_pts").innerText = this.value
	}), chrome.storage.local.get("userid", function(e) {
		void 0 !== e.userid && (user_id = e.userid, shadowRoot.getElementById("user").innerText = user_id, shadowRoot.getElementById("user1").innerText = user_id, shadowRoot.getElementById("user2").innerText = user_id)
	}), chrome.runtime.sendMessage({
		contentScriptQuery: "fetchUrl",
		url: cdirect_api_endpoint + "cartprice/v2/pricehook?cartid=" + encodeURIComponent(cartid),
		method: "GET"
	}, function(e) {
		"Y" == (e = JSON.parse(e)).body.qualified && chrome.storage.local.get("cart_data", function(e) {
			var o = JSON.parse(e.cart_data),
				t = parseFloat(o.points).toFixed(2);
			shadowRoot.getElementById("dp").innerText = t, shadowRoot.getElementById("pts").innerText = t
		})
	}), chrome.storage.local.get(["userid", "opix_data"], function(e) {
		if (void 0 !== e.userid) {
			user_id = e.userid;
			var o = JSON.parse(e.opix_data);
			uid = o.uid, vid = o.vid, chrome.runtime.sendMessage({
				contentScriptQuery: "fetchUrl",
				url: cdirect_api_endpoint + "userpts?userid=" + encodeURIComponent(user_id) + "&uid=" + encodeURIComponent(uid) + "&vid=" + encodeURIComponent(vid),
				method: "GET"
			}, function(e) {
				"Y" == (e = JSON.parse(e)).body.qualified ? shadowRoot.getElementById("sp").innerText = parseFloat(e.body.discount).toFixed(2) : shadowRoot.getElementById("sp").innerText = 0, shadowRoot.getElementById("pts_msg").innerText = e.body.message
			})
		}
	}), appendStyleInline(shadowRoot);
	const e = shadowRoot.getElementById("draggable");
	null != e && dragElement(e), shadowRoot.getElementById("close").addEventListener("click", function() {
		e.style.display = "none"
	});
	var o = shadowRoot.getElementById("open-modal"),
		t = shadowRoot.getElementById("modal-main"),
		d = shadowRoot.getElementById("close-modal");
	o.addEventListener("click", function() {
		t.classList.toggle("visible"), chrome.storage.local.get(["userid", "opix_data"], function(e) {
			if (void 0 !== e.userid) {
				user_id = "to Commerce Direct";
				var o = JSON.parse(e.opix_data);
				uid = o.uid, vid = o.vid, chrome.runtime.sendMessage({
					contentScriptQuery: "fetchUrl",
					url: cdirect_api_endpoint + "userpts?userid=" + encodeURIComponent(user_id) + "&uid=" + encodeURIComponent(uid) + "&vid=" + encodeURIComponent(vid),
					method: "GET"
				}, function(e) {
					if ("Y" == (e = JSON.parse(e)).body.qualified) {
						shadowRoot.getElementById("sp").innerText = parseFloat(e.body.discount).toFixed(2), shadowRoot.getElementById("tpb").innerText = parseFloat(e.body.discount).toFixed(2), shadowRoot.getElementById("pb").innerText = parseFloat(e.body.discount).toFixed(2), shadowRoot.getElementById("reward").innerHTML = '<a href="#" id="rewardlink">Redeem Rewards!</a>';
						var o = shadowRoot.getElementById("rewardlink"),
							t = shadowRoot.getElementById("modal-reward-amount"),
							d = shadowRoot.getElementById("close-rewardmodal-amount");
						o.addEventListener("click", function() {
							t.classList.toggle("visible")
						}), d.addEventListener("click", function() {
							t.classList.remove("visible")
						})
					} else shadowRoot.getElementById("sp").innerText = 0, shadowRoot.getElementById("pts_msg").innerText = e.body.message
				})
			}
		})
	}), d.addEventListener("click", function() {
		t.classList.remove("visible")
	});
	var s = shadowRoot.getElementById("next-modal"),
		n = shadowRoot.getElementById("modal-reward");
	s.addEventListener("click", function() {
		var e = parseFloat(shadowRoot.getElementById("reward_amt").value).toFixed(2);
		chrome.runtime.sendMessage({
			contentScriptQuery: "fetchUrl",
			url: cdirect_api_endpoint + "userpts/ptsamt?userid=" + encodeURIComponent(user_id) + "&uid=" + encodeURIComponent(uid) + "&vid=" + encodeURIComponent(vid) + "&ptsamt=" + e,
			method: "GET"
		}, function(o) {
			"Y" == (o = JSON.parse(o)).body.qualified ? (chrome.storage.local.set({
				asked_amt: e
			}, function() {}), shadowRoot.getElementById("pts_validation_msg").innerText = "", chrome.runtime.sendMessage({
				contentScriptQuery: "apiTango",
				url: tangocard_api_endpoint + "catalogs",
				token: tangocard_token,
				method: "GET"
			}, function(o) {
				var t = JSON.parse(o),
					d = shadowRoot.getElementById("cards");
				t.brands.forEach(function(e, o) {
					e.brandName.match(/(Commerce Direct)/g) && ((s = document.createElement("li")).className = "card", s.setAttribute("utid", e.items[0].utid), vli.setAttribute("utid", e.items[0].utid), shadowRoot.getElementById("redeem_link").setAttribute("utid", e.items[0].utid), img = document.createElement("img"), img.src = e.imageUrls["130w-326ppi"], s.appendChild(img), d.appendChild(s))
				});
				var s = document.createElement("li");
				s.setAttribute("id", "vcard"), s.classList.add("card"), s.classList.add("virtual-card"), s.innerHTML = amt, d.appendChild(s), shadowRoot.getElementById("redeem_link").addEventListener("click", function(e) {
					e.preventDefault(), makeOrder(this.getAttribute("utid"))
				}), shadowRoot.getElementById("vcard").innerHTML = e + " Points"
			}), n.classList.toggle("visible")) : (shadowRoot.getElementById("pts_validation_msg").innerText = o.body.message, setTimeout(function() {
				shadowRoot.getElementById("pts_validation_msg").innerText = ""
			}, 5e3))
		})
	}), shadowRoot.getElementById("close-rewardmodal").addEventListener("click", function() {
		n.classList.remove("visible")
	})
}
chrome.storage.local.get("data", function(e) {
	var o = JSON.parse(e.data);
	1 == o.cd && (o.tracking_url.indexOf(window.location.hostname + "/") > -1 || o.tracking_url.replace(/^[^.]+\./g, "").indexOf(window.location.hostname) > -1 || o.tracking_url.replace(/^[^.]+\./g, "").indexOf(window.location.hostname.replace(/^[^.]+\./g, "")) > -1) && null == shadowRoot.getElementById("draggable_popup") && (loadDirectPriceShadowDOM(), chrome.storage.local.get(["cart_data", "userid", "opix_data"], function(e) {
		var o = JSON.parse(e.opix_data);
		uid = o.uid, vid = o.vid;
		var t = e.userid,
			d = JSON.parse(e.cart_data);
		(parseFloat(d.discount) * parseFloat(.75) * parseFloat(d.cart_total)).toFixed(2);
		shadowRoot.getElementById("dp").innerText = d.points, shadowRoot.getElementById("pts").innerText = d.points, chrome.runtime.sendMessage({
			contentScriptQuery: "fetchUrl",
			hearders: {
				"Content-Type": "application/json",
				Accept: "application/json"
			},
			url: cdirect_api_endpoint + "userpts/earned?ov=" + encodeURIComponent(d.cart_total) + "&pts=" + encodeURIComponent(d.points) + "&uid=" + encodeURIComponent(uid) + "&userid=" + encodeURIComponent(t) + "&vid=" + encodeURIComponent(vid),
			method: "PUT"
		}, function(e) {
			e = JSON.parse(e)
		})
	}))
});