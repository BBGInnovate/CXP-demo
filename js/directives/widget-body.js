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
        template: '<div class="widget-body" style="height: '+height+'px" ng-class="classes"><rd-loading ng-show="loading"></rd-loading><div ng-hide="loading" class="widget-content" ng-transclude></div></div>',
        restrict: 'E'
    };
    return directive;
};