// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import qs from 'qs';
import Config from './components/Config'
import Fun from './components/Fun'
import './assets/aliicon/iconfont.css'
import VueClipboard from 'vue-clipboard2'
import "babel-polyfill"
import MetaInfo from 'vue-meta-info'

// 前端路由判断页面未登录跳转到登录页面
router.beforeEach((to, from, next) => {
	if (to.matched.some(record => record.meta.requireAuth)) {
		let user_info = localStorage.getItem('auth_data')
		if (!Fun.isEmpty(user_info)) {
			let userobj = JSON.parse(user_info)
			if (userobj.create_time + userobj.token_expire < (Date.parse(new Date()) / 1000)) {
				ElementUI.MessageBox.alert('登录超时，请重新登录', '提示', {
					confirmButtonText: '确定',
					callback: action => {
						next({
							path: '/user/login',
							query: {
								redirect: to.fullPath
							} // 将跳转的路由path作为参数，登录成功后跳转到该路由
						})
					}
				})
			} else {
				next()
			}
		} else {
			ElementUI.MessageBox.alert('登录超时，请重新登录', '提示', {
				confirmButtonText: '确定',
				callback: action => {
					next({
						path: '/user/login',
						query: {
							redirect: to.fullPath
						} // 将跳转的路由path作为参数，登录成功后跳转到该路由
					})
				}
			})
		}
	} else {
		next()
	}
})
router.afterEach( ( to, from, next ) => {
 setTimeout(()=>{
   var _hmt = _hmt || [];
   (function() {
    //每次执行前，先移除上次插入的代码
    document.getElementById('zztj') && document.getElementById('zztj').remove();
    var hm = document.createElement("script");
    hm.src ="https://s13.cnzz.com/z_stat.php?id=1273671653&web_id=1273671653";
    hm.id ="zztj"
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
   })();
 },0);
} );
router.afterEach((to,from,next) => {

	window.scrollTo(0,0);

})
axios.defaults.timeout = 50000
// http request 拦截器
var loadinginstace
axios.interceptors.request.use(
	config => {

		//请求如果存在token,则在头部加上token
		let user_info = localStorage.getItem('auth_data')
		if (!Fun.isEmpty(user_info)) {
			let userobj = JSON.parse(user_info)
			// 判断是否存在token，如果存在的话，则每个http header都加上token
			config.headers.Authorization = userobj.auth_key;
		}

		if (config.method == 'post') {
			var params = config.data
			if (Fun.isEmpty(params)) {
				params = ""
			}

			let data = Fun.postMakeSign(params, '2SpdUqNOXBkLLaWb2gLi')
			params = params + '&' + data
			config.data = params
		} else if (config.method == 'get') {
			var params = config.params
			if (Fun.isEmpty(params)) {
				params = new Object()
			}
			let data = Fun.getMakeSign(params, '2SpdUqNOXBkLLaWb2gLi')
			params.timestamp = data.timestamp
			params.sign = data.sign
			config.params = params
		}
		return config;
	},
	err => {
		//关闭加载动画
		if (loadinginstace) {
			loadinginstace.close()
		}
		//显示错误
		ElementUI.Message.error({
			message: '网络错误'
		})

		return Promise.reject(err);
	});

// http response 拦截器
axios.interceptors.response.use(
	response => {
		//关闭加载动画
		if (loadinginstace) {
			loadinginstace.close()
		}
		//服务器返回token过期，则跳转登录
		if (response.data.state == 2) {

			ElementUI.MessageBox.alert(response.data.msg, '提示', {
				confirmButtonText: '确定',
				callback: action => {
					router.replace({
						path: '/user/login',
						query: {
							redirect: router.history.current.fullPath
						} // 将跳转的路由path作为参数，登录成功后跳转到该路由
					})
				}
			})

		} else {
			//未过期则更新token到期时间
			let user_info = localStorage.getItem('user_info')

			if (!Fun.isEmpty(user_info)) {
				let userobj = JSON.parse(user_info)
				let now_time = Date.parse(new Date()) / 1000
				if (now_time - userobj.create_time > userobj.token_update) {
					userobj.create_time = now_time;
				}
				user_info = JSON.stringify(userobj)
				localStorage.setItem('user_info', user_info)
			}

		}
		return response;
	},
	err => {
		if (loadinginstace) {
			loadinginstace.close()
		}
		/*ElementUI.Message.error({
			message: err.message
		})*/
		return Promise.reject(err) // 返回接口返回的错误信息
	});

Vue.use(ElementUI)
Vue.use(MetaInfo)
Vue.use(MintUI)
/* eslint-disable no-new */
axios.defaults.baseURL = Config.host
axios.defaults.withCredentials = true

Vue.use(VueClipboard)
Vue.prototype.$config = Config
Vue.prototype.$http = axios
Vue.prototype.$qs = qs
Vue.prototype.$fun = Fun

new Vue({
	el: '#app',
	router,
	components: {
		App
	},
	template: '<App/>',

})
