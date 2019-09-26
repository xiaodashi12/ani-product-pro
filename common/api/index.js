const config = {
	'getSsoLogin':{//2.1 用户登录
		url: '/login.htm',
        method: '/login.htm'
	},
	'getSessionKey': {//2.2 获取tokenId
        url: '/getSessionKey.htm',
        method: '/getSessionKey.htm'
    },
	'getLostPet': {//发布走失信息
	    url: '/publishBeLostPet.htm',
	    method: '/publishBeLostPet.htm'
	},
	'getLoginOut': {//2.3 退出登录
        url: '',
        method: 'SSO_LOGOUT_REQ_88000101_'
    },
}
export default config;