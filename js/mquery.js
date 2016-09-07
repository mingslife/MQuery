(function() {
	"use strict";
	function MQuery(selector) {
		return new MQuery.prototype.init(selector);
	}
	MQuery.prototype = {
		constructor: MQuery,
		init: function(selector) {
			this.selector = selector;
			if (typeof selector === "function") {
				window.addEventListener("load", selector, false);
			} else {
				console.info(this.);
				// this.element = this.find(selector);
			}
		},
		find: function(selector) {
			if (selector.indexOf(" ") !== -1) {
				var selectors = selector.split(" ").filter(function(item) {return item;});
				console.info(selectors);
				var element = null;
				for (var i = 0, length = selectors.length; i < length; i++) {
					element = element.find(selectors[i]);
				}
			} else {
				switch (selector[0]) {
					case "#": this.element = this._getById(this.element, selector.substring(1)); break;
					case ".": this.element = this._getByClass(this.element, selector.substring(1)); break;
				}
			}
		},
		toString: function() {
			return "MQuery: " + this.selector;
		}
	};
	MQuery._getById = function(element, id) {
		return element.getElementById(id);
	};
	MQuery._getByClass = function(element, className) {
		return element.getElementsByClassName ? element.getElementsByClassName(className) : null;
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