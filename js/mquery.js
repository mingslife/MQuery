(function() {
	"use strict";
	var Util = {
		EVENTS: "click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave keydown keyup keypress submit focus blur copy cut paste".split(" "),
		querySelectorAll: function(selector) {
			return document.querySelectorAll ? querySelectorAll(selector) : null;
		},
		addEventListener: function(element, event, listener) {
			return element.addEventListener ? element.addEventListener(event, listener, false) : element.attachEvent("on" + event, listener);
		},
		init: function() {
			console.info(this);
		}
	};
	Util.init();
	function MQuery(selector) {
		return new MQuery.prototype.init(selector);
	}
	MQuery.prototype = {
		constructor: MQuery,
		init: function(selector) {
			this.selector = selector;
			if (typeof selector === "function") {
				window.addEventListener ? window.addEventListener("load", selector, false) : window.attachEvent("onload", selector);
			} else {
				console.info(this);
				// this.element = this.find(selector);
			}
		},
		toString: function() {
			return "MQuery: " + this.selector;
		}
	};
	MQuery.prototype.init.prototype = {
		constructor: MQuery.prototype.init,
		find: function(selector) {
			if (selector.indexOf(" ") !== -1) {
				var selectors = selector.split(" ").filter(function(item) {return item;});
				console.info(selectors);
				var element = null;
				for (var i = 0, length = selectors.length; i < length; i++) {
					element = element.find(selectors[i]);
				}
			} else {
				/*switch (selector[0]) {
					case "#": this.element = getById(this.element, selector.substring(1)); break;
					case ".": this.element = getByClass(this.element, selector.substring(1)); break;
				}*/
				this.element = Util.querySelectorAll(selector);
			}
		},
		toString: function() {
			return "MQuery: " + this.selector;
		}
	};
	/*var getById = function(element, id) {
		return element.getElementById(id);
	};
	var getByClass = function(element, className) {
		return element.getElementsByClassName ? element.getElementsByClassName(className) : null;
	};*/
	MQuery.trim = function(string) {
		if (typeof string !== "string") throw TypeError(string + " is not a string.");
		return String.prototype.trim ? string.trim() : string.replace(/^\s+|\s+$/g, "");
	};
	window.m = window.MQuery = MQuery;
})(window);

var Scope = function() {
	this.$$watchers = [];
};

Scope.prototype.$watch = function(watchExp, listener) {
	this.$$watchers.push({
		watchExp: watchExp,
		listener: listener || function() {}
	});
};

Scope.prototype.$digest = function() {
	var dirty;

	do {
		dirty = false;
		for (var i = 0; i < this.$$watchers.length; i++) {
			var newValue = this.$$watchers[i].watchExp(),
				oldValue = this.$$watchers[i].last;

			if (oldValue !== newValue) {
				this.$$watchers[i].listener(newValue, oldValue);

				dirty = true;

				this.$$watchers[i].last = newValue;
				eval("console.info(this.$$watchers)");
			}
		}
	} while (dirty);
};

var $scope = new Scope();

$scope.name = "Ryan";

var element = document.querySelectorAll("input");

element[0].onkeyup = function() {
	$scope.name = element[0].value;

	$scope.$digest();
};

$scope.$watch(function() {
	return $scope.name;
}, function(newValue, oldValue) {
	console.log("Input value updated - it is now " + newValue);

	element[0].value = $scope.name;
});

var updateScopeValue = function updateScopeValue() {
	$scope.name = "Bob";
	$scope.$digest();
};
