var user_id, shadowWrapper = document.createElement("div");
shadowWrapper.id = "shadow-wrapper", document.body.appendChild(shadowWrapper);
var host = document.getElementById("shadow-wrapper"),
	shadowRoot = host.attachShadow({
		mode: "open"
	});

function firstMsg(e) {
	shadowRoot.innerHTML = `
    <div id="draggable_intro" class="cd-login">
    <div class="header"> <span class="plus">+</span> Welcome ${e}! Be on the lookout for plugin notifications while you are shopping on Google Search & Shopping tabs. Click through the plugin link to shop with the relevant featured brand to earn points and redeem instant eGift cards on your purchases. Learn more about how to earn and redeem here: <a href="https://www.commercedirect.io">commercedirect.io</a></div>
    <div class="body" style="border-bottom:1px solid #ccc;padding:5px;"><img class="cd-logo1" src="${extension_icon}" alt="${extension_name}"><span style="position: absolute;top: 177px;left: 35%;"> <span id="pts">0</span> Current point balance</span></div>
    <div class="footer"></div>
    <div class="login-close" id="intro-close">&times;</div>
</div>
    `, uid = getCookie("__opixsee_uid"), vid = getCookie("__opixsee_vid"), chrome.runtime.sendMessage({
		contentScriptQuery: "fetchUrl",
		url: cdirect_api_endpoint + "userpts?userid=" + encodeURIComponent(e) + "&uid=" + encodeURIComponent(uid) + "&vid=" + encodeURIComponent(vid),
		method: "GET"
	}, function(e) {
		"Y" == (e = JSON.parse(e)).body.qualified && (shadowRoot.getElementById("pts").innerText = 100 * parseFloat(e.body.discount))
	})
}

function loadLoginShadowDOM() {
	shadowRoot.innerHTML = '<div class="cd-login" id="draggable_login"><div class="body"><img class="cd-logo" src="' + extension_icon + '" alt="' + extension_name + '"><a class="init-link" href="https://login.commercedirect.io/">Click here to login</a></div><div class="login-close" id="login_close">&times;</div></div>';
	const e = shadowRoot.getElementById("draggable_login");
	null != e && dragElement(e);
	shadowRoot.getElementById("user_name"), shadowRoot.getElementById("msg");
	shadowRoot.getElementById("login_close").addEventListener("click", function() {
		e.style.display = "none"
	})
}

