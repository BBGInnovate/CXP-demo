'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('RDash')
	.factory('Mapping', ['$http', Mapping]);

function Mapping($http) {

	var mappings = {
		networks: function() {
			return $http.get('https://cxp.bbg.gov/api/networks?api_key=' + API_KEY, {timeout: 5000}).then(function(response) {
				return response.data;
			}, function(err) {
				alert('Networks failed to load');
			});
		},
		organizations: function() {
			return $http.get('https://cxp.bbg.gov/api/organizations?api_key=' + API_KEY, {timeout: 5000}).then(function(response) {
				return response.data;
			}, function(err) {
				alert('Organizations failed to load');
			});
		},
		languages: function() {
			return $http.get('https://cxp.bbg.gov/api/languages?api_key=' + API_KEY, {timeout: 5000}).then(function(response) {
				return response.data;
			}, function(err) {
				alert('Languages failed to load');
			});

		},
		countries: function() {
			return $http.get('https://cxp.bbg.gov/api/countries?api_key=' + API_KEY + '&story=1', {timeout: 5000}).then(function(response) {
				return response.data;
			}, function(err) {
				alert('Countries failed to load');
			});

		}
	};

	return mappings;
}

