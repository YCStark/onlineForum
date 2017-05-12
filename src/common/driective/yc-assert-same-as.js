'use strict'

angular.module('app')
	.directive('ycAssertSameAs', function () {
		return {
			restrict: 'A',
			require: 'ngModel',
			link: function (scope, element, attrs, ngModel) {
				var isSame = function (value) {
					//$eval 将表达式在当前作用域求值，否则它这是一个固定字符串？？？
					var anothervalue = scope.$eval(attrs.ycAssertSameAs);
					return value === anothervalue;
				};

				ngModel.$parsers.push(function (value) {
					//setValidity 设置验证结果，第一参数为名字
					ngModel.$setValidity('same', isSame(value));
					return isSame(value) ? value : undefined;
				});

				scope.$watch(function () {
						return scope.$eval(attrs.ycAssertSameAs);
					}, function () {
						ngModel.$setValidity('same', isSame(ngModel.$modelValue));
				});
			}
		};
	});