const content_css = chrome.extension.getURL("assets/css/content.css"),
	extension_name = chrome.runtime.getManifest().name,
	extension_icon = chrome.extension.getURL("assets/icons/cd-icon-128.png"),
	cartid = "12345gh";
window.setCartData;
var flag = !1;

function log(i) {
	console.log(i)
}

function getResponse(i) {
	log(i)
}

function getScreenResolution() {
	return window.screen.width * window.devicePixelRatio + "x" + window.screen.height * window.devicePixelRatio
}

function getCookie(i) {
	for (var t = i + "=", o = decodeURIComponent(document.cookie).split(";"), l = 0; l < o.length; l++) {
		for (var e = o[l];
			" " == e.charAt(0);) e = e.substring(1);
		if (0 == e.indexOf(t)) return e.substring(t.length, e.length)
	}
	return ""
}

function StoreDataInStorage(i) {
	chrome.storage.local.set({
		data: JSON.stringify(i)
	}, function() {})
}

function dragElement(i) {
	var t = 0,
		o = 0,
		l = 0,
		e = 0;

	function n(i) {
		(i = i || window.event).preventDefault(), l = i.clientX, e = i.clientY, document.onmouseup = r, document.onmousemove = a
	}

	function a(n) {
		(n = n || window.event).preventDefault(), t = l - n.clientX, o = e - n.clientY, l = n.clientX, e = n.clientY, i.style.top = i.offsetTop - o + "px", i.style.left = i.offsetLeft - t + "px"
	}

	function r() {
		document.onmouseup = null, document.onmousemove = null
	}
	document.getElementById(i.id + "header") ? document.getElementById(i.id + "header").onmousedown = n : i.onmousedown = n
}

