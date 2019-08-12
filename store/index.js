import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		ticket:uni.getStorageSync('ticket') || '',
		source:uni.getStorageSync('source') || '',
		identity:uni.getStorageSync('identity') || {},//当前用户身份信息
		vehicle:uni.getStorageSync('vehicle') || {}//当前车辆信息
	},
	mutations: {
		setTicket(state,ticket){
			
			state.ticket = ticket;
			uni.setStorageSync('ticket',ticket);
		},
		setSource(state,source){
			state.source = source;
			uni.setStorageSync('source',source);
		},
		setIdentity(state,infos) {// 当前用户身份信息
			
			state.identity = infos;
			uni.setStorageSync('identity',infos) 
			
		},
		setVehicle(state,vehicle){
			
			state.vehicle = vehicle;
			uni.setStorageSync('vehicle',vehicle)
			
		},
		removeaAll(state,{keys=[],cb}){
			
			let _key = keys.length > 0 ?  keys : uni.getStorageInfoSync().keys;
			if(_key.length > 0){
				_key.map(el => {
					state[el] = ''
					uni.removeStorageSync(el);
				})
			}
			
			cb && cb()
			
			
		}
	},
	actions:{
		FedLogOut({commit},cb){
			commit('removeaAll',{keys:['ticket','source','identity','vehicle'],cb})
		},
		setTicket({commit},data){
			commit('setTicket',data);
		},
		setSource({commit},data){
			commit('setSource',data)
		}
	}
})

export default store
