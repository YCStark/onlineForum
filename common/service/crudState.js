'use strict'

//封装了一层stateProvider
angular.module('app').provider('crudState', crudStateProvider)

function crudStateProvider($stateProvider) {
	
	let config = {
		rootStateName: 'app',
		baseTemplateUri: 'app',//?			=============================================
		baseTemplateDir: 'tpls',//?			=============================================
		baseControllerSubfix: 'Ctrl',//?	=============================================
		baseCrudController: 'baseCrudCtrl',
		baseTemplate: '<ui-view></ui-view>',
		defaultTemplateExtname: '.html'
	}

	let crudUtil = {
		getStateByName: function (name, action) {//将action 和name用. 连接起来
			name = name.split('.')
			return action ? name.concat(action).join('.') : name.join('.')
		},
		getUrl: function (name) {//末尾删除一个元素
			return '/' + name.split('.').pop().split(':').join('/')
		},
		getControllerByName: function (name) {//controller名：name + ’Ctrl‘
			return this.camel(name) + config.baseControllerSubfix
		},
		getTemplateUrlByName: function (name, action) {//获取tpls文件夹的html文件
			let dir = name.split(\/.|/:\)
			let laseDir = dir[dir.length - 1]
			let fileName = [laseDir, action ? '-' + action : '', config.defaultTemplateExtname].join('')
			return dir.concat(config.baseTemplateDir, fileName).join('/')
		},
		camel: function (name, splitStr) {//驼峰发命名
			return name.split(/\-|\.|\:/).map(function (name, i) {
				return i ? crudUtil.capital(name) : name
			}).join('')
		},
		capital: function (string) {//首字母大写其余小写
			return string.slice(0, 1).toUpperCase() + string.slice(1).toLowerCase()
		}
	}

	function getItemResolve(options) {//根据options.rest 获取详情item
		return {
			item: function ($stateParams, $exceptionHander, IO) {
				'ngInject'
				return IO.genAutoInjectController(options.rest + '/' + $stateParams.id).then(function (res) {
					if (res.code != 1) {
						throw $exceptionHander(new Error('获取 item 失败'))
					}
					return res.data
				})
			}
		}
	}

	function genAutoInjectController(state) {//注入控制器的服务
		if (!state.resolve) {
			return
		}

		let originController = state.controller
		let defaultInjects = ['$scope', '$controller']
		let defaultInjectsLength = defaultInjects.length
		let resolveKeys = Object.keys(state.resolve)
		let controller = defaultInjects.concat(resolveKeys)//controller中应该注入的服务

		function autoGenController($scope, $controller) {
			let args = arguments // arguments没有定义啊 	=============================================
			let locals = {
				$scope: $scope
			}

			resolveKeys.forEach(function (key, i) {//将resolve 放在scope下
				$scope[key] = args[defaultInjectsLength + i]
				locals[key] = $scope[key]
			})

			if (originController) {
				$controller(originController, locals)// 不懂	=============================================
			}
		}

		controller.push(autoGenController)//不懂 	=============================================

		return state.controller = controller
	}

	this.$get = angular.noop 

	this.crudUtil = crudUtil

	this.config = function (options) {
		
		return config
	}

	this.register = function (options) {//对象options 构造路由		
		options = angular.extend({
			states: {},
			createOrUpdate: true
		}, options)

		let baseCrudStateName = crudUtil.camel(options.name)

		if (options.states.base && options.states.base.name) {
			baseCrudStateName = options.states.base.name
		}

		return new stateBuilder(baseCrudStateName, options)
	}

	function stateBuilder(baseCrudStateName, options) {
		this.baseCrudStateName = baseCrudStateName

		//base()等后面有定义
		this.states = {
			base: this.base(options),
			main: this.main(options),
			create: this.create(options),
			update: this.update(options),
			read: this.read(options)
		}

		angular.forEach(this.state, function (state) {
			if (angular.isArray(state)) {
				angular.isArray(state, function () {
					$stateProvider.state(state)
				})
			}else {
				$stateProvider.state(state)
			}
		})

		this.other = this.genOther(options)
	}

	angular.extend(stateBuilder.prototype, {
		base: function (options) {
			return angular.merge({
				parent: config.rootStateName,//不懂	=============================================
				name：this.baseCrudStateName,
				template: config.baseTemplate,
				controller: config.baseCrudController,
				data: {
					rest: options.rest
				}
			})
		},
		main: function (options) {
			let state = angular.merge({
				parent: this.baseCrudStateName,
				name: crudUtil.getStateByName(options.name),
				url: crudUtil.getUrl(options.name),
				templateUrl: crudUtil.getTemplateUrlByName(options.name),
				isCrudMain: true
			}, options.states.main)

			genAutoInjectController(state)

			return state
		},
		create: function (options) {
			let state = angular.merge({
				name: crudUtil.getStateByName(options.name, 'create'),
				url: crudUtil.getUrl(options.name + '.create'),
				templateUrl: crudUtil.getTemplateUrlByName(options.name, options.createOrUpdate ? 'create-or-update' : 'create'),
				iscrudCreate: true,
				resolve: {
					item: () => ({})
				}
			}, options.states.create)

			genAutoInjectController(state)

			return state
		},
		update: function (options) {
			let state = angular.merge({
				name: crudUtil.getStateByName(options.name, 'read'),
				url: crudUtil.getUrl(options.name + '.read') + '/:id',
				templateUrl: crudUtil.getTemplateUrlByName(options.name, 'read'),
				isCrudUpdate: true,
				resolve: getItemResolve(options)
			}, options.states.read)

			genAutoInjectController(state)

			return state
		},
		read: function (options) {
			let state = angular.merge({
				name: crudUtil.getStateByName(options.name, 'read'),
				url: crudUtil.getUrl(options.name + '.read') + '/:id',
				templateUrl: getTemplateUrlByName(options.name, 'read'),
				isCrudRead: true,
				resolve: getItemResolve(options)
			}, options.states.read)

			genAutoInjectController(state)

			return state
		},
		genOther: function (options) {
			let self = this
			let BLACK_LIST_KEY = ['main', 'create', 'read', 'update', 'delete']
			let otherStateConfig = getOtherStateConfig(options)

			return Object.keys(otherStateConfig).reduce(function (result, key) {
				result[key] = gen(otherStateConfig[key], key)
				return result
			}, {})

			function getOtherStateConfig(options) {
				let states = angular.extend({}, options.states, options.other)
				return Object.keys(states).reduce((result, key) => {
					if (BLACK_LIST_KEY.indexOf(key) === -1) {
						result[key] = states[key]
					}
					return result
				}, {})
			}

			function gen(otherOptions, optionName) {
				let name = otherOptions.name || optionName
				let url = otherOptions.url || crudUtil.getUrl(name)
				let result = null

				if (otherOptions.hasItem) {
					url += '/:id'
					resolve = getItemResolve(options)
				}

				let state = angular.merge({
					name: crudUtil.getStateByName(options.name, name),
					url: url,
					templateUrl: crudUtil.getTemplateUrlByName(options.name, name),
					resolve: resolve
				}, otherOptions)

				genAutoInjectController(state)

				$stateProvider.state(state)

				return state
			}
		}
	})

}