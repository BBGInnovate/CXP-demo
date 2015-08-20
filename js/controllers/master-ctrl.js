/**
 * Master Controller
 */

angular.module('RDash')
    .controller('MasterCtrl', ['$scope', '$cookieStore', 'Mapping', 'Query', '$sce', '$filter', MasterCtrl]);

function MasterCtrl($scope, $cookieStore, Mapping, Query, $sce, $filter) {

    /**
     * Sidebar Toggle & Cookie Control
     */
    var mobileView = 992;

	// 5 minute refresh interval
	var refreshInterval = 300000;

	// this map is used to keep track of all the columns that have been created which is used for refreshing
	// the data
	var historyMap = {};

	$scope.processFavorite = function () {
		var favorites = localStorage.getItem('Executive Dashboard').split('~');
		for (var i = 0; i < favorites.length; i++) {
			favorites[i] = JSON.parse(favorites[i]);
		}
		$scope.favorites = $filter('reverse')(favorites);
	};


	$scope.favorites = [];
	$scope.test = 'enabled';

	if (localStorage.getItem('Executive Dashboard')) {
		$scope.processFavorite();
	}


	// Initialize Keywords
	$scope.keywords = '';

	// Get all the mappings
	Mapping.countries()
		.then(function(response) {
			$scope.countries = response;
		});

	Mapping.networks()
		.then(function(response) {
			$scope.networks = response;
		});

	Mapping.organizations()
		.then(function(response) {
			$scope.organizations = response;
		});

	Mapping.languages()
		.then(function(response) {
			$scope.languages = response;
		});

	/*
	$scope.hideAllMenus = function() {
		$scope.languagesList = false;
		$scope.countriesList = false;
		$scope.networksList = false;
		$scope.organizationsList = false;

	};

	// Function to handle the pop-out menu
	$scope.showMenu = function (item) {
	//	$scope.hideAllMenus();

		switch(item) {
			case 'languages':
				$scope.languagesList = !$scope.languagesList;
				break;
			case 'networks':
				$scope.networksList = true;
				break;
			case 'countries':
				$scope.countriesList = true;
				break;
			case 'organizations':
				$scope.organizationsList = true;
				break;
			default:
				console.log('nothing clicked');
				break;
		}



	};
*/

	$scope.selectedCountries = [];
	$scope.selectedLanguages = [];
	$scope.selectedNetworks = [];
	$scope.selectedOrganizations = [];

	$scope.$watch('[selectedCountries, selectedLanguages, selectedOrganizations, selectedNetworks]', function () {
		if ($scope.selectedCountries.length > 0 || $scope.selectedLanguages.length > 0
			|| $scope.selectedOrganizations.length > 0 || $scope.selectedNetworks.length > 0) {
			$scope.hasFilters = true;

			// user selecting filters, hide no results found if its there
			$scope.noResultsFound = null;
		} else {
			$scope.hasFilters = false;
		}
	}, true);



	$scope.selectCountry = function(index) {
		var idx = $scope.selectedCountries.indexOf($scope.countries[index]);

		// is currently selected
		if (idx > -1) {
			$scope.selectedCountries.splice(idx, 1);

		} else { // is newly selected
			$scope.selectedCountries.push($scope.countries[index]);
		}
	};

	$scope.selectLanguage = function(index) {
		var idx = $scope.selectedLanguages.indexOf($scope.languages[index]);

		// is currently selected
		if (idx > -1) {
			$scope.selectedLanguages.splice(idx, 1);

		} else { // is newly selected
			$scope.selectedLanguages.push($scope.languages[index]);
		}
	};

	$scope.selectNetwork = function(index) {
		var idx = $scope.selectedNetworks.indexOf($scope.networks[index]);

		// is currently selected
		if (idx > -1) {
			$scope.selectedNetworks.splice(idx, 1);

		} else { // is newly selected
			$scope.selectedNetworks.push($scope.networks[index]);
		}
	};

	$scope.selectOrganization = function(index) {
		var idx = $scope.selectedOrganizations.indexOf($scope.organizations[index]);

		// is currently selected
		if (idx > -1) {
			$scope.selectedOrganizations.splice(idx, 1);

		} else { // is newly selected
			$scope.selectedOrganizations.push($scope.organizations[index]);
		}
	};
/*
	$scope.selectLanguage = function(index) {
		$scope.selectedLanguages = $scope.languages[index];
	};

	$scope.selectNetwork = function(index) {
		$scope.selectedNetworks = $scope.networks[index];
	};

	$scope.selectOrganization = function(index) {
		$scope.selectedOrganizations = $scope.organizations[index];
	};
*/
	$scope.mediaTypes = ['article', 'audio', 'image', 'video'];

	$scope.columnNum = 0;
	$scope.column = [];

	// set variable for loading indicator
	$scope.loading = [];



	$scope.addColumn = function() {
	//	$scope.hideAllMenus();

		$scope.noResultsFound = null;

		// set loading indicator to true;
		$scope.loading[$scope.columnNum] = true;

		// Initiate column
		$scope.column[$scope.columnNum] = '';


		Query.getData($scope.selectedNetworks, $scope.selectedOrganizations, $scope.selectedCountries,
			$scope.selectedLanguages, $scope.keywords)
			.then(function(response) {

				$scope.fullWidth = '';

				$scope.column[$scope.columnNum] = response.contents;


				// no longer loading
				$scope.loading[$scope.columnNum] = false;

				// Initalize filters
				var filters = $scope.processFilterString($scope.selectedNetworks, $scope.selectedOrganizations, $scope.selectedCountries,
					$scope.selectedLanguages, $scope.keywords);
				$scope.column[$scope.columnNum].filters = filters;

				// Set current filters for Favorites purposes
				$scope.column[$scope.columnNum].currentFilters = {
					countries: $scope.selectedCountries,
					languages: $scope.selectedLanguages,
					networks: $scope.selectedNetworks,
					organizations: $scope.selectedOrganizations,
					keywords: $scope.keywords
				};


				$scope.currentColumnNum = $scope.columnNum;

				var currentColumnFilters = {
					countries: $scope.selectedCountries,
					languages: $scope.selectedLanguages,
					networks: $scope.selectedNetworks,
					organizations: $scope.selectedOrganizations,
					filters: filters,
					columnNum: $scope.columnNum
				};

				// set the data for the historyMap
				historyMap[$scope.columnNum] = currentColumnFilters;


				if ($scope.column[$scope.columnNum].length === 0) {
					$scope.noResultsFound = true;
					$scope.column.splice($scope.columnNum, 1);
				} else {
					$scope.noResultsFound = null;
					$scope.columnNum++;
				}




				// set history
				$scope.currentColumnCountries = $scope.selectedCountries;
				$scope.currentColumnLanguages = $scope.selectedLanguages;
				$scope.currentColumnNetworks = $scope.selectedNetworks;
				$scope.currentColumnOrganizations = $scope.selectedOrganizations;


				// collapse all the menus
				$scope.countriesList = null;
				$scope.networksList = null;
				$scope.organizationsList = null;
				$scope.languagesList = null;

				// reset values
				$scope.selectedCountries = [];
				$scope.selectedLanguages = [];
				$scope.selectedNetworks = [];
				$scope.selectedOrganizations = [];

				$scope.keywords = '';


				// reset form
				//document.getElementById('filters').reset();
				document.getElementById('column-filters').reset();

		});



	};


	$scope.processFilterString = function (networks, organizations, countries, languages, keywords) {
		var filters = '';

		for (var i = 0; i < countries.length; i++) {
			filters += countries[i].name + ', ';
		}

		for (var i = 0; i < languages.length; i++) {
			filters += languages[i].name + ', ';
		}

		for (var i = 0; i < networks.length; i++) {
			filters += networks[i].name + ', ';
		}

		for (var i = 0; i < organizations.length; i++) {
			filters += organizations[i].name + ', ';
		}

		if (keywords && keywords.length > 0) {
			filters += 'Keywords: ' + keywords + ', ';
		}


		filters = filters.substring(0, filters.length - 2);

		if (filters.length === 0) {
			return 'All';
		} else {
			return filters;
		}
	};

	$scope.setImage = function (url) {
		$scope.isAudio = true;
		$scope.isVideo = false;
		$scope.image = url;
	};

	$scope.setVideo = function (url) {

		$scope.options = {
			file: url,
			height: 360,
			width: 640
		};

		$scope.isAudio = false;
		$scope.isVideo = true;

	};

	$scope.closeModal = function () {
		$scope.isAudio = false;
		$scope.isVideo = false;
	};

	// Delete column
	$scope.removeColumn = function (index) {
		$scope.column.splice(index, 1);

		// if you're deleting one that's in the middle of two columns
		if (historyMap[index + 1]) {
			// shift the one next to it into the current position
			historyMap[index] = historyMap[index + 1];

			// then delete the one next to it
			delete historyMap[index + 1];

		// otherwise just delete the current one if one next to it doesn't exist
		} else {
			delete historyMap[index];
		}
		$scope.columnNum--;
	};

	// Add column to favorites
	$scope.favoriteColumn = function (index) {
		if (localStorage.getItem('Executive Dashboard')) {
			var currFavorites = localStorage.getItem('Executive Dashboard').split('~');

			var itemExists = false;

			// Loop through current items and check to see if the favorite that user wants to add exists already
			for (var i = 0; i < currFavorites.length; i++) {
				if (currFavorites[i] === JSON.stringify($scope.column[index].currentFilters)) {
					itemExists = true;
				}
			}

			// if it doesn't exist, add it
			if (itemExists === false) {
				localStorage.setItem('Executive Dashboard', localStorage.getItem('Executive Dashboard') + '~' + JSON.stringify($scope.column[index].currentFilters));

				// display favorites alert
				$scope.alertDisplay = 'in';

			}

			$scope.processFavorite();

		} else {
			localStorage.setItem('Executive Dashboard', JSON.stringify($scope.column[index].currentFilters));

			// display favorites alert
			$scope.alertDisplay = 'in-alert';

			$scope.processFavorite();
		}


		// hide it after 3 seconds
		window.setTimeout(function () {
			$scope.alertDisplay = 'out-alert';
			$scope.$apply();
		}, 3000);


	};


	$scope.selectHistoryItem = function (index) {

		$scope.selectedCountries = $scope.favorites[index].countries;
		$scope.selectedLanguages = $scope.favorites[index].languages;
		$scope.selectedNetworks = $scope.favorites[index].networks;
		$scope.selectedOrganizations = $scope.favorites[index].organizations;
		$scope.keywords = $scope.favorites[index].keywords;

		$scope.addColumn();

	};

	// Moves a column to the right
	$scope.moveRight = function (index) {

		var newIndex = index + 1;

		if ($scope.column[newIndex]) {

			var oldColumn = $scope.column[newIndex];
			$scope.column[newIndex] = $scope.column[index];
			$scope.column[index] = oldColumn;

		}

		// make changes to historyMap
		var currentColumn = historyMap[index];
		var nextColumn = historyMap[index + 1];
		historyMap[index + 1] = currentColumn;
		historyMap[index] = nextColumn;

	};

	// Moves a column to the left
	$scope.moveLeft = function (index) {

		var newIndex = index - 1;

		if ($scope.column[newIndex]) {
			var oldColumn = $scope.column[newIndex];
			$scope.column[newIndex] = $scope.column[index];
			$scope.column[index] = oldColumn;
		}

		// make changes to historyMap
		var currentColumn = historyMap[index];
		var prevColumn = historyMap[index - 1];
		historyMap[index - 1] = currentColumn;
		historyMap[index] = prevColumn;

	};

	$scope.translate = function (parentIndex, index) {
		if (!$scope.column[parentIndex][index].translated) {
			$scope.column[parentIndex][index].translated = true;
		} else {
			$scope.column[parentIndex][index].translated = null;
		}
	};

	// this function checks for new data based on the interval specified at the top of the file
	setInterval(function () {
		if (Object.keys(historyMap).length > 0) {
			var currentCol = 0;

			$scope.refreshData(currentCol);


		}
	}, refreshInterval);



	// this function is called to make a call to the factory to return an AJAX JSON response
	// and update the column it's supposed to
	$scope.refreshData = function (columnNum) {

		Query.getData(historyMap[columnNum].networks, historyMap[columnNum].organizations, historyMap[columnNum].countries,
			historyMap[columnNum].languages, $scope.keywords)
			.then(function (response) {

			//	response.contents[0].title = 'test title : ' + Math.random();

				$scope.column[columnNum] = response.contents;
				$scope.column[columnNum].filters = historyMap[columnNum].filters;

				columnNum++;

				// if there's more, call the function again with new columnNum
				if (historyMap[columnNum]) {
					$scope.refreshData(columnNum);
				}
			});
	};

	/*********************/
	/*   Framework Code  */
	/*********************/

    $scope.getWidth = function() {
        return window.innerWidth;
    };

	$scope.height = window.innerHeight;

    $scope.$watch($scope.getWidth, function(newValue, oldValue) {
        if (newValue >= mobileView) {
            if (angular.isDefined($cookieStore.get('toggle'))) {
                $scope.toggle = ! $cookieStore.get('toggle') ? false : true;
            } else {
                $scope.toggle = true;
            }
        } else {
            $scope.toggle = false;
        }

    });

    $scope.toggleSidebar = function() {
        $scope.toggle = !$scope.toggle;
        $cookieStore.put('toggle', $scope.toggle);
    };

    window.onresize = function() {
        $scope.$apply();
    };



}