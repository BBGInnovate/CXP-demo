'use strict';

/* Filters */


// remove comma from end of list
angular.module('RDash').filter('removeCommaFromList', function() {
	return function (string) {
		return string.substring(0, string.length - 2);
	};
});

// stringify filters
angular.module('RDash').filter('stringifyFilters', function() {
	return function (arr) {
		var stringified = '';
		for (var i = 0; i < arr.length; i++) {
			stringified += arr[i].name + ', ';
		}
		return stringified.substring(0, stringified.length - 2);
	};
});

// reverse array
angular.module('RDash').filter('reverse', function() {
	return function(items) {
		return items.slice().reverse();
	};
});



