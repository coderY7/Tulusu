let baseUrl = ""; //域名
if (process.env.NODE_ENV === 'development') {
	// 开发环境
	baseUrl = `http://dev-local.senxinim.cn/task-api/v2/api-docs?group=`;
} else {
	// 生产环境
	baseUrl = `https://××××××.com`
}
let config = {
	baseUrl: baseUrl,
	salt: '5edc88e1eb9f4c7a99eef7d77870b620' // 固定盐值
};
//兑换比例
export default {
	config
}