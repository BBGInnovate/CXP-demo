/**
 * Widget Body Directive
 */

angular
    .module('RDash')
    .directive('rdWidgetBody', rdWidgetBody);

function rdWidgetBody() {
	var height = window.innerHeight - 170;
    var directive = {
        requires: '^rdWidget',
        scope: {
            loading: '@?',
            classes: '@?'
        },
        transclude: true,
        template: '<div class="widget-body" style="height: '+height+'px" ng-class="classes" when-scrolled><rd-loading ng-show="loading"></rd-loading><div ng-hide="loading" class="widget-content" ng-transclude></div></div>',
        restrict: 'E'
    };
    return directive;
};


// directive for infinite scroll (used on news list pages)
angular.module('RDash').directive('whenScrolled', function() {
	return function(scope, elm, attr) {
		var raw = elm[0];

		// have to use setTimeout to let angular process the $index variable as the ID
		setTimeout(function() {
			var id = elm.parent().parent().parent().parent()[0].id.split('-')[1];

			elm.bind('scroll', function() {
				if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight) {
					$('.get-more-link')[id].click();
					//scope.$apply(attr.whenScrolled);
				}
			});
		}, 1000);



	};
});
