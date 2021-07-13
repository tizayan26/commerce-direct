$(document).ready(function() {
	var e = $.urlParam("user_id").substring(0, 29);
	chrome.runtime.sendMessage({
		contentScriptQuery: "fetchUrl",
		url: `${cdirect_api_endpoint}username?userid=${e}`,
		method: "GET"
	}, function(t) {
		var o = (t = JSON.parse(t)).body;
		"Y" == o.qualified ? chrome.storage.local.set({
			userid: e,
			fmsg: !0
		}, function() {
			console.log("user id stored"), chrome.runtime.sendMessage({
				contentScriptQuery: "fetchUrl",
				url: `https://pixel.commerce.direct/?access_token=${$.urlParam("access_token")}`,
				method: "GET"
			}, function(e) {
				e && chrome.storage.local.set({
					authenticated: !0
				}, function() {
					console.log("authentication completed!"), window.location.replace("https://commercedirect.io/userlogin-success")
				})
			})
		}) : console.log(o.message)
	})
});