import { reqAddressInfo, reqOrderInfo } from "@/api";

export default {
  state: {
    address: [],
    orderInfo: {}
  },
  getters: {

  },
  mutations: {
    GetUserAddress(state, value) {
      state.address = value
    },

    GetOrderInfo(state, value) {
      state.orderInfo = value
    }
  },
  actions: {
    //获取用户地址信息
    async getUserAddress({ commit }) {
      let result = await reqAddressInfo()
      if (result.code == 200) {
        commit('GetUserAddress', result.data)
      }
    },

    //获取商品清单
    async getOrderInfo({ commit }) {
      let result = await reqOrderInfo()
      if (result.code == 200) {
        commit('GetOrderInfo', result.data)
      } else {

      }
    }
  },
}