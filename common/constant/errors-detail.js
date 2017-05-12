'use strict'

angular.module('app')
	.constant('Errors', {
		email: '不是有效的邮件地址',
		required: '此项不能为空',
		same: '此项必须与上一项相同'
	});