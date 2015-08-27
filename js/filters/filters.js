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

// show full network names
angular.module('RDash').filter('showFullNetworkNames', function() {
	return function(networks) {
		for (var i = 0; i < networks.length; i++) {
			switch(networks[i].name) {
				case 'HB':
					networks[i].fullName = 'Current Time (HB)';
					break;
				case 'MBN':
					networks[i].fullName = 'Middle East Broadcasting Network (MBN)';
					break;
				case 'OCB':
					networks[i].fullName = 'Office of Cuba Broadcasting (OCB)';
					break;
				case 'RFA':
					networks[i].fullName = 'Radio Free Asia (RFA)';
					break;
				case 'RFE/RL':
					networks[i].fullName = 'Radio Free Europe / Radio Liberty (RFE/RL)';
					break;
				case 'VOA':
					networks[i].fullName = 'Voice of America (VOA)';
					break;
				case 'VOA Central':
					networks[i].fullName = 'VOA Central';
					break;
				default:
					networks[i].fullName = '';
			}
		}
		return networks;

		/*
		 Current Time (HB)
		 Middle East Broadcasting Network (MBN)
		 Office of Cuba Broadcasting (OCB)
		 Radio Free Asia (RFA)
		 Radio Free Europe / Radio Liberty (RFE/RL)
		 Voice of America (VOA)
		 VOA Central
		 */
	};
});





