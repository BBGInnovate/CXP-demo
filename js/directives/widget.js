/**
 * Widget Directive
 */

angular
    .module('RDash')
    .directive('rdWidget', rdWidget);

function rdWidget() {
    var directive = {
        transclude: true,
        template: '<div class="widget" ng-transclude></div>',
        restrict: 'EA'
    };
    return directive;

    function link(scope, element, attrs) {
        /* */
    }
};

/**
 * Widget Heading Directive
 */

angular
	.module('RDash')
	.directive('rdWidgetHeading', rdWidgetHeading);

function rdWidgetHeading() {
	var directive = {
		transclude: true,
		template: '<div class="widget-heading" ng-transclude></div>',
		restrict: 'EA'
	};
	return directive;

	function link(scope, element, attrs) {
		/* */
	}
};