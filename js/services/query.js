'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('RDash')
	.factory('Query', ['$http', Query]);

function Query($http) {
//	var API_KEY = 'GeMcYM6rB4z6xnuYyVTSKCo2wM8VeP5ViwRtydWE';
	var data = {
		getData: function(networks, organization, countries, languages, keywords) {
			var API_KEY = 'rIFMx4sUh7USYmdCtvlqmuMGAWq1Qfr9tDeINZOo';

			var data = stringifyArrayData(networks, organization, countries, languages);

			return	$http({
					url: 'https://cxp.bbg.gov/api/search?api_key=' + API_KEY + '&details=1',
				//	url: 'http://cxp-api.bbg.gov/api/search?details=1',
				//	url: 'http://api.data.gov/bbg/search?api_key=' + API_KEY + '&details=1',
					method: 'GET',
					params: { network: data.networks, organization: data.organizations, country: data.countries,
						language: data.languages, q: keywords }
				})
				.then(function(response) {
					return response.data;
				});
		}
	};

	return data;
}

function stringifyArrayData(networks, organization, countries, languages) {

	// Build strings out of the arrays to pass
	var countriesString = '';
	for (var i = 0; i < countries.length; i++) {
		countriesString += countries[i].code +',';
	}
	countriesString = countriesString.substring(0, countriesString.length - 1);

	var networksString = '';
	for (var i = 0; i < networks.length; i++) {
		networksString += networks[i].object_name +',';
	}
	networksString = networksString.substring(0, networksString.length - 1);

	var organizationsString = '';
	for (var i = 0; i < organization.length; i++) {
		organizationsString += organization[i].name +',';
	}
	organizationsString = organizationsString.substring(0, organizationsString.length - 1);

	var languagesString = '';
	for (var i = 0; i < languages.length; i++) {
		languagesString += languages[i].lang_code +',';
	}
	languagesString = languagesString.substring(0, languagesString.length - 1);

	return { countries: countriesString, languages: languagesString, organizations: organizationsString,
		networks: networksString
	};
}