function loadDirectPriceShadowDOM(e) {
	shadowRoot.innerHTML += '<div class="cd-content" id="draggable_popup"><img class="cd-logo" src="' + extension_icon + '" alt="' + extension_name + '">You Qualify for Rewards! Click <a href="' + e.tracking_url + '" id="setCD">' + e.domain.replace(/(^\w+:|^)\/\//, "") + '</a> and Shop Direct to Earn and Redeem!<div class="close" id="close">&times;</div></div>';
	const o = shadowRoot.getElementById("draggable_popup");
	null != o && dragElement(o), shadowRoot.getElementById("close").addEventListener("click", function() {
		o.style.display = "none"
	}), shadowRoot.getElementById("setCD").addEventListener("click", function() {
		StoreDataInStorage({
			cd: 1,
			sale_commission: e.Min_Percent_Sale_Commission,
			tracking_url: e.domain.replace(/(^\w+:|^)\/\//, "")
		}), location.href = e.tracking_url
	})
}

function appendStyleInline(e) {
	style = document.createElement("style"), style.innerHTML = `
* {
	font-family: arial, sans-serif;
	font-size: 12px;
}

.cd-content {
	position: absolute;
	top: 15px;
	z-index: 9999;
	background: #fff;
	width: 180px;
	left: 861px;
	border-radius: 30px;
	border: 3px solid #ed2027;
	padding: 20px;
}

.cd-content>a {
	overflow-wrap: break-word !important;
	word-break: break-word !important
}

.cd-logo {
	margin: -24px -24px 0 0;
	float: right;
	width: 50px;
	height: 50px
}

.login-close,
.close {
	line-height: 20px;
	box-shadow: 1px 1px 6px #ccc;
	border-radius: 50% !important;
	padding: 0 !important;
	background-color: #b9b9b9 !important;
	width: 20px;
	height: 20px;
	font-size: 14px;
	text-align: center;
	position: absolute;
	top: -12px;
	left: 138px;
	cursor: pointer
}

.login-close:hover,
.close:hover {
	background-color: transparent;
	border-color: #a8a8a8
}

.close {
	left: 213px
}

.login-close {
	left: 288px
}

.cd-login {
	position: absolute;
	top: 50%;
	left: 50%;
	z-index: 9999;
	background: #fff;
	width: 300px;
	border-radius: 30px;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)
}

.cd-login>.header,
.cd-login>.body {
	padding: 20px
}

.cd-login>.header {
	border-bottom: 1px solid #ccc;
	cursor: move
}

.cd-login>.footer {
	padding: 5px 20px 10px 20px;
	height: 12px;
	font-size: 12px
}

.cd-login span.plus {
	background: #ababab;
	border-radius: 50%;
	padding: 0 4px;
	font-weight: bold
}

.cd-login img.cd-logo {
	margin: 0;
	float: unset;
	width: 50px;
	height: 50px
}

.cd-login input[type=text] {
	width: 175px;
	margin-top: 4px;
	border-radius: 30px !important;
	border: 3px solid #ed2027 !important;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
	padding: 10px
}

@media only screen and (min-device-width: 375px) and (max-device-width: 812px) and (-webkit-min-device-pixel-ratio: 3) {
	.cd-content {
		left: 0
	}
}

@media only screen and (min-device-width: 375px) and (max-device-width: 812px) and (-webkit-min-device-pixel-ratio: 3) and (orientation: portrait) {}

@media only screen and (min-device-width: 375px) and (max-device-width: 812px) and (-webkit-min-device-pixel-ratio: 3) and (orientation: landscape) {}

img.cd-logo1 {
	margin: 0 0 0 10px;
	width: 50px;
	height: 50px
}

.cd-login>.header a,
.cd-login>.body a {
	color: #337ab7;
	text-decoration: none;
	font-weight: bold;
}

.cd-login>.header a:hover,
.cd-login>.body a:hover {
	color: #EA242A;
	text-decoration: underline;
}

.cd-login>.header a.init-link,
.cd-login>.body a.init-link {
	position: absolute;
	top: 40px;
	right: 20px;
}
    `, e.appendChild(style)
}

function appendStyleHref(e, o) {
	const i = document.createElement("link");
	i.setAttribute("rel", "stylesheet"), i.setAttribute("href", o), e.appendChild(i)
}
window.onload = function() {
	appendStyleInline(shadowRoot), chrome.storage.local.get(["fmsg", "authenticated"], function(e) {
		1 == e.fmsg && 1 == e.authenticated && (dragElement(shadowRoot.getElementById("draggable_intro")), shadowRoot.getElementById("intro-close").addEventListener("click", function() {
			shadowRoot.getElementById("draggable_intro").style.display = "none", chrome.storage.local.set({
				fmsg: !1
			}, function() {
				console.log("first msg")
			})
		}))
	})
}, $(document).ready(function() {
	dl = window.location.href, rl = void 0, init(dl, rl), uid = getCookie("__opixsee_uid"), vid = getCookie("__opixsee_vid"), chrome.storage.local.get(["userid", "authenticated"], function(e) {
		void 0 !== e.userid && 1 == e.authenticated && function(e, o, i) {
			chrome.runtime.sendMessage({
				contentScriptQuery: "fetchUrl",
				url: cdirect_api_endpoint + "cartprice/v2/pricepredict2?uid=" + encodeURIComponent(e) + "&vid=" + encodeURIComponent(o) + "&userid=" + i,
				method: "GET"
			}, function(e) {
				var o = (e = JSON.parse(e)).map(function(e) {
					return e.domain
				});
				console.log(o);
				var i = 0;
				"" == $('a[rel="noopener"]').text() ? "" != $("span.a").text() ? ($(".uEierd").filter(function(n, t) {
					if ("Ad·" == $(t).children("div").children("div").children("div").children("a").find(".p8AiDd").text()) {
						var d = $(t).children("div").children("div").children("div").children("a").find(".p8AiDd").siblings().first().text();
						if (d = d.trim().replace(" ", "").toLowerCase(), d = getHostName(d)) return $.each(o, function(n, t) {
							if (void 0 === t && "" === t && "undefined" === t && null === t || void 0 !== t && (t = getHostName(t)), void 0 !== o[n]) return t.indexOf(d) > -1 && (console.log("option1", d + ":" + t + ":" + t.indexOf(d)), console.log("option1: ", n, "url", o[n]), i = 1, null == shadowRoot.getElementById("draggable_popup") && loadDirectPriceShadowDOM(e[n]), !1)
						}), !1
					} else if ("Ad·" == $(t).children("div").children("div").children("div").children("a").find(".p8AiDd").text()) {
						var d = $(t).children("div").children("div").children("div").children("a").find(".p8AiDd").siblings().first().text();
						if (d = d.trim().replace(" ", "").toLowerCase(), d = getHostName(d)) return $.each(o, function(n, t) {
							if (void 0 === t && "" === t && "undefined" === t && null === t || void 0 !== t && (t = getHostName(t)), void 0 !== o[n]) return t.indexOf(d) > -1 && (console.log("option2", d + ":" + t + ":" + t.indexOf(d)), console.log("option2: ", n, "url", o[n]), i = 1, null == shadowRoot.getElementById("draggable_popup") && loadDirectPriceShadowDOM(e[n]), !1)
						}), !1
					}
				}), 0 == i && $("span.a").filter(function(i, n) {
					var t = $(n).text().trim().replace(" ", "").replace("'", "").toLowerCase();
					if (t && i < 20) return $.each(o, function(i, n) {
						if ((void 0 !== n || "" !== n || "undefined" !== n || null !== n) && void 0 !== n && void 0 !== o[i] && n.indexOf(t) > -1 && (console.log("option 3", t + ":" + n + ":" + n.indexOf(t)), console.log("option3: ", i, "url", o[i]), null == shadowRoot.getElementById("draggable_popup"))) return loadDirectPriceShadowDOM(e[i]), !1
					}), !1
				})) : ($(".pla-unit").filter(function(n, t) {
					var d = $(t).find(".pla-unit-container").children().eq(2).children().children().eq(2).text().trim().replace("'", "");
					$.each(o, function(n, t) {
						if (void 0 !== t && (t = getHostName(t)), null != t && (t = t.split("."), void 0 !== o[n] && t.indexOf(d) > -1)) return console.log("option 4", d + ":" + t + ":" + t.indexOf(d)), console.log("option4: ", n, "url", o[n]), null == shadowRoot.getElementById("draggable_popup") && (i = 1, loadDirectPriceShadowDOM(e[n]), !1)
					})
				}), 0 == i && $(".uEierd").filter(function(n, t) {
					if ("Ad·" == $(t).children("div").children("div").children("div").children("a").find(".p8AiDd").text()) {
						var d = $(t).children("div").children("div").children("div").children("a").find(".p8AiDd").siblings().first().text();
						if (null != d) {
							var l = (d = d.trim().replace(" ", "").toLowerCase()).split(".");
							if (l.length <= 3 || l.length > 3)
								if ("com" == l[1] || "net" == l[1] || "co" == l[1] || "us" == l[1] || "uk" == l[1] || "gov" == l[1] || "uk" == l[1] || "de" == l[1] || "org" == l[1]) var r = l[0];
								else var r = l[1];
							if (l.length <= 2) var r = l[0]
						}
						if (r) return $.each(o, function(n, t) {
							if (console.log(t), void 0 !== t && (t = getHostName(t)), null != t && (t = t.split("."), void 0 !== o[n] && t.indexOf(r) > -1)) return console.log("option 5", r + ":" + t + ":" + t.indexOf(r)), console.log("option5: ", n, "url", o[n]), null == shadowRoot.getElementById("draggable_popup") && (i = 1, loadDirectPriceShadowDOM(e[n]), !1)
						}), !1
					}
				}), 0 == i && $(".g").filter(function(n, t) {
					if ("Ad·" == $(t).children("div").children("div").children("div").children("a").find(".p8AiDd").text()) {
						var d = $(t).find("a").attr("href");
						if (null != d) {
							var l = (d = getHostName(d.trim().replace(" ", "").toLowerCase())).split(".");
							if (console.log(l), l.length <= 3 || l.length > 3)
								if ("com" == l[1] || "net" == l[1] || "co" == l[1] || "us" == l[1] || "uk" == l[1] || "gov" == l[1] || "uk" == l[1] || "de" == l[1] || "org" == l[1]) var r = l[0];
								else var r = l[1];
							if (l.length <= 2) var r = l[0]
						}
						if (r) return $.each(o, function(n, t) {
							if (console.log(t), void 0 !== t && (t = getHostName(t)), null != t && (t = t.split("."), void 0 !== o[n] && t.indexOf(r) > -1)) return console.log("option 6", r + ":" + t + ":" + t.indexOf(r)), console.log("option6: ", n, "url", o[n]), null == shadowRoot.getElementById("draggable_popup") && (i = 1, loadDirectPriceShadowDOM(e[n]), !1)
						}), !1
					}
				})) : $('a[rel="noopener"]').filter(function(i, n) {
					var t = $(n).children("div").eq(2).children("div").children("div").eq(2).text().replace(/["']/g, "").replace(" ", "").replace("'", "").trim().toLowerCase();
					if ("" === t || void 0 === t) var t = $(n).children("div").eq(3).children("div").children("div").eq(2).text().replace(/["']/g, "").replace(" ", "").replace("'", "").trim().toLowerCase();
					"" !== t && void 0 !== t || (t = $(n).text().replace(/["']/g, "").replace(" ", "").replace("'", "").trim().toLowerCase()), null !== t && $.each(o, function(i, d) {
						if ((void 0 !== d || "" !== d || "undefined" !== d || null !== d) && (d = (d = getHostName(d)).split(".")[0], void 0 !== o[i])) {
							var l = new RegExp(d, "g");
							if (null != t.match(l)) return console.log(n), console.log("option 7", t + ":" + d + ":" + d.indexOf(t)), console.log("option7: ", i, "url", o[i]), null == shadowRoot.getElementById("draggable_popup") ? (loadDirectPriceShadowDOM(e[i]), !1) : null != i && (console.log(t.match(l)), !1)
						}
					})
				})
			})
		}(uid, vid, user_id)
	})
});