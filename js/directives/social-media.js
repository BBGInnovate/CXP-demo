// Directive for Facebook Share
angular.module('RDash').directive('fbShare', [
	function() {
		return {
			restrict: 'A',
			link: function(scope, element) {
				element.on('click', function() {
					console.log(scope.item);
					var picture = '';

					if (scope.item._embedded.images) {
						picture = scope.item._embedded.images[0].url;
					}

					FB.ui({
						method: 'feed',
						name: name,
						link: scope.item.object_name,
						picture: picture,
						caption: ' ',
						description: scope.item.description,
						message: ' '
					});


				});
			}
		};
	}
]);