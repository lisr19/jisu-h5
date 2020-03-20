
export default {
	state: {
		userInfo:{} //用户信息
	},
	mutations:{
		setUserInfo(state, userInfo) {
			state.userInfo = userInfo
		},
	},
	getters: {},
	actions: {
		setUserInfo(context, data) {
			context.commit('setUserInfo', data)
		},
	}
}
