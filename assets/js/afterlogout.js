$(document).ready(function() {
	chrome.storage.local.set({
		authenticated: !1
	}, function() {
		console.log("session out!")
	})
});