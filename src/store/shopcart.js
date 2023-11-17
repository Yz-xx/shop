import { reqCartList, reqDeleteCartById, reqUpdateCheckedByid } from "@/api"

export default {

  state: {
    cartList: []
  },
  getters: {
    cartList(state) {
      return state.cartList[0] || {}
    },
  },
  mutations: {
    GetCartList(state, value) {
      state.cartList = value
    }
  },
  actions: {
    async getCartList({ commit }) {
      let result = await reqCartList()
      if (result.code == 200) {
        commit('GetCartList', result.data)
      }
    },

    async deleteCartListBySkuId({ commit }, skuId) {
      let result = await reqDeleteCartById(skuId)
      if (result.code == 200) {
        return 'ok'
      } else {
        return Promise.reject(new Error('faile'))
      }
    },

    //修改购物车产品选中状态
    async updateCheckedById({ commit }, { skuId, isChecked }) {
      let result = await reqUpdateCheckedByid(skuId, isChecked)
      if (result.code == 200) {
        return 'ok'
      } else {
        return Promise.reject(new Error('faile'))
      }
    },

    //删除全部勾选的产品
    deleteAllCheckedCart({ dispatch, getters }) {
      let PromiseAll = []
      getters.cartList.cartInfoList.forEach(item => {
        let result = item.isChecked == 1 ? dispatch('deleteCartListBySkuId', item.skuId) : ''
        PromiseAll.push(result)
      })
      return Promise.all(PromiseAll)
    },

    //修改全选按钮的状态
    updateAllCartIsChecked({ dispatch, getters }, isChecked) {
      let PromiseAll = []
      getters.cartList.cartInfoList.forEach(item => {
        let promise = dispatch('updateCheckedById', { skuId: item.skuId, isChecked })
        PromiseAll.push(promise)
      })
      return Promise.all(PromiseAll)
    }
  },
}