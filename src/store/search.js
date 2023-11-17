import { reqGetSearchInfo } from "@/api"

export default {
  state: {
    searchList: {}
  },
  //计算属性，在项目中为了简化数据而生
  getters: {
    goodsList(state) {
      return state.searchList.goodsList || []
    },
    trademarkList(state) {
      return state.searchList.trademarkList
    },
    attrsList(state) {
      return state.searchList.attrsList
    },
  },
  mutations: {
    SearchList(state, value) {
      state.searchList = value
    }
  },
  actions: {
    async getSearchList({ commit }, params) {
      let result = await reqGetSearchInfo(params)
      if (result.code == 200) {
        commit('SearchList', result.data)
      }
    }
  },
}