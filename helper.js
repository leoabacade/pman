var Helper = {};

Helper.UA = {};

Helper.UA.isMobile = {
  Android: function() {
		return navigator.userAgent.match(/Android/i) ? true : false;
	},
	BlackBerry: function() {
		return navigator.userAgent.match(/BlackBerry/i) ? true : false;
	},
	iOS: function() {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
	},
	Windows: function() {
		return navigator.userAgent.match(/IEMobile/i) ? true : false;
	},
	any: function() {
		return (Helper.UA.isMobile.Android() || Helper.UA.isMobile.BlackBerry() || Helper.UA.isMobile.iOS() || Helper.UA.isMobile.Windows());
	}
};

Helper.UA.mobile = function() {
	return Helper.UA.isMobile.any();
}
