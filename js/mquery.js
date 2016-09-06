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
	/*MQuery.$temp = {
		$namespace: {}
	};
	MQuery.controller = function(name, func) {
		this.$temp.$namespace[name] = {
			scope: {},
			func: {}
		};
		var controller = func(this.$temp.$namespace[name].scope);
		for (var property in controller) {
			var temp = controller[prototype];
			if (typeof temp === "function") {
				this.$temp.$namespace[name].func[prototype] = ;
			}
		}
		// this.$temp.$namespace[name].controller = controller;
	};*/
	MQuery.trim = function(string) {
		if (typeof string !== "string") throw TypeError(string + " is not a string.");
		return String.prototype.trim ? string.trim() : string.replace(/^\s+|\s+$/g, "");
	};
	window.m = window.MQuery = MQuery;
})(window);