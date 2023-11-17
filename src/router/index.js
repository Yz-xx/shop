import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter)

import routes from './routes'
import store from "@/store";

//先把VueRouter原型对象的push方法保存一份
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace

//重写push与replace方法
//第一个参数：告诉原来的方法往哪跳转(传递哪些参数)
//第二个参数：成功回调
//第三个参数：失败的回调
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    //call||apply区别
    //相同：都可以调用函数一次，都可以修改this指向一次
    //不同：call与apply传递参数：call传递参数用逗号隔开、apply方法执行、传递数组
    originPush.call(this, location, resolve, reject)
  } else {
    originPush.call(this, location, () => { }, () => { })
  }
}

VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    //call||apply区别
    //相同：都可以调用函数一次，都可以修改this指向一次
    //不同：call与apply传递参数：call传递参数用逗号隔开、apply方法执行、传递数组
    originReplace.call(this, location, resolve, reject)
  } else {
    originReplace.call(this, location, () => { }, () => { })
  }
}

const router = new VueRouter({
  routes,
  scrollBehavior() {
    return { y: 0 }
  }
})

//全局守卫
router.beforeEach(async (to, from, next) => {
  let token = store.state.user.token
  let name = store.state.user.userInfo.name
  if (token) {
    if (to.path == '/login' || to.path == '/register') {
      next('/home')
    } else {
      if (name) {
        next()
      } else {
        try {
          //获取用户信息在首页展示
          await store.dispatch('getUserInfo')
          next()
        } catch (error) {
          await store.dispatch('userLogOut')
          next('/login')
        }
      }
    }
  } else {
    //未登录 不能去交易相关页面、支付相关页面（pay、paysuccess）、个人中心,应该去登录页
    if (to.path.indexOf('/trade') != -1 || to.path.indexOf('/pay') != -1 || to.path.indexOf('/center') != -1) {
      next('/login?redirect=' + to.path)
    } else {
      next()
    }
  }
});





export default router