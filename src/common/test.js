'use strict'

angular.module('app')
	.service('greeting', function () {
		this.sayHello = function (name) {
			return 'Hello' + name;
		};

	})
	//等价于
	// .provider('greeting', function () {
	// 	this.$get = function () {
	// 		var Greeting = function () {
	// 			this.sayHello = function (name) {
	// 				return 'Hello' + name;
	// 			};
	// 		};
	// 		return new Greeting();
	// 	};
	// })
	.factory('greeting', function () {
		return 'Hello, world';
	})
	//等价于
	// .provider('greeting', function () {
	// 	this.$get = function () {
	// 		var greeting = function () {
	// 			return 'Hello, world';
	// 		};
	// 		return greeting();
	// 	};
	// })
	// 
	// 
	// parse
	// var getter = $parse('user.name');//解析表达式
	// var setter = getter.assing;//获取赋值函数
	// var context = { user: {name: 'Angular'}};
	// var locals = { user: { name: 'local'}};

	// expect(getter(context)).toEqual('Angular');//获取表达式
	// setter(context, 'newValue');//设置属性值
	// expect(context.user.name).toEqual('newValue');//值被修改了
	// expect(getter(context, locals)).toEqual('local');//值被local覆盖了