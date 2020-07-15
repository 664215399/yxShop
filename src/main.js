// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'
import './assets/againRouter'
import './assets/axios'
// 将axios在原型上定义
import axios from 'axios'
Vue.prototype.$axios = axios
import './assets/rem'
import './assets/common.css'
// 导入vant
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

Vue.config.productionTip = false
// 全区路由首位
router.beforeEach((to,from,next)=>{
  // 判断是否有title属性，设置成页面title
  if(to.hasOwnProperty('meta')){
    document.title=to.meta.title
  }
  next()
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
