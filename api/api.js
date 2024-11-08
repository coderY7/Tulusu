const http = uni.$u.http
const noToken = {custom: { auth: false }}
const Token = {custom: { auth: true }}
// post请求，获取菜单
// export const postMenu = (params, config = {}) => http.post('/ebapi/public_api/index', params, config)
// 注册
export const register = (params, config = {}) => http.post('/front/user/register', params,noToken)
//登录
export const login = (params, config = {}) => http.post('/front/user/login', params,noToken)
//登出
export const logout = (params, config = {}) => http.post('/front/user/logout', params,noToken)
//发送验证码 
export const sendCode = (params, config = {}) => http.post('/front/user/send/email-code', params,noToken)
//验证验证码
export const checkCode = (params, config = {}) => http.post('/front/user/check/email-code', params,noToken)
//重设密码
export const resetPassword = (params, config = {}) => http.post('/front/user/reset/password', params,noToken)
//最新问卷
export const newQuestionnaire = (params, config = {}) => http.post('/front/business/questionnaire/top-new', params,Token)
//TOP3用户
export const top3User = (params, config = {}) => http.post('/front/user/top-reward', params,Token)
//最新社区咨询
export const top2news = (params, config = {}) => http.post('/front/community/news/top-new', params,Token)
//所有商家
export const businessAll = (params, config = {}) => http.post('/front/business/all', params,Token)
//用户结算
export const userCount = (params, config = {}) => http.post('/front/user/user-count', params,Token)
//用户未接任务
export const unacceptedTasks = (params, config = {}) => http.post('/front/questionnaire/user/unaccepted-tasks', params,Token)
//用户完成任务
export const completedTasks = (params, config = {}) => http.post('/front/questionnaire/user/completed-tasks', params,Token)
//用户问卷记录
export const userTasks = (params, config = {}) => http.post('/front/questionnaire/user/tasks', params,Token)
//问卷记录信息
export const questionnaireId = (params, config = {}) => http.post('/front/business/questionnaire/find/id', params,Token)
//用户信息
export const getUserInfo = (params, config = {}) => http.post('/front/user/find/id', params,Token)
//用户信息
export const currentUserInfo = (params, config = {}) => http.post('/front/user/current', params,Token)
//用户余额
export const pointCurrent = (params, config = {}) => http.post('/front/user/point/current', params,Token)
//用户问卷信息
export const userQuestionnaire = (params, config = {}) => http.post('/front/questionnaire/user/find/id', params,Token)
//用户问卷信息
export const simpleAllQuestionnaire = (params, config = {}) => http.post('/front/business/questionnaire/simple-all', params,Token)
//用户问卷信息
export const taskCountQuestionnaire = (params, config = {}) => http.post('/front/business/questionnaire/task-count', params,Token)
//用户问卷信息
export const userAcceptQuestionnaire = (params, config = {}) => http.post('/front/questionnaire/user/accept', params,Token)
//用户提交问卷
export const userAnswer = (params, config = {}) => http.post('/front/questionnaire/user/answer', params,Token)
//用户提交问卷

export const userAcceptpage = (params, config = {}) => http.post('/front/business/questionnaire/page', params,Token)


export const onlineUser = (params, config = {}) => http.post('/front/common/online-count', params,Token)
//商城商品
export const goodsPage = (params, config = {}) => http.post('/front/mall/goods/page', params,Token)
//商城商品
export const orderExchange = (params, config = {}) => http.post('/front/mall/goods/order/exchange', params,Token)
//公司介绍 获取系统配置
export const commonSetting = (params, config = {}) => http.post('/front/common/setting', params,Token)
//用户积分兑换USDT
export const pointUsdt = (params, config = {}) => http.post('/front/user/point-usdt', params,Token)
//设置钱包地址
export const setWalletAddress = (params, config = {}) => http.post('/front/user/set-wallet-address', params,Token)
// 设置用户信息
export const setUserInfo = (params, config = {}) => http.post('/front/user/set-user-info', params,Token)
// 查询用户地址
export const userAddress = (params, config = {}) => http.post('/front/user/address/page', params,Token)
// 新增用户地址
export const userAddAddress = (params, config = {}) => http.post('/front/user/address/add', params,Token)
// 编辑用户地址
export const userUpdateAddress = (params, config = {}) => http.post('/front/user/address/update', params,Token)
// 删除用户地址
export const userDelAddress = (params, config = {}) => http.post('/front/user/address/del', params,Token)
// 重置交易密码
export const restPayPasw = (params, config = {}) => http.post('/front/user/reset/pay-password', params,Token)
// 查询当前问卷是否点赞
export const likeQuestionnaire = (params, config = {}) => http.post('/front/business/questionnaire/is-like', params,Token)
// 给当前问卷点赞
export const getLikeQuestionnaire = (params, config = {}) => http.post('/front/business/questionnaire/like', params,Token)
 // 给当前商品点赞
export const likeGoods = (params, config = {}) => http.post('/front/mall/goods/like', params,Token)
 // 查询当前问卷状态
export const questionnaireState = (params, config = {}) => http.post('/front/questionnaire/user/find/business-questionnaire-id/state', params,Token)
 // 给当前商品点赞
export const recordpoint = (params, config = {}) => http.post('/front/user/money/record/point-page', params,Token)
// get请求，获取菜单，注意：get请求的配置等，都在第二个参数中，详见前面解释/front/questionnaire/user/unaccepted-tasks
// export const getMenu = (data) => http.get('/ebapi/public_api/index', data)
//验证注册验证码
export const sendregCode = (params, config = {}) => http.post('/front/user/send/reg-email-code', params,noToken)

//验证注册验证码
export const checkregCode = (params, config = {}) => http.post('/front/user/check/reg-email-code', params,noToken)
//疑难问题
export const problemapi = (params, config = {}) => http.post('/front/help/all', params,Token)
//下级列表
export const fansCurrentapi = (params, config = {}) => http.post('/front/user/sub/users', params,Token)

//1级列表
export const fansCurrent1api = (params, config = {}) => http.post('/front/user/sub1/users', params,Token)
//2级列表
export const fansCurrent2api = (params, config = {}) => http.post('/front/user/sub2/users', params,Token)

