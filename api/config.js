// import config from '@/utils/config.js';
import md5 from '@/js_sdk/js-md5'
// 此vm参数为页面的实例，可以通过它引用vuex中的变量
module.exports = (vm) => {
	// 初始化请求配置
	uni.$u.http.setConfig((config) => {
		/* config 为默认全局配置*/
		config.withCredentials = true;

		if (process.env.NODE_ENV === 'development') {
	
			config.baseURL = 'https://dev-local.senxinim.cn/task-api'; /* 根域名 */
			config.baseURL1 = "https://dev-local.senxinim.cn"; /* 根域名 */
			config.website = 'https://dev-local.senxinim.cn/task'; /* 根域名 */
			
		
		} else if (process.env.NODE_ENV === 'production') {

			// 在生产环境中执行的代码
			config.baseURL = "https://api.knowworld.org/task-api"; /* 根域名 */
			config.baseURL1 = "https://api.knowworld.org"; /* 根域名 */
			config.website = 'https://www.knowworld.org'; /* 根域名 */
		}
		return config
	})
	// 请求拦截
	uni.$u.http.interceptors.request.use(async (config) => {
		// 数据初始化
		config.data = config.data || {};
		// 添加默认的请求头
		//let deviceId=uni.getStorageSync('deviceId');
		const deviceId = uni.getStorageSync('deviceId') || 'unknown-device-id'; // 设备ID
		const timestamp = Date.now().toString(); // 时间戳
		const language = uni.getStorageSync('language') || 'en'; // 当前使用的语言

		// 签名算法
		const uri = config.url.replace(config.baseURL, ''); // 从完整URL中提取URI
		const salt = '5edc88e1eb9f4c7a99eef7d77870b620'; // 固定盐
		const sign = md5(salt + uri + timestamp + deviceId);

		// 设置请求头
		config.header = {
			...config.header,
			'deviceId': deviceId,
			'timestamp': timestamp,
			'language': language,
			'sign': sign
		};
		// 检查是否需要token
		if (config?.custom?.auth) {
			if (!uni.getStorageSync('Token')) {
				setTimeout(() => {
					uni.reLaunch({
						url: "/pages/login/login",
					});
				}, 1200);
				return Promise.reject(config)
			} else {
				config.header["Authorization"] = uni.getStorageSync("Token");
			}
			// config.header.token = uni.getStorageSync('token') || ''; // 从Vuex获取token
		}

		return config;
	}, config => {
		return Promise.reject(config);
	});

	// 响应拦截
	uni.$u.http.interceptors.response.use((response) => {
		/* 对响应成功做点什么 可使用async await 做异步操作*/
		const data = response.data
		// 自定义参数
		const custom = response.config?.custom
		if (response.data.code !== 200) {
			if (data.code === 401) { //token失效  跳转登录
				uni.$u.toast(data.message.message)
				uni.clearStorageSync();
				setTimeout(() => {
					uni.reLaunch({
						url: "/pages/login/login",
					});
				}, 1200);
			} else if (custom.toast !== false) {
				if (data.code === 404) {
					if (response.config.url === '/front/user/login') {
						if (uni.getStorageSync('language') === 'cht') {
							uni.$u.toast("帳號密碼錯誤")
						} else {
							uni.$u.toast("Account password is wrong")
						}
					}
					if (response.config.url ===
						'/front/questionnaire/user/find/business-questionnaire-id/state') {
						return data

					}
				} else {
					// uni.$u.toast(data.message.message)
					return data
				}
			}
			// 如果没有显式定义custom的toast参数为false的话，默认对报错进行toast弹出提示
			if (custom.toast !== false) {
				// uni.$u.toast(data.message.message)

			}

			// 如果需要catch返回，则进行reject
			if (custom?.catch) {
				this.$refs.uToast.show({
					message: data.message.message
				})
				return Promise.reject(data)
			} else {
				// 否则返回一个pending中的promise，请求不会进入catch中
				return new Promise(() => {})
			}
		}
		return data === undefined ? {} : data
	}, (response) => {
		uni.$u.toast(data.message.message)
		// 对响应错误做点什么 （statusCode !== 200）
		return Promise.reject(response)
	})
}