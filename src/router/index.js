import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/login.vue'
import Home from '../components/Home.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

//  利用导航守卫控制访问权限
//    如果用户没有登录，则不能直接访问home页面，需要重新导航回到登录页面
router.beforeEach((to, from, next) => {
  //  to代表需要访问的路径  from代表从哪个路径转跳而来 next是一个函数表示放行
  if (to.path === '/login') {
    return next()
  }
  //  获取token，以检验用户是否已经登录
  const tokenStr = window.sessionStorage.getItem('token')
  //  如果没有token值，则证明用户还没有登录，强制转跳到登录页面
  if (!tokenStr) {
    return next('/login')
  }
  next()
})

export default router
