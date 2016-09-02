(function() {
	"use strict";
	function MQuery(selector) {
		return new MQuery.prototype.init(selector);
	}
	MQuery.prototype.init = function(selector) {
		this.selector = selector;
		if (typeof selector === "function") {
			window.addEventListener("load", selector, false);
			return;
		}
		if (selector[0] === '#') {
			return document.getElementById(selector.substring(1));
		}
	};
	window.m = window.MQuery = MQuery;
})(window);