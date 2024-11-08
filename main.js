import App from './App'
// #ifndef VUE3
import Vue from 'vue'
import uView from '@/uni_modules/uview-ui'
import LangEn from './static/lang/en'
import LangCht from './static/lang/zhCHT'
import VueI18n from 'vue-i18n'
import md5 from '@/js_sdk/js-md5'
import dayjs from 'dayjs';
Vue.prototype.$md5 = md5
Vue.use(uView)
Vue.use(VueI18n)
Vue.config.productionTip = false

const i18n = new VueI18n({
	locale: 'en',
	messages: {
		'en': LangEn,
		'cht': LangCht,
	}

})
App.mpType = 'app'
Vue.prototype._i18n = i18n
const app = new Vue({
	i18n,
	...App
})
require('@/api/config.js')(app)
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif