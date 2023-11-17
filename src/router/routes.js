// #region
// import Home from '@/pages/Home/Home.vue'
// const Home = () => import('@/pages/Home/Home.vue')
// import Login from '@/pages/Login/Login.vue'
// import Search from '@/pages/Search/Search.vue'
// import Register from '@/pages/Register/Register.vue'
// import Detail from '@/pages/Detail/Detail.vue'
// import AddCartSuccess from '@/pages/AddCartSuccess/AddCartSuccess.vue'
// import ShopCart from '@/pages/ShopCart/ShopCart.vue'
// import Trade from '@/pages/Trade/Trade.vue'
// import Pay from '@/pages/Pay/Pay.vue'
// import PaySuccess from '@/pages/PaySuccess/PaySuccess.vue'
// import Center from '@/pages/Center/Center.vue'
// import MyOrder from '@/pages/Center/MyOrder/MyOrder.vue'
// import GroupOrder from '@/pages/Center/GroupOrder/GroupOrder.vue'
// #endregion
export default [
  {
    path: "/home",
    //路由懒加载
    component: () => import('@/pages/Home/Home.vue'),
    meta: { isShow: true }
  },
  {
    path: "/center",
    component: () => import('@/pages/Center/Center.vue'),
    meta: { isShow: true },
    children: [
      {
        path: 'myorder',
        component: () => import('@/pages/Center/MyOrder/MyOrder.vue')
      },
      {
        path: 'grouporder',
        component: () => import('@/pages/Center/GroupOrder/GroupOrder.vue')
      },
      {
        path: '/center',
        redirect: '/center/myorder'
      }
    ]
  },
  {
    path: "/login",
    component: () => import('@/pages/Login/Login.vue'),
    meta: { isShow: false }
  },
  {
    name: 'search',
    path: "/search/:keyword?",//占位后面加个?代表参数可以传递也可以不传递
    component: () => import('@/pages/Search/Search.vue'),
    meta: { isShow: true }
  },
  {
    path: "/register",
    component: () => import('@/pages/Register/Register.vue'),
    meta: { isShow: false }
  },
  {
    path: "/detail/:skuId",
    component: () => import('@/pages/Detail/Detail.vue'),
    meta: { isShow: true }
  },
  {
    name: 'addcartsuccess',
    path: "/addcartsuccess",
    component: () => import('@/pages/AddCartSuccess/AddCartSuccess.vue'),
    meta: { isShow: true }
  },
  {
    path: "/shopcart",
    component: () => import('@/pages/ShopCart/ShopCart.vue'),
    meta: { isShow: true }
  },
  {
    path: "/trade",
    component: () => import('@/pages/Trade/Trade.vue'),
    meta: { isShow: true },
    beforeEnter: (to, from, next) => {
      if (from.path == '/shopcart') {
        next()
      } else {
        next(false)
      }
    }
  },
  {
    path: "/pay",
    component: () => import('@/pages/Pay/Pay.vue'),
    meta: { isShow: true },
    beforeEnter: (to, from, next) => {
      if (from.path == '/trade') {
        next()
      } else {
        next(false)
      }
    }
  },
  {
    path: "/paysuccess",
    component: () => import('@/pages/PaySuccess/PaySuccess.vue'),
    meta: { isShow: true },
  },
  {
    path: "*",
    redirect: "/home"
  }
]