function makeid(i) {
	for (var t = "", o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", l = o.length, e = 0; e < i; e++) t += o.charAt(Math.floor(Math.random() * l));
	return t
}
$.urlParam = function(i) {
	var t = new RegExp("[?&#]" + i + "=([^&#]*)").exec(window.location.href);
	return t ? t[1] || 0 : void 0
};
const cdirect_api_endpoint = "https://api.commerce.direct/";
var options = {
	name: "commercedirect-153",
	key: "@uGDgjlkK!SWqarJaMDoCytePRi?NJ@kcGfCA&&FUrblz"
};
const tangocard_token = btoa(options.name + ":" + options.key),
	tangocard_api_endpoint = "https://api.tangocard.com/raas/v2/",
	accountIdentifier = "A83928768",
	customerIdentifier = "G70591615";

function appendStyleInline(i) {
	style = document.createElement("style"), 
    style.innerHTML = `* {
        font-family: arial, sans-serif;
        font-size: 14px;
        color: #212121
    }
    
    .cd-content {
        position: absolute;
        top: 42px;
        z-index: 99999;
        background: #fff;
        width: 150px;
        right: 10px;
        border-radius: 30px;
        border: 3px solid #ed2027;
        padding: 10px 20px;
        cursor: pointer;
        word-wrap: break-word;
        line-height: 1.5
    }
    
    .cd-logo {
        margin: -14px -24px 0 0;
        float: right;
        width: 50px;
        height: 50px
    }
    
    .cd-logo-b {
        float: left;
        width: 80px;
        height: 80px
    }
    
    .modal-container {
        border-radius: 30px !important;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
         !important;
        font-weight: 600
    }
    
    .blurbg {
        -webkit-filter: blur(5px)
    }
    
    .modal-open {}
    
    .cd-modal {
        display: block
    }
    
    .modal {
        z-index: 9999 !important
    }
    
    .modal-dialog {
        margin: 1.75rem auto !important
    }
    
    .dot-red {
        height: 25px;
        width: 25px;
        background-color: #ed2027;
        border-radius: 50%;
        display: inline-block;
        border: 2px solid #cecece
    }
    
    .dot-grey {
        height: 25px;
        width: 25px;
        border-radius: 50%;
        display: inline-block;
        border: 2px solid #ed2027
    }
    
    .modal-footer {
        display: block !important
    }
    
    .close {
        box-shadow: 1px 1px 6px #ccc;
        border-radius: 50% !important;
        padding: 0 !important;
        background-color: #b9b9b9 !important;
        height: 30px;
        width: 30px;
        margin: -20px
    }
    
    .row {
        margin-right: 0 !important;
        margin-left: 0 !important
    }
    
    .close-sm {
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
    
    .close-sm:hover {
        background-color: transparent;
        border-color: #a8a8a8
    }
    
    .modal-body-text {
        padding: 14px 0 0 0;
    }
    
    @media only screen and (min-device-width: 375px) and (max-device-width: 812px) and (-webkit-min-device-pixel-ratio: 3) {
        .modal-container {
            width: 90% !important;
            font-size: 12px
        }
    
        .modal-body-text {
            padding-left: 0;
            line-height: 38px
        }
    
        .cd-logo-b {
            float: left;
            width: 40px;
            height: 40px
        }
    
        .dot-red {
            height: 20px;
            width: 20px
        }
    
        .dot-grey {
            height: 20px;
            width: 20px
        }
    
        .modal-title {
            font-size: 14px;
            line-height: 0.9;
            text-align: justify
        }
    }
    
    @media only screen and (min-device-width: 375px) and (max-device-width: 812px) and (-webkit-min-device-pixel-ratio: 3) and (orientation: portrait) {}
    
    @media only screen and (min-device-width: 375px) and (max-device-width: 812px) and (-webkit-min-device-pixel-ratio: 3) and (orientation: landscape) {}
    
    ", style.innerHTML += 'html{-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%}body{margin:0}article,aside,details,figcaption,figure,footer,header,hgroup,main,menu,nav,section,summary{display:block}audio,canvas,progress,video{display:inline-block;vertical-align:baseline}audio:not([controls]){display:none;height:0}[hidden],template{display:none}a{background-color:transparent}a:active,a:hover{outline:0}abbr[title]{border-bottom:none;text-decoration:underline;text-decoration:underline dotted}b,strong{font-weight:bold}dfn{font-style:italic}h1{font-size:2em;margin:0.67em 0}mark{background:#ff0;color:#000}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sup{top:-0.5em}sub{bottom:-0.25em}img{border:0}svg:not(:root){overflow:hidden}figure{margin:1em 40px}hr{-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;height:0}pre{overflow:auto}code,kbd,pre,samp{font-family:monospace, monospace;font-size:1em}button,input,optgroup,select,textarea{color:inherit;font:inherit;margin:0}button{overflow:visible}button,select{text-transform:none}button,html input[type="button"],input[type="reset"],input[type="submit"]{-webkit-appearance:button;cursor:pointer}button[disabled],html input[disabled]{cursor:default}button::-moz-focus-inner,input::-moz-focus-inner{border:0;padding:0}input{line-height:normal}input[type="checkbox"],input[type="radio"]{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;padding:0}input[type="number"]::-webkit-inner-spin-button,input[type="number"]::-webkit-outer-spin-button{height:auto}input[type="search"]{-webkit-appearance:textfield;-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box}input[type="search"]::-webkit-search-cancel-button,input[type="search"]::-webkit-search-decoration{-webkit-appearance:none}fieldset{border:1px solid #c0c0c0;margin:0 2px;padding:0.35em 0.625em 0.75em}legend{border:0;padding:0}textarea{overflow:auto}optgroup{font-weight:bold}table{border-collapse:collapse;border-spacing:0}td,th{padding:0}*{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}*:before,*:after{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}html{font-size:10px;-webkit-tap-highlight-color:rgba(0,0,0,0)}body{font-family:"Helvetica Neue",Helvetica,Arial,sans-serif;font-size:14px;line-height:1.42857143;color:#333;background-color:#fff}input,button,select,textarea{font-family:inherit;font-size:inherit;line-height:inherit}a{color:#337ab7;text-decoration:none}a:hover,a:focus{color:#23527c;text-decoration:underline}a:focus{outline:5px auto -webkit-focus-ring-color;outline-offset:-2px}figure{margin:0}img{vertical-align:middle}.img-responsive{display:block;max-width:100%;height:auto}.img-rounded{border-radius:6px}.img-thumbnail{padding:4px;line-height:1.42857143;background-color:#fff;border:1px solid #ddd;border-radius:4px;-webkit-transition:all .2s ease-in-out;-o-transition:all .2s ease-in-out;transition:all .2s ease-in-out;display:inline-block;max-width:100%;height:auto}.img-circle{border-radius:50%}hr{margin-top:20px;margin-bottom:20px;border:0;border-top:1px solid #eee}.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0, 0, 0, 0);border:0}.sr-only-focusable:active,.sr-only-focusable:focus{position:static;width:auto;height:auto;margin:0;overflow:visible;clip:auto}[role="button"]{cursor:pointer}.container{padding-right:15px;padding-left:15px;margin-right:auto;margin-left:auto}@media (min-width:768px){.container{width:750px}}@media (min-width:992px){.container{width:970px}}@media (min-width:1200px){.container{width:1170px}}.container-fluid{padding-right:15px;padding-left:15px;margin-right:auto;margin-left:auto}.row{margin-right:-15px;margin-left:-15px}.row-no-gutters{margin-right:0;margin-left:0}.row-no-gutters [class*="col-"]{padding-right:0;padding-left:0}.col-xs-1, .col-sm-1, .col-md-1, .col-lg-1, .col-xs-2, .col-sm-2, .col-md-2, .col-lg-2, .col-xs-3, .col-sm-3, .col-md-3, .col-lg-3, .col-xs-4, .col-sm-4, .col-md-4, .col-lg-4, .col-xs-5, .col-sm-5, .col-md-5, .col-lg-5, .col-xs-6, .col-sm-6, .col-md-6, .col-lg-6, .col-xs-7, .col-sm-7, .col-md-7, .col-lg-7, .col-xs-8, .col-sm-8, .col-md-8, .col-lg-8, .col-xs-9, .col-sm-9, .col-md-9, .col-lg-9, .col-xs-10, .col-sm-10, .col-md-10, .col-lg-10, .col-xs-11, .col-sm-11, .col-md-11, .col-lg-11, .col-xs-12, .col-sm-12, .col-md-12, .col-lg-12{position:relative;min-height:1px;padding-right:15px;padding-left:15px}.col-xs-1, .col-xs-2, .col-xs-3, .col-xs-4, .col-xs-5, .col-xs-6, .col-xs-7, .col-xs-8, .col-xs-9, .col-xs-10, .col-xs-11, .col-xs-12{float:left}.col-xs-12{width:100%}.col-xs-11{width:91.66666667%}.col-xs-10{width:83.33333333%}.col-xs-9{width:75%}.col-xs-8{width:66.66666667%}.col-xs-7{width:58.33333333%}.col-xs-6{width:50%}.col-xs-5{width:41.66666667%}.col-xs-4{width:33.33333333%}.col-xs-3{width:25%}.col-xs-2{width:16.66666667%}.col-xs-1{width:8.33333333%}.col-xs-pull-12{right:100%}.col-xs-pull-11{right:91.66666667%}.col-xs-pull-10{right:83.33333333%}.col-xs-pull-9{right:75%}.col-xs-pull-8{right:66.66666667%}.col-xs-pull-7{right:58.33333333%}.col-xs-pull-6{right:50%}.col-xs-pull-5{right:41.66666667%}.col-xs-pull-4{right:33.33333333%}.col-xs-pull-3{right:25%}.col-xs-pull-2{right:16.66666667%}.col-xs-pull-1{right:8.33333333%}.col-xs-pull-0{right:auto}.col-xs-push-12{left:100%}.col-xs-push-11{left:91.66666667%}.col-xs-push-10{left:83.33333333%}.col-xs-push-9{left:75%}.col-xs-push-8{left:66.66666667%}.col-xs-push-7{left:58.33333333%}.col-xs-push-6{left:50%}.col-xs-push-5{left:41.66666667%}.col-xs-push-4{left:33.33333333%}.col-xs-push-3{left:25%}.col-xs-push-2{left:16.66666667%}.col-xs-push-1{left:8.33333333%}.col-xs-push-0{left:auto}.col-xs-offset-12{margin-left:100%}.col-xs-offset-11{margin-left:91.66666667%}.col-xs-offset-10{margin-left:83.33333333%}.col-xs-offset-9{margin-left:75%}.col-xs-offset-8{margin-left:66.66666667%}.col-xs-offset-7{margin-left:58.33333333%}.col-xs-offset-6{margin-left:50%}.col-xs-offset-5{margin-left:41.66666667%}.col-xs-offset-4{margin-left:33.33333333%}.col-xs-offset-3{margin-left:25%}.col-xs-offset-2{margin-left:16.66666667%}.col-xs-offset-1{margin-left:8.33333333%}.col-xs-offset-0{margin-left:0}@media (min-width:768px){.col-sm-1, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-sm-10, .col-sm-11, .col-sm-12{float:left}.col-sm-12{width:100%}.col-sm-11{width:91.66666667%}.col-sm-10{width:83.33333333%}.col-sm-9{width:75%}.col-sm-8{width:66.66666667%}.col-sm-7{width:58.33333333%}.col-sm-6{width:50%}.col-sm-5{width:41.66666667%}.col-sm-4{width:33.33333333%}.col-sm-3{width:25%}.col-sm-2{width:16.66666667%}.col-sm-1{width:8.33333333%}.col-sm-pull-12{right:100%}.col-sm-pull-11{right:91.66666667%}.col-sm-pull-10{right:83.33333333%}.col-sm-pull-9{right:75%}.col-sm-pull-8{right:66.66666667%}.col-sm-pull-7{right:58.33333333%}.col-sm-pull-6{right:50%}.col-sm-pull-5{right:41.66666667%}.col-sm-pull-4{right:33.33333333%}.col-sm-pull-3{right:25%}.col-sm-pull-2{right:16.66666667%}.col-sm-pull-1{right:8.33333333%}.col-sm-pull-0{right:auto}.col-sm-push-12{left:100%}.col-sm-push-11{left:91.66666667%}.col-sm-push-10{left:83.33333333%}.col-sm-push-9{left:75%}.col-sm-push-8{left:66.66666667%}.col-sm-push-7{left:58.33333333%}.col-sm-push-6{left:50%}.col-sm-push-5{left:41.66666667%}.col-sm-push-4{left:33.33333333%}.col-sm-push-3{left:25%}.col-sm-push-2{left:16.66666667%}.col-sm-push-1{left:8.33333333%}.col-sm-push-0{left:auto}.col-sm-offset-12{margin-left:100%}.col-sm-offset-11{margin-left:91.66666667%}.col-sm-offset-10{margin-left:83.33333333%}.col-sm-offset-9{margin-left:75%}.col-sm-offset-8{margin-left:66.66666667%}.col-sm-offset-7{margin-left:58.33333333%}.col-sm-offset-6{margin-left:50%}.col-sm-offset-5{margin-left:41.66666667%}.col-sm-offset-4{margin-left:33.33333333%}.col-sm-offset-3{margin-left:25%}.col-sm-offset-2{margin-left:16.66666667%}.col-sm-offset-1{margin-left:8.33333333%}.col-sm-offset-0{margin-left:0}}@media (min-width:992px){.col-md-1, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-md-10, .col-md-11, .col-md-12{float:left}.col-md-12{width:100%}.col-md-11{width:91.66666667%}.col-md-10{width:83.33333333%}.col-md-9{width:75%}.col-md-8{width:66.66666667%}.col-md-7{width:58.33333333%}.col-md-6{width:50%}.col-md-5{width:41.66666667%}.col-md-4{width:33.33333333%}.col-md-3{width:25%}.col-md-2{width:16.66666667%}.col-md-1{width:8.33333333%}.col-md-pull-12{right:100%}.col-md-pull-11{right:91.66666667%}.col-md-pull-10{right:83.33333333%}.col-md-pull-9{right:75%}.col-md-pull-8{right:66.66666667%}.col-md-pull-7{right:58.33333333%}.col-md-pull-6{right:50%}.col-md-pull-5{right:41.66666667%}.col-md-pull-4{right:33.33333333%}.col-md-pull-3{right:25%}.col-md-pull-2{right:16.66666667%}.col-md-pull-1{right:8.33333333%}.col-md-pull-0{right:auto}.col-md-push-12{left:100%}.col-md-push-11{left:91.66666667%}.col-md-push-10{left:83.33333333%}.col-md-push-9{left:75%}.col-md-push-8{left:66.66666667%}.col-md-push-7{left:58.33333333%}.col-md-push-6{left:50%}.col-md-push-5{left:41.66666667%}.col-md-push-4{left:33.33333333%}.col-md-push-3{left:25%}.col-md-push-2{left:16.66666667%}.col-md-push-1{left:8.33333333%}.col-md-push-0{left:auto}.col-md-offset-12{margin-left:100%}.col-md-offset-11{margin-left:91.66666667%}.col-md-offset-10{margin-left:83.33333333%}.col-md-offset-9{margin-left:75%}.col-md-offset-8{margin-left:66.66666667%}.col-md-offset-7{margin-left:58.33333333%}.col-md-offset-6{margin-left:50%}.col-md-offset-5{margin-left:41.66666667%}.col-md-offset-4{margin-left:33.33333333%}.col-md-offset-3{margin-left:25%}.col-md-offset-2{margin-left:16.66666667%}.col-md-offset-1{margin-left:8.33333333%}.col-md-offset-0{margin-left:0}}@media (min-width:1200px){.col-lg-1, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9, .col-lg-10, .col-lg-11, .col-lg-12{float:left}.col-lg-12{width:100%}.col-lg-11{width:91.66666667%}.col-lg-10{width:83.33333333%}.col-lg-9{width:75%}.col-lg-8{width:66.66666667%}.col-lg-7{width:58.33333333%}.col-lg-6{width:50%}.col-lg-5{width:41.66666667%}.col-lg-4{width:33.33333333%}.col-lg-3{width:25%}.col-lg-2{width:16.66666667%}.col-lg-1{width:8.33333333%}.col-lg-pull-12{right:100%}.col-lg-pull-11{right:91.66666667%}.col-lg-pull-10{right:83.33333333%}.col-lg-pull-9{right:75%}.col-lg-pull-8{right:66.66666667%}.col-lg-pull-7{right:58.33333333%}.col-lg-pull-6{right:50%}.col-lg-pull-5{right:41.66666667%}.col-lg-pull-4{right:33.33333333%}.col-lg-pull-3{right:25%}.col-lg-pull-2{right:16.66666667%}.col-lg-pull-1{right:8.33333333%}.col-lg-pull-0{right:auto}.col-lg-push-12{left:100%}.col-lg-push-11{left:91.66666667%}.col-lg-push-10{left:83.33333333%}.col-lg-push-9{left:75%}.col-lg-push-8{left:66.66666667%}.col-lg-push-7{left:58.33333333%}.col-lg-push-6{left:50%}.col-lg-push-5{left:41.66666667%}.col-lg-push-4{left:33.33333333%}.col-lg-push-3{left:25%}.col-lg-push-2{left:16.66666667%}.col-lg-push-1{left:8.33333333%}.col-lg-push-0{left:auto}.col-lg-offset-12{margin-left:100%}.col-lg-offset-11{margin-left:91.66666667%}.col-lg-offset-10{margin-left:83.33333333%}.col-lg-offset-9{margin-left:75%}.col-lg-offset-8{margin-left:66.66666667%}.col-lg-offset-7{margin-left:58.33333333%}.col-lg-offset-6{margin-left:50%}.col-lg-offset-5{margin-left:41.66666667%}.col-lg-offset-4{margin-left:33.33333333%}.col-lg-offset-3{margin-left:25%}.col-lg-offset-2{margin-left:16.66666667%}.col-lg-offset-1{margin-left:8.33333333%}.col-lg-offset-0{margin-left:0}}.fade{opacity:0;-webkit-transition:opacity .15s linear;-o-transition:opacity .15s linear;transition:opacity .15s linear}.fade.in{opacity:1}.collapse{display:none}.collapse.in{display:block}tr.collapse.in{display:table-row}tbody.collapse.in{display:table-row-group}.collapsing{position:relative;height:0;overflow:hidden;-webkit-transition-property:height, visibility;-o-transition-property:height, visibility;transition-property:height, visibility;-webkit-transition-duration:.35s;-o-transition-duration:.35s;transition-duration:.35s;-webkit-transition-timing-function:ease;-o-transition-timing-function:ease;transition-timing-function:ease}.close{float:right;font-size:21px;font-weight:bold;line-height:1;color:#000;text-shadow:0 1px 0 #fff;filter:alpha(opacity=20);opacity:.2}.close:hover,.close:focus{color:#000;text-decoration:none;cursor:pointer;filter:alpha(opacity=50);opacity:.5}button.close{padding:0;cursor:pointer;background:transparent;border:0;-webkit-appearance:none;appearance:none}.modal-open{overflow:hidden}.modal{position:fixed;top:0;right:0;bottom:0;left:0;z-index:1050;display:none;overflow:hidden;-webkit-overflow-scrolling:touch;outline:0}.modal.fade .modal-dialog{-webkit-transform:translate(0, -25%);-ms-transform:translate(0, -25%);-o-transform:translate(0, -25%);transform:translate(0, -25%);-webkit-transition:-webkit-transform 0.3s ease-out;-o-transition:-o-transform 0.3s ease-out;transition:transform 0.3s ease-out}.modal.in .modal-dialog{-webkit-transform:translate(0, 0);-ms-transform:translate(0, 0);-o-transform:translate(0, 0);transform:translate(0, 0)}.modal-open .modal{overflow-x:hidden;overflow-y:auto}.modal-dialog{position:relative;width:auto;margin:10px}.modal-backdrop{position:fixed;top:0;right:0;bottom:0;left:0;z-index:1040;background-color:#000}.modal-backdrop.fade{filter:alpha(opacity=0);opacity:0}.modal-backdrop.in{filter:alpha(opacity=50);opacity:.5}.modal-header{padding: 4px 15px;border-bottom:1px solid #e5e5e5}.modal-header .close{margin-top:-2px}.modal-title{margin:0;line-height:1.42857143}.modal-body{position:relative;padding:15px}.modal-footer{padding:10px 0;text-align:right;border-top:1px solid #e5e5e5}.modal-footer .btn+.btn{margin-bottom:0;margin-left:5px}.modal-footer .btn-group .btn+.btn{margin-left:-1px}.modal-footer .btn-block+.btn-block{margin-left:0}.modal-scrollbar-measure{position:absolute;top:-9999px;width:50px;height:50px;overflow:scroll}@media (min-width:768px){.modal-dialog{width:600px;margin:30px auto}.modal-sm{width:300px}}@media (min-width:992px){.modal-lg{width:900px}}.clearfix:before,.clearfix:after,.container:before,.container:after,.container-fluid:before,.container-fluid:after,.row:before,.row:after,.modal-header:before,.modal-header:after,.modal-footer:before,.modal-footer:after{display:table;content:""}.clearfix:after,.container:after,.container-fluid:after,.row:after,.modal-header:after,.modal-footer:after{clear:both}.center-block{display:block;margin-right:auto;margin-left:auto}.pull-right{float:right !important}.pull-left{float:left !important}.hide{display:none !important}.show{display:block !important}.invisible{visibility:hidden}.text-hide{font:0/0 a;color:transparent;text-shadow:none;background-color:transparent;border:0}.hidden{display:none !important}.affix{position:fixed}@-ms-viewport{width:device-width}.visible-xs,.visible-sm,.visible-md,.visible-lg{display:none !important}.visible-xs-block,.visible-xs-inline,.visible-xs-inline-block,.visible-sm-block,.visible-sm-inline,.visible-sm-inline-block,.visible-md-block,.visible-md-inline,.visible-md-inline-block,.visible-lg-block,.visible-lg-inline,.visible-lg-inline-block{display:none !important}@media (max-width:767px){.visible-xs{display:block !important}table.visible-xs{display:table !important}tr.visible-xs{display:table-row !important}th.visible-xs,td.visible-xs{display:table-cell !important}}@media (max-width:767px){.visible-xs-block{display:block !important}}@media (max-width:767px){.visible-xs-inline{display:inline !important}}@media (max-width:767px){.visible-xs-inline-block{display:inline-block !important}}@media (min-width:768px) and (max-width:991px){.visible-sm{display:block !important}table.visible-sm{display:table !important}tr.visible-sm{display:table-row !important}th.visible-sm,td.visible-sm{display:table-cell !important}}@media (min-width:768px) and (max-width:991px){.visible-sm-block{display:block !important}}@media (min-width:768px) and (max-width:991px){.visible-sm-inline{display:inline !important}}@media (min-width:768px) and (max-width:991px){.visible-sm-inline-block{display:inline-block !important}}@media (min-width:992px) and (max-width:1199px){.visible-md{display:block !important}table.visible-md{display:table !important}tr.visible-md{display:table-row !important}th.visible-md,td.visible-md{display:table-cell !important}}@media (min-width:992px) and (max-width:1199px){.visible-md-block{display:block !important}}@media (min-width:992px) and (max-width:1199px){.visible-md-inline{display:inline !important}}@media (min-width:992px) and (max-width:1199px){.visible-md-inline-block{display:inline-block !important}}@media (min-width:1200px){.visible-lg{display:block !important}table.visible-lg{display:table !important}tr.visible-lg{display:table-row !important}th.visible-lg,td.visible-lg{display:table-cell !important}}@media (min-width:1200px){.visible-lg-block{display:block !important}}@media (min-width:1200px){.visible-lg-inline{display:inline !important}}@media (min-width:1200px){.visible-lg-inline-block{display:inline-block !important}}@media (max-width:767px){.hidden-xs{display:none !important}}@media (min-width:768px) and (max-width:991px){.hidden-sm{display:none !important}}@media (min-width:992px) and (max-width:1199px){.hidden-md{display:none !important}}@media (min-width:1200px){.hidden-lg{display:none !important}}.visible-print{display:none !important}@media print{.visible-print{display:block !important}table.visible-print{display:table !important}tr.visible-print{display:table-row !important}th.visible-print,td.visible-print{display:table-cell !important}}.visible-print-block{display:none !important}@media print{.visible-print-block{display:block !important}}.visible-print-inline{display:none !important}@media print{.visible-print-inline{display:inline !important}}.visible-print-inline-block{display:none !important}@media print{.visible-print-inline-block{display:inline-block !important}}@media print{.hidden-print{display:none !important}}', style.innerHTML += ".row-grey img.cards {
        width: 120px;
        border-radius: 8px;
        box-shadow: 0 4px 8px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%);
    }
    
    ;
    
    .row-grey img {
        margin: 4px 0 0 15px;
    }
    
    .row-grey {
        line-height: 3.5;
        text-align: left;
    }
    
    .modal-wrap {
        backdrop-filter: blur(4px);
        height: 100%;
        left: 0;
        opacity: 0;
        overflow: auto;
        position: fixed;
        top: 0;
        visibility: hidden;
        width: 100%;
        z-index: 9999;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-transition: all 0.3s ease-in-out;
        transition: all 0.3s ease-in-out
    }
    
    .modal-wrap.visible {
        opacity: 1;
        visibility: visible
    }
    
    .modal-wrap .modal-container {
        background: #fff;
        margin: 1em;
        max-width: 100%;
        width: 500px;
        z-index: 100
    }
    
    .modal-wrap .modal-container .modal-header,
    .modal-wrap .modal-container .modal-footer {
        float: left;
        width: 100%
    }
    
    .modal-wrap .modal-header .modal-title {
        float: left;
        margin: 0;
        padding: 15px;
    }
    
    .modal-wrap .modal-header .close-modal {
        background: transparent;
        border: 0;
        color: #fff;
        cursor: pointer;
        float: right;
        font-size: 40px;
        opacity: 0.4;
        -webkit-transition: all 0.3s ease-in-out;
        transition: all 0.3s ease-in-out
    }
    
    .modal-wrap .modal-header .close-modal:hover {
        opacity: 1
    }
    
    .modal-wrap {
        float: left;
        margin: 0;
        padding: 15px 30px;
        width: 100%
    }
    
    .modal-container {
        font-size: 14px;
        line-height: 1.5;
        margin-top: 18px;
    }
    
    .modal-content {
        padding: 4px 0;
    }
    
    .modal-wrap .modal-content p:last-child {
        margin-bottom: 0
    }
    
    .modal-wrap .modal-footer {
        text-align: center
    }
    
    .modal-wrap .modal-footer a {
        cursor: pointer;
    }
    
    span.plus {
        background: #ababab;
        border-radius: 50%;
        padding: 0 4px;
        font-weight: bold
    }
    
    .reward-amt {
        border-radius: 30px;
        border: 3px solid #ed2027;
        line-height: 1.5;
        width: 100%;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        outline: none;
    }
    
    .pts-validation-msg {
        font-size: 10px;
        line-height: 1;
        padding: 0;
        margin: 0;
        color: #494a4a;
    }
    
    .cards {
        padding-left: 0;
    }
    
    .cards li {
        list-style: none;
        display: inline;
        margin: 0 5px;
    }
    
    .virtual-card {
        display: inline-flex !important;
        box-shadow: 0 1px 18px 0 rgb(32 33 36 / 38%);
        padding: 26px 38px;
        border-radius: 14px;
        color: #ed2027;
        font-weight: 400;
        word-break: break-word;
        width: 120px;
        height: 70px;
        line-height: 1;
    }
    
    .triger-modal {
        font-size: 12px !important;
        font-weight: 100 !important;
    }`, 
    i.appendChild(style)
}

function appendPopupStyleInline(i) {
	style = document.createElement("style"), 
    style.innerHTML = ` * {
        font-family: "Arial", sans-serif;
        font-size: 12px;
        color: #212121
    }
   
    .modal-container {
        border-radius: 30px !important;
        box-shadow: 0 4px 8px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%);
         !important: ;
        font-weight: 600;
    }
   
    .row-grey img {
        margin: 4px 0 0 15px;
    }
   
    .row-grey {
        line-height: 3.5;
        text-align: left;
    }
   
    .modal-wrap {
        backdrop-filter: blur(4px);
        height: 100%;
        left: 0;
        opacity: 0;
        overflow: auto;
        position: fixed;
        top: 0;
        visibility: hidden;
        width: 100%;
        z-index: 9999;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-transition: all 0.3s ease-in-out;
        transition: all 0.3s ease-in-out
    }
   
    .modal-wrap.visible {
        opacity: 1;
        visibility: visible
    }
   
    .modal-wrap .modal-container {
        background: #fff;
        margin: 1em;
        max-width: 100%;
        width: 500px;
        z-index: 100
    }
   
    .modal-wrap .modal-container .modal-header,
    .modal-wrap .modal-container .modal-footer {
        float: left;
        width: 100%
    }
   
    .modal-wrap .modal-header .modal-title {
        margin: 0;
        padding: 15px 10px 0 10px;
        line-height: 1.5;
        font-size: 12px;
        text-align: right;
    }
   
    .modal-wrap .modal-header .close-modal {
        background: transparent;
        border: 0;
        color: #fff;
        cursor: pointer;
        float: right;
        font-size: 40px;
        opacity: 0.4;
        -webkit-transition: all 0.3s ease-in-out;
        transition: all 0.3s ease-in-out
    }
   
    .modal-wrap .modal-header .close-modal:hover {
        opacity: 1
    }
   
    .modal-wrap {
        float: left;
        margin: 0;
        padding: 15px 30px;
        width: 100%
    }
   
    .modal-container {
        font-size: 14px;
        line-height: 1.5;
        margin-top: 18px;
    }
   
    .modal-content {
        padding: 4px 0;
    }
   
    .modal-wrap .modal-content p:last-child {
        margin-bottom: 0
    }
   
    .modal-wrap .modal-footer {
        text-align: center
    }
   
    .modal-wrap .modal-footer a {
        cursor: pointer;
    }
   
    span.plus {
        background: #ababab;
        border-radius: 50%;
        padding: 0 4px;
        font-weight: bold
    }
   
    .reward-amt {
        border-radius: 30px;
        border: 3px solid #ed2027;
        line-height: 1.5;
        width: 100%;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        outline: none;
        margin-left: 22px;
    }
   
    .pts-validation-msg {
        font-size: 10px;
        line-height: 1;
        padding: 0;
        margin: 0;
        color: #494a4a;
    }
   
    .cards {
        padding-left: 0;
    }
   
    .cards li {
        list-style: none;
        display: inline;
        margin: 0 5px;
    }
   
    /*.card:first-child {        cursor: pointer;    }*/
    .virtual-card {
        display: inline-flex !important;
        box-shadow: 0 1px 18px 0 rgb(32 33 36 / 38%);
        padding: 26px 38px;
        border-radius: 14px;
        color: #ed2027;
        font-weight: 400;
        word-break: break-word;
        width: 120px;
        height: 70px;
        line-height: 1;
    }
   
    .triger-modal {
        font-size: 12px !important;
        font-weight: 100 !important;
    }
   
    .cd-logo-b {
        float: left;
        width: 80px;
        height: 80px
    }
   
    .close {
        box-shadow: 1px 1px 6px #ccc;
        border-radius: 50% !important;
        padding: 0 !important;
        background-color: #b9b9b9 !important;
        height: 30px;
        width: 30px;
        margin: -20px
    }
   
    ', style.innerHTML += 'html {
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%
    }
   
    body {
        margin: 0
    }
   
    article,
    aside,
    details,
    figcaption,
    figure,
    footer,
    header,
    hgroup,
    main,
    menu,
    nav,
    section,
    summary {
        display: block
    }
   
    audio,
    canvas,
    progress,
    video {
        display: inline-block;
        vertical-align: baseline
    }
   
    audio:not([controls]) {
        display: none;
        height: 0
    }
   
    [hidden],
    template {
        display: none
    }
   
    a {
        background-color: transparent
    }
   
    a:active,
    a:hover {
        outline: 0
    }
   
    abbr[title] {
        border-bottom: none;
        text-decoration: underline;
        text-decoration: underline dotted
    }
   
    b,
    strong {
        font-weight: bold
    }
   
    dfn {
        font-style: italic
    }
   
    h1 {
        font-size: 2em;
        margin: 0.67em 0
    }
   
    mark {
        background: #ff0;
        color: #000
    }
   
    small {
        font-size: 80%
    }
   
    sub,
    sup {
        font-size: 75%;
        line-height: 0;
        position: relative;
        vertical-align: baseline
    }
   
    sup {
        top: -0.5em
    }
   
    sub {
        bottom: -0.25em
    }
   
    img {
        border: 0
    }
   
    svg:not(:root) {
        overflow: hidden
    }
   
    figure {
        margin: 1em 40px
    }
   
    hr {
        -webkit-box-sizing: content-box;
        -moz-box-sizing: content-box;
        box-sizing: content-box;
        height: 0
    }
   
    pre {
        overflow: auto
    }
   
    code,
    kbd,
    pre,
    samp {
        font-family: monospace, monospace;
        font-size: 1em
    }
   
    button,
    input,
    optgroup,
    select,
    textarea {
        color: inherit;
        font: inherit;
        margin: 0
    }
   
    button {
        overflow: visible
    }
   
    button,
    select {
        text-transform: none
    }
   
    button,
    html input[type="button"],
    input[type="reset"],
    input[type="submit"] {
        -webkit-appearance: button;
        cursor: pointer
    }
   
    button[disabled],
    html input[disabled] {
        cursor: default
    }
   
    button::-moz-focus-inner,
    input::-moz-focus-inner {
        border: 0;
        padding: 0
    }
   
    input {
        line-height: normal
    }
   
    input[type="checkbox"],
    input[type="radio"] {
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        padding: 0
    }
   
    input[type="number"]::-webkit-inner-spin-button,
    input[type="number"]::-webkit-outer-spin-button {
        height: auto
    }
   
    input[type="search"] {
        -webkit-appearance: textfield;
        -webkit-box-sizing: content-box;
        -moz-box-sizing: content-box;
        box-sizing: content-box
    }
   
    input[type="search"]::-webkit-search-cancel-button,
    input[type="search"]::-webkit-search-decoration {
        -webkit-appearance: none
    }
   
    fieldset {
        border: 1px solid #c0c0c0;
        margin: 0 2px;
        padding: 0.35em 0.625em 0.75em
    }
   
    legend {
        border: 0;
        padding: 0
    }
   
    textarea {
        overflow: auto
    }
   
    optgroup {
        font-weight: bold
    }
   
    table {
        border-collapse: collapse;
        border-spacing: 0
    }
   
    td,
    th {
        padding: 0
    }
   
    * {
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box
    }
   
    *:before,
    *:after {
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box
    }
   
    html {
        font-size: 10px;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0)
    }
   
    body {
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
        font-size: 14px;
        line-height: 1.42857143;
        color: #333;
        background-color: #fff
    }
   
    input,
    button,
    select,
    textarea {
        font-family: inherit;
        font-size: inherit;
        line-height: inherit
    }
   
    a {
        color: #337ab7;
        text-decoration: none
    }
   
    a:hover,
    a:focus {
        color: #23527c;
        text-decoration: underline
    }
   
    a:focus {
        outline: 5px auto -webkit-focus-ring-color;
        outline-offset: -2px
    }
   
    figure {
        margin: 0
    }
   
    img {
        vertical-align: middle
    }
   
    .img-responsive {
        display: block;
        max-width: 100%;
        height: auto
    }
   
    .img-rounded {
        border-radius: 6px
    }
   
    .img-thumbnail {
        padding: 4px;
        line-height: 1.42857143;
        background-color: #fff;
        border: 1px solid #ddd;
        border-radius: 4px;
        -webkit-transition: all .2s ease-in-out;
        -o-transition: all .2s ease-in-out;
        transition: all .2s ease-in-out;
        display: inline-block;
        max-width: 100%;
        height: auto
    }
   
    .img-circle {
        border-radius: 50%
    }
   
    hr {
        margin-top: 20px;
        margin-bottom: 20px;
        border: 0;
        border-top: 1px solid #eee
    }
   
    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        border: 0
    }
   
    .sr-only-focusable:active,
    .sr-only-focusable:focus {
        position: static;
        width: auto;
        height: auto;
        margin: 0;
        overflow: visible;
        clip: auto
    }
   
    [role="button"] {
        cursor: pointer
    }
   
    .container {
        padding-right: 15px;
        padding-left: 15px;
        margin-right: auto;
        margin-left: auto
    }
   
    @media (min-width:768px) {
        .container {
            width: 750px
        }
    }
   
    @media (min-width:992px) {
        .container {
            width: 970px
        }
    }
   
    @media (min-width:1200px) {
        .container {
            width: 1170px
        }
    }
   
    .container-fluid {
        padding-right: 15px;
        padding-left: 15px;
        margin-right: auto;
        margin-left: auto
    }
   
    .row {
        margin-right: -15px;
        margin-left: -15px
    }
   
    .row-no-gutters {
        margin-right: 0;
        margin-left: 0
    }
   
    .row-no-gutters [class*="col-"] {
        padding-right: 0;
        padding-left: 0
    }
   
    .col-xs-1,
    .col-sm-1,
    .col-md-1,
    .col-lg-1,
    .col-xs-2,
    .col-sm-2,
    .col-md-2,
    .col-lg-2,
    .col-xs-3,
    .col-sm-3,
    .col-md-3,
    .col-lg-3,
    .col-xs-4,
    .col-sm-4,
    .col-md-4,
    .col-lg-4,
    .col-xs-5,
    .col-sm-5,
    .col-md-5,
    .col-lg-5,
    .col-xs-6,
    .col-sm-6,
    .col-md-6,
    .col-lg-6,
    .col-xs-7,
    .col-sm-7,
    .col-md-7,
    .col-lg-7,
    .col-xs-8,
    .col-sm-8,
    .col-md-8,
    .col-lg-8,
    .col-xs-9,
    .col-sm-9,
    .col-md-9,
    .col-lg-9,
    .col-xs-10,
    .col-sm-10,
    .col-md-10,
    .col-lg-10,
    .col-xs-11,
    .col-sm-11,
    .col-md-11,
    .col-lg-11,
    .col-xs-12,
    .col-sm-12,
    .col-md-12,
    .col-lg-12 {
        position: relative;
        min-height: 1px;
        padding-right: 15px;
        padding-left: 15px
    }
   
    .col-xs-1,
    .col-xs-2,
    .col-xs-3,
    .col-xs-4,
    .col-xs-5,
    .col-xs-6,
    .col-xs-7,
    .col-xs-8,
    .col-xs-9,
    .col-xs-10,
    .col-xs-11,
    .col-xs-12 {
        float: left
    }
   
    .col-xs-12 {
        width: 100%
    }
   
    .col-xs-11 {
        width: 91.66666667%
    }
   
    .col-xs-10 {
        width: 83.33333333%
    }
   
    .col-xs-9 {
        width: 75%
    }
   
    .col-xs-8 {
        width: 66.66666667%
    }
   
    .col-xs-7 {
        width: 58.33333333%
    }
   
    .col-xs-6 {
        width: 50%
    }
   
    .col-xs-5 {
        width: 41.66666667%
    }
   
    .col-xs-4 {
        width: 33.33333333%
    }
   
    .col-xs-3 {
        width: 25%
    }
   
    .col-xs-2 {
        width: 16.66666667%
    }
   
    .col-xs-1 {
        width: 8.33333333%
    }
   
    .col-xs-pull-12 {
        right: 100%
    }
   
    .col-xs-pull-11 {
        right: 91.66666667%
    }
   
    .col-xs-pull-10 {
        right: 83.33333333%
    }
   
    .col-xs-pull-9 {
        right: 75%
    }
   
    .col-xs-pull-8 {
        right: 66.66666667%
    }
   
    .col-xs-pull-7 {
        right: 58.33333333%
    }
   
    .col-xs-pull-6 {
        right: 50%
    }
   
    .col-xs-pull-5 {
        right: 41.66666667%
    }
   
    .col-xs-pull-4 {
        right: 33.33333333%
    }
   
    .col-xs-pull-3 {
        right: 25%
    }
   
    .col-xs-pull-2 {
        right: 16.66666667%
    }
   
    .col-xs-pull-1 {
        right: 8.33333333%
    }
   
    .col-xs-pull-0 {
        right: auto
    }
   
    .col-xs-push-12 {
        left: 100%
    }
   
    .col-xs-push-11 {
        left: 91.66666667%
    }
   
    .col-xs-push-10 {
        left: 83.33333333%
    }
   
    .col-xs-push-9 {
        left: 75%
    }
   
    .col-xs-push-8 {
        left: 66.66666667%
    }
   
    .col-xs-push-7 {
        left: 58.33333333%
    }
   
    .col-xs-push-6 {
        left: 50%
    }
   
    .col-xs-push-5 {
        left: 41.66666667%
    }
   
    .col-xs-push-4 {
        left: 33.33333333%
    }
   
    .col-xs-push-3 {
        left: 25%
    }
   
    .col-xs-push-2 {
        left: 16.66666667%
    }
   
    .col-xs-push-1 {
        left: 8.33333333%
    }
   
    .col-xs-push-0 {
        left: auto
    }
   
    .col-xs-offset-12 {
        margin-left: 100%
    }
   
    .col-xs-offset-11 {
        margin-left: 91.66666667%
    }
   
    .col-xs-offset-10 {
        margin-left: 83.33333333%
    }
   
    .col-xs-offset-9 {
        margin-left: 75%
    }
   
    .col-xs-offset-8 {
        margin-left: 66.66666667%
    }
   
    .col-xs-offset-7 {
        margin-left: 58.33333333%
    }
   
    .col-xs-offset-6 {
        margin-left: 50%
    }
   
    .col-xs-offset-5 {
        margin-left: 41.66666667%
    }
   
    .col-xs-offset-4 {
        margin-left: 33.33333333%
    }
   
    .col-xs-offset-3 {
        margin-left: 25%
    }
   
    .col-xs-offset-2 {
        margin-left: 16.66666667%
    }
   
    .col-xs-offset-1 {
        margin-left: 8.33333333%
    }
   
    .col-xs-offset-0 {
        margin-left: 0
    }
   
    @media (min-width:768px) {
   
        .col-sm-1,
        .col-sm-2,
        .col-sm-3,
        .col-sm-4,
        .col-sm-5,
        .col-sm-6,
        .col-sm-7,
        .col-sm-8,
        .col-sm-9,
        .col-sm-10,
        .col-sm-11,
        .col-sm-12 {
            float: left
        }
   
        .col-sm-12 {
            width: 100%
        }
   
        .col-sm-11 {
            width: 91.66666667%
        }
   
        .col-sm-10 {
            width: 83.33333333%
        }
   
        .col-sm-9 {
            width: 75%
        }
   
        .col-sm-8 {
            width: 66.66666667%
        }
   
        .col-sm-7 {
            width: 58.33333333%
        }
   
        .col-sm-6 {
            width: 50%
        }
   
        .col-sm-5 {
            width: 41.66666667%
        }
   
        .col-sm-4 {
            width: 33.33333333%
        }
   
        .col-sm-3 {
            width: 25%
        }
   
        .col-sm-2 {
            width: 16.66666667%
        }
   
        .col-sm-1 {
            width: 8.33333333%
        }
   
        .col-sm-pull-12 {
            right: 100%
        }
   
        .col-sm-pull-11 {
            right: 91.66666667%
        }
   
        .col-sm-pull-10 {
            right: 83.33333333%
        }
   
        .col-sm-pull-9 {
            right: 75%
        }
   
        .col-sm-pull-8 {
            right: 66.66666667%
        }
   
        .col-sm-pull-7 {
            right: 58.33333333%
        }
   
        .col-sm-pull-6 {
            right: 50%
        }
   
        .col-sm-pull-5 {
            right: 41.66666667%
        }
   
        .col-sm-pull-4 {
            right: 33.33333333%
        }
   
        .col-sm-pull-3 {
            right: 25%
        }
   
        .col-sm-pull-2 {
            right: 16.66666667%
        }
   
        .col-sm-pull-1 {
            right: 8.33333333%
        }
   
        .col-sm-pull-0 {
            right: auto
        }
   
        .col-sm-push-12 {
            left: 100%
        }
   
        .col-sm-push-11 {
            left: 91.66666667%
        }
   
        .col-sm-push-10 {
            left: 83.33333333%
        }
   
        .col-sm-push-9 {
            left: 75%
        }
   
        .col-sm-push-8 {
            left: 66.66666667%
        }
   
        .col-sm-push-7 {
            left: 58.33333333%
        }
   
        .col-sm-push-6 {
            left: 50%
        }
   
        .col-sm-push-5 {
            left: 41.66666667%
        }
   
        .col-sm-push-4 {
            left: 33.33333333%
        }
   
        .col-sm-push-3 {
            left: 25%
        }
   
        .col-sm-push-2 {
            left: 16.66666667%
        }
   
        .col-sm-push-1 {
            left: 8.33333333%
        }
   
        .col-sm-push-0 {
            left: auto
        }
   
        .col-sm-offset-12 {
            margin-left: 100%
        }
   
        .col-sm-offset-11 {
            margin-left: 91.66666667%
        }
   
        .col-sm-offset-10 {
            margin-left: 83.33333333%
        }
   
        .col-sm-offset-9 {
            margin-left: 75%
        }
   
        .col-sm-offset-8 {
            margin-left: 66.66666667%
        }
   
        .col-sm-offset-7 {
            margin-left: 58.33333333%
        }
   
        .col-sm-offset-6 {
            margin-left: 50%
        }
   
        .col-sm-offset-5 {
            margin-left: 41.66666667%
        }
   
        .col-sm-offset-4 {
            margin-left: 33.33333333%
        }
   
        .col-sm-offset-3 {
            margin-left: 25%
        }
   
        .col-sm-offset-2 {
            margin-left: 16.66666667%
        }
   
        .col-sm-offset-1 {
            margin-left: 8.33333333%
        }
   
        .col-sm-offset-0 {
            margin-left: 0
        }
    }
   
    @media (min-width:992px) {
   
        .col-md-1,
        .col-md-2,
        .col-md-3,
        .col-md-4,
        .col-md-5,
        .col-md-6,
        .col-md-7,
        .col-md-8,
        .col-md-9,
        .col-md-10,
        .col-md-11,
        .col-md-12 {
            float: left
        }
   
        .col-md-12 {
            width: 100%
        }
   
        .col-md-11 {
            width: 91.66666667%
        }
   
        .col-md-10 {
            width: 83.33333333%
        }
   
        .col-md-9 {
            width: 75%
        }
   
        .col-md-8 {
            width: 66.66666667%
        }
   
        .col-md-7 {
            width: 58.33333333%
        }
   
        .col-md-6 {
            width: 50%
        }
   
        .col-md-5 {
            width: 41.66666667%
        }
   
        .col-md-4 {
            width: 33.33333333%
        }
   
        .col-md-3 {
            width: 25%
        }
   
        .col-md-2 {
            width: 16.66666667%
        }
   
        .col-md-1 {
            width: 8.33333333%
        }
   
        .col-md-pull-12 {
            right: 100%
        }
   
        .col-md-pull-11 {
            right: 91.66666667%
        }
   
        .col-md-pull-10 {
            right: 83.33333333%
        }
   
        .col-md-pull-9 {
            right: 75%
        }
   
        .col-md-pull-8 {
            right: 66.66666667%
        }
   
        .col-md-pull-7 {
            right: 58.33333333%
        }
   
        .col-md-pull-6 {
            right: 50%
        }
   
        .col-md-pull-5 {
            right: 41.66666667%
        }
   
        .col-md-pull-4 {
            right: 33.33333333%
        }
   
        .col-md-pull-3 {
            right: 25%
        }
   
        .col-md-pull-2 {
            right: 16.66666667%
        }
   
        .col-md-pull-1 {
            right: 8.33333333%
        }
   
        .col-md-pull-0 {
            right: auto
        }
   
        .col-md-push-12 {
            left: 100%
        }
   
        .col-md-push-11 {
            left: 91.66666667%
        }
   
        .col-md-push-10 {
            left: 83.33333333%
        }
   
        .col-md-push-9 {
            left: 75%
        }
   
        .col-md-push-8 {
            left: 66.66666667%
        }
   
        .col-md-push-7 {
            left: 58.33333333%
        }
   
        .col-md-push-6 {
            left: 50%
        }
   
        .col-md-push-5 {
            left: 41.66666667%
        }
   
        .col-md-push-4 {
            left: 33.33333333%
        }
   
        .col-md-push-3 {
            left: 25%
        }
   
        .col-md-push-2 {
            left: 16.66666667%
        }
   
        .col-md-push-1 {
            left: 8.33333333%
        }
   
        .col-md-push-0 {
            left: auto
        }
   
        .col-md-offset-12 {
            margin-left: 100%
        }
   
        .col-md-offset-11 {
            margin-left: 91.66666667%
        }
   
        .col-md-offset-10 {
            margin-left: 83.33333333%
        }
   
        .col-md-offset-9 {
            margin-left: 75%
        }
   
        .col-md-offset-8 {
            margin-left: 66.66666667%
        }
   
        .col-md-offset-7 {
            margin-left: 58.33333333%
        }
   
        .col-md-offset-6 {
            margin-left: 50%
        }
   
        .col-md-offset-5 {
            margin-left: 41.66666667%
        }
   
        .col-md-offset-4 {
            margin-left: 33.33333333%
        }
   
        .col-md-offset-3 {
            margin-left: 25%
        }
   
        .col-md-offset-2 {
            margin-left: 16.66666667%
        }
   
        .col-md-offset-1 {
            margin-left: 8.33333333%
        }
   
        .col-md-offset-0 {
            margin-left: 0
        }
    }
   
    @media (min-width:1200px) {
   
        .col-lg-1,
        .col-lg-2,
        .col-lg-3,
        .col-lg-4,
        .col-lg-5,
        .col-lg-6,
        .col-lg-7,
        .col-lg-8,
        .col-lg-9,
        .col-lg-10,
        .col-lg-11,
        .col-lg-12 {
            float: left
        }
   
        .col-lg-12 {
            width: 100%
        }
   
        .col-lg-11 {
            width: 91.66666667%
        }
   
        .col-lg-10 {
            width: 83.33333333%
        }
   
        .col-lg-9 {
            width: 75%
        }
   
        .col-lg-8 {
            width: 66.66666667%
        }
   
        .col-lg-7 {
            width: 58.33333333%
        }
   
        .col-lg-6 {
            width: 50%
        }
   
        .col-lg-5 {
            width: 41.66666667%
        }
   
        .col-lg-4 {
            width: 33.33333333%
        }
   
        .col-lg-3 {
            width: 25%
        }
   
        .col-lg-2 {
            width: 16.66666667%
        }
   
        .col-lg-1 {
            width: 8.33333333%
        }
   
        .col-lg-pull-12 {
            right: 100%
        }
   
        .col-lg-pull-11 {
            right: 91.66666667%
        }
   
        .col-lg-pull-10 {
            right: 83.33333333%
        }
   
        .col-lg-pull-9 {
            right: 75%
        }
   
        .col-lg-pull-8 {
            right: 66.66666667%
        }
   
        .col-lg-pull-7 {
            right: 58.33333333%
        }
   
        .col-lg-pull-6 {
            right: 50%
        }
   
        .col-lg-pull-5 {
            right: 41.66666667%
        }
   
        .col-lg-pull-4 {
            right: 33.33333333%
        }
   
        .col-lg-pull-3 {
            right: 25%
        }
   
        .col-lg-pull-2 {
            right: 16.66666667%
        }
   
        .col-lg-pull-1 {
            right: 8.33333333%
        }
   
        .col-lg-pull-0 {
            right: auto
        }
   
        .col-lg-push-12 {
            left: 100%
        }
   
        .col-lg-push-11 {
            left: 91.66666667%
        }
   
        .col-lg-push-10 {
            left: 83.33333333%
        }
   
        .col-lg-push-9 {
            left: 75%
        }
   
        .col-lg-push-8 {
            left: 66.66666667%
        }
   
        .col-lg-push-7 {
            left: 58.33333333%
        }
   
        .col-lg-push-6 {
            left: 50%
        }
   
        .col-lg-push-5 {
            left: 41.66666667%
        }
   
        .col-lg-push-4 {
            left: 33.33333333%
        }
   
        .col-lg-push-3 {
            left: 25%
        }
   
        .col-lg-push-2 {
            left: 16.66666667%
        }
   
        .col-lg-push-1 {
            left: 8.33333333%
        }
   
        .col-lg-push-0 {
            left: auto
        }
   
        .col-lg-offset-12 {
            margin-left: 100%
        }
   
        .col-lg-offset-11 {
            margin-left: 91.66666667%
        }
   
        .col-lg-offset-10 {
            margin-left: 83.33333333%
        }
   
        .col-lg-offset-9 {
            margin-left: 75%
        }
   
        .col-lg-offset-8 {
            margin-left: 66.66666667%
        }
   
        .col-lg-offset-7 {
            margin-left: 58.33333333%
        }
   
        .col-lg-offset-6 {
            margin-left: 50%
        }
   
        .col-lg-offset-5 {
            margin-left: 41.66666667%
        }
   
        .col-lg-offset-4 {
            margin-left: 33.33333333%
        }
   
        .col-lg-offset-3 {
            margin-left: 25%
        }
   
        .col-lg-offset-2 {
            margin-left: 16.66666667%
        }
   
        .col-lg-offset-1 {
            margin-left: 8.33333333%
        }
   
        .col-lg-offset-0 {
            margin-left: 0
        }
    }
   
    .fade {
        opacity: 0;
        -webkit-transition: opacity .15s linear;
        -o-transition: opacity .15s linear;
        transition: opacity .15s linear
    }
   
    .fade.in {
        opacity: 1
    }
   
    .collapse {
        display: none
    }
   
    .collapse.in {
        display: block
    }
   
    tr.collapse.in {
        display: table-row
    }
   
    tbody.collapse.in {
        display: table-row-group
    }
   
    .collapsing {
        position: relative;
        height: 0;
        overflow: hidden;
        -webkit-transition-property: height, visibility;
        -o-transition-property: height, visibility;
        transition-property: height, visibility;
        -webkit-transition-duration: .35s;
        -o-transition-duration: .35s;
        transition-duration: .35s;
        -webkit-transition-timing-function: ease;
        -o-transition-timing-function: ease;
        transition-timing-function: ease
    }
   
    .close {
        float: right;
        font-size: 21px;
        font-weight: bold;
        line-height: 1;
        color: #000;
        text-shadow: 0 1px 0 #fff;
        filter: alpha(opacity=20);
        opacity: .2
    }
   
    .close:hover,
    .close:focus {
        color: #000;
        text-decoration: none;
        cursor: pointer;
        filter: alpha(opacity=50);
        opacity: .5
    }
   
    button.close {
        padding: 0;
        cursor: pointer;
        background: transparent;
        border: 0;
        -webkit-appearance: none;
        appearance: none
    }
   
    .modal-open {
        overflow: hidden
    }
   
    .modal {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 1050;
        display: none;
        overflow: hidden;
        -webkit-overflow-scrolling: touch;
        outline: 0
    }
   
    .modal.fade .modal-dialog {
        -webkit-transform: translate(0, -25%);
        -ms-transform: translate(0, -25%);
        -o-transform: translate(0, -25%);
        transform: translate(0, -25%);
        -webkit-transition: -webkit-transform 0.3s ease-out;
        -o-transition: -o-transform 0.3s ease-out;
        transition: transform 0.3s ease-out
    }
   
    .modal.in .modal-dialog {
        -webkit-transform: translate(0, 0);
        -ms-transform: translate(0, 0);
        -o-transform: translate(0, 0);
        transform: translate(0, 0)
    }
   
    .modal-open .modal {
        overflow-x: hidden;
        overflow-y: auto
    }
   
    .modal-dialog {
        position: relative;
        width: auto;
        margin: 10px
    }
   
    .modal-backdrop {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 1040;
        background-color: #000
    }
   
    .modal-backdrop.fade {
        filter: alpha(opacity=0);
        opacity: 0
    }
   
    .modal-backdrop.in {
        filter: alpha(opacity=50);
        opacity: .5
    }
   
    .modal-header {
        padding: 4px 15px;
        border-bottom: 1px solid #e5e5e5
    }
   
    .modal-header .close {
        margin-top: -2px
    }
   
    .modal-title {
        margin: 0;
        line-height: 1.42857143
    }
   
    .modal-body {
        position: relative;
        padding: 15px
    }
   
    .modal-footer {
        padding: 10px 0;
        text-align: right;
        border-top: 1px solid #e5e5e5
    }
   
    .modal-footer .btn+.btn {
        margin-bottom: 0;
        margin-left: 5px
    }
   
    .modal-footer .btn-group .btn+.btn {
        margin-left: -1px
    }
   
    .modal-footer .btn-block+.btn-block {
        margin-left: 0
    }
   
    .modal-scrollbar-measure {
        position: absolute;
        top: -9999px;
        width: 50px;
        height: 50px;
        overflow: scroll
    }
   
    @media (min-width:768px) {
        .modal-dialog {
            width: 600px;
            margin: 30px auto
        }
   
        .modal-sm {
            width: 300px
        }
    }
   
    @media (min-width:992px) {
        .modal-lg {
            width: 900px
        }
    }
   
    .clearfix:before,
    .clearfix:after,
    .container:before,
    .container:after,
    .container-fluid:before,
    .container-fluid:after,
    .row:before,
    .row:after,
    .modal-header:before,
    .modal-header:after,
    .modal-footer:before,
    .modal-footer:after {
        display: table;
        content: " "
    }
   
    .clearfix:after,
    .container:after,
    .container-fluid:after,
    .row:after,
    .modal-header:after,
    .modal-footer:after {
        clear: both
    }
   
    .center-block {
        display: block;
        margin-right: auto;
        margin-left: auto
    }
   
    .pull-right {
        float: right !important
    }
   
    .pull-left {
        float: left !important
    }
   
    .hide {
        display: none !important
    }
   
    .show {
        display: block !important
    }
   
    .invisible {
        visibility: hidden
    }
   
    .text-hide {
        font: 0/0 a;
        color: transparent;
        text-shadow: none;
        background-color: transparent;
        border: 0
    }
   
    .hidden {
        display: none !important
    }
   
    .affix {
        position: fixed
    }
   
    @-ms-viewport {
        width: device-width
    }
   
    .visible-xs,
    .visible-sm,
    .visible-md,
    .visible-lg {
        display: none !important
    }
   
    .visible-xs-block,
    .visible-xs-inline,
    .visible-xs-inline-block,
    .visible-sm-block,
    .visible-sm-inline,
    .visible-sm-inline-block,
    .visible-md-block,
    .visible-md-inline,
    .visible-md-inline-block,
    .visible-lg-block,
    .visible-lg-inline,
    .visible-lg-inline-block {
        display: none !important
    }
   
    @media (max-width:767px) {
        .visible-xs {
            display: block !important
        }
   
        table.visible-xs {
            display: table !important
        }
   
        tr.visible-xs {
            display: table-row !important
        }
   
        th.visible-xs,
        td.visible-xs {
            display: table-cell !important
        }
    }
   
    @media (max-width:767px) {
        .visible-xs-block {
            display: block !important
        }
    }
   
    @media (max-width:767px) {
        .visible-xs-inline {
            display: inline !important
        }
    }
   
    @media (max-width:767px) {
        .visible-xs-inline-block {
            display: inline-block !important
        }
    }
   
    @media (min-width:768px) and (max-width:991px) {
        .visible-sm {
            display: block !important
        }
   
        table.visible-sm {
            display: table !important
        }
   
        tr.visible-sm {
            display: table-row !important
        }
   
        th.visible-sm,
        td.visible-sm {
            display: table-cell !important
        }
    }
   
    @media (min-width:768px) and (max-width:991px) {
        .visible-sm-block {
            display: block !important
        }
    }
   
    @media (min-width:768px) and (max-width:991px) {
        .visible-sm-inline {
            display: inline !important
        }
    }
   
    @media (min-width:768px) and (max-width:991px) {
        .visible-sm-inline-block {
            display: inline-block !important
        }
    }
   
    @media (min-width:992px) and (max-width:1199px) {
        .visible-md {
            display: block !important
        }
   
        table.visible-md {
            display: table !important
        }
   
        tr.visible-md {
            display: table-row !important
        }
   
        th.visible-md,
        td.visible-md {
            display: table-cell !important
        }
    }
   
    @media (min-width:992px) and (max-width:1199px) {
        .visible-md-block {
            display: block !important
        }
    }
   
    @media (min-width:992px) and (max-width:1199px) {
        .visible-md-inline {
            display: inline !important
        }
    }
   
    @media (min-width:992px) and (max-width:1199px) {
        .visible-md-inline-block {
            display: inline-block !important
        }
    }
   
    @media (min-width:1200px) {
        .visible-lg {
            display: block !important
        }
   
        table.visible-lg {
            display: table !important
        }
   
        tr.visible-lg {
            display: table-row !important
        }
   
        th.visible-lg,
        td.visible-lg {
            display: table-cell !important
        }
    }
   
    @media (min-width:1200px) {
        .visible-lg-block {
            display: block !important
        }
    }
   
    @media (min-width:1200px) {
        .visible-lg-inline {
            display: inline !important
        }
    }
   
    @media (min-width:1200px) {
        .visible-lg-inline-block {
            display: inline-block !important
        }
    }
   
    @media (max-width:767px) {
        .hidden-xs {
            display: none !important
        }
    }
   
    @media (min-width:768px) and (max-width:991px) {
        .hidden-sm {
            display: none !important
        }
    }
   
    @media (min-width:992px) and (max-width:1199px) {
        .hidden-md {
            display: none !important
        }
    }
   
    @media (min-width:1200px) {
        .hidden-lg {
            display: none !important
        }
    }
   
    .visible-print {
        display: none !important
    }
   
    @media print {
        .visible-print {
            display: block !important
        }
   
        table.visible-print {
            display: table !important
        }
   
        tr.visible-print {
            display: table-row !important
        }
   
        th.visible-print,
        td.visible-print {
            display: table-cell !important
        }
    }
   
    .visible-print-block {
        display: none !important
    }
   
    @media print {
        .visible-print-block {
            display: block !important
        }
    }
   
    .visible-print-inline {
        display: none !important
    }
   
    @media print {
        .visible-print-inline {
            display: inline !important
        }
    }
   
    .visible-print-inline-block {
        display: none !important
    }
   
    @media print {
        .visible-print-inline-block {
            display: inline-block !important
        }
    }
   
    @media print {
        .hidden-print {
            display: none !important
        }
    }`, 
    i.appendChild(style)
}

function makeOrder(i) {
	chrome.storage.local.get(["userid", "asked_amt"], function(t) {
		var o = {
				accountIdentifier: accountIdentifier,
				amount: (parseFloat(t.asked_amt).toFixed(2) / 100).toFixed(2),
				customerIdentifier: customerIdentifier,
				etid: "E865344",
				sendEmail: !1,
				utid: encodeURIComponent(i)
			},
			l = new Headers({
				"Content-Type": "application/json",
				Authorization: "Basic " + tangocard_token
			});
		fetch(cdirect_api_endpoint + "userpts/tcused", {
			method: "POST",
			body: JSON.stringify(o),
			dataType: "json",
			crossDomain: !0,
			mode: "cors",
			beforeSend: function(i) {
				i.setRequestHeader("Access-Control-Allow-Origin", "*"), i.setRequestHeader("Access-Control-Allow-Methods", "POST"), i.setRequestHeader("Access-Control-Allow-Headers", "x-requested-with, x-requested-by")
			},
			headers: l
		}).then(i => i.text()).then(i => {
			url = JSON.parse(i), deductPoint(), location.href = url
		}).catch(i => console.log(i))
	})
}

function deductPoint() {
	chrome.storage.local.get(["userid", "opix_data", "asked_amt", "redeemed"], function(i) {
		if (void 0 !== i.userid) {
			user_id = i.userid;
			var t = JSON.parse(i.opix_data);
			uid = t.uid, vid = t.vid;
			var o = parseFloat(i.asked_amt).toFixed(2);
			chrome.runtime.sendMessage({
				contentScriptQuery: "fetchUrl",
				url: cdirect_api_endpoint + "userpts/used?userid=" + encodeURIComponent(user_id) + "&uid=" + encodeURIComponent(uid) + "&vid=" + encodeURIComponent(vid) + "&pts=" + o,
				method: "PUT"
			}, function(i) {
				chrome.storage.local.set({
					redeemed: !0
				}, function() {})
			})
		}
	})
}

function pixelFunc(i, t, o, l, e = null, n = null) {
	const a = Date.now(),
		r = document.inputEncoding,
		s = getScreenResolution(),
		d = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0) + "x" + Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0),
		c = window.screen.colorDepth,
		p = navigator.userAgent;
	const m = (new Date).getTimezoneOffset();
	chrome.runtime.sendMessage({
		contentScriptQuery: "fetchUrl",
		url: cdirect_api_endpoint + "track/pixel/pixel.gif?id=" + encodeURIComponent("cd-extension") + "&uid=" + encodeURIComponent(i) + "&vid=" + encodeURIComponent(t) + "&ev=" + encodeURIComponent(e) + "&ed=" + encodeURIComponent(n) + "&v=1&dl=" + encodeURIComponent(o) + "&rl=" + encodeURIComponent(l) + "&ts=" + encodeURIComponent(a) + "&de=" + encodeURIComponent(r) + "&sr=" + encodeURIComponent(s) + "&vp=" + encodeURIComponent(d) + "&cd=" + encodeURIComponent(c) + "&dt=" + encodeURIComponent("Commerce Direct Chrome extension") + "&bn=" + encodeURIComponent("Chrome 85") + "&md=" + encodeURIComponent(!1) + "&dvt=" + encodeURIComponent("desktop") + "&ua=" + encodeURIComponent(p) + "&tz=" + encodeURIComponent(m),
		method: "POST"
	}, function(i) {
		log(i = JSON.parse(i))
	})
}

