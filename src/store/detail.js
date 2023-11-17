import { reqGoodsInfo, reqAddOrUpdateShopCart } from "@/api"
import { SET_USERID } from "@/utils/uuid_token"
export default {
  state: {
    goodInfo: {},
    uuid_token: SET_USERID()
  },
  getters: {
    //路径导航数据简化
    categoryView(state) {
      return state.goodInfo.categoryView || {}
    },
    //产品信息数据简化
    skuInfo(state) {
      return state.goodInfo.skuInfo || {}
    },
    //产品售卖属性数据简化
    spuSaleAttrList(state) {
      return state.goodInfo.spuSaleAttrList || []
    }
  },
  mutations: {
    GetGoodInfo(state, value) {
      state.goodInfo = value
    }
  },
  actions: {
    async getGoodInfo({ commit }, skuId) {
      let result = await reqGoodsInfo(skuId)
      if (result.code == 200) {
        commit('GetGoodInfo', result.data)
      }
    },

    //添加购物车
    async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
      let result = await reqAddOrUpdateShopCart(skuId, skuNum)
      //当前这个函数如果执行返回Promise
      if (result.code == 200) {
        return 'ok'
      } else {
        return Promise.reject(new Error('faile'))
      }

    }
  },
}