// Directive for Facebook Share
angular.module('RDash').directive('humanTranslate', [
	function() {
		return {
			restrict: 'A',
			link: function(scope, element) {
				element.on('click', function() {
					$('#translateModal').modal('show');
				});
			}
		};
	}
]);