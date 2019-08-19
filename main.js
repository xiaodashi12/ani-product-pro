import Vue from 'vue'
import App from './App'
import store from './store'

import request from './common/request/request.js';
Vue.config.productionTip = false;
App.mpType = 'app'
// 全局配置
request.setConfig({
  baseUrl: 'http://45.40.197.130:8080', // 此为测试地址，需加入到域名白名单，或者更改为您自己的线上地址即可
   dataType: 'json', // 可删除，默认为json
  responseType: 'text', // 可删除，默认为text
  // 设置请求头，支持所有请求头设置，也可不设置，去掉header就行
  header: {
    'Content-Type': 'application/json',
    // 'binfile-auth': '000099'
  }
})
// 设置请求拦截器
request.interceptors.request(config => {
	
		if (config.method.toLowerCase() !== 'get' && Object.keys(config.data).length > 0) {
			let Body = {};
			let data = {};
			debugger
			for (let key in config.data) {
				if (key != 'method') {
					Body[key] = config.data[key];
				}
			}
			
			data = Body
			if (uni.getStorageSync('ticket')) {
				data.ticket = uni.getStorageSync('ticket') || '';
			}
			config.data = JSON.stringify(data)
		}
		debugger
		return config; // 返回修改后的配置，如未修改也需添加这行
})

// 设置响应拦截器
request.interceptors.response((response) => {
  // 接收请求，执行响应操作
		if (!response.data) {
			return Promise.reject({code: "", message: '网络异常'});
		}
		const res = response.data;
		if (!res.hasOwnProperty('return_code')) {
			return res;
		}
		if (res.return_code == 0) {
			if (!res.hasOwnProperty('Body')) {
				return res;
			}		
			return JSON.parse(res.Body);
		}
		if((res.return_code == '803' || res.return_code == '802')){
			// dlgUtils.loginTimeout()
			return Promise.reject({code: res.return_code, message: res.return_msg})
		}
    return Promise.reject({code: res.return_code, message: res.return_msg})
}, error => {
    return Promise.reject({code: error.return_code, message: error.message})
})
// 挂载到全局vue实例上，在页面中可以使用this.$request调用request实例下相应方法
Vue.prototype.$request = request;
Vue.prototype.log = function(info){
    console.log(info);
}

const app = new Vue({
	store,
    ...App
})
app.$mount()
