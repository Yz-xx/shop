import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo, reqLogOut } from "@/api"

export default {

  state: {
    code: '',
    token: localStorage.getItem('TOKEN'),
    userInfo: {}
  },
  getters: {

  },
  mutations: {
    GetCode(state, value) {
      state.code = value
    },

    UserLogin(state, value) {
      state.token = value
    },

    GetUserInfo(state, value) {
      state.userInfo = value
    },

    CLEAR(state) {
      state.token = ''
      state.userInfo = {}
      localStorage.removeItem('TOKEN')
    }
  },
  actions: {
    //获取验证码
    async getCode({ commit }, phone) {
      let result = await reqGetCode(phone)
      if (result.code == 200) {
        commit('GetCode', result.data)
        return 'ok'
      } else {
        return Promise.reject(new Error('faile'))
      }
    },

    //用户注册
    async userRegister({ commit }, user) {
      let result = await reqUserRegister(user)
      if (result.code == 200) {
        return 'ok'
      } else {
        return Promise.reject(new Error('faile'))
      }
    },

    //登陆业务（token)
    async userLogin({ commit }, data) {
      let result = await reqUserLogin(data)
      if (result.code == 200) {
        commit('UserLogin', result.data.token)
        localStorage.setItem('TOKEN', result.data.token)
        return 'ok'
      } else {
        return Promise.reject(new Error('faile'))
      }
    },

    //获取用户信息
    async getUserInfo({ commit }) {
      let result = await reqUserInfo()
      if (result.code == 200) {
        commit('GetUserInfo', result.data)
        return 'ok'
      } else {
        return Promise.reject(new Error('faile'))
      }
    },

    //退出登录
    async userLogOut({ commit }) {
      let result = await reqLogOut()
      console.log(result)
      if (result.code == 200) {
        commit('CLEAR')
        return 'ok'
      } else {
        return Promise.reject(new Error('faile'))
      }
    }

  },
}