'use strict'

angular.module('app')
	.directive('ycFieldError', function ($compile) {
		return {
			restrict: 'A',
			require: 'ngModel',
			link: function (scope, element, attrs, ngModel) {
				//创建一个子scope，true代表独立作用域
				var subScope = scope.$new(true);

				subScope.hasError = function () {
					//判断数据是否无效（$invalid）,是否输入过（$dirty）
					return ngModel.$invalid && ngModel.$dirty;
				};

				subScope.errors = function () {
					//$error 返回
					return ngModel.$error;
				};

				//活DOM跟随subScope 变化自动更新自己
				//
				var hint = $compile('<ul ng-if="hasError()"><li ng-repeat="(name, wrong) in errors()" ng-if="wrong">{{ name | error:customMessages}}</li></ul>')(subScope);
				element.after(hint);//加到当前元素后面
			}
		}
	})