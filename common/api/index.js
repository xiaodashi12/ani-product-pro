const config = {
	'getSsoLogin':{//2.1 用户登录
		url: '/login.htm',
        method: '/login.htm'
	},
	'getSsoToken': {//2.2 获取tokenId
        url: '',
        method: 'SSO_TOKEN_REQ_88000101_'
    },
	'getLoginOut': {//2.3 退出登录
        url: '',
        method: 'SSO_LOGOUT_REQ_88000101_'
    },
}
export default config;