function getClientID() {
	if ("www.google.com" == window.location.hostname) {
		const i = window.location.search.trim().split("&").filter(i => i.includes("q="));
		return (void 0 === i[0] || null === i[0] ? [null, "google.com"] : i[0].trim().split("="))[1]
	}
	var i = document.URL,
		t = new RegExp("[?&]clientId(=([^&#]*)|&|#|$)").exec(i);
	return t && t[2] ? decodeURIComponent(t[2].replace(/\+/g, " ")) : i
}

function getHostName(i) {
	var t = i.match(/:\/\/(www[0-9]?\.)?(.[^\/:]+)/i);
	return null != t && t.length > 2 && "string" == typeof t[2] && t[2].length > 0 ? t[2] : null
}

function init(i, t) {
	chrome.storage.local.get(["userid", "fmsg", "authenticated"], function(i) {
		void 0 === i.userid && void 0 === i.authenticated ? loadLoginShadowDOM() : 1 == i.fmsg && 1 == i.authenticated && firstMsg("to Commerce Direct")
	});
	var o = {
			id: "",
			vid: "",
			version: 1
		},
		l = function(i) {
			return null != i && "" !== i
		},
		e = function() {
			return o.version + "-xxxxxxxx-".replace(/[x]/g, function(i) {
				var t = 36 * Math.random() | 0;
				return ("x" === i ? t : 3 & t | 8).toString(36)
			}) + (1 * new Date).toString(36)
		};

	function n(i) {
		return (n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(i) {
			return typeof i
		} : function(i) {
			return i && "function" == typeof Symbol && i.constructor === Symbol && i !== Symbol.prototype ? "symbol" : typeof i
		})(i)
	}
	var a = {
			prefix: function() {
				return "__opixsee_"
			},
			set: function(i, t, o) {
				var e = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "/",
					n = "";
				if (l(o)) {
					var a = new Date;
					a.setTime(a.getTime() + 60 * o * 1e3), n = "; expires=" + a.toGMTString()
				}
				document.cookie = this.prefix() + i + "=" + t + n + "; path=" + e
			},
			get: function(i) {
				i = this.prefix() + i + "=";
				for (var t = document.cookie.split(";"), o = 0; o < t.length; o++) {
					for (var l = t[o];
						" " === l.charAt(0);) l = l.substring(1);
					if (0 === l.indexOf(i)) return l.substring(i.length, l.length)
				}
			},
			delete: function(i) {
				this.set(i, "", -100)
			},
			exists: function(i) {
				return l(this.get(i))
			},
			saveCampaignParamsFromURL: function(i, t) {
				for (var o = !1, e = 0, n = i.length; e < n; e++)
					if (l(r.getParameterByName(i[e]))) {
						o = !0;
						break
					} if (o) {
					var a, s = {};
					for (e = 0, n = i.length; e < n; e++) a = r.getParameterByName(i[e]), l(a) && (s[i[e]] = a);
					this.set("campaign", JSON.stringify(s), t)
				}
			},
			getCampaignParams: function() {
				return this.exists("campaign") ? JSON.parse(this.get("campaign")) : {}
			},
			getCampaignParam: function(i) {
				if (this.exists("campaign")) {
					var t = JSON.parse(this.get("campaign"));
					return i in t ? t[i] : ""
				}
			}
		},
		r = {
			getParameterByName: function(i, t) {
				t || (t = window.location.href);
				var o = new RegExp("[?&]" + i + "(=([^&#]*)|&|#|$)", "i").exec(t);
				return o ? o[2] ? decodeURIComponent(o[2].replace(/\+/g, " ")) : "" : null
			},
			externalHost: function(i) {
				return i.hostname !== location.hostname && 0 === i.protocol.indexOf("http")
			}
		},
		s = 30,
		d = 2628e3,
		c = 2628e3;

	function p(i, t, l) {
		var r;
		"init" === i ? (o.id = t, r = a.exists("vid") ? a.get("vid") : e(), a.set("vid", r, s), o.vid = r, l && l.campaignURLParams && n(l.campaignURLParams) === n([]) && a.saveCampaignParamsFromURL(l.campaignURLParams, c)) : "event" === i && ("pageload" !== t || o.pageLoadOnce ? "pageload" !== t && "pageclose" !== t ? a.set("vid", o.vid, s) : "userid" === t && (a.set("uid", e(), d), r = a.exists("vid") ? a.get("vid") : e()) : o.pageLoadOnce = !0);
		uid = getCookie("__opixsee_uid"), r = getCookie("__opixsee_vid")
	}
	a.exists("uid") ? a.set("uid", a.get("uid"), d) : a.set("uid", e(), d), p("init", getClientID(), {
		campaignURLParams: ["gcid", "keyword", "creative", "utm_kxconfid", "utm_campaign", "ap", "ploc", "iloc", "kwt", "mt", "kw", "ds_rl", "gclid", "gclsrc"]
	}), chrome.storage.local.get("userid", function(i) {
		void 0 !== i.userid && p("event", "userid", i.userid)
	})
}