import Vue from 'vue'
import App from './App.vue'
//图片懒加载
import VueLazyload from 'vue-lazyload'
//引入表单校验插件
import '@/plugins/validate'


import TypeNav from '@/components/TypeNav/TypeNav.vue'
import Carousel from '@/components/Carousel/Carousel.vue'
import Pagination from '@/components/Pagination/Pagination.vue'
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)

import { MessageBox } from 'element-ui'
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

import router from '@/router'
import store from '@/store'
import * as API from '@/api'

import '@/mock/mockServe'

//引入swiper样式
import 'swiper/css/swiper.css'

Vue.config.productionTip = false

Vue.use(VueLazyload)

new Vue({
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
  router,
  store,
}).$mount('#app')
