import config from './config.js';
import used from './used.js';
import md5 from 'js-md5';
//域名
const baseUrl = config.baseUrl;
 
//请求 
function http(opts, token) {
	let thisBaseUrl = config[opts.baseUrl] || baseUrl; //单独配置的域名   
	let httpDefaultOpts = {
		url: thisBaseUrl + opts.url,
		data: opts.params,
		method: opts.method,
		timeout: 20000,
		sslVerify: false,
		header: opts.method == 'GET' ? {
			'X-Requested-With': 'XMLHttpRequest',
			"Accept": "application/json",
			'content-Type': 'application/x-www-form-urlencoded'
		} : {
			'X-Requested-With': 'XMLHttpRequest',
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
		},
		dataType: 'json',
	}
	//是否带token
	if (token) {
		httpDefaultOpts.header.token = token;
	}
 
	//promise
	let promise = new Promise(function(resolve, reject) {
		let network; //网络状态
		//网络状态
		uni.getNetworkType({
			success: function(res) {
				network = res.networkType;
				if (res.networkType == 'none') {
					uni.showToast({
						title: '无网络',
						icon: 'none',
						duration: 5000
					});
				}
			}
		});
 
		uni.request(httpDefaultOpts).then(
			(res) => {
				//成功
				if (res) {
					if (res.statusCode == 200|| ( res.data && res.data.status == "success")) {
						//请求成功，返回最终需要的业务数据
						resolve(res.data);
					} else {
						if (res.statusCode == 401 || (res.data && res.data.code == 401)) {
							this.removeStorageSyncVal('token');
							this.removeStorageSyncVal('userInfo');
							uni.showModal({
								title: '提示',
								content: '请登陆后操作',
								success: function(res) {
									if (res.confirm) {
										uni.redirectTo({
											url: '/pages/login/login'
										})
									} else if (res.cancel) {
										uni.navigateTo({
											url: '/pages/login/login'
										})
									}
							
								}
							})
							
							reject("登录超时")
							return
						}
						//其他情况的失败,返回失败原因
						reject(res.info)
					}
 
				} else {
					//失败
					reject("请求失败")
				}
			}
		).catch(
			(response) => {
				reject(response)
			}
		)
	})
	return promise
}
 
 
//请求 - 不带token
const httpRequest = (opts) => {
	opts.params = opts.params ? opts.params : {};
	if (opts.params.token) {
		return http(opts, opts.params.token);
	} else {
		return http(opts);
	}
};
//请求 - 带Token
const httpTokenRequest = (opts) => {
	let token = uni.getStorageSync('token');
	opts.params = opts.params ? opts.params : {};
	return http(opts, token);
};
 
export default {
	httpRequest,
	httpTokenRequest
}