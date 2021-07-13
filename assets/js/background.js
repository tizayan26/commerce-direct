chrome.tabs.onUpdated.addListener(function(e, t, o) {
	var a = o.url;
	void 0 !== a && (pattern = /(cart|bag|trolly|trolley|carriage|basket|weagon|order|mod|87|cgi-bin)|shoppingBag/g, void 0 !== a && (result = a.match(pattern), (a.match(/(google.com)/g) || a.match(/(rewardlink.io)/g)) && (chrome.storage.local.set({
		data: JSON.stringify({
			cd: 0
		})
	}, function() {
		console.log("data stored")
	}), chrome.storage.local.set({
		claimed: !1,
		redeemed: !1
	}, function() {
		console.log("reward cleared!")
	}), chrome.storage.local.set({
		cart_data: null
	}, function() {
		console.log("Cart Data has been clear")
	}))));
	chrome.storage.local.get("authenticated", function(e) {
		chrome.browserAction.setIcon({
			path: 1 == e.authenticated ? "assets/icons/cd-icon-128.png" : "assets/icons/cd-icon-128-disable.png"
		})
	})
}), chrome.runtime.onMessage.addListener(function(e, t, o) {
	switch (e.contentScriptQuery) {
		case "fetchUrl":
			return fetch(e.url, {
				method: e.method,
				headers: void 0 === e.headers ? e.headers : null,
				body: void 0 === e.data ? e.data : null
			}).then(e => e.text()).then(e => o(e)).catch(e => console.log(e)), !0;
		case "apiTango":
			return fetch(e.url, {
				method: e.method,
				body: void 0 === e.data ? e.data : null,
				headers: {
					Accept: "application/json",
					Authorization: `Basic ${e.token}`,
					"Access-Control-Allow-Origin": "*",
					"Access-Control-Allow-Headers": "Content-Type",
					"Content-Type": "application/json"
				}
			}).then(e => e.text()).then(e => o(e)).catch(e => console.log(e)), !0
	}
	switch (e.message) {
		case "openURL":
			return chrome.tabs.create({
				url: e.url,
				active: !0,
				windowId: t.tab.windowId
			}), !0
	}
}), chrome.browserAction.onClicked.addListener(function(e) {
	chrome.storage.local.get("authenticated", function(t) {
		1 == t.authenticated ? (console.log("open popup"), chrome.tabs.sendMessage(e.id, "toggle")) : (console.log("open signin"), chrome.tabs.update(e.id, {
			url: "https://login.commercedirect.io/"
		}))
	})
}), chrome.tabs.onUpdated.addListener(function(e, t, o) {
	"complete" == t.status && chrome.tabs.sendMessage(o.id, "scrape")
});