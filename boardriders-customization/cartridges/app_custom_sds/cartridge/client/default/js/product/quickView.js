'use strict';
var base = require('base/product/quickView');

function getCookie (cname) {
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
	}

	function setCookie (cookieName, cookieValue, nDays) {
		var today = new Date();
		var expire = new Date();
		if (nDays == null || nDays == 0) nDays = 1;
		expire.setTime(today.getTime() + 3600000 * 24 * nDays);
		document.cookie = cookieName + "=" + escape(cookieValue) + "; expires=" + expire.toGMTString() + "; path=/";
	}
	
module.exports = {
		showPopup: function (){
			var cookie = getCookie('popupModal');
			var $popupModal = $('.popupmodal');
			if(cookie){
				$popupModal.hide();
			}
			$('body').on('click', '.popup-close', function (e) {
				setCookie('popupModal','seen',30);
				$popupModal.hide();
				document.getElementById("overlay").style.display = "block";
		});
		}
};  
