const shadowWrapper = document.createElement("div");
shadowWrapper.id = "shadow-wrapper", script = document.createElement("script"), document.body.appendChild(shadowWrapper);
const host = document.getElementById("shadow-wrapper"),
	shadowRoot = host.attachShadow({
		mode: "closed"
	});

function loadDirectPriceShadowDOM() {
	shadowRoot.innerHTML += `
    <div class="cd-content focus" id="draggable"><img class="cd-logo" src="${extension_icon}" alt="${extension_name}"> <span id="open-modal" class="triger-modal" data-triger="modal-demo">Earn <span id="pts">0</span> Points when Purchased</span>
	<div class="close-sm" id="close">&times;</div>
</div>
<div class="modal-wrap" id="modal-main">
	<div class="modal-container"> <button class="close" id="close-modal">&times;</button>
		<div class="modal-header">
			<h6 class="modal-title" id="exampleModalLabel"><span class="plus">+</span> Welcome <span id="user">User</span>!<br>Thanks for earning eGift Card Rewards with us. Remember to be on the lookout for plugin notifications while you are shopping on Google Search & Shopping tabs. Learn more about how to earn and redeem here: <a href="https://www.commercedirect.io">commercedirect.io</a></h6>
		</div>
		<div class="modal-content">
			<div class="row">
				<div class="col-md-4 col-sm-4 col-xs-4"><img class="cd-logo-b" src="${extension_icon}" alt="${extension_name}"></div>
				<div class="col-md-8 col-sm-8 col-xs-8 modal-body-text" style="">You Qualify for rewards earned from this purchase!</div>
			</div>
		</div>
		<div class="modal-footer">
			<div class="row row-grey">
				<div class="col-md-2 col-sm-2 col-xs-2"><img src="${chrome.extension.getURL(" assets/icons/cd-tag.png")}" width="40" height="40" /></div>
				<div class="col-md-2 col-sm-2 col-xs-2" id="dp"> 0</div>
				<div class="col-md-8 col-sm-8 col-xs-8">Earn Points from this Purchase!</div>
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
				<div class="col-md-4 col-sm-4 col-xs-4"><span id="est_pts">100</span> Points = $<span id="est_usd">1</span>
					<p class="pts-validation-msg" id="pts_validation_msg">
					<p>
				</div>
				<div class="col-md-4 col-sm-4 col-xs-4"><a href="#" id="next-modal">Redeem Rewards!</a></div>
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
			<h6 class="modal-title" id="exampleModalLabel"><span class="plus">+</span> Thanks for Redeeming Rewards with us! Now for the fun part!</h6>
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
    `, chrome.storage.local.get("userid", function(t) {
		void 0 !== t.userid && (user_id = "to Commerce Direct", shadowRoot.getElementById("user").innerText = user_id, shadowRoot.getElementById("user1").innerText = user_id, shadowRoot.getElementById("user2").innerText = user_id)
	}), shadowRoot.getElementById("reward_amt").addEventListener("keyup", function() {
		shadowRoot.getElementById("est_usd").innerText = this.value / 100, shadowRoot.getElementById("est_pts").innerText = this.value
	}), chrome.storage.local.get(["userid", "redeemed", "asked_amt"], function(t) {
		if (void 0 !== t.userid) {
			user_id = t.userid, uid = getCookie("__opixsee_uid"), vid = getCookie("__opixsee_vid");
			var e = t.asked_amt;
			chrome.runtime.sendMessage({
				contentScriptQuery: "fetchUrl",
				url: cdirect_api_endpoint + "userpts?userid=" + encodeURIComponent(user_id) + "&uid=" + encodeURIComponent(uid) + "&vid=" + encodeURIComponent(vid),
				method: "GET"
			}, function(t) {
				if ("Y" == (t = JSON.parse(t)).body.qualified) {
					const r = t.body.discount;
					shadowRoot.getElementById("sp").innerText = parseFloat(r).toFixed(2), shadowRoot.getElementById("tpb").innerText = parseFloat(r).toFixed(2), shadowRoot.getElementById("pb").innerText = parseFloat(r).toFixed(2), shadowRoot.getElementById("reward").innerHTML = '<a href="#" id="rewardlink">Redeem Rewards!</a>', chrome.runtime.sendMessage({
						contentScriptQuery: "apiTango",
						url: tangocard_api_endpoint + "catalogs",
						token: tangocard_token,
						method: "GET"
					}, function(t) {
						var o = JSON.parse(t),
							i = shadowRoot.getElementById("cards"),
							a = document.createElement("li");
						o.brands.forEach(function(t, e) {
							t.brandName.match(/(Commerce Direct)/g) && (li = document.createElement("li"), li.className = "card", li.setAttribute("utid", t.items[0].utid), a.setAttribute("utid", t.items[0].utid), shadowRoot.getElementById("redeem_link").setAttribute("utid", t.items[0].utid), img = document.createElement("img"), img.src = t.imageUrls["130w-326ppi"], li.appendChild(img), i.appendChild(li))
						}), a.setAttribute("id", "vcard"), a.classList.add("card"), a.classList.add("virtual-card"), a.innerHTML = e, i.appendChild(a)
					});
					var o = shadowRoot.getElementById("rewardlink"),
						i = shadowRoot.getElementById("modal-reward-amount"),
						a = shadowRoot.getElementById("close-rewardmodal-amount"),
						n = shadowRoot.getElementById("modal-reward"),
						s = shadowRoot.getElementById("redeem_link");
					o.addEventListener("click", function() {
						i.classList.toggle("visible")
					}), a.addEventListener("click", function() {
						i.classList.remove("visible")
					});
					var d = shadowRoot.getElementById("next-modal"),
						c = shadowRoot.getElementById("close-rewardmodal");
					d.addEventListener("click", function() {
						var t = parseFloat(shadowRoot.getElementById("reward_amt").value).toFixed(2);
						shadowRoot.getElementById("vcard").innerHTML = t + " Points", chrome.runtime.sendMessage({
							contentScriptQuery: "fetchUrl",
							url: cdirect_api_endpoint + "userpts/ptsamt?userid=" + encodeURIComponent(user_id) + "&uid=" + encodeURIComponent(uid) + "&vid=" + encodeURIComponent(vid) + "&ptsamt=" + t,
							method: "GET"
						}, function(e) {
							"Y" == (e = JSON.parse(e)).body.qualified ? (chrome.storage.local.set({
								asked_amt: t
							}, function() {}), shadowRoot.getElementById("pts_validation_msg").innerText = "", n.classList.toggle("visible")) : (shadowRoot.getElementById("pts_validation_msg").innerText = e.body.message, setTimeout(function() {
								shadowRoot.getElementById("pts_validation_msg").innerText = ""
							}, 5e3))
						})
					}), c.addEventListener("click", function() {
						n.classList.remove("visible")
					}), s.addEventListener("click", function(t) {
						t.preventDefault(), makeOrder(this.getAttribute("utid"))
					})
				} else shadowRoot.getElementById("sp").innerText = 0;
				shadowRoot.getElementById("pts_msg").innerText = t.body.message
			})
		}
	}), appendStyleInline(shadowRoot);
	const t = shadowRoot.getElementById("draggable");
	null != t && dragElement(t), shadowRoot.getElementById("close").addEventListener("click", function() {
		t.style.display = "none"
	});
	var e = shadowRoot.getElementById("open-modal"),
		o = shadowRoot.getElementById("modal-main"),
		i = shadowRoot.getElementById("close-modal");
	e.addEventListener("click", function() {
		o.classList.toggle("visible")
	}), i.addEventListener("click", function() {
		o.classList.remove("visible")
	})
}

