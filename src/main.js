import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUi from 'element-ui'
import axios from 'axios'
//  导入基本样式表
import './assets/css/global.css'
// 导入elementUI框架的样式表
import 'element-ui/lib/theme-chalk/index.css'
Vue.config.productionTip = false

//  配置请求根路径
axios.defaults.baseURL = 'https://api.naccl.top/vue/shop/api/private/v1/'
Vue.prototype.$http = axios
//  使用elementUI框架
Vue.use(ElementUi)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
