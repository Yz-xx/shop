import { reqCategoryList, reqGetBannerList, reqGetFloorList } from "@/api"


export default {
  state: {
    categoryList: [],
    bannerList: [],
    floorList: []
  },
  getters: {

  },
  mutations: {
    CategoryList(state, value) {
      value.pop()
      state.categoryList = value
    },

    BannerList(state, value) {
      state.bannerList = value
    },

    FloorList(state, value) {
      state.floorList = value
    }

  },
  actions: {
    async categoryList({ commit }) {
      let result = await reqCategoryList()
      if (result.code == 200) {
        commit('CategoryList', result.data)
      }
    },

    //获取首页轮播图数据
    async getBannerList({ commit }) {
      let result = await reqGetBannerList()
      if (result.code == 200) {
        commit('BannerList', result.data)
      }
    },

    //获取floor数据
    async getFloorList({ commit }) {
      let result = await reqGetFloorList()
      if (result.code == 200) {
        commit('FloorList', result.data)
      }
    }
  },
}