function setCartData() {
	var cartid = "12345gh";
	chrome.storage.local.get("userid", function(result) {
		if (void 0 !== result.userid) {
			var user_id = result.userid;
			chrome.runtime.sendMessage({
				contentScriptQuery: "fetchUrl",
				url: cdirect_api_endpoint + "cartprice/v2/orderamt?hostname=" + location.hostname + "&userid=" + user_id,
				method: "GET"
			}, function(result) {
				result = JSON.parse(result);
				var data_checkout_element = result[0].checkout_element,
					point = result[0].point_calc,
					conv = result[0].point_convert,
					checkout_total = window.subtotal - window.discount;
				if (void 0 === checkout_total) var checkout_total = eval(data_checkout_element);
				chrome.storage.local.get(["data", "cart_data"], function(t) {
					var e = JSON.parse(t.data),
						o = JSON.parse(t.cart_data),
						i = e.sale_commission,
						a = (parseFloat(i) * parseFloat(point) * parseFloat(checkout_total) * conv).toFixed(2);
					o = {
						discount: i,
						cart_total: isNaN(checkout_total) ? 0 : checkout_total,
						points: a
					}, chrome.storage.local.set({
						cart_data: JSON.stringify(o)
					}, function() {}), shadowRoot.getElementById("dp").innerText = a, shadowRoot.getElementById("pts").innerText = a
				})
			})
		}
	})
}
if (chrome.storage.local.get("data", function(t) {
		var e = JSON.parse(t.data);
		if (1 == e.cd && (e.tracking_url.indexOf(window.location.hostname + "/") > -1 || e.tracking_url.replace(/^[^.]+\./g, "").indexOf(window.location.hostname) > -1 || e.tracking_url.replace(/^[^.]+\./g, "").indexOf(window.location.hostname.replace(/^[^.]+\./g, "")) > -1)) {
			null == shadowRoot.getElementById("draggable_popup") && loadDirectPriceShadowDOM(), dl = window.location.href, rl = "https://www.google.com/", init(dl, rl), uid = getCookie("__opixsee_uid"), vid = getCookie("__opixsee_vid");
			var o = {
				uid: uid,
				vid: vid
			};
			chrome.storage.local.set({
				opix_data: JSON.stringify(o)
			}, function() {})
		}
	}), window.Subtotal_price = "", window.subtotal = 0, window.Discount_price = "", window.discount = 0, window.watch_activated = !0, window.trimChar = function(t, e) {
		for (; t.charAt(0) == e;) t = t.substring(1);
		for (; t.charAt(t.length - 1) == e;) t = t.substring(0, t.length - 1);
		return t
	}, window.clear_text = function(t) {
		return t.replace(/[^0-9\.]+/g, "")
	}, window.subtotal_updater = function(t) {
		jQuery('div:contains("Sub Total")').find('*:contains("Sub Total"):visible').each(function(t, e) {
			jQuery(e).contents().filter(function() {
				return 3 == this.nodeType
			}).first().text().toLowerCase().includes("Sub Total".toLowerCase()) && jQuery(e).text("subtotal")
		}), jQuery('div:contains("' + t + '")').find('*:contains("' + t + '"):visible').each(function(e, o) {
			if (jQuery(o).contents().filter(function() {
					return 3 == this.nodeType
				}).first().text().toLowerCase().includes(t.toLowerCase())) {
				var i = jQuery(o).closest('*:contains("$")').first();
				if (i.length) {
					var a = i.find('*:contains("$")');
					if (a.length) var n = a.first().text().trim();
					else n = i.text().trim();
					(n = trimChar(n, "$")).includes("$") ? Subtotal_price = n.slice(0, n.indexOf("$")) : Subtotal_price = n, Subtotal_price = jQuery.trim(Subtotal_price)
				}
				"" != Subtotal_price && (Subtotal_price = Subtotal_price.replace("USD", "")), Subtotal_price = jQuery.trim(Subtotal_price);
				return /[a-zA-Z]/g.test(Subtotal_price) || "" == Subtotal_price || (window.subtotal = Subtotal_price.replace(/[^0-9\.]+/g, "")), !1
			}
		})
	}, window.discount_updater = function(t) {
		jQuery('div:contains("' + t + '")').find('*:contains("' + t + '"):visible').each(function(e, o) {
			if (jQuery(o).contents().filter(function() {
					return 3 == this.nodeType
				}).first().text().toLowerCase().includes(t.toLowerCase())) {
				var i = jQuery(o).next('*:contains("$")').first();
				if (i.length) {
					var a = i.find('*:contains("$")');
					if (a.length) var n = a.first().text().trim();
					else n = i.text().trim();
					n = jQuery.trim(n), n = trimChar(n, "-"), n = jQuery.trim(n), n = trimChar(n, "$"), n = jQuery.trim(n), n = trimChar(n, "-"), n = jQuery.trim(n), n = trimChar(n, "$"), n = jQuery.trim(n), (n = trimChar(n, "-")).includes("$") ? Discount_price = n.slice(0, n.indexOf("$")) : Discount_price = n, Discount_price = jQuery.trim(Discount_price)
				}
				"" != Discount_price && (Discount_price = Discount_price.replace("USD", "")), Discount_price = jQuery.trim(Discount_price);
				/[a-zA-Z]/g.test(Discount_price) || "" == Discount_price || (window.discount = Discount_price.replace(/[^0-9\.]+/g, ""))
			}
		})
	}, "undefined" == typeof jQuery) {
	var jq = document.createElement("script");
	jq.src = "https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js?fdfg=sd", document.getElementsByTagName("head")[0].appendChild(jq)
}
var jqryinvl = setInterval(function() {
	var t;
	"undefined" != typeof jQuery && (clearInterval(jqryinvl), jQuery.expr[":"].contains = function(t, e, o) {
		return jQuery(t).text().toUpperCase().indexOf(o[3].toUpperCase()) >= 0
	}, t = XMLHttpRequest.prototype.open, XMLHttpRequest.prototype.open = function() {
		this.addEventListener("load", function() {
			window.watch_activated = !0
		}), t.apply(this, arguments)
	}, setInterval(function() {
		if (window.watch_activated) {
			var t = window.subtotal;
			window.subtotal_updater("subtotal"), t == window.subtotal && window.subtotal_updater("total before tax");
			var e = window.discount;
			if (window.discount_updater("discount"), e == window.discount && window.discount_updater("savings"), window.watch_activated = !1, window.location.href.indexOf("onyxandrose") > -1) {
				var o = jQuery("h4:contains(Basket)").next().text();
				window.subtotal = clear_text(o)
			}
			if (window.location.href.indexOf("onyxandrose") > -1) {
				o = jQuery("h4:contains(Basket)").next().text();
				window.subtotal = clear_text(o)
			}
			if (window.location.href.indexOf("society6.com") > -1) {
				o = jQuery('[id="cart-total-grand"]').text();
				window.subtotal = clear_text(o)
			}
			if (window.location.href.indexOf("whirlpool.com") > -1) {
				o = jQuery('[class="order-summary-cost row--value"]:first strong').text();
				window.subtotal = clear_text(o)
			}
			if (window.location.href.indexOf("verizon.com") > -1) {
				o = jQuery('[class="Col Col--sm4 Col--xs4 Col--md4 Col--lg4 bold u-textRight font-14"]').text();
				window.subtotal = clear_text(o)
			}
			if (window.location.href.indexOf("whirlpool.com") > -1) {
				o = jQuery('[class="order-summary-cost row--value"] strong').text();
				window.subtotal = clear_text(o)
			}
			if (window.location.href.indexOf("acehardware.com/checkout") > -1) {
				o = jQuery('[class="order-summary-total-value col-xs-4 summary-val"]').text();
				window.subtotal = clear_text(o)
			}
			if (window.location.href.indexOf("acehardware.com/cart") > -1) {
				o = jQuery('[class="col-xs-2 col-md-3 col-lg-3 custom-right font-Roboto"]').text();
				window.subtotal = clear_text(o)
			}
			if (window.location.href.indexOf("belkin.com/us/cart/") > -1) {
				o = jQuery(".item-total.js-item-total.hidden-xs.hidden-sm-remove").text();
				window.subtotal = clear_text(o), window.discount = 0
			}
			if (window.location.href.indexOf("bulbhead.com/cart") > -1) {
				o = jQuery(".cart-subtotal__price .wh-original-price").text();
				window.subtotal = clear_text(o)
			}
			if (window.location.href.indexOf("toolnut.com/checkout/cart/") > -1) {
				o = jQuery(".price-excluding-tax .cart-price .price:first").text();
				window.subtotal = clear_text(o)
			}
			if (window.location.href.indexOf("dvf.com/cart") > -1) {
				o = jQuery('[data-flow-localize="cart-subtotal"]').text();
				window.subtotal = clear_text(o)
			}
			if (window.location.href.indexOf("driftaway.coffee/cart/") > -1) {
				o = jQuery('[class="woocommerce-Price-amount amount"]:first').text();
				window.subtotal = clear_text(o)
			}
			if (window.location.href.indexOf("driftaway.coffee/cart/") > -1) {
				o = jQuery('[class="woocommerce-Price-amount amount"]:first').text();
				window.subtotal = clear_text(o)
			}
			if (window.location.href.indexOf("genexa.com") > -1 && jQuery('[class="df fdr jcb fw--800 mb1"] div:last').length) {
				o = jQuery('[class="df fdr jcb fw--800 mb1"] div:last').text();
				window.subtotal = clear_text(o)
			}
			if (window.location.href.indexOf("grandslamnewyork.com/checkout") > -1) {
				o = jQuery('[data-test="cart-price-value"]:first').text();
				window.subtotal = clear_text(o)
			}
			if (window.location.href.indexOf("greatbigcanvas.com") > -1) {
				o = jQuery('[class="sale"]:last').text();
				window.subtotal = clear_text(o)
			}
			if (window.location.href.indexOf("us.havaianas.com/cart/") > -1) {
				o = jQuery('[class="text-right grand-total"]').text();
				window.subtotal = clear_text(o)
			}
			if (window.location.href.indexOf("ifchic.com/en/checkout") > -1) {
				o = jQuery('[class="card_Total-module_2ycDq"] p span:last').text();
				window.subtotal = clear_text(o)
			}
			if (window.location.href.indexOf("jimmyjane.com/cart") > -1) {
				o = jQuery('[id="revy-cart-subtotal-price"]').text();
				window.subtotal = clear_text(o)
			}
			if (window.location.href.indexOf("lehmans.com/viewcart") > -1) {
				o = jQuery('[class="total col-sm-4 col-lg-2 text-right"] strong').text();
				window.subtotal = clear_text(o)
			}
			if (window.location.href.indexOf("mltd.com/cart") > -1) {
				o = jQuery('[class="total-box total-list"] strong').text();
				window.subtotal = clear_text(o)
			}
			setCartData()
		}
	}, 3e3))
}